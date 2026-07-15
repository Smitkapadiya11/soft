import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import {
  verifyRazorpayPaymentSignature,
  markCheckoutGroupPaid,
  releaseCheckoutGroupStock,
} from "@/lib/payment-verify";
import { paymentVerifySchema, zodErrorMessage } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

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

    if (
      !verifyRazorpayPaymentSignature(
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
        secret
      )
    ) {
      await releaseCheckoutGroupStock(checkoutGroupId);
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    const result = await markCheckoutGroupPaid(
      checkoutGroupId,
      razorpayOrderId,
      razorpayPaymentId
    );

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({
      success: true,
      orderIds: result.orderIds,
      checkoutGroupId,
    });
  } catch (err) {
    console.error("POST /api/payment/verify:", err);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 500 });
  }
}
