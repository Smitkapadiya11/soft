import Link from "next/link";
import Image from "next/image";
import styles from "./Home.module.css";
import { Package, Lock, ShieldCheck, RefreshCw, Truck, Heart, Star } from "lucide-react";
import { PRODUCT_PRICE, PRODUCT_NAME, PRODUCT_PACK_SIZE } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/product-1.png"
            alt={`${PRODUCT_NAME} condoms by Silk Room — premium sexual wellness`}
            fill
            style={{ objectFit: "cover" }}
            className={styles.heroImage}
            priority
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>Premium Condoms · Discreet Delivery · 18+</span>
          <h1 className={styles.title}>Silk Room</h1>
          <p className={styles.tagline}>
            Thoughtfully made condoms for comfort and confidence — for him and for her.
            Sealed packs, plain packaging, free delivery across India.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/product" className={styles.ctaBtn}>
              Shop {PRODUCT_NAME} — ₹{PRODUCT_PRICE}
            </Link>
            <span className={styles.heroNote}>
              <Truck size={16} aria-hidden /> Free delivery · Prepaid secure checkout
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
            <strong>100%</strong>
            <span>Discreet packaging</span>
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
              alt={`${PRODUCT_NAME} Ultra Thin and Dotted condom packs`}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className={styles.featuredContent}>
            <span className={styles.featuredLabel}>Bestseller · {PRODUCT_PACK_SIZE}</span>
            <h2>{PRODUCT_NAME}</h2>
            <div className={styles.featuredRating}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#4a2c3a" color="#4a2c3a" aria-hidden />
              ))}
              <span>128 verified reviews</span>
            </div>
            <p className={styles.featuredDesc}>
              Natural latex condoms designed for everyday intimacy — choose Ultra Thin for a
              barely-there feel, or Dotted for added texture. Dermatologically considered,
              individually sealed, and shipped in plain outer packaging.
            </p>
            <ul className={styles.featuredList}>
              <li>Natural latex · individually sealed</li>
              <li>Two types: Ultra Thin &amp; Dotted</li>
              <li>{PRODUCT_PACK_SIZE} · ₹{PRODUCT_PRICE}</li>
              <li>Benefits for men &amp; women: comfort, confidence, protection</li>
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
            <h3>100% Discreet Packaging</h3>
            <p>Plain outer box. No product names on the label.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><Truck size={28} /></div>
            <h3>Free Delivery Nationwide</h3>
            <p>Every serviceable pincode in India. No hidden fees.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><Lock size={28} /></div>
            <h3>Secure Prepaid Checkout</h3>
            <p>Razorpay · UPI, cards &amp; net banking. 18+ only.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><ShieldCheck size={28} /></div>
            <h3>Sealed &amp; Genuine</h3>
            <p>Factory-sealed packs. Check expiry on delivery.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><RefreshCw size={28} /></div>
            <h3>Clear Return Policy</h3>
            <p>Unopened packs within 7 days · defects covered.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><Heart size={28} /></div>
            <h3>Made for Couples</h3>
            <p>Comfort-first options for women and men.</p>
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyContent}>
          <h2>Intimacy, without the awkwardness</h2>
          <p>
            Silk Room is an online retailer of condoms and sexual wellness essentials for adults
            in India. We focus on comfort, clarity, and discretion — from product details to
            plain packaging and prepaid checkout.
          </p>
          <p>
            Whether you prefer Ultra Thin or Dotted, every pack is sealed and shipped with care.
            No surprise fees. No confusing policies. Just premium protection delivered to your door.
          </p>
          <Link href="/product" className={styles.storyCta}>
            Explore {PRODUCT_NAME}
          </Link>
        </div>
      </section>

      <section className={styles.finalCta}>
        <h2>Ready when you are</h2>
        <p>₹{PRODUCT_PRICE} · Free delivery · Discreet packaging · Secure Razorpay checkout</p>
        <Link href="/product" className={styles.ctaBtnLight}>
          Shop Now
        </Link>
      </section>
    </>
  );
}
