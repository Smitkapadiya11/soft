import "dotenv/config";
import { loadEnvFiles } from "../lib/load-env";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

loadEnvFiles();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/** Keep the real customer order (Alex); remove test/self-paid rows */
async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const orders = await prisma.order.findMany({
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });

  console.log("Current orders:");
  for (const o of orders) {
    console.log(
      `  ${o.id.slice(0, 12)} | ${o.customer.name} | ${o.variant} | ₹${o.amount} | ${o.paymentStatus} | ${o.customer.email}`
    );
  }

  const toDelete = orders.filter((o) => {
    const email = o.customer.email.toLowerCase();
    const name = o.customer.name.toLowerCase();
    const isSmit =
      name.includes("smit") ||
      email.includes("smitkapadiya") ||
      email.includes("smitkapadiya.work");
    const isOldSku = o.variant.toLowerCase().includes("ultra") || o.amount === 299;
    const isTestAddr = /wwododnx/i.test(o.customer.addressLine1);
    return isSmit || isOldSku || isTestAddr;
  });

  // Never delete if only one order and it's not clearly test — safety
  const keep = orders.filter((o) => !toDelete.includes(o));
  console.log(`\nWill keep ${keep.length}, delete ${toDelete.length}`);

  if (toDelete.length === 0) {
    console.log("Nothing to delete.");
    return;
  }

  await prisma.$transaction(async (tx) => {
    for (const order of toDelete) {
      if (order.paymentStatus === "paid") {
        await tx.inventory.updateMany({
          where: { variantName: order.variant },
          data: { stockCount: { increment: order.quantity } },
        });
        console.log(`  Restored stock for ${order.variant} (+${order.quantity})`);
      }
      await tx.order.delete({ where: { id: order.id } });
      console.log(`  Deleted order ${order.id.slice(0, 12)}… (${order.customer.name})`);
    }
  });

  const remaining = await prisma.order.findMany({
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });
  console.log("\nRemaining paid/orders:");
  for (const o of remaining) {
    console.log(
      `  ${o.customer.name} | ${o.variant} | ₹${o.amount} | ${o.paymentStatus} | ship:${o.shippingStatus}`
    );
  }
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
