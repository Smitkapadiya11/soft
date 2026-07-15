import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";
import {
  PRODUCT_PRICE,
  PRODUCT_NAME,
  HOME_HERO_IMAGE,
  HOME_FEATURE_IMAGE,
  VARIANT_LABELS,
} from "@/lib/constants";
import Price from "@/components/Price";
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
    title: "Body-Safe Silicone",
    text: "Soft, skin-friendly materials",
  },
  {
    icon: Volume2,
    title: "Plain Box Packaging",
    text: "No product names on the label",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    text: "Prepaid & privacy-protected",
  },
  {
    icon: Droplets,
    title: "Easy to Clean",
    text: "Fully waterproof & rinse-ready",
  },
];

const trustBar = [
  { icon: Package, label: "Discreet packaging" },
  { icon: RotateCcw, label: "Easy returns" },
  { icon: Lock, label: "Private & secure checkout" },
  { icon: Heart, label: "Everyday body care" },
];

const packingChips = [
  "Plain outer carton",
  "No product name on label",
  "Prepaid checkout",
];

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBanner}>
          <div className={styles.heroBannerFrame}>
            <Image
              src={HOME_HERO_IMAGE}
              alt="Silk Room — care yourself everyday wellness banner"
              fill
              priority
              sizes="100vw"
              className={styles.heroImg}
            />
          </div>
        </div>

        <div className={styles.heroCopy}>
          <span className={styles.trustBadge}>
            <Heart size={14} aria-hidden />
            Personal wellness · discreet delivery
          </span>

          <p className={styles.brand}>Silk Room</p>
          <p className={styles.sub}>
            Body comfort for tension relief and recovery — delivered in a plain, discreet box.
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

          <div className={styles.ctaBlock}>
            <Link href="/product" className={styles.cta}>
              Shop {PRODUCT_NAME}
              <span className={styles.priceChip}>
                <Price amount={PRODUCT_PRICE} sale />
              </span>
            </Link>
            <p className={styles.fine}>18+ · Free discreet delivery · Prepaid secure</p>
          </div>
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
              alt="Plain brown cardboard shipping box — discreet packaging"
              width={800}
              height={800}
              className={styles.featuredImg}
            />
            <ul className={styles.packChips} aria-label="Packaging details">
              {packingChips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </Reveal>
          <div className={styles.featuredCopy}>
            <span className={styles.eyebrow}>
              Arrives discreetly · <Price amount={PRODUCT_PRICE} className={styles.priceInline} sale />
            </span>
            <h2>Ships in a plain box</h2>
            <p>
              Your {PRODUCT_NAME} arrives in an unmarked carton — no product name on the outside.
              Choose {VARIANT_LABELS.Natural} or {VARIANT_LABELS.Espresso}. Prepaid, private, and
              ready for everyday recovery.
            </p>
            <Link href="/product" className={styles.ctaSecondary}>
              Buy now
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.stories}>
        <div className={styles.sectionHead}>
          <h2>Real routines. Real relief.</h2>
          <p>Stress relief &amp; recovery — delivered privately.</p>
        </div>
        <StaggerGroup className={styles.storyGrid}>
          {[
            {
              quote: "Helps me unwind neck and shoulder tension after long work days.",
              name: "Neha",
              city: "Mumbai",
            },
            {
              quote: "Soft feel, easy to rinse — and packaging was completely plain.",
              name: "Riya",
              city: "Pune",
            },
            {
              quote: "Part of my evening recovery routine now. Discreet delivery was a relief.",
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
          <Price amount={PRODUCT_PRICE} className={styles.priceInline} sale /> · Discreet box · Razorpay
          prepaid · Adults 18+
        </p>
        <Link href="/product" className={styles.cta}>
          Shop Silk Room Ease
        </Link>
      </section>
    </>
  );
}
