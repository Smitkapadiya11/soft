import Link from "next/link";
import Image from "next/image";
import styles from "./Home.module.css";
import { Package, Lock, ShieldCheck, RefreshCw } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image src="/product-1.jpg" alt="Silk Room Signature" fill style={{ objectFit: 'cover' }} className={styles.heroImage} priority />
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Silk Room</h1>
          <p className={styles.tagline}>Intimate wellness, elevated and discreet.</p>
          <Link href="/product" className={styles.ctaBtn}>
            Shop Now
          </Link>
        </div>
      </section>

      <section className={styles.trustStrip}>
        <div className={styles.trustContainer}>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><Package size={32} /></div>
            <h3>100% Discreet Packaging</h3>
            <p>Unmarked boxes, zero branding.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><Lock size={32} /></div>
            <h3>Secure Prepaid Checkout</h3>
            <p>Encrypted, safe, and reliable.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><ShieldCheck size={32} /></div>
            <h3>Privacy Protected</h3>
            <p>Your data is completely confidential.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><RefreshCw size={32} /></div>
            <h3>Easy Replacement</h3>
            <p>Hassle-free 7 day replacement.</p>
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyContent}>
          <h2>Designed for You</h2>
          <p>
            At Silk Room, we believe intimate wellness should be accessible, elegant, 
            and entirely stigma-free. We created our signature product with premium, 
            body-safe materials and a design that feels right at home on your nightstand.
          </p>
          <p>
            Your privacy is our utmost priority. From our completely secure checkout to 
            our strictly unbranded, discreet packaging, we ensure your personal moments 
            remain entirely personal. Experience the luxury of peace of mind.
          </p>
        </div>
      </section>
    </>
  );
}
