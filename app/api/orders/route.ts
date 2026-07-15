import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseCustomer } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

/** Public POST: save customer only — orders are created after successful payment */
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "orders-post", 8, 60_000);
  if (limited) return limited;

  try {
    const body = await req.json();
    const customerRaw = body?.customer ?? body;
    const parsed = parseCustomer(customerRaw);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const customer = await prisma.customer.create({ data: parsed.data });

    return NextResponse.json({ customerId: customer.id });
  } catch (err) {
    console.error("POST /api/orders:", err);
    return NextResponse.json({ error: "Failed to save customer" }, { status: 500 });
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
  // Always paid-only — unfinished checkouts stay as Customer + CheckoutIntent, not Orders
  const where = { paymentStatus: "paid" as const };

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
