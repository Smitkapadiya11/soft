"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Confirmation.module.css";
import { BrandMark, SuccessIllustration } from "@/components/illustrations";
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
  "Save your order number — you’ll need it for support enquiries",
  "We process prepaid orders within 1–3 business days",
  "Questions? Contact us — we respond within 48 hours",
];

function OrderIdButton({ orderId }: { orderId: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(orderId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard may be unavailable */
    }
  }, [orderId]);

  return (
    <span className={styles.rowValue}>
      <button
        type="button"
        className={styles.orderId}
        onClick={copy}
        title="Copy order number"
        aria-label={`Order number ${orderId}. Click to copy.`}
      >
        {orderId}
      </button>
      {copied ? <span className={styles.copied}>Copied</span> : null}
    </span>
  );
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const reduceMotion = useReducedMotion();
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
      <div className={styles.card} aria-busy="true">
        <div className={styles.brand}>
          <BrandMark className={styles.brandMark} variant="gate" />
        </div>
        <p className={styles.loading} aria-live="polite">
          <Loader2 size={20} className={styles.spinner} aria-hidden />
          Verifying your order…
        </p>
      </div>
    );
  }

  if (invalid || !order?.valid) {
    return (
      <div className={styles.card}>
        <div className={styles.brand}>
          <BrandMark className={styles.brandMark} variant="gate" />
        </div>
        <div className={styles.invalidIcon} aria-hidden>
          ?
        </div>
        <h1 className={styles.title}>Order not found</h1>
        <p className={styles.subtitle}>
          We couldn&apos;t verify this order. If you completed payment, contact{" "}
          <a href="mailto:support@silkroom.co">support@silkroom.co</a> with your
          payment ID.
        </p>
        <div className={styles.ctaGroup}>
          <Link href="/product" className={styles.ctaPrimary}>
            Return to Shop
          </Link>
          <Link href="/contact" className={styles.ctaSecondary}>
            Contact Us
          </Link>
        </div>
      </div>
    );
  }

  const enter = reduceMotion
    ? { initial: false, animate: undefined }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <motion.div className={styles.card} {...enter}>
      <div className={styles.brand}>
        <BrandMark className={styles.brandMark} variant="gate" />
      </div>

      <motion.div
        className={styles.successWrap}
        initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 220, damping: 18 }
        }
      >
        <span className={styles.successGlow} aria-hidden />
        <SuccessIllustration className={styles.successIcon} ariaHidden={false} />
      </motion.div>

      <h1 className={styles.title}>You&rsquo;re all set</h1>
      <p className={styles.subtitle}>
        Payment received
        <span className={styles.dot} aria-hidden>
          ·
        </span>
        discreet delivery on the way
      </p>

      <motion.div
        variants={reduceMotion ? undefined : staggerContainer}
        initial={reduceMotion ? false : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
        className={styles.details}
      >
        <motion.div variants={reduceMotion ? undefined : staggerItem} className={styles.row}>
          <span className={styles.rowLabel}>Order</span>
          <OrderIdButton orderId={order.orderId ?? ""} />
        </motion.div>
        <motion.div variants={reduceMotion ? undefined : staggerItem} className={styles.row}>
          <span className={styles.rowLabel}>Amount</span>
          <Price amount={order.amount ?? 0} as="strong" className={`${styles.rowValue} ${styles.amount}`} />
        </motion.div>
        <motion.div variants={reduceMotion ? undefined : staggerItem} className={styles.row}>
          <span className={styles.rowLabel}>Item</span>
          <strong className={styles.rowValue}>
            {PRODUCT_NAME} · {variantLabel(order.variant ?? "")} × {order.quantity}
          </strong>
        </motion.div>
        <motion.div variants={reduceMotion ? undefined : staggerItem} className={styles.row}>
          <span className={styles.rowLabel}>Delivery</span>
          <strong className={styles.rowValue}>{DELIVERY_ESTIMATE}</strong>
        </motion.div>
      </motion.div>

      <div className={styles.whatsNext}>
        <h2 className={styles.whatsNextTitle}>What&rsquo;s next</h2>
        <ol className={styles.stepsList}>
          {nextSteps.map((step, i) => (
            <li key={i} className={styles.step}>
              <span className={styles.stepNumber}>{i + 1}</span>
              <span className={styles.stepText}>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.note}>
        <p>
          Your order ships in plain, unbranded packaging — no product names on the
          outside.
        </p>
        <p>
          Need help? See{" "}
          <Link href="/contact">Contact Us</Link> or our{" "}
          <Link href="/cancellation-and-refunds">Return &amp; Refund Policy</Link>.
        </p>
      </div>

      <div className={styles.ctaGroup}>
        <Link href="/product" className={styles.ctaPrimary}>
          Continue shopping
        </Link>
        <Link href="/contact" className={styles.ctaSecondary}>
          Contact
        </Link>
      </div>
    </motion.div>
  );
}

export default function ConfirmationPage() {
  return (
    <div className={styles.container}>
      <Suspense
        fallback={
          <div className={styles.card}>
            <div className={styles.brand}>
              <BrandMark className={styles.brandMark} variant="gate" />
            </div>
            <p className={styles.loading}>
              <Loader2 size={20} className={styles.spinner} aria-hidden />
              Loading…
            </p>
          </div>
        }
      >
        <ConfirmationContent />
      </Suspense>
    </div>
  );
}
