import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";
import {
  PRODUCT_PRICE,
  PRODUCT_NAME,
  PRODUCT_MRP,
  PRODUCT_DISCOUNT_PERCENT,
  HOME_STORY,
  HOME_EXTRA,
  BUSINESS,
  VARIANT_LABELS,
} from "@/lib/constants";
import Price from "@/components/Price";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/MotionWrapper";
import {
  Package,
  ShieldCheck,
  RotateCcw,
  Lock,
  BadgeCheck,
  MessageCircle,
  Truck,
  Landmark,
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
    text: `${BUSINESS.phone} · ${BUSINESS.hours}. Real replies from the Silk Room team.`,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero — brand + one story image full-bleed */}
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <Image
            src={HOME_STORY[0].src}
            alt="Silk Room — discreet delivery arrives at home"
            fill
            priority
            sizes="100vw"
            className={styles.heroImg}
          />
          <div className={styles.heroShade} aria-hidden />
        </div>
        <div className={styles.heroCopy}>
          <p className={styles.brand}>Silk Room</p>
          <h1 className={styles.headline}>
            Discreet relief for women who carry too much.
          </h1>
          <p className={styles.sub}>
            {PRODUCT_NAME} — body wellness for tension, stress, and recovery days.
            Plain packaging. Prepaid Razorpay. Adults 18+.
          </p>
          <div className={styles.ctaRow}>
            <Link href="/product" className={styles.cta}>
              Shop {PRODUCT_NAME}
              <span className={styles.priceChip}>
                <Price amount={PRODUCT_PRICE} sale />
              </span>
            </Link>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent("Hi Silk Room, I have a question before ordering.")}`}
              className={styles.ctaGhost}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp {BUSINESS.phone}
            </a>
          </div>
          <p className={styles.fine}>
            Owned by {BUSINESS.legalName} · Founded by {BUSINESS.founder} · Surat, India
          </p>
        </div>
      </section>

      {/* Four-image brand story — one line */}
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

      {/* Trust rebuild — Meta concern */}
      <section className={styles.trust} aria-label="Why customers trust Silk Room">
        <div className={styles.trustIntro}>
          <p className={styles.eyebrow}>Why people buy with confidence</p>
          <h2>We removed every reason to hesitate.</h2>
          <p>
            Meta ads send you here in seconds. Your decision should feel equally clear: who we are,
            how we ship, how you pay, and who answers when you message.
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
        <div className={styles.legalStrip}>
          <Landmark size={18} aria-hidden />
          <p>
            <strong>{BUSINESS.name}</strong> is the trading name of{" "}
            <strong>{BUSINESS.legalName}</strong>, founded by{" "}
            <strong>{BUSINESS.founder}</strong>. Jurisdiction: {BUSINESS.jurisdiction}. Contact{" "}
            <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or WhatsApp{" "}
            <a href={`https://wa.me/${BUSINESS.whatsapp}`}>{BUSINESS.phone}</a>.
          </p>
        </div>
      </section>

      {/* Offer + product bridge */}
      <section className={styles.offer}>
        <Reveal className={styles.offerMedia}>
          <Image
            src={HOME_EXTRA.discreet}
            alt="Discreet plain carton ready for delivery"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.offerImg}
          />
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
          <Link href="/product" className={styles.cta}>
            View product &amp; buy
          </Link>
        </div>
      </section>

      {/* Founder */}
      <section className={styles.founder}>
        <div className={styles.founderMedia}>
          <Image
            src={HOME_EXTRA.morning}
            alt="Quiet morning light — Silk Room wellness mood"
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
            className={styles.founderImg}
          />
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
          <p className={styles.founderSign}>
            — {BUSINESS.founder}
            <span>
              Founder, {BUSINESS.name} · {BUSINESS.legalName}
            </span>
          </p>
        </div>
      </section>

      {/* Proof strip */}
      <section className={styles.proof}>
        <div className={styles.proofTexture}>
          <Image
            src={HOME_EXTRA.texture}
            alt=""
            fill
            sizes="40vw"
            className={styles.proofTextureImg}
            aria-hidden
          />
        </div>
        <div className={styles.proofInner}>
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
                {BUSINESS.email} · {BUSINESS.phone}.
              </p>
            </div>
          </div>
          <Link href="/product" className={styles.cta}>
            Continue to {PRODUCT_NAME}
          </Link>
        </div>
      </section>

      <section className={styles.final}>
        <h2>Ready when you are.</h2>
        <p>
          <Price amount={PRODUCT_PRICE} sale className={styles.priceInline} /> · Free discreet
          delivery · Razorpay prepaid · Adults 18+
        </p>
        <div className={styles.ctaRow}>
          <Link href="/product" className={styles.cta}>
            Shop now
          </Link>
          <a
            href={`https://wa.me/${BUSINESS.whatsapp}`}
            className={styles.ctaGhost}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
