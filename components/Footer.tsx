import Link from "next/link";
import styles from "./Footer.module.css";
import { ShieldCheck, Truck, Lock, RotateCcw } from "lucide-react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.trustStrip}>
        <div className={styles.trustItem}>
          <Truck size={24} />
          <span>100% Discreet Packaging</span>
        </div>
        <div className={styles.trustItem}>
          <Lock size={24} />
          <span>Secure Prepaid Checkout</span>
        </div>
        <div className={styles.trustItem}>
          <ShieldCheck size={24} />
          <span>Privacy Protected</span>
        </div>
        <div className={styles.trustItem}>
          <RotateCcw size={24} />
          <span>Easy Replacement</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.brandInfo}>
          <h3 className={styles.brandName}>Silk Room</h3>
          <p className={styles.tagline}>Premium intimate wellness, delivered discreetly.</p>
        </div>

        <div className={styles.links}>
          <h4>Legal</h4>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
          <Link href="/shipping">Shipping Policy</Link>
          <Link href="/replacement">Replacement Policy</Link>
          <Link href="/age-verification">Age Verification</Link>
        </div>

        <div className={styles.contact}>
          <h4>Contact Us</h4>
          <p>Email: support@silkroom.co</p>
          <p>WhatsApp: +91 98765 43210</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Silk Room. All rights reserved.</p>
      </div>
    </footer>
  );
}
