import "dotenv/config";
import { loadEnvFiles } from "../lib/load-env";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

loadEnvFiles();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const orders = await prisma.order.findMany({
    select: {
      id: true,
      variant: true,
      quantity: true,
      paymentStatus: true,
    },
  });

  console.log(`Found ${orders.length} order(s) to delete`);

  let stockRestored = 0;

  await prisma.$transaction(async (tx) => {
    for (const order of orders) {
      if (order.paymentStatus === "paid") {
        const updated = await tx.inventory.updateMany({
          where: { variantName: order.variant },
          data: { stockCount: { increment: order.quantity } },
        });
        if (updated.count > 0) {
          stockRestored += 1;
          console.log(
            `  Restored +${order.quantity} stock for ${order.variant} (order ${order.id.slice(0, 10)})`
          );
        } else {
          console.log(
            `  Skipped inventory restore for unknown variant "${order.variant}" (order ${order.id.slice(0, 10)})`
          );
        }
      }
    }

    const deleted = await tx.order.deleteMany({});
    console.log(`Deleted ${deleted.count} order row(s)`);
  });

  // Cancel any open checkout intents left from abandoned checkouts (no Order rows)
  const openIntents = await prisma.checkoutIntent.findMany({
    where: { status: "open" },
  });

  for (const intent of openIntents) {
    let items: { variant: string; quantity: number }[] = [];
    try {
      items = JSON.parse(intent.itemsJson) as { variant: string; quantity: number }[];
    } catch {
      items = [];
    }
    for (const item of items) {
      if (!item?.variant || !item?.quantity) continue;
      await prisma.inventory.updateMany({
        where: { variantName: item.variant },
        data: { stockCount: { increment: item.quantity } },
      });
    }
  }

  if (openIntents.length > 0) {
    const cancelled = await prisma.checkoutIntent.updateMany({
      where: { status: "open" },
      data: { status: "cancelled" },
    });
    console.log(`Cancelled ${cancelled.count} open CheckoutIntent(s) and restored reserved stock`);
  }

  const remaining = await prisma.order.count();
  const customers = await prisma.customer.count();
  console.log(
    `Done. Orders remaining: ${remaining}. Customers kept: ${customers}. Paid orders that restored stock: ${stockRestored}`
  );
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
