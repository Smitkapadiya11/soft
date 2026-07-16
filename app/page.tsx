import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";
import {
  PRODUCT_PRICE,
  PRODUCT_NAME,
  PRODUCT_MRP,
  PRODUCT_DISCOUNT_PERCENT,
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
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Package,
  ShieldCheck,
  RotateCcw,
  Lock,
  BadgeCheck,
  MessageCircle,
  Truck,
} from "lucide-react";

const trustPillars = [
  {
    icon: Package,
    title: "Plain-box delivery",
    text: "No product name on the outer carton. Neighbours see a normal parcel — nothing else.",
  },
  {
    icon: Lock,
    title: "Razorpay prepaid only",
    text: "UPI, cards, net banking. No cash-on-delivery confusion. Encrypted checkout.",
  },
  {
    icon: RotateCcw,
    title: "Clear return policy",
    text: "Manufacturing defects covered. Policies published before you pay — not after.",
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
      <section className={styles.ugcPanel} aria-label="Silk Room — shop now">
        <div className={styles.ugcPanelInner}>
          <div className={styles.ugcCopy}>
            <p className={styles.eyebrow}>Limited sale · trusted delivery</p>
            <p className={styles.brand}>Silk Room</p>
            <h1 className={styles.ugcHeadline}>
              Discreet relief, delivered beautifully.
            </h1>
            <p className={styles.ugcSub}>
              {PRODUCT_NAME} for tension, stress, and recovery days. Plain packaging,
              Razorpay prepaid checkout, and real support before you order.
            </p>
            <div className={styles.heroTrustLine}>
              <span>Free discreet delivery</span>
              <span>6-month warranty</span>
              <span>Adults 18+</span>
            </div>
            <div className={styles.ugcPanelFoot}>
              <Link href="/product" className={styles.buyNow}>
                Buy now
                <span className={styles.priceChip}>
                  <Price amount={PRODUCT_PRICE} sale />
                </span>
              </Link>
              <p className={styles.ugcNote}>
                <Link href="/about">About Silk Room</Link> · <Link href="/contact">Contact support</Link>
              </p>
            </div>
          </div>

          <HomeHeroShowcase slides={HOME_START_SLIDES} />
        </div>
      </section>

      <section className={styles.story} aria-label="The Silk Room story">
        <div className={styles.storyHead}>
          <p className={styles.eyebrow}>The Silk Room promise</p>
          <h2>Four moments. One standard of care.</h2>
          <p>
            From the doorstep to your evening routine — built so you never have to explain the box,
            doubt the checkout, or wait for answers.
          </p>
        </div>
        <div className={styles.storyRail}>
          {HOME_STORY.map((frame, i) => (
            <article key={frame.title} className={styles.storyFrame}>
              <div className={styles.storyImgWrap}>
                <Image
                  src={frame.src}
                  alt={frame.title}
                  fill
                  sizes="(max-width: 900px) 70vw, 25vw"
                  className={styles.storyImg}
                  priority={i < 2}
                />
              </div>
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
          <h2>We removed every reason to hesitate.</h2>
          <p>
            Your decision should feel clear: who we are, how we ship, how you pay, and who answers
            when you message.
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
              src={HOME_EXTRA.discreet}
              alt="Plain box delivery — no product name on outer carton, free discreet shipping across India"
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
            Soft Rose or Mist Grey. Body-safe silicone. Fully waterproof. Ships free in an unmarked
            box across India. Sale price{" "}
            <strong>₹{PRODUCT_PRICE}</strong> (MRP ₹{PRODUCT_MRP} · {PRODUCT_DISCOUNT_PERCENT}% OFF).
          </p>
          <ul className={styles.offerList}>
            <li>
              <BadgeCheck size={16} aria-hidden /> Adults 18+ only — age confirmed at entry
            </li>
            <li>
              <Truck size={16} aria-hidden /> Free discreet delivery · 3–7 business days typical
            </li>
            <li>
              <ShieldCheck size={16} aria-hidden /> 6-month manufacturing warranty
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.founder}>
        <div className={styles.founderMedia}>
          <div className={styles.mediaFrameDark}>
            <Image
              src={HOME_EXTRA.morning}
              alt="Relief without embarrassment — body wellness founded by Smit Kapadiya, KAPADIYA AND SONS"
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
              className={styles.containImg}
            />
          </div>
        </div>
        <div className={styles.founderCopy}>
          <p className={styles.eyebrow}>Founder’s note</p>
          <h2>Relief without embarrassment.</h2>
          <p>{BUSINESS.mission}</p>
          <p>
            Every policy on this site — shipping, returns, privacy, grievance redressal — is written
            so you can verify us before you pay. If something is unclear, message us on WhatsApp
            before you order. We would rather earn trust than rush a sale.
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

      <section className={styles.showcase} aria-label="Premium experience">
        <div className={styles.showcaseGrid}>
          <HomeShowcase slides={HOME_SLIDESHOW} />
          <div className={styles.showcaseCopy}>
            <p className={styles.eyebrow}>Built to convert confidence</p>
            <h2>What “premium” means here</h2>
            <div className={styles.proofGrid}>
              <div>
                <h3>Clarity before checkout</h3>
                <p>
                  Price, colours ({VARIANT_LABELS.Natural} / {VARIANT_LABELS.Espresso}), delivery
                  estimate, and return rules — visible on the product page.
                </p>
              </div>
              <div>
                <h3>Privacy by design</h3>
                <p>
                  Plain outer packaging. No product name on the label. Invoice details kept for your
                  order — not for gossip at the door.
                </p>
              </div>
              <div>
                <h3>Accountable ownership</h3>
                <p>
                  Not a faceless storefront. {BUSINESS.legalName} · {BUSINESS.founder} ·{" "}
                  <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
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
