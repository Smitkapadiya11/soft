import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { releaseCheckoutGroupStock } from "@/lib/payment-verify";
import { z } from "zod";

const releaseSchema = z.object({
  checkoutGroupId: z.string().min(1),
});

/** Release reserved stock when payment is cancelled or fails */
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "orders-release", 10, 60_000);
  if (limited) return limited;

  try {
    const body = await req.json();
    const parsed = releaseSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid checkout group" }, { status: 400 });
    }

    await releaseCheckoutGroupStock(parsed.data.checkoutGroupId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/orders/release:", err);
    return NextResponse.json({ error: "Failed to release order" }, { status: 500 });
  }
}
