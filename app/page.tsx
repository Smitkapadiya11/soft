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
import HomeHeroShowcase from "@/components/HomeHeroShowcase";
import HomeShowcase from "@/components/HomeShowcase";
import CatalogCardSlideshow from "@/components/CatalogCardSlideshow";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CATALOG_PRODUCTS } from "@/lib/products";
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
    text: "No guessing what’s inside. Soft Rose or Mist Grey — clear photos, real specs, honest sale price.",
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

export default function Home() {
  return (
    <>
      <section className={styles.ugcPanel} aria-label="Silk Room Ease — shop now">
        <div className={styles.ugcPanelInner}>
          <div className={styles.ugcCopy}>
            <p className={styles.eyebrow}>India’s care-first wellness brand</p>
            <p className={styles.brand}>Silk Room</p>
            <h1 className={styles.ugcHeadline}>
              Three products. One discreet Silk Room standard.
            </h1>
            <p className={styles.ugcSub}>
              Ease for dual-density comfort, Lick for quiet waterproof massage, and Trio for
              men’s personal care. See every product clearly before it ships free in a plain
              box.
            </p>
            <div className={styles.heroTrustLine}>
              <span>Products from ₹549</span>
              <span>Three real galleries</span>
              <span>6-month warranty</span>
            </div>
            <div className={styles.ugcPanelFoot}>
              <Link href="/#shop-all-products" className={styles.buyNow}>
                Shop all products
              </Link>
              <p className={styles.ugcNote}>
                Adults 18+ · <Link href="/about">About Silk Room</Link> ·{" "}
                <Link href="/contact">Contact</Link>
              </p>
            </div>
          </div>

          <HomeHeroShowcase slides={HOME_START_SLIDES} />
        </div>
      </section>

      <section className={styles.catalog} aria-labelledby="shop-all-products">
        <div className={styles.catalogHead}>
          <p className={styles.eyebrow}>Three products · one Silk Room standard</p>
          <h2 id="shop-all-products">Choose the experience made for you.</h2>
          <p>
            Every product is shown clearly, priced honestly, and delivered free in plain
            packaging across India.
          </p>
        </div>
        <div className={styles.catalogGrid}>
          {CATALOG_PRODUCTS.map((product) => {
            const href = product.slug === "ease" ? "/product" : `/product/${product.slug}`;
            return (
              <article className={styles.catalogCard} key={product.id}>
                <Link href={href} className={styles.catalogImageLink}>
                  <CatalogCardSlideshow
                    slides={[
                      {
                        src: product.cardImage,
                        alt: `${product.name} — delivered discreetly`,
                        fit: "cover",
                      },
                      {
                        src: product.gallery[0],
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
                      Buy · {product.discountPercent}% off
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.story} aria-label="Why Silk Room Ease">
        <div className={styles.storyHead}>
          <p className={styles.eyebrow}>What’s inside the plain box</p>
          <h2>Product truth. Not packaging theatre.</h2>
          <p>
            Visitors land here to decide. We put {PRODUCT_NAME} centre-stage — materials, feel,
            waterproofing, and craft — so trust starts before checkout.
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
            <h2>Why customers choose {PRODUCT_NAME}</h2>
            <div className={styles.proofGrid}>
              <div>
                <h3>Product before packaging</h3>
                <p>
                  Colours ({VARIANT_LABELS.Natural} / {VARIANT_LABELS.Espresso}), specs, and sale
                  price are visible before you pay — so the decision feels informed.
                </p>
              </div>
              <div>
                <h3>Premium where it matters</h3>
                <p>
                  Body-safe silicone, dual-density feel, waterproof body, stable base — crafted for
                  private relief without compromise.
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
              <Link href="/product" className={styles.buyNow}>
                Buy now
                <span className={styles.priceChip}>
                  <Price amount={PRODUCT_PRICE} sale />
                </span>
              </Link>
              <WhatsAppButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
