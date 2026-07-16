import React from "react";
import { ShieldCheck, Lock, CheckCircle, Truck, MessageCircle } from "lucide-react";
import styles from "./TrustBadges.module.css";
import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

function TrustBadges() {
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
          <Link href="/privacy" className={styles.link}>
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className={styles.badge}>
        <Truck size={20} />
        <div className={styles.text}>
          <span className={styles.title}>Free Delivery</span>
          <span className={styles.desc}>Plain box · India-wide</span>
        </div>
      </div>
      <div className={styles.badge}>
        <CheckCircle size={20} />
        <div className={styles.text}>
          <span className={styles.title}>Returns</span>
          <Link href="/cancellation-and-refunds" className={styles.link}>
            Return &amp; Refund Policy
          </Link>
        </div>
      </div>
      <div className={styles.badge}>
        <MessageCircle size={20} />
        <div className={styles.text}>
          <span className={styles.title}>WhatsApp Support</span>
          <a
            href={`https://wa.me/${BUSINESS.whatsapp}`}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {BUSINESS.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

export default React.memo(TrustBadges);
