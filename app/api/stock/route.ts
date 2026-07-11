import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FALLBACK_STOCK, ALLOWED_VARIANTS } from "@/lib/constants";

export async function GET() {
  try {
    const inventory = await prisma.inventory.findMany({
      where: { variantName: { in: [...ALLOWED_VARIANTS] } },
      select: { variantName: true, stockCount: true },
    });

    const stock: Record<string, number> = { ...FALLBACK_STOCK };
    for (const item of inventory) {
      stock[item.variantName] = item.stockCount;
    }

    return NextResponse.json({ stock }, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    console.error("GET /api/stock:", err);
    return NextResponse.json({ stock: FALLBACK_STOCK });
  }
}
