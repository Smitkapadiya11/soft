import bcrypt from "bcryptjs";
import type { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function syncAdminFromEnv(client: PrismaClient = prisma) {
  const username = process.env.ADMIN_USERNAME?.trim() || "admin";
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!password) {
    throw new Error(
      "ADMIN_PASSWORD is not set. Add ADMIN_USERNAME and ADMIN_PASSWORD to .env.local, then run: npm run admin:sync"
    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await client.admin.upsert({
    where: { username },
    update: { passwordHash },
    create: { username, passwordHash },
  });

  return { username: admin.username };
}
