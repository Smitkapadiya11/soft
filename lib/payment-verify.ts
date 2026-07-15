import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { PRODUCT_PRICE } from "@/lib/constants";

type IntentItem = { variant: string; quantity: number };

function signaturesMatch(expected: string, received: string): boolean {
  try {
    const a = Buffer.from(expected, "utf8");
    const b = Buffer.from(received, "utf8");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function verifyRazorpayPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  const expected = createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return signaturesMatch(expected, signature);
}

function parseIntentItems(itemsJson: string): IntentItem[] {
  try {
    const raw = JSON.parse(itemsJson) as unknown;
    if (!Array.isArray(raw)) return [];
    return raw
      .filter(
        (item): item is IntentItem =>
          !!item &&
          typeof item === "object" &&
          typeof (item as IntentItem).variant === "string" &&
          typeof (item as IntentItem).quantity === "number"
      )
      .map((item) => ({
        variant: item.variant,
        quantity: Math.max(0, Math.floor(item.quantity)),
      }))
      .filter((item) => item.quantity > 0);
  } catch {
    return [];
  }
}

export async function markCheckoutGroupPaid(
  checkoutGroupId: string,
  razorpayOrderId: string,
  razorpayPaymentId: string
): Promise<{ orderIds: string[] } | { error: string; status: number }> {
  const intent = await prisma.checkoutIntent.findUnique({
    where: { id: checkoutGroupId },
    include: { customer: true },
  });

  if (intent) {
    if (intent.status === "completed") {
      const existing = await prisma.order.findMany({
        where: { checkoutGroupId },
        select: { id: true },
      });
      return { orderIds: existing.map((o) => o.id) };
    }

    if (intent.status !== "open") {
      return { error: "Checkout is no longer open", status: 400 };
    }

    const items = parseIntentItems(intent.itemsJson);
    if (items.length === 0) {
      return { error: "Invalid checkout items", status: 400 };
    }

    const orderIds = await prisma.$transaction(async (tx) => {
      const created = await Promise.all(
        items.map((item) =>
          tx.order.create({
            data: {
              customerId: intent.customerId,
              checkoutGroupId: intent.id,
              variant: item.variant,
              quantity: item.quantity,
              amount: PRODUCT_PRICE * item.quantity,
              paymentStatus: "paid",
              shippingStatus: "PENDING",
              razorpayOrderId,
              razorpayPaymentId,
            },
          })
        )
      );

      await tx.checkoutIntent.update({
        where: { id: intent.id },
        data: { status: "completed", razorpayOrderId },
      });

      return created.map((o) => o.id);
    });

    await sendOrderConfirmationEmail(intent.customer.email, orderIds).catch(() => {});
    return { orderIds };
  }

  // Legacy: pending Order rows created before CheckoutIntent flow
  const orders = await prisma.order.findMany({
    where: { checkoutGroupId },
    include: { customer: true },
  });

  if (orders.length === 0) {
    return { error: "No checkout found", status: 404 };
  }

  const alreadyPaid = orders.every((o) => o.paymentStatus === "paid");
  if (alreadyPaid) {
    return { orderIds: orders.map((o) => o.id) };
  }

  const pending = orders.filter((o) => o.paymentStatus === "pending");
  if (pending.length === 0) {
    return { error: "No pending orders to verify", status: 404 };
  }

  await prisma.order.updateMany({
    where: { checkoutGroupId, paymentStatus: "pending" },
    data: {
      paymentStatus: "paid",
      razorpayOrderId,
      razorpayPaymentId,
    },
  });

  const orderIds = orders.map((o) => o.id);
  await sendOrderConfirmationEmail(orders[0].customer.email, orderIds).catch(() => {});
  return { orderIds };
}

export async function releaseCheckoutGroupStock(checkoutGroupId: string): Promise<void> {
  const intent = await prisma.checkoutIntent.findUnique({
    where: { id: checkoutGroupId },
  });

  if (intent?.status === "open") {
    const items = parseIntentItems(intent.itemsJson);
    await prisma.$transaction(async (tx) => {
      for (const item of items) {
        const updated = await tx.inventory.updateMany({
          where: { variantName: item.variant },
          data: { stockCount: { increment: item.quantity } },
        });
        // Skip unknown / missing variants (no inventory row)
        void updated;
      }
      await tx.checkoutIntent.update({
        where: { id: intent.id },
        data: { status: "cancelled" },
      });
    });
  }

  // Back-compat: release stock held by legacy pending Order rows
  const orders = await prisma.order.findMany({
    where: { checkoutGroupId, paymentStatus: "pending" },
  });
  if (orders.length === 0) return;

  await prisma.$transaction(async (tx) => {
    for (const order of orders) {
      await tx.inventory.updateMany({
        where: { variantName: order.variant },
        data: { stockCount: { increment: order.quantity } },
      });
    }
    await tx.order.updateMany({
      where: { checkoutGroupId, paymentStatus: "pending" },
      data: { paymentStatus: "failed" },
    });
  });
}
