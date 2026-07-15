import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { buildShippingLabelHtml } from "@/lib/shipping-label";
import { z } from "zod";

const patchSchema = z.object({
  shippingStatus: z.enum(["PENDING", "SHIPPED", "DELIVERED"]),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid shipping status" }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id },
    data: { shippingStatus: parsed.data.shippingStatus },
  });

  return NextResponse.json({ success: true, shippingStatus: order.shippingStatus });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { customer: true },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const labelOrder = {
    id: order.id,
    date: order.createdAt.toISOString().split("T")[0],
    customer: order.customer.name,
    phone: order.customer.phone,
    email: order.customer.email,
    variant: order.variant,
    qty: order.quantity,
    amount: order.amount,
    payment: order.paymentStatus.toUpperCase(),
    shippingStatus: order.shippingStatus,
    addressLine1: order.customer.addressLine1,
    addressLine2: order.customer.addressLine2,
    city: order.customer.city,
    state: order.customer.state,
    pincode: order.customer.pincode,
    checkoutGroupId: order.checkoutGroupId,
  };

  const html = buildShippingLabelHtml(labelOrder);
  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="label-${order.id.slice(0, 8)}.html"`,
    },
  });
}
