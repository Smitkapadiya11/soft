import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { paymentVerifySchema, zodErrorMessage } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

function signaturesMatch(expected: string, received: string): boolean {
  try {
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(received, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "payment-verify", 15, 60_000);
  if (limited) return limited;

  try {
    const body = await req.json();
    const parsed = paymentVerifySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: zodErrorMessage(parsed) }, { status: 400 });
    }

    const {
      razorpay_order_id: razorpayOrderId,
      razorpay_payment_id: razorpayPaymentId,
      razorpay_signature: razorpaySignature,
      checkoutGroupId,
    } = parsed.data;

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Payment not configured" }, { status: 500 });
    }

    // HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const expected = createHmac("sha256", secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (!signaturesMatch(expected, razorpaySignature)) {
      await prisma.order.updateMany({
        where: { checkoutGroupId },
        data: { paymentStatus: "failed" },
      });
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    const orders = await prisma.order.findMany({
      where: { checkoutGroupId, paymentStatus: "pending" },
      include: { customer: true },
    });

    if (orders.length === 0) {
      return NextResponse.json({ error: "No pending orders to verify" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      for (const order of orders) {
        const inv = await tx.inventory.findUnique({ where: { variantName: order.variant } });
        if (!inv || inv.stockCount < order.quantity) {
          throw new Error(`Insufficient stock for ${order.variant}`);
        }
      }

      await tx.order.updateMany({
        where: { checkoutGroupId },
        data: {
          paymentStatus: "paid",
          razorpayOrderId,
          razorpayPaymentId,
        },
      });

      for (const order of orders) {
        await tx.inventory.update({
          where: { variantName: order.variant },
          data: { stockCount: { decrement: order.quantity } },
        });
      }
    });

    const orderIds = orders.map((o) => o.id);
    await sendOrderConfirmationEmail(orders[0].customer.email, orderIds);

    return NextResponse.json({
      success: true,
      orderIds,
      checkoutGroupId,
    });
  } catch (err) {
    console.error("POST /api/payment/verify:", err);
    const message = err instanceof Error ? err.message : "Payment verification failed";
    if (message.includes("Insufficient stock")) {
      return NextResponse.json({ error: message }, { status: 409 });
    }
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
