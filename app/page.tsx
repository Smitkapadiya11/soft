import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";
import {
  PRODUCT_PRICE,
  PRODUCT_NAME,
  PRODUCT_MRP,
  PRODUCT_DISCOUNT_PERCENT,
  PRODUCT_SPECS,
  HOME_START_SLIDES,
  HOME_STORY,
  HOME_EXTRA,
  HOME_SLIDESHOW,
  BUSINESS,
  VARIANT_LABELS,
} from "@/lib/constants";
import Price from "@/components/Price";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/MotionWrapper";
import HomeHeroSection from "@/components/HomeHeroSection";
import HomeShowcase from "@/components/HomeShowcase";
import CatalogCardSlideshow from "@/components/CatalogCardSlideshow";
import WhatsAppButton from "@/components/WhatsAppButton";
import { FEATURED_PRODUCTS, OTHER_PRODUCTS } from "@/lib/products";
import {
  Package,
  ShieldCheck,
  Lock,
  BadgeCheck,
  MessageCircle,
  Truck,
  Droplets,
  Sparkles,
} from "lucide-react";

const trustPillars = [
  {
    icon: Sparkles,
    title: "See the product first",
    text: "Every Silk Room listing shows the real product and a lifestyle frame — 4 seconds each — so you know exactly what arrives.",
  },
  {
    icon: Lock,
    title: "Razorpay prepaid only",
    text: "UPI, cards, net banking. Encrypted checkout. No COD confusion at the door.",
  },
  {
    icon: Package,
    title: "Plain-box delivery",
    text: "The product ships in an unmarked carton. Privacy outside. Premium experience inside.",
  },
  {
    icon: MessageCircle,
    title: "Human WhatsApp support",
    text: `${BUSINESS.hours}. Real replies from the Silk Room team — tap below to chat.`,
  },
];

