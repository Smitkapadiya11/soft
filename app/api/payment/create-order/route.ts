import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRazorpay } from "@/lib/razorpay";
import { checkoutGroupSchema, zodErrorMessage } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "payment-create", 10, 60_000);
  if (limited) return limited;

  try {
    const body = await req.json();
    const parsed = checkoutGroupSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: zodErrorMessage(parsed) }, { status: 400 });
    }

    const { checkoutGroupId } = parsed.data;

    const orders = await prisma.order.findMany({
      where: { checkoutGroupId, paymentStatus: "pending" },
      include: { customer: true },
    });

    if (orders.length === 0) {
      return NextResponse.json({ error: "No pending orders found" }, { status: 404 });
    }

    const totalAmount = orders.reduce((sum, o) => sum + o.amount, 0);
    const amountPaise = Math.round(totalAmount * 100);

    const razorpay = getRazorpay();
    const razorpayOrder = await razorpay.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: checkoutGroupId.slice(0, 40),
      notes: { checkoutGroupId },
    });

    await prisma.order.updateMany({
      where: { checkoutGroupId },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return NextResponse.json({
      razorpayOrderId: razorpayOrder.id,
      amount: amountPaise,
      currency: "INR",
      customerName: orders[0].customer.name,
      customerEmail: orders[0].customer.email,
      customerPhone: orders[0].customer.phone,
    });
  } catch (err) {
    console.error("POST /api/payment/create-order:", err);
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
