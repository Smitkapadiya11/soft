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
    where: { variantName: "Soft Rose" },
    update: { stockCount: 120 },
    create: { variantName: "Soft Rose", stockCount: 120 },
  });

  await prisma.inventory.upsert({
    where: { variantName: "Mist Grey" },
    update: { stockCount: 120 },
    create: { variantName: "Mist Grey", stockCount: 120 },
  });

  await prisma.inventory.deleteMany({
    where: {
      variantName: {
        in: ["Ultra Thin", "Dotted", "Blush", "Plum", "Pearl", "Sage"],
      },
    },
  });

  console.log(`Seeded admin "${username}" and inventory (Soft Rose: 120, Mist Grey: 120)`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
