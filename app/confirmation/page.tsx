"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Confirmation.module.css";
import { SuccessIllustration } from "@/components/illustrations";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { DELIVERY_ESTIMATE } from "@/lib/format";
import Price from "@/components/Price";
import { Loader2 } from "lucide-react";
import { PRODUCT_NAME, variantLabel } from "@/lib/constants";

type OrderLookup = {
  valid: boolean;
  orderId?: string;
  amount?: number;
  variant?: string;
  quantity?: number;
  shippingStatus?: string;
  date?: string;
};

const nextSteps = [
  "Save your order number for support enquiries",
  "We process orders within 1–3 business days after payment",
  "Questions? Visit Contact Us — we respond within 48 hours",
];

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<OrderLookup | null>(null);
  const [loading, setLoading] = useState(true);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setInvalid(true);
      setLoading(false);
      return;
    }

    fetch(`/api/orders/lookup?orderId=${encodeURIComponent(orderId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: OrderLookup | null) => {
        if (data?.valid) {
          setOrder(data);
        } else {
          setInvalid(true);
        }
      })
      .catch(() => setInvalid(true))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return (
      <p className={styles.loading} aria-live="polite">
        <Loader2 size={20} className={styles.spinner} aria-hidden /> Verifying your order…
      </p>
    );
  }

  if (invalid || !order?.valid) {
    return (
      <div className={styles.card}>
        <h1 className={styles.title}>Order Not Found</h1>
        <p className={styles.subtitle}>
          We couldn&apos;t verify this order. If you completed payment, contact{" "}
          <a href="mailto:support@silkroom.co">support@silkroom.co</a> with your payment ID.
        </p>
        <Link href="/product" className={styles.ctaBtn}>
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <SuccessIllustration className={styles.successIcon} />
      </motion.div>

      <h1 className={styles.title}>Order Confirmed</h1>
      <p className={styles.subtitle}>Thank you for your purchase.</p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className={styles.details}
      >
        <motion.div variants={staggerItem} className={styles.row}>
          <span>Order Number</span>
          <strong className="tabular-nums">{order.orderId}</strong>
        </motion.div>
        <motion.div variants={staggerItem} className={styles.row}>
          <span>Amount Paid</span>
          <Price amount={order.amount ?? 0} as="strong" />
        </motion.div>
        <motion.div variants={staggerItem} className={styles.row}>
          <span>Item</span>
          <strong>
            {PRODUCT_NAME} · {variantLabel(order.variant ?? "")} × {order.quantity}
          </strong>
        </motion.div>
        <motion.div variants={staggerItem} className={styles.row}>
          <span>Estimated Delivery</span>
          <strong>{DELIVERY_ESTIMATE}</strong>
        </motion.div>
      </motion.div>

      <div className={styles.note}>
        <p>Order confirmation will be sent to your email when email delivery is configured.</p>
        <p>
          Your order ships in plain, discreet packaging. Questions? See{" "}
          <a href="/contact">Contact Us</a> or our{" "}
          <a href="/cancellation-and-refunds">Return &amp; Refund Policy</a>.
        </p>
      </div>

      <div className={styles.whatsNext}>
        <h2 className={styles.whatsNextTitle}>What&rsquo;s Next?</h2>
        <ol className={styles.stepsList}>
          {nextSteps.map((step, i) => (
            <li key={i} className={styles.step}>
              <span className={styles.stepNumber}>{i + 1}</span>
              <span className={styles.stepText}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <Link href="/product" className={styles.ctaBtn}>
        Continue Shopping
      </Link>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <div className={styles.container}>
      <Suspense
        fallback={
          <p className={styles.loading}>
            <Loader2 size={20} className={styles.spinner} aria-hidden /> Loading…
          </p>
        }
      >
        <ConfirmationContent />
      </Suspense>
    </div>
  );
}
