import { ShieldCheck, Lock, CheckCircle, Truck } from "lucide-react";
import styles from "./TrustBadges.module.css";
import Link from "next/link";

export default function TrustBadges() {
  return (
    <div className={styles.container}>
      <div className={styles.badge}>
        <Lock size={20} />
        <div className={styles.text}>
          <span className={styles.title}>Secure Checkout</span>
          <span className={styles.desc}>256-bit SSL via Razorpay</span>
        </div>
      </div>
      <div className={styles.badge}>
        <ShieldCheck size={20} />
        <div className={styles.text}>
          <span className={styles.title}>Privacy Protected</span>
          <Link href="/privacy" className={styles.link}>Read Policy</Link>
        </div>
      </div>
      <div className={styles.badge}>
        <Truck size={20} />
        <div className={styles.text}>
          <span className={styles.title}>Free Delivery</span>
          <span className={styles.desc}>All across India</span>
        </div>
      </div>
      <div className={styles.badge}>
        <CheckCircle size={20} />
        <div className={styles.text}>
          <span className={styles.title}>7-Day Returns</span>
          <Link href="/replacement" className={styles.link}>Return &amp; Refund</Link>
        </div>
      </div>
    </div>
  );
}
