import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";
import {
  PRODUCT_PRICE,
  PRODUCT_NAME,
  HOME_HERO_IMAGE,
  HOME_FEATURE_IMAGE,
} from "@/lib/constants";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/MotionWrapper";
import {
  Package,
  ShieldCheck,
  RotateCcw,
  Lock,
  Leaf,
  Volume2,
  Droplets,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Body-Safe Materials",
    text: "100% body-safe dual-density silicone",
  },
  {
    icon: Volume2,
    title: "Discreet by Design",
    text: "Plain packaging, private delivery",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Quality",
    text: "Secure prepaid checkout",
  },
  {
    icon: Droplets,
    title: "Easy to Clean",
    text: "Fully waterproof & shower-ready",
  },
];

const trustBar = [
  { icon: Package, label: "Discreet packaging" },
  { icon: RotateCcw, label: "Easy returns" },
  { icon: Lock, label: "Private & secure checkout" },
  { icon: Heart, label: "Made for women" },
];

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <span className={styles.trustBadge}>
            <Heart size={14} aria-hidden />
            Trusted by 10,000+ women
          </span>

          <p className={styles.brand}>Silk Room</p>
          <h1 className={styles.headline}>
            Your pleasure. Your way. <span aria-hidden>♡</span>
          </h1>
          <p className={styles.sub}>
            Explore intimacy, embrace yourself and feel the difference.
          </p>

          <ul className={styles.featureRow}>
            {features.map(({ icon: Icon, title, text }) => (
              <li key={title} className={styles.featureItem}>
                <span className={styles.featureIcon}>
                  <Icon size={18} aria-hidden />
                </span>
                <div>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.selfLove}>
            <p className={styles.selfLoveTitle}>Not just a product, it&apos;s self-love.</p>
            <p className={styles.selfLoveText}>
              Rediscover your body. Reclaim your pleasure.
            </p>
          </div>

          <div className={styles.ctaBlock}>
            <Link href="/product" className={styles.cta}>
              Shop {PRODUCT_NAME}
              <span className={styles.priceChip}>₹{PRODUCT_PRICE}</span>
            </Link>
            <p className={styles.fine}>18+ · Free discreet delivery · Prepaid secure</p>
          </div>
        </div>

        <div className={styles.heroRight}>
          <Image
            src={HOME_HERO_IMAGE}
            alt="Silk Room — premium self-care"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 55vw"
            className={styles.heroImg}
          />
        </div>
      </section>

      <section className={styles.trustStrip} aria-label="Shopping guarantees">
        <div className={styles.trustInner}>
          {trustBar.map(({ icon: Icon, label }) => (
            <div key={label} className={styles.trustItem}>
              <Icon size={18} aria-hidden />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.featuredInner}>
          <Reveal className={styles.featuredMedia}>
            <Image
              src={HOME_FEATURE_IMAGE}
              alt="Discreet packaging"
              width={800}
              height={800}
              className={styles.featuredImg}
            />
          </Reveal>
          <div className={styles.featuredCopy}>
            <span className={styles.eyebrow}>Bestseller · ₹{PRODUCT_PRICE}</span>
            <h2>{PRODUCT_NAME}</h2>
            <p>
              Dual-density body-safe silicone with a soft outer feel, supportive core, and
              waterproof design. Choose Natural or Espresso.
            </p>
            <Link href="/product" className={styles.ctaSecondary}>
              View product details
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.stories}>
        <div className={styles.sectionHead}>
          <h2>Real women. Real stories.</h2>
          <p>Thousands choosing pleasure &amp; self-care — delivered privately.</p>
        </div>
        <StaggerGroup className={styles.storyGrid}>
          {[
            {
              quote: "Finally something that understands women's bodies.",
              name: "Neha",
              city: "Mumbai",
            },
            {
              quote: "Super soft, premium feel — and packaging was completely plain.",
              name: "Riya",
              city: "Pune",
            },
            {
              quote: "My self-care routine just got so much better.",
              name: "Anjali",
              city: "Delhi",
            },
          ].map((s) => (
            <StaggerItem key={s.name} className={styles.storyCard}>
              <span className={styles.stars} aria-hidden>
                ★★★★★
              </span>
              <p>&ldquo;{s.quote}&rdquo;</p>
              <span className={styles.author}>
                {s.name}, {s.city}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className={styles.final}>
        <h2>Ready when you are</h2>
        <p>
          <span className={styles.priceInline}>₹{PRODUCT_PRICE}</span> · Discreet box · Razorpay
          prepaid · Adults 18+
        </p>
        <Link href="/product" className={styles.cta}>
          Shop now
        </Link>
      </section>
    </>
  );
}
