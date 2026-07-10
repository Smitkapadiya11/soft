"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./Confirmation.module.css";
import { CheckCircle2 } from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-000000";

  return (
    <div className={styles.card}>
      <CheckCircle2 size={64} className={styles.icon} />
      <h1 className={styles.title}>Order Confirmed</h1>
      <p className={styles.subtitle}>Thank you for your purchase.</p>
      
      <div className={styles.details}>
        <div className={styles.row}>
          <span>Order Number:</span>
          <strong>{orderId}</strong>
        </div>
        <div className={styles.row}>
          <span>Estimated Delivery:</span>
          <strong>2-4 Business Days</strong>
        </div>
      </div>

      <div className={styles.note}>
        <p>Check your email for updates referencing your order number only.</p>
        <p>Your pack ships in plain, discreet packaging. Questions? See Contact Us or our Return &amp; Refund Policy.</p>
      </div>

      <Link href="/" className={styles.btn}>
        Return Home
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
