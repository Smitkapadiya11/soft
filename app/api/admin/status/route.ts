import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Public health check for admin login setup (no secrets exposed) */
export async function GET() {
  const issues: string[] = [];

  if (!process.env.NEXTAUTH_SECRET) {
    issues.push("NEXTAUTH_SECRET is missing from environment");
  }

  if (!process.env.DATABASE_URL) {
    issues.push("DATABASE_URL is missing from environment");
  }

  let adminExists = false;
  if (process.env.DATABASE_URL) {
    try {
      const count = await prisma.admin.count();
      adminExists = count > 0;
      if (!adminExists) {
        issues.push("No admin user in database — run: npm run admin:sync");
      }
    } catch {
      issues.push("Cannot connect to database — check DATABASE_URL");
    }
  }

  if (!process.env.ADMIN_PASSWORD) {
    issues.push("ADMIN_PASSWORD not in env — add to .env.local and run: npm run admin:sync");
  }

  return NextResponse.json({
    ok: issues.length === 0,
    adminExists,
    issues,
  });
}
