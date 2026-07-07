import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "silkroom2026";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.admin.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });

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

  console.log(`Seeded admin user "${username}" and inventory (Blush: 145, Plum: 12)`);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
