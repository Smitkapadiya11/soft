import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { inventoryPatchSchema, zodErrorMessage } from "@/lib/validation";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const inventory = await prisma.inventory.findMany({ orderBy: { variantName: "asc" } });

  return NextResponse.json({
    inventory: inventory.map((i) => ({
      id: i.id,
      variant: i.variantName,
      stock: i.stockCount,
    })),
  });
}

export async function PATCH(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const parsed = inventoryPatchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: zodErrorMessage(parsed) }, { status: 400 });
    }

    const { variant, stockCount } = parsed.data;

    const updated = await prisma.inventory.upsert({
      where: { variantName: variant },
      update: { stockCount },
      create: { variantName: variant, stockCount },
    });

    return NextResponse.json({ variant: updated.variantName, stock: updated.stockCount });
  } catch {
    return NextResponse.json({ error: "Failed to update inventory" }, { status: 500 });
  }
}
