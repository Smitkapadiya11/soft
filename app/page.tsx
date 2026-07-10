import Link from "next/link";
import Image from "next/image";
import styles from "./Home.module.css";
import { Package, Lock, ShieldCheck, RefreshCw, Truck, Sparkles, Star } from "lucide-react";
import { PRODUCT_PRICE, PRODUCT_NAME } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/product-1.png"
            alt={`${PRODUCT_NAME} by Silk Room`}
            fill
            style={{ objectFit: "cover" }}
            className={styles.heroImage}
            priority
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>Muscle Recovery &amp; Everyday Relaxation</span>
          <h1 className={styles.title}>Silk Room</h1>
          <p className={styles.tagline}>
            Premium cordless massage guns for sore muscles, post-workout recovery, and daily stress relief — delivered free across India.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/product" className={styles.ctaBtn}>
              Shop {PRODUCT_NAME} — ₹{PRODUCT_PRICE}
            </Link>
            <span className={styles.heroNote}>
              <Truck size={16} aria-hidden /> Free delivery · Secure prepaid checkout
            </span>
          </div>
        </div>
      </section>

      <section className={styles.statsBar}>
        <div className={styles.statsContainer}>
          <div className={styles.stat}>
            <strong>2,400+</strong>
            <span>Happy customers</span>
          </div>
          <div className={styles.stat}>
            <strong>4.9</strong>
            <span>Average rating</span>
          </div>
          <div className={styles.stat}>
            <strong>6</strong>
            <span>Speed levels</span>
          </div>
          <div className={styles.stat}>
            <strong>₹0</strong>
            <span>Delivery fee nationwide</span>
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.featuredGrid}>
          <div className={styles.featuredImage}>
            <Image
              src="/product-2.png"
              alt={PRODUCT_NAME}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className={styles.featuredContent}>
            <span className={styles.featuredLabel}>Bestseller</span>
            <h2>{PRODUCT_NAME}</h2>
            <div className={styles.featuredRating}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#4a2c3a" color="#4a2c3a" aria-hidden />
              ))}
              <span>128 verified reviews</span>
            </div>
            <p className={styles.featuredDesc}>
              A compact cordless percussion massager designed for targeted muscle relief.
              Six adjustable speeds, a quiet brushless motor, and up to 4 hours of runtime —
              built for home, gym bag, or desk-side recovery.
            </p>
            <ul className={styles.featuredList}>
              <li>Percussion massage for muscle recovery &amp; relaxation</li>
              <li>6 speed levels · quiet brushless motor</li>
              <li>USB-C rechargeable · ~4 hour runtime</li>
              <li>Available in Pearl &amp; Sage</li>
            </ul>
            <div className={styles.featuredPriceRow}>
              <span className={styles.featuredPrice}>₹{PRODUCT_PRICE}</span>
              <span className={styles.featuredDelivery}>
                <Truck size={18} aria-hidden /> Free delivery all India
              </span>
            </div>
            <Link href="/product" className={styles.ctaBtn}>
              View Product Details
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.trustStrip}>
        <div className={styles.trustContainer}>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><Package size={28} /></div>
            <h3>Plain Packaging</h3>
            <p>Secure outer box with no unnecessary branding on the label.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><Truck size={28} /></div>
            <h3>Free Delivery Nationwide</h3>
            <p>Every pincode in India. No hidden fees at checkout.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><Lock size={28} /></div>
            <h3>Secure Prepaid Checkout</h3>
            <p>256-bit SSL via Razorpay. Cards, UPI &amp; net banking.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><ShieldCheck size={28} /></div>
            <h3>Quality Materials</h3>
            <p>Durable housing, soft silicone heads, body-safe finishes.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><RefreshCw size={28} /></div>
            <h3>7-Day Returns</h3>
            <p>Clear return &amp; refund policy for unused products.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><Sparkles size={28} /></div>
            <h3>Everyday Wellness</h3>
            <p>Built for muscle relief, recovery, and daily relaxation.</p>
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyContent}>
          <h2>Recovery Without Compromise</h2>
          <p>
            Silk Room designs practical wellness tools for people who train, work long hours,
            or simply want better everyday comfort. Our Deep Relief Massager delivers focused
            percussion therapy to help ease muscle tension in the neck, shoulders, back, and legs.
          </p>
          <p>
            From encrypted prepaid checkout to free nationwide delivery, every step is built
            for clarity and trust. No surprise fees. No confusing policies. Just a quality
            massage device delivered to your door.
          </p>
          <Link href="/product" className={styles.storyCta}>
            Explore {PRODUCT_NAME}
          </Link>
        </div>
      </section>

      <section className={styles.finalCta}>
        <h2>Ready to feel the difference?</h2>
        <p>₹{PRODUCT_PRICE} · Free delivery · Secure checkout · 7-day returns</p>
        <Link href="/product" className={styles.ctaBtnLight}>
          Shop Now
        </Link>
      </section>
    </>
  );
}
