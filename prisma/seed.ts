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
    where: { variantName: "Pearl" },
    update: { stockCount: 145 },
    create: { variantName: "Pearl", stockCount: 145 },
  });

  await prisma.inventory.upsert({
    where: { variantName: "Sage" },
    update: { stockCount: 120 },
    create: { variantName: "Sage", stockCount: 120 },
  });

  // Remove legacy variant rows if present
  await prisma.inventory.deleteMany({
    where: { variantName: { in: ["Blush", "Plum"] } },
  });

  console.log(`Seeded admin user "${username}" and inventory (Pearl: 145, Sage: 120)`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
