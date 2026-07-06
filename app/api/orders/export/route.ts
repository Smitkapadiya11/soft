import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { customer: true },
  });

  const headers = "Order ID,Date,Customer,Variant,Qty,Amount,Payment,Status\n";
  const rows = orders
    .map(
      (o) =>
        `${o.id},${o.createdAt.toISOString().split("T")[0]},${o.customer.name},${o.variant},${o.quantity},${o.amount},${o.paymentStatus},${o.shippingStatus}`
    )
    .join("\n");

  return new NextResponse(headers + rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="orders.csv"',
    },
  });
}
