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
    where: { variantName: "Ultra Thin" },
    update: { stockCount: 200 },
    create: { variantName: "Ultra Thin", stockCount: 200 },
  });

  await prisma.inventory.upsert({
    where: { variantName: "Dotted" },
    update: { stockCount: 180 },
    create: { variantName: "Dotted", stockCount: 180 },
  });

  await prisma.inventory.deleteMany({
    where: {
      variantName: { in: ["Blush", "Plum", "Pearl", "Sage"] },
    },
  });

  console.log(`Seeded admin "${username}" and inventory (Ultra Thin: 200, Dotted: 180)`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
