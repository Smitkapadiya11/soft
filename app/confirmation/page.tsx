"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./Confirmation.module.css";
import { CheckCircle2 } from "lucide-react";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-000000";

  return (
    <div className={styles.container}>
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
          <p>Check your email for order updates.</p>
          <p>Your privacy is important to us. Emails will simply say "Your order #{orderId} has shipped" with no mention of the product details.</p>
        </div>

        <Link href="/" className={styles.btn}>
          Return Home
        </Link>
      </div>
    </div>
  );
}
