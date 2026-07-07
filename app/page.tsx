import Link from "next/link";
import Image from "next/image";
import styles from "./Home.module.css";
import { Package, Lock, ShieldCheck, RefreshCw, Truck, Sparkles, Star } from "lucide-react";
import { PRODUCT_PRICE } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <Image
            src="/product-1.png"
            alt="The Signature Curve by Silk Room"
            fill
            style={{ objectFit: "cover" }}
            className={styles.heroImage}
            priority
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>India&apos;s Trusted Intimate Wellness Brand</span>
          <h1 className={styles.title}>Silk Room</h1>
          <p className={styles.tagline}>
            Premium body-safe wellness, delivered discreetly to your door — free across India.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/product" className={styles.ctaBtn}>
              Shop The Signature Curve — ₹{PRODUCT_PRICE}
            </Link>
            <span className={styles.heroNote}>
              <Truck size={16} aria-hidden /> Free delivery · Discreet packaging
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
            <span>Discreet shipping</span>
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
              alt="The Signature Curve product"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className={styles.featuredContent}>
            <span className={styles.featuredLabel}>Bestseller</span>
            <h2>The Signature Curve</h2>
            <div className={styles.featuredRating}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#4a2c3a" color="#4a2c3a" aria-hidden />
              ))}
              <span>128 verified reviews</span>
            </div>
            <p className={styles.featuredDesc}>
              Sculpted from platinum-cured, medical-grade silicone with 10 rumbling vibration
              modes. Whisper-quiet, fully waterproof, and designed for lasting comfort.
            </p>
            <ul className={styles.featuredList}>
              <li>ISO 10993 biocompatibility tested</li>
              <li>Phthalate-free &amp; non-porous</li>
              <li>Magnetic USB charging · 90 min runtime</li>
              <li>Available in Blush &amp; Plum</li>
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
            <p>Plain outer box. Zero product branding on the label.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><Truck size={28} /></div>
            <h3>Free Delivery Nationwide</h3>
            <p>Every pincode in India. No hidden fees at checkout.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><Lock size={28} /></div>
            <h3>End-to-End Encrypted Orders</h3>
            <p>256-bit SSL checkout. Your data stays private.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><ShieldCheck size={28} /></div>
            <h3>Medical-Grade Materials</h3>
            <p>Platinum-cured silicone. Body-safe certified.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><RefreshCw size={28} /></div>
            <h3>7-Day Replacement</h3>
            <p>Damaged or defective? We replace it hassle-free.</p>
          </div>
          <div className={styles.trustItem}>
            <div className={styles.trustIcon}><Sparkles size={28} /></div>
            <h3>Premium Experience</h3>
            <p>Luxury feel from unboxing to everyday use.</p>
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyContent}>
          <h2>Wellness Without Compromise</h2>
          <p>
            Silk Room was founded on a simple belief: intimate wellness should feel elegant,
            accessible, and entirely stigma-free. We source only platinum-cured, medical-grade
            silicone — the same purity standard trusted in healthcare — and pair it with
            thoughtful design that belongs on your nightstand.
          </p>
          <p>
            From our encrypted checkout to our unbranded, discreet packaging, every touchpoint
            is built around your privacy. No awkward moments. No surprise fees. Just premium
            quality, delivered safely to your door.
          </p>
          <Link href="/product" className={styles.storyCta}>
            Explore The Signature Curve
          </Link>
        </div>
      </section>

      <section className={styles.finalCta}>
        <h2>Ready to experience Silk Room?</h2>
        <p>₹{PRODUCT_PRICE} · Free delivery · Discreet packaging · Secure checkout</p>
        <Link href="/product" className={styles.ctaBtnLight}>
          Shop Now
        </Link>
      </section>
    </>
  );
}
