import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRazorpay, isRazorpayAuthError } from "@/lib/razorpay";
import { parseCreateOrder, PRODUCT_PRICE } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

const MIN_AMOUNT_PAISE = 100;

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "payment-create", 10, 60_000);
  if (limited) return limited;

  try {
    const body = await req.json();
    const parsed = parseCreateOrder(body);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { customer, items } = parsed.data;
    const amount = items.reduce((sum, i) => sum + PRODUCT_PRICE * i.quantity, 0);
    const amountPaise = Math.round(amount * 100);

    if (amountPaise < MIN_AMOUNT_PAISE) {
      return NextResponse.json(
        { error: `Amount must be at least ₹${MIN_AMOUNT_PAISE / 100}` },
        { status: 400 }
      );
    }

    const intent = await prisma.$transaction(async (tx) => {
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

      return tx.checkoutIntent.create({
        data: {
          customerId: dbCustomer.id,
          itemsJson: JSON.stringify(
            items.map((i) => ({ variant: i.variant, quantity: i.quantity }))
          ),
          amount,
          status: "open",
        },
        include: { customer: true },
      });
    });

    let razorpayOrder: { id: string };
    try {
      const razorpay = getRazorpay();
      razorpayOrder = await razorpay.orders.create({
        amount: amountPaise,
        currency: "INR",
        receipt: intent.id.slice(0, 40),
        notes: {
          checkoutGroupId: intent.id,
          customerId: intent.customerId,
        },
      });
    } catch (rzErr) {
      // Release reserved stock if Razorpay create fails
      const { releaseCheckoutGroupStock } = await import("@/lib/payment-verify");
      await releaseCheckoutGroupStock(intent.id).catch(() => {});
      throw rzErr;
    }

    await prisma.checkoutIntent.update({
      where: { id: intent.id },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return NextResponse.json({
      order_id: razorpayOrder.id,
      razorpayOrderId: razorpayOrder.id,
      amount: amountPaise,
      currency: "INR",
      customerName: intent.customer.name,
      customerEmail: intent.customer.email,
      customerPhone: intent.customer.phone,
      checkoutGroupId: intent.id,
      customerId: intent.customerId,
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
    console.error("POST /api/payment/create-order:", err);
    if (isRazorpayAuthError(err)) {
      return NextResponse.json({ error: "Razorpay authentication failed" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
