import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";
import {
  PRODUCT_PRICE,
  PRODUCT_NAME,
  PRODUCT_TAGLINE,
  HOME_HERO_IMAGE,
  HOME_FEATURE_IMAGE,
  PRODUCT_GALLERY,
} from "@/lib/constants";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/MotionWrapper";
import {
  Heart,
  Leaf,
  Volume2,
  Droplets,
  Package,
  ShieldCheck,
  RotateCcw,
  Lock,
  Sparkles,
  Smile,
  Activity,
} from "lucide-react";

const features = [
  { icon: Heart, title: "Made for real pleasure", text: "Anatomical curves, lifelike texture, dual-density feel." },
  { icon: Leaf, title: "Body-safe silicone", text: "100% liquid silicone — non-porous and easy to clean." },
  { icon: Volume2, title: "Discreet by design", text: "Plain packaging. No product names on the box." },
  { icon: Droplets, title: "Fully waterproof", text: "Shower-ready. Wash with warm water and mild soap." },
];

const trustBar = [
  { icon: Package, label: "Discreet packaging" },
  { icon: ShieldCheck, label: "Body-safe & hygienic" },
  { icon: RotateCcw, label: "Easy returns" },
  { icon: Lock, label: "Private checkout" },
];

const testimonials = [
  { quote: "Finally something that feels premium and ships completely discreet.", name: "Neha", city: "Mumbai" },
  { quote: "Soft outer skin, solid core — dual density is real. Espresso looks stunning.", name: "Riya", city: "Pune" },
  { quote: "Suction cup is strong. Cleanup is easy. Will order again.", name: "Anjali", city: "Delhi" },
];

const benefits = [
  { icon: Sparkles, label: "Enhances intimacy with yourself" },
  { icon: Activity, label: "Relieves stress & tension" },
  { icon: Smile, label: "Boosts confidence & self-love" },
  { icon: Heart, label: "Safe, secure & adult-focused" },
];

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src={HOME_HERO_IMAGE}
            alt="Silk Room — intimate self-care for adults"
            fill
            priority
            sizes="100vw"
            className={styles.heroImg}
          />
          <div className={styles.heroScrim} />
        </div>
        <div className={styles.heroInner}>
          <span className={styles.trustPill}>Trusted by thousands of adults across India</span>
          <p className={styles.brandMark}>Silk Room</p>
          <h1 className={styles.heroTitle}>Your pleasure. Your way.</h1>
          <p className={styles.heroSub}>
            Explore intimacy, embrace yourself, and feel the difference — with dual-density
            liquid silicone designed for lifelike comfort.
          </p>
          <ul className={styles.heroFeatures}>
            {features.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon size={18} aria-hidden />
                <div>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.heroCtas}>
            <Link href="/product" className={styles.ctaPrimary}>
              Shop {PRODUCT_NAME} — ₹{PRODUCT_PRICE}
            </Link>
            <p className={styles.heroNote}>18+ · Free discreet delivery · Prepaid secure checkout</p>
          </div>
          <aside className={styles.selfLoveCard}>
            Not just a product — it&apos;s self-love. Rediscover your body on your terms.
          </aside>
        </div>
      </section>

      <section className={styles.policyBar} aria-label="Shopping guarantees">
        <StaggerGroup className={styles.policyInner}>
          {trustBar.map(({ icon: Icon, label }) => (
            <StaggerItem key={label} className={styles.policyItem}>
              <Icon size={22} aria-hidden />
              <span>{label}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className={styles.featured}>
        <div className={styles.featuredGrid}>
          <Reveal className={styles.featuredVisual}>
            <Image
              src={HOME_FEATURE_IMAGE}
              alt={`${PRODUCT_NAME} product cover`}
              width={720}
              height={900}
              className={styles.featuredImg}
              priority
            />
          </Reveal>
          <div className={styles.featuredCopy}>
            <span className={styles.eyebrow}>{PRODUCT_TAGLINE}</span>
            <h2>{PRODUCT_NAME}</h2>
            <p>
              Rigid core for structure. Velvety-soft outer skin that warms to your body.
              Strong suction cup for hands-free play. Fully waterproof for shower sessions.
            </p>
            <ul>
              <li>Total length {`8.3"`} · insertable {`6.3"`}</li>
              <li>Two finishes: Natural &amp; Espresso</li>
              <li>Body-safe liquid silicone · non-porous</li>
              <li>₹{PRODUCT_PRICE} · free discreet delivery India-wide</li>
            </ul>
            <div className={styles.colorRow}>
              <Link href="/product" className={styles.swatchLink} aria-label="Shop Natural">
                <Image src={PRODUCT_GALLERY.Natural[1]} alt="" width={72} height={72} />
                <span>Natural</span>
              </Link>
              <Link href="/product" className={styles.swatchLink} aria-label="Shop Espresso">
                <Image src={PRODUCT_GALLERY.Espresso[1]} alt="" width={72} height={72} />
                <span>Espresso</span>
              </Link>
            </div>
            <Link href="/product" className={styles.ctaPrimary}>
              View product details
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.stories}>
        <div className={styles.sectionHead}>
          <h2>Real people. Real stories.</h2>
          <p>Adults choosing pleasure and self-care — delivered privately.</p>
        </div>
        <StaggerGroup className={styles.storyGrid}>
          {testimonials.map((t) => (
            <StaggerItem key={t.name} className={styles.storyCard}>
              <span className={styles.stars} aria-hidden>
                ★★★★★
              </span>
              <p>&ldquo;{t.quote}&rdquo;</p>
              <span className={styles.storyAuthor}>
                {t.name}, {t.city}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className={styles.benefitBar} aria-label="Benefits">
        <div className={styles.benefitInner}>
          {benefits.map(({ icon: Icon, label }) => (
            <div key={label} className={styles.benefitItem}>
              <Icon size={22} aria-hidden />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.finalCta}>
        <Reveal className={styles.finalInner}>
          <h2>Ready when you are</h2>
          <p>₹{PRODUCT_PRICE} · Discreet packaging · Razorpay prepaid checkout · 18+</p>
          <Link href="/product" className={styles.ctaLight}>
            Shop now
          </Link>
        </Reveal>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Silk Room",
            url: "https://silkroom.shop",
            description:
              "Adult intimate wellness products with discreet delivery across India. 18+ only.",
          }),
        }}
      />
    </>
  );
}
