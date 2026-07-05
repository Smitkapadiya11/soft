import { ShieldCheck, Lock, CheckCircle } from "lucide-react";
import styles from "./TrustBadges.module.css";
import Link from "next/link";

export default function TrustBadges() {
  return (
    <div className={styles.container}>
      <div className={styles.badge}>
        <Lock size={20} />
        <div className={styles.text}>
          <span className={styles.title}>Secure Checkout</span>
          <span className={styles.desc}>256-bit encrypted</span>
        </div>
      </div>
      <div className={styles.badge}>
        <ShieldCheck size={20} />
        <div className={styles.text}>
          <span className={styles.title}>Privacy Assured</span>
          <Link href="/privacy" className={styles.link}>Read Policy</Link>
        </div>
      </div>
      <div className={styles.badge}>
        <CheckCircle size={20} />
        <div className={styles.text}>
          <span className={styles.title}>Easy Replacement</span>
          <Link href="/replacement" className={styles.link}>Read Policy</Link>
        </div>
      </div>
    </div>
  );
}
