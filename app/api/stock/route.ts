import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const inventory = await prisma.inventory.findMany({
      where: { variantName: { in: ["Blush", "Plum"] } },
      select: { variantName: true, stockCount: true },
    });

    const stock: Record<string, number> = { Blush: 0, Plum: 0 };
    for (const item of inventory) {
      stock[item.variantName] = item.stockCount;
    }

    return NextResponse.json({ stock });
  } catch (err) {
    console.error("GET /api/stock:", err);
    return NextResponse.json({ error: "Failed to fetch stock" }, { status: 500 });
  }
}
