import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FALLBACK_STOCK } from "@/lib/constants";

export async function GET() {
  try {
    const inventory = await prisma.inventory.findMany({
      where: { variantName: { in: ["Blush", "Plum"] } },
      select: { variantName: true, stockCount: true },
    });

    const stock: Record<string, number> = { ...FALLBACK_STOCK };
    for (const item of inventory) {
      stock[item.variantName] = item.stockCount;
    }

    return NextResponse.json({ stock });
  } catch (err) {
    console.error("GET /api/stock:", err);
    return NextResponse.json({ stock: FALLBACK_STOCK });
  }
}
