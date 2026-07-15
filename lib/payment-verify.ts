import { createHmac, timingSafeEqual } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/email";

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

export async function markCheckoutGroupPaid(
  checkoutGroupId: string,
  razorpayOrderId: string,
  razorpayPaymentId: string
): Promise<{ orderIds: string[] } | { error: string; status: number }> {
  const orders = await prisma.order.findMany({
    where: { checkoutGroupId },
    include: { customer: true },
  });

  if (orders.length === 0) {
    return { error: "No orders found", status: 404 };
  }

  const alreadyPaid = orders.every((o) => o.paymentStatus === "paid");
  if (alreadyPaid) {
    return { orderIds: orders.map((o) => o.id) };
  }

  const pending = orders.filter((o) => o.paymentStatus === "pending");
  if (pending.length === 0) {
    return { error: "No pending orders to verify", status: 404 };
  }

  await prisma.$transaction(async (tx) => {
    await tx.order.updateMany({
      where: { checkoutGroupId, paymentStatus: "pending" },
      data: {
        paymentStatus: "paid",
        razorpayOrderId,
        razorpayPaymentId,
      },
    });
  });

  const orderIds = orders.map((o) => o.id);
  await sendOrderConfirmationEmail(orders[0].customer.email, orderIds).catch(() => {});

  return { orderIds };
}

export async function releaseCheckoutGroupStock(checkoutGroupId: string): Promise<void> {
  const orders = await prisma.order.findMany({
    where: { checkoutGroupId, paymentStatus: "pending" },
  });
  if (orders.length === 0) return;

  await prisma.$transaction(async (tx) => {
    for (const order of orders) {
      await tx.inventory.update({
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
