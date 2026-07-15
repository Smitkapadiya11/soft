import "dotenv/config";
import { loadEnvFiles } from "../lib/load-env";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PRODUCT_PRICE } from "../lib/constants";

loadEnvFiles();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

/** Restore the real Alex paid order if missing */
async function main() {
  const existingPaid = await prisma.order.count({ where: { paymentStatus: "paid" } });
  if (existingPaid > 0) {
    console.log(`Already have ${existingPaid} paid order(s). Skipping restore.`);
    return;
  }

  let alex = await prisma.customer.findFirst({
    where: {
      OR: [
        { email: { contains: "alexjack", mode: "insensitive" } },
        { name: { equals: "Alex", mode: "insensitive" } },
      ],
    },
    orderBy: { createdAt: "asc" },
  });

  if (!alex) {
    alex = await prisma.customer.create({
      data: {
        name: "Alex",
        email: "alexjack@gmail.com",
        phone: "0000000000",
        addressLine1: "Yogichowk",
        city: "Surat",
        state: "Gujarat",
        pincode: "395010",
      },
    });
    console.log("Created customer Alex (phone placeholder — update in admin if needed)");
  } else {
    console.log(`Found customer ${alex.name} <${alex.email}>`);
  }

  const order = await prisma.order.create({
    data: {
      customerId: alex.id,
      variant: "Natural",
      quantity: 1,
      amount: PRODUCT_PRICE,
      paymentStatus: "paid",
      shippingStatus: "DELIVERED",
    },
  });

  // Stock was restored when order was deleted; re-decrement for this fulfilled order
  await prisma.inventory.updateMany({
    where: { variantName: "Natural", stockCount: { gte: 1 } },
    data: { stockCount: { decrement: 1 } },
  });

  console.log(`Restored paid order ${order.id} · Soft Rose ×1 · ₹${PRODUCT_PRICE} · DELIVERED`);
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
