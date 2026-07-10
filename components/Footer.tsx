import Link from "next/link";
import styles from "./Footer.module.css";
import { ShieldCheck, Package, Lock, RotateCcw } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.trustStrip}>
        <div className={styles.trustItem}>
          <Package size={24} />
          <span>Discreet Packaging</span>
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
          <span>Easy Returns</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.brandInfo}>
          <h3 className={styles.brandName}>{BUSINESS.name}</h3>
          <p className={styles.tagline}>
            Premium condoms &amp; sexual wellness, delivered discreetly.
          </p>
        </div>

        <div className={styles.links}>
          <h4>Legal</h4>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
          <Link href="/replacement">Return &amp; Refund Policy</Link>
          <Link href="/shipping">Shipping Policy</Link>
          <Link href="/contact">Contact Us</Link>
        </div>

        <div className={styles.contact}>
          <h4>Contact Us</h4>
          <p>Email: {BUSINESS.email}</p>
          <p>WhatsApp: {BUSINESS.whatsapp}</p>
          <p>
            <Link href="/contact">Full contact &amp; grievance details</Link>
          </p>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>
          &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
