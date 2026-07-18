import "dotenv/config";
import { loadEnvFiles } from "../lib/load-env";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { syncAdminFromEnv } from "../lib/sync-admin";
import { DEFAULT_STOCK, INVENTORY_SKUS } from "../lib/products";

loadEnvFiles();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const { username } = await syncAdminFromEnv(prisma);

  for (const variantName of INVENTORY_SKUS) {
    await prisma.inventory.upsert({
      where: { variantName },
      update: {},
      create: { variantName, stockCount: DEFAULT_STOCK[variantName] },
    });
  }

  console.log(`Seeded admin "${username}" and ${INVENTORY_SKUS.length} inventory SKUs`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
