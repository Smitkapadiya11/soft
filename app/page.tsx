import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";
import {
  PRODUCT_PRICE,
  PRODUCT_NAME,
  PRODUCT_TAGLINE,
  HOME_HERO_IMAGE,
  HOME_FEATURE_IMAGE,
} from "@/lib/constants";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/MotionWrapper";
import {
  Package,
  ShieldCheck,
  RotateCcw,
  Lock,
  Sparkles,
  Droplets,
  Leaf,
  Heart,
} from "lucide-react";

const trustBar = [
  { icon: Package, label: "Discreet packaging" },
  { icon: ShieldCheck, label: "Body-safe materials" },
  { icon: Lock, label: "Private checkout" },
  { icon: RotateCcw, label: "Easy returns" },
];

const pillars = [
  {
    icon: Leaf,
    title: "Body-safe silicone",
    text: "Dual-density liquid silicone — soft to the touch, built to last.",
  },
  {
    icon: Droplets,
    title: "Easy to clean",
    text: "Waterproof design. Warm water, mild soap, done.",
  },
  {
    icon: Package,
    title: "Total privacy",
    text: "Plain outer box. No product names on the label.",
  },
  {
    icon: Heart,
    title: "Made for you",
    text: "Two calm finishes. One clear price. No awkward store runs.",
  },
];

const stories = [
  {
    quote: "Felt premium from the box to the product. Packaging was completely plain.",
    name: "Neha",
    city: "Mumbai",
  },
  {
    quote: "Soft feel, solid quality. Checkout was smooth and delivery was free.",
    name: "Riya",
    city: "Pune",
  },
  {
    quote: "I ordered for myself and felt respected — no spammy branding anywhere.",
    name: "Anjali",
    city: "Delhi",
  },
];

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.trustPill}>Trusted women&apos;s self-care brand</span>
          <p className={styles.brand}>Silk Room</p>
          <h1 className={styles.headline}>
            Your calm.
            <br />
            Your way.
          </h1>
          <p className={styles.sub}>
            Premium intimate self-care — body-safe dual-density silicone, discreet delivery,
            and a price that feels fair.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/product" className={styles.cta}>
              Shop {PRODUCT_NAME}
              <span className={styles.price}>₹{PRODUCT_PRICE}</span>
            </Link>
            <p className={styles.fine}>18+ · Free discreet delivery · Secure prepaid</p>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <Image
            src={HOME_HERO_IMAGE}
            alt="Silk Room — premium self-care"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.heroImg}
          />
          <div className={styles.heroFade} />
        </div>
      </section>

      <section className={styles.trustStrip} aria-label="Why shop with us">
        <StaggerGroup className={styles.trustInner}>
          {trustBar.map(({ icon: Icon, label }) => (
            <StaggerItem key={label} className={styles.trustItem}>
              <Icon size={18} aria-hidden />
              <span>{label}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className={styles.featured}>
        <div className={styles.featuredInner}>
          <Reveal className={styles.featuredMedia}>
            <Image
              src={HOME_FEATURE_IMAGE}
              alt="Discreet packaging and private delivery"
              width={900}
              height={900}
              className={styles.featuredImg}
            />
          </Reveal>
          <div className={styles.featuredCopy}>
            <span className={styles.eyebrow}>{PRODUCT_TAGLINE}</span>
            <h2>{PRODUCT_NAME}</h2>
            <p>
              Soft outer feel. Supportive core. Secure base. Fully waterproof. Choose Natural
              or Espresso — same craftsmanship, two finishes.
            </p>
            <ul className={styles.specList}>
              <li>Dual-density body-safe silicone</li>
              <li>Natural &amp; Espresso colourways</li>
              <li>
                All-in price <strong className={styles.priceInline}>₹{PRODUCT_PRICE}</strong>
              </li>
              <li>Free discreet delivery across India</li>
            </ul>
            <Link href="/product" className={styles.ctaSecondary}>
              View details
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.pillars}>
        <div className={styles.sectionHead}>
          <h2>Designed for trust</h2>
          <p>Clear materials. Private packaging. Checkout that feels safe.</p>
        </div>
        <StaggerGroup className={styles.pillarGrid}>
          {pillars.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title} className={styles.pillar}>
              <span className={styles.pillarIcon}>
                <Icon size={22} aria-hidden />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className={styles.stories}>
        <div className={styles.sectionHead}>
          <h2>Loved quietly</h2>
          <p>Real customers. Private deliveries. Honest reviews.</p>
        </div>
        <StaggerGroup className={styles.storyGrid}>
          {stories.map((s) => (
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
        <Sparkles size={22} aria-hidden className={styles.finalIcon} />
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
