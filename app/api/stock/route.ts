import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { DEFAULT_STOCK, INVENTORY_SKUS } from "@/lib/products";

export async function GET() {
  try {
    let inventory = await prisma.inventory.findMany({
      where: { variantName: { in: [...INVENTORY_SKUS] } },
      select: { variantName: true, stockCount: true },
    });

    // Bootstrap missing variants so checkout never fails after a product rename
    const present = new Set(inventory.map((i) => i.variantName));
    const missing = INVENTORY_SKUS.filter((sku) => !present.has(sku));
    if (missing.length > 0) {
      await Promise.all(
        missing.map((variantName) =>
          prisma.inventory.upsert({
            where: { variantName },
            update: {},
            create: {
              variantName,
              stockCount: DEFAULT_STOCK[variantName],
            },
          })
        )
      );
      inventory = await prisma.inventory.findMany({
        where: { variantName: { in: [...INVENTORY_SKUS] } },
        select: { variantName: true, stockCount: true },
      });
    }

    const stock: Record<string, number> = {};
    for (const name of INVENTORY_SKUS) {
      stock[name] = 0;
    }
    for (const item of inventory) {
      stock[item.variantName] = item.stockCount;
    }

    return NextResponse.json(
      { stock },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (err) {
    console.error("GET /api/stock:", err);
    const stock: Record<string, number> = {};
    for (const name of INVENTORY_SKUS) stock[name] = 0;
    return NextResponse.json({ stock });
  }
}
