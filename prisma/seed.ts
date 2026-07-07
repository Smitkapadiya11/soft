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
    where: { variantName: "Blush" },
    update: { stockCount: 145 },
    create: { variantName: "Blush", stockCount: 145 },
  });

  await prisma.inventory.upsert({
    where: { variantName: "Plum" },
    update: { stockCount: 120 },
    create: { variantName: "Plum", stockCount: 120 },
  });

  console.log(`Seeded admin user "${username}" and inventory (Blush: 145, Plum: 120)`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
