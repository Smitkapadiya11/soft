import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import {
  markCheckoutGroupPaid,
  releaseCheckoutGroupStock,
} from "@/lib/payment-verify";

function verifyWebhookSignature(body: string, signature: string, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(body).digest("hex");
  try {
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(signature, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const signature = req.headers.get("x-razorpay-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await req.text();
  if (!verifyWebhookSignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let payload: {
    event?: string;
    payload?: {
      payment?: {
        entity?: {
          id?: string;
          order_id?: string;
          status?: string;
          notes?: { checkoutGroupId?: string };
        };
      };
    };
  };

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const event = payload.event;
  const payment = payload.payload?.payment?.entity;
  if (!payment?.order_id || !payment.id) {
    return NextResponse.json({ received: true });
  }

  const fromNotes = payment.notes?.checkoutGroupId;
  const fromIntent = (
    await prisma.checkoutIntent.findFirst({
      where: { razorpayOrderId: payment.order_id },
      select: { id: true },
    })
  )?.id;
  const fromLegacyOrder = (
    await prisma.order.findFirst({
      where: { razorpayOrderId: payment.order_id },
      select: { checkoutGroupId: true },
    })
  )?.checkoutGroupId;

  const checkoutGroupId = fromNotes ?? fromIntent ?? fromLegacyOrder ?? undefined;

  if (!checkoutGroupId) {
    return NextResponse.json({ received: true });
  }

  if (event === "payment.captured" || payment.status === "captured") {
    await markCheckoutGroupPaid(checkoutGroupId, payment.order_id, payment.id);
  }

  if (event === "payment.failed") {
    await releaseCheckoutGroupStock(checkoutGroupId);
  }

  return NextResponse.json({ received: true });
}
