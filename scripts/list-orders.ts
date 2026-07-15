import "dotenv/config";
import { loadEnvFiles } from "../lib/load-env";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

loadEnvFiles();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

async function main() {
  const orders = await prisma.order.findMany({
    include: { customer: true },
    orderBy: { createdAt: "desc" },
  });
  const customers = await prisma.customer.count();
  console.log(`Orders: ${orders.length}, Customers: ${customers}`);
  for (const o of orders) {
    console.log(
      `${o.id} | ${o.customer.name} | ${o.customer.email} | ${o.variant} | ${o.amount} | ${o.paymentStatus} | ${o.shippingStatus}`
    );
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