function CatalogCard({
  product,
}: {
  product: (typeof FEATURED_PRODUCTS)[number] | (typeof OTHER_PRODUCTS)[number];
}) {
  const href = product.slug === "ease" ? "/product" : `/product/${product.slug}`;
  const ctaLabel =
    product.discountPercent > 0 ? `Buy · ${product.discountPercent}% off` : "Buy now";

  return (
    <article className={styles.catalogCard}>
      <Link href={href} className={styles.catalogImageLink}>
        <CatalogCardSlideshow
          slides={[
            {
              src: product.cardImage,
              alt: `${product.name} — lifestyle`,
              fit: "cover",
            },
            {
              src: product.cardProductImage,
              alt: `${product.name} — actual product`,
              fit: "contain",
            },
          ]}
          intervalMs={4000}
        />
      </Link>
      <div className={styles.catalogCardBody}>
        <p className={styles.catalogCategory}>{product.category}</p>
        <h3>
          <Link href={href}>{product.name}</Link>
        </h3>
        <p>{product.tagline}</p>
        <div className={styles.catalogCardFooter}>
          <Price amount={product.price} mrp={product.mrp} sale />
          <Link href={href} className={styles.catalogCta}>
            {ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <HomeHeroSection slides={HOME_START_SLIDES} intervalMs={4000} />

      <section className={styles.catalog} aria-labelledby="shop-all-products">
        <div className={styles.catalogHead}>
          <p className={styles.eyebrow}>Featured · Silk Room originals</p>
          <h2 id="shop-all-products">Choose the experience made for you.</h2>
          <p>
            Three hero products with clear galleries, honest sale prices, and free plain-box
            delivery across India.
          </p>
        </div>
        <div className={styles.catalogGrid}>
          {FEATURED_PRODUCTS.map((product) => (
            <CatalogCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className={styles.others} aria-labelledby="shop-others">
        <div className={styles.catalogHead}>
          <p className={styles.eyebrow}>Others · Chulli intimate care</p>
          <h2 id="shop-others">Flavoured Ultra-thin &amp; Dotted — 8 ways to choose.</h2>
          <p>
            Banana, Chocolate, and Strawberry in Ultra-thin (MRP ₹90) and Dotted (MRP ₹120). Plus
            Combo Double and the full Combo Mix 3 &amp; 6. Same 4-second product + model showcase.
          </p>
        </div>
        <div className={styles.othersGrid}>
          {OTHER_PRODUCTS.map((product) => (
            <CatalogCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className={styles.story} aria-label="Why Silk Room">
        <div className={styles.storyHead}>
          <p className={styles.eyebrow}>What’s inside the plain box</p>
          <h2>Product truth. Not packaging theatre.</h2>
          <p>
            Visitors land here to decide. We put every product centre-stage — materials, feel, and
            craft — so trust starts before checkout.
          </p>
        </div>
        <div className={styles.storyRail}>
          {HOME_STORY.map((frame, i) => (
            <article key={frame.title} className={styles.storyFrame}>
              <span className={styles.storyIndex}>0{i + 1}</span>
              <h3>{frame.title}</h3>
              <p>{frame.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.trust} aria-label="Why customers trust Silk Room">
        <div className={styles.trustIntro}>
          <p className={styles.eyebrow}>Why people buy with confidence</p>
          <h2>Clarity that feels premium.</h2>
          <p>
            Silk Room is built for customers who want the real product, honest policies, and a brand
            that answers — not a mystery parcel and fine print later.
          </p>
        </div>
        <StaggerGroup className={styles.trustGrid}>
          {trustPillars.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title} className={styles.trustItem}>
              <Icon size={22} aria-hidden />
              <h3>{title}</h3>
              <p>{text}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
        <div className={styles.trustActions}>
          <WhatsAppButton />
        </div>
      </section>

      <section className={styles.offer}>
        <Reveal className={styles.offerMedia}>
          <div className={styles.mediaFrame}>
            <Image
              src={HOME_EXTRA.offer}
              alt="Silk Room Ease — premium unmarked plain-box delivery"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.containImg}
            />
          </div>
        </Reveal>
        <div className={styles.offerCopy}>
          <p className={styles.eyebrow}>Limited sale · no coupon needed</p>
          <h2>
            {PRODUCT_NAME} —{" "}
            <Price amount={PRODUCT_PRICE} sale className={styles.priceInline} />
          </h2>
          <p>
            Soft Rose or Mist Grey. {PRODUCT_SPECS.material}. {PRODUCT_SPECS.waterproof}.
            Contact length {PRODUCT_SPECS.contactLength} · diameter {PRODUCT_SPECS.diameter}.
            Sale price <strong>₹{PRODUCT_PRICE}</strong> (MRP ₹{PRODUCT_MRP} ·{" "}
            {PRODUCT_DISCOUNT_PERCENT}% OFF).
          </p>
          <ul className={styles.offerList}>
            <li>
              <BadgeCheck size={16} aria-hidden /> Body-safe silicone · skin-friendly finish
            </li>
            <li>
              <Droplets size={16} aria-hidden /> Fully waterproof · easy to clean
            </li>
            <li>
              <Truck size={16} aria-hidden /> Free plain-box delivery · 3–7 business days
            </li>
            <li>
              <ShieldCheck size={16} aria-hidden /> 6-month manufacturing warranty
            </li>
          </ul>
          <Link href="/product" className={styles.buyNow}>
            View colours &amp; buy
            <span className={styles.priceChip}>
              <Price amount={PRODUCT_PRICE} sale />
            </span>
          </Link>
        </div>
      </section>

      <section className={styles.founder}>
        <div className={styles.founderMedia}>
          <div className={styles.mediaFrameDark}>
            <Image
              src={HOME_EXTRA.founder}
              alt="Plain unmarked Silk Room delivery carton — privacy first"
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
              className={styles.containImg}
            />
          </div>
        </div>
        <div className={styles.founderCopy}>
          <p className={styles.eyebrow}>Founder’s note</p>
          <h2>India’s care-first Silk Room.</h2>
          <p>{BUSINESS.mission}</p>
          <p>
            We show the product because trust starts with honesty. Policies, prepaid checkout, and
            WhatsApp support exist so your experience feels premium end to end — not only at unboxing.
          </p>
          <WhatsAppButton variant="light" />
          <p className={styles.founderSign}>
            — {BUSINESS.founder}
            <span>
              Founder, {BUSINESS.name} · {BUSINESS.legalName}
            </span>
          </p>
        </div>
      </section>

      <section className={styles.showcase} aria-label="Premium product experience">
        <div className={styles.showcaseGrid}>
          <HomeShowcase slides={HOME_SLIDESHOW} />
          <div className={styles.showcaseCopy}>
            <p className={styles.eyebrow}>Built for buyers who look closely</p>
            <h2>Why customers choose Silk Room</h2>
            <div className={styles.proofGrid}>
              <div>
                <h3>Product before packaging</h3>
                <p>
                  Colours ({VARIANT_LABELS.Natural} / {VARIANT_LABELS.Espresso}), flavours, specs,
                  and price are visible before you pay — so the decision feels informed.
                </p>
              </div>
              <div>
                <h3>Premium where it matters</h3>
                <p>
                  Body-safe craft, quiet waterproof care, textured men’s care, and certified Chulli
                  protection — private routines without compromise.
                </p>
              </div>
              <div>
                <h3>A brand that stands behind it</h3>
                <p>
                  {BUSINESS.legalName} · {BUSINESS.founder} ·{" "}
                  <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> · warranty &amp; WhatsApp
                  care.
                </p>
              </div>
            </div>
            <div className={styles.showcaseActions}>
              <Link href="/#shop-all-products" className={styles.buyNow}>
                Shop the collection
              </Link>
              <WhatsAppButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
