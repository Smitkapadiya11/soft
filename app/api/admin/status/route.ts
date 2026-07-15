import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

/** Admin-only setup health check (no secrets exposed) */
export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

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

  if (!process.env.RAZORPAY_KEY_SECRET) {
    issues.push("RAZORPAY_KEY_SECRET not configured");
  }

  if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
    issues.push("RAZORPAY_WEBHOOK_SECRET not set — configure webhook in Razorpay dashboard");
  }

  return NextResponse.json({
    ok: issues.length === 0,
    adminExists,
    issues,
  });
}
