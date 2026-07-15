import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { orders: true } },
      orders: {
        where: { paymentStatus: "paid" },
        select: { id: true },
      },
    },
  });

  return NextResponse.json({
    customers: customers.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      city: c.city,
      state: c.state,
      pincode: c.pincode,
      /** Total order rows historically linked (prefer paidOrderCount in UI) */
      orderCount: c.orders.length,
      paidOrderCount: c.orders.length,
      createdAt: c.createdAt.toISOString().split("T")[0],
    })),
  });
}
