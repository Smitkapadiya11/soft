import "dotenv/config";
import { loadEnvFiles } from "../lib/load-env";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

loadEnvFiles();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

/** Delete unpaid/failed order rows (Orders tab is paid-only). Restore pending stock. */
async function main() {
  const unpaid = await prisma.order.findMany({
    where: { paymentStatus: { not: "paid" } },
  });
  console.log(`Unpaid/failed orders: ${unpaid.length}`);

  await prisma.$transaction(async (tx) => {
    for (const o of unpaid) {
      if (o.paymentStatus === "pending") {
        await tx.inventory.updateMany({
          where: { variantName: o.variant },
          data: { stockCount: { increment: o.quantity } },
        });
      }
    }
    const deleted = await tx.order.deleteMany({
      where: { paymentStatus: { not: "paid" } },
    });
    console.log(`Deleted ${deleted.count} unpaid/failed order row(s)`);
  });

  const left = await prisma.order.findMany({ include: { customer: true } });
  console.log("Remaining orders (should be paid only):");
  for (const o of left) {
    console.log(
      `  ${o.customer.name} | ${o.variant} | ₹${o.amount} | ${o.paymentStatus} | ${o.shippingStatus}`
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
