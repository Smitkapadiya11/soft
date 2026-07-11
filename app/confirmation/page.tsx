"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./Confirmation.module.css";
import { SuccessIllustration } from "@/components/illustrations";
import { staggerContainer, staggerItem } from "@/lib/motion";

const nextSteps = [
  "Check your email for order confirmation",
  "Track your delivery via the link we'll send",
  "Contact support if you have any questions",
];

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-000000";

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
          <span>Order Number:</span>
          <strong>{orderId}</strong>
        </motion.div>
        <motion.div variants={staggerItem} className={styles.row}>
          <span>Estimated Delivery:</span>
          <strong>2-4 Business Days</strong>
        </motion.div>
      </motion.div>

      <div className={styles.note}>
        <p>Check your email for updates referencing your order number only.</p>
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
      <Suspense fallback={<p>Loading confirmation...</p>}>
        <ConfirmationContent />
      </Suspense>
    </div>
  );
}
