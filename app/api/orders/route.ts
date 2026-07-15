import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseCreateOrder } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "orders-post", 8, 60_000);
  if (limited) return limited;

  try {
    const body = await req.json();
    const parsed = parseCreateOrder(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { customer, items } = parsed.data;
    const checkoutGroupId = randomUUID();
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    const result = await prisma.$transaction(async (tx) => {
      for (const item of items) {
        const updated = await tx.inventory.updateMany({
          where: {
            variantName: item.variant,
            stockCount: { gte: item.quantity },
          },
          data: { stockCount: { decrement: item.quantity } },
        });
        if (updated.count === 0) {
          throw new Error(`STOCK:${item.variant}`);
        }
      }

      const dbCustomer = await tx.customer.create({ data: customer });

      const orders = await Promise.all(
        items.map((item) =>
          tx.order.create({
            data: {
              customerId: dbCustomer.id,
              checkoutGroupId,
              variant: item.variant,
              quantity: item.quantity,
              amount: item.price * item.quantity,
              paymentStatus: "pending",
              shippingStatus: "PENDING",
            },
          })
        )
      );

      return { customer: dbCustomer, orders };
    });

    return NextResponse.json({
      checkoutGroupId,
      orderIds: result.orders.map((o) => o.id),
      customerId: result.customer.id,
      totalAmount,
      amountPaise: Math.round(totalAmount * 100),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message.startsWith("STOCK:")) {
      const variant = message.replace("STOCK:", "");
      return NextResponse.json(
        { error: `${variant} is out of stock or insufficient quantity available` },
        { status: 400 }
      );
    }
    console.error("POST /api/orders:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { requireAdmin } = await import("@/lib/auth");
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") ?? "50", 10)));
  const skip = (page - 1) * limit;
  const paidOnly = searchParams.get("paid") === "true";

  const where = paidOnly ? { paymentStatus: "paid" } : {};

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: { customer: true },
    }),
    prisma.order.count({ where }),
  ]);

  return NextResponse.json({
    orders: orders.map((o) => ({
      id: o.id,
      date: o.createdAt.toISOString().split("T")[0],
      customer: o.customer.name,
      customerEmail: o.customer.email,
      variant: o.variant,
      qty: o.quantity,
      amount: o.amount,
      payment: o.paymentStatus.toUpperCase(),
      status: o.shippingStatus,
      addressLine1: o.customer.addressLine1,
      addressLine2: o.customer.addressLine2,
      city: o.customer.city,
      state: o.customer.state,
      pincode: o.customer.pincode,
      phone: o.customer.phone,
      checkoutGroupId: o.checkoutGroupId,
    })),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}
