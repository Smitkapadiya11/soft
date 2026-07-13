import "dotenv/config";
import { loadEnvFiles } from "../lib/load-env";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { syncAdminFromEnv } from "../lib/sync-admin";

loadEnvFiles();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const { username } = await syncAdminFromEnv(prisma);

  await prisma.inventory.upsert({
    where: { variantName: "Natural" },
    update: { stockCount: 100 },
    create: { variantName: "Natural", stockCount: 100 },
  });

  await prisma.inventory.upsert({
    where: { variantName: "Espresso" },
    update: { stockCount: 100 },
    create: { variantName: "Espresso", stockCount: 100 },
  });

  await prisma.inventory.deleteMany({
    where: {
      variantName: {
        notIn: ["Natural", "Espresso"],
      },
    },
  });

  console.log(`Seeded admin "${username}" and inventory (Natural: 100, Espresso: 100)`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
