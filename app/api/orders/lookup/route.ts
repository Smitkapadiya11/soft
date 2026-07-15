import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/** Public lookup for confirmation page — no PII exposed */
export async function GET(req: NextRequest) {
  const orderId = new URL(req.url).searchParams.get("orderId");
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      paymentStatus: true,
      shippingStatus: true,
      amount: true,
      variant: true,
      quantity: true,
      createdAt: true,
    },
  });

  if (!order || order.paymentStatus !== "paid") {
    return NextResponse.json({ valid: false }, { status: 404 });
  }

  return NextResponse.json({
    valid: true,
    orderId: order.id,
    amount: order.amount,
    variant: order.variant,
    quantity: order.quantity,
    shippingStatus: order.shippingStatus,
    date: order.createdAt.toISOString().split("T")[0],
  });
}
