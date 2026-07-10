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
          <span className={styles.desc}>Razorpay · 256-bit SSL</span>
        </div>
      </div>
      <div className={styles.badge}>
        <ShieldCheck size={20} />
        <div className={styles.text}>
          <span className={styles.title}>Discreet &amp; Private</span>
          <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
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
          <span className={styles.title}>Returns</span>
          <Link href="/replacement" className={styles.link}>Return &amp; Refund</Link>
        </div>
      </div>
    </div>
  );
}
