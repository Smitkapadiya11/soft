import Link from "next/link";
import styles from "./Home.module.css";
import { PRODUCT_PRICE, PRODUCT_NAME, PRODUCT_TAGLINE } from "@/lib/constants";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/MotionWrapper";
import {
  HeroIllustration,
  ProductPack,
  StoryIllustration,
  ComparisonIllustration,
  DiscreetPackageIcon,
  DeliveryIcon,
  SecurePaymentIcon,
  SealedProductIcon,
  ReturnPolicyIcon,
  CouplesIcon,
  BrowseStepIcon,
  OrderStepIcon,
  DeliveryStepIcon,
  DermatologicallyTestedBadge,
  ISOCompliantBadge,
  LatexQualityBadge,
  MadeInIndiaBadge,
} from "@/components/illustrations";

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <HeroIllustration className={styles.heroImage} />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>
            Everyday Pain Relief · Discreet Delivery · India
          </span>
          <h1 className={styles.title}>Silk Room</h1>
          <p className={styles.tagline}>
            A personal wellness massager for muscle tension, cramps, and
            everyday aches — quiet, rechargeable, and designed for home use.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/product" className={styles.ctaBtn}>
              Shop {PRODUCT_NAME} — ₹{PRODUCT_PRICE}
            </Link>
            <span className={styles.heroNote}>
              <DeliveryIcon size={16} /> Free delivery · Prepaid secure checkout
            </span>
          </div>
        </div>
      </section>

      <section className={styles.statsBar}>
        <StaggerGroup className={styles.statsContainer}>
          <StaggerItem className={styles.stat}>
            <strong>2,400+</strong>
            <span>Happy customers</span>
          </StaggerItem>
          <StaggerItem className={styles.stat}>
            <strong>4.9</strong>
            <span>Average rating</span>
          </StaggerItem>
          <StaggerItem className={styles.stat}>
            <strong>100%</strong>
            <span>Discreet packaging</span>
          </StaggerItem>
          <StaggerItem className={styles.stat}>
            <strong>₹0</strong>
            <span>Delivery fee nationwide</span>
          </StaggerItem>
        </StaggerGroup>
      </section>

      <section className={styles.featured}>
        <div className={styles.featuredGrid}>
          <Reveal className={styles.featuredImageWrap}>
            <div className={styles.featuredImageGlow} />
            <ProductPack
              variant="Soft Rose"
              view="front"
              className={styles.featuredImage}
            />
          </Reveal>
          <div className={styles.featuredContent}>
            <span className={styles.featuredLabel}>
              Bestseller · {PRODUCT_TAGLINE}
            </span>
            <h2>{PRODUCT_NAME}</h2>
            <div className={styles.featuredRating}>
              <span className={styles.stars} aria-hidden>
                ★★★★★
              </span>
              <span>128 verified reviews</span>
            </div>
            <p className={styles.featuredDesc}>
              Targeted vibration for neck, shoulder, and back stiffness, muscle
              tension, and period-related cramps. Soft-touch silicone, five
              speed modes, USB-C charging — in Soft Rose or Mist Grey.
            </p>
            <ul className={styles.featuredList}>
              <li>5 vibration modes · quiet motor</li>
              <li>Two colours: Soft Rose &amp; Mist Grey</li>
              <li>USB-C rechargeable · ~90 min runtime</li>
              <li>₹{PRODUCT_PRICE} · free delivery across India</li>
            </ul>
            <div className={styles.featuredPriceRow}>
              <span className={styles.featuredPrice}>₹{PRODUCT_PRICE}</span>
              <span className={styles.featuredDelivery}>
                <DeliveryIcon size={18} /> Free delivery all India
              </span>
            </div>
            <Link href="/product" className={styles.ctaBtn}>
              View Product Details
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.trustStrip}>
        <StaggerGroup className={styles.trustContainer}>
          <StaggerItem className={styles.trustItem}>
            <div className={styles.trustIcon}>
              <DiscreetPackageIcon size={28} className={styles.trustIconSvg} />
            </div>
            <h3>Discreet Packaging</h3>
            <p>Plain outer box. No product names on the label.</p>
          </StaggerItem>
          <StaggerItem className={styles.trustItem}>
            <div className={styles.trustIcon}>
              <DeliveryIcon size={28} className={styles.trustIconSvg} />
            </div>
            <h3>Free Delivery Nationwide</h3>
            <p>Every serviceable pincode in India. No hidden fees.</p>
          </StaggerItem>
          <StaggerItem className={styles.trustItem}>
            <div className={styles.trustIcon}>
              <SecurePaymentIcon size={28} className={styles.trustIconSvg} />
            </div>
            <h3>Secure Prepaid Checkout</h3>
            <p>Razorpay · UPI, cards &amp; net banking.</p>
          </StaggerItem>
          <StaggerItem className={styles.trustItem}>
            <div className={styles.trustIcon}>
              <SealedProductIcon size={28} className={styles.trustIconSvg} />
            </div>
            <h3>Genuine Product</h3>
            <p>Factory-sealed. Inspected before dispatch.</p>
          </StaggerItem>
          <StaggerItem className={styles.trustItem}>
            <div className={styles.trustIcon}>
              <ReturnPolicyIcon size={28} className={styles.trustIconSvg} />
            </div>
            <h3>Easy Returns</h3>
            <p>Clear return window for unused, sealed items.</p>
          </StaggerItem>
          <StaggerItem className={styles.trustItem}>
            <div className={styles.trustIcon}>
              <CouplesIcon size={28} className={styles.trustIconSvg} />
            </div>
            <h3>Built for Daily Comfort</h3>
            <p>Gentle relief for everyday muscle and joint aches.</p>
          </StaggerItem>
        </StaggerGroup>
      </section>

      <section className={styles.howItWorks}>
        <div className={styles.sectionHeader}>
          <h2>How It Works</h2>
          <p>Three simple steps from cart to your door.</p>
        </div>
        <StaggerGroup className={styles.stepsGrid}>
          <StaggerItem className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepIcon}>
              <BrowseStepIcon size={64} className={styles.stepIconSvg} />
            </div>
            <h3>Choose Your Colour</h3>
            <p>Pick Soft Rose or Mist Grey — same comfort, two finishes.</p>
          </StaggerItem>
          <StaggerItem className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepIcon}>
              <OrderStepIcon size={64} className={styles.stepIconSvg} />
            </div>
            <h3>Secure Checkout</h3>
            <p>Pay safely via Razorpay. UPI, cards, and net banking accepted.</p>
          </StaggerItem>
          <StaggerItem className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepIcon}>
              <DeliveryStepIcon size={64} className={styles.stepIconSvg} />
            </div>
            <h3>Discreet Delivery</h3>
            <p>Free delivery in plain packaging across India.</p>
          </StaggerItem>
        </StaggerGroup>
      </section>

      <section className={styles.compare}>
        <div className={styles.sectionHeader}>
          <h2>Soft Rose or Mist Grey?</h2>
          <p>Same massager, two calm colourways — choose what fits your space.</p>
        </div>
        <Reveal className={styles.compareContent}>
          <div className={styles.compareIllustration}>
            <ComparisonIllustration className={styles.compareImage} />
          </div>
          <div className={styles.compareGrid}>
            <div className={styles.compareCard}>
              <span className={styles.compareBadge}>Soft Rose</span>
              <ul className={styles.compareList}>
                <li>Warm blush finish</li>
                <li>Soft-touch silicone</li>
                <li>5 vibration modes</li>
                <li>USB-C rechargeable</li>
              </ul>
            </div>
            <div className={`${styles.compareCard} ${styles.compareCardDark}`}>
              <span className={styles.compareBadge}>Mist Grey</span>
              <ul className={styles.compareList}>
                <li>Cool neutral finish</li>
                <li>Soft-touch silicone</li>
                <li>5 vibration modes</li>
                <li>USB-C rechargeable</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <section className={styles.testimonials}>
        <div className={styles.sectionHeader}>
          <h2>What Our Customers Say</h2>
          <p>Real reviews from customers across India.</p>
        </div>
        <StaggerGroup className={styles.testimonialGrid}>
          <StaggerItem className={styles.testimonialCard}>
            <p className={styles.testimonialQuote}>
              &ldquo;Helps with my desk-job neck tightness. Quiet enough for evenings.&rdquo;
            </p>
            <div className={styles.testimonialMeta}>
              <span className={styles.stars} aria-hidden>★★★★★</span>
              <span className={styles.testimonialAuthor}>Priya, Mumbai</span>
            </div>
          </StaggerItem>
          <StaggerItem className={styles.testimonialCard}>
            <p className={styles.testimonialQuote}>
              &ldquo;Soft Rose looks lovely. Packaging was completely plain.&rdquo;
            </p>
            <div className={styles.testimonialMeta}>
              <span className={styles.stars} aria-hidden>★★★★★</span>
              <span className={styles.testimonialAuthor}>Arjun, Delhi</span>
            </div>
          </StaggerItem>
          <StaggerItem className={styles.testimonialCard}>
            <p className={styles.testimonialQuote}>
              &ldquo;Battery lasts through a week of short sessions. Easy USB-C charge.&rdquo;
            </p>
            <div className={styles.testimonialMeta}>
              <span className={styles.stars} aria-hidden>★★★★★</span>
              <span className={styles.testimonialAuthor}>Sneha, Bangalore</span>
            </div>
          </StaggerItem>
          <StaggerItem className={styles.testimonialCard}>
            <p className={styles.testimonialQuote}>
              &ldquo;Gentle on period cramps. Not a medical fix — but it helps me unwind.&rdquo;
            </p>
            <div className={styles.testimonialMeta}>
              <span className={styles.stars} aria-hidden>★★★★★</span>
              <span className={styles.testimonialAuthor}>Ananya, Chennai</span>
            </div>
          </StaggerItem>
          <StaggerItem className={styles.testimonialCard}>
            <p className={styles.testimonialQuote}>
              &ldquo;Smooth checkout and free delivery. Mist Grey was my pick.&rdquo;
            </p>
            <div className={styles.testimonialMeta}>
              <span className={styles.stars} aria-hidden>★★★★★</span>
              <span className={styles.testimonialAuthor}>Vikram, Pune</span>
            </div>
          </StaggerItem>
          <StaggerItem className={styles.testimonialCard}>
            <p className={styles.testimonialQuote}>
              &ldquo;Solid build for the price. Will gift one to my sister.&rdquo;
            </p>
            <div className={styles.testimonialMeta}>
              <span className={styles.stars} aria-hidden>★★★★☆</span>
              <span className={styles.testimonialAuthor}>Rohan, Hyderabad</span>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </section>

      <section className={styles.quality}>
        <Reveal className={styles.qualityContent}>
          <div className={styles.sectionHeader}>
            <h2>Quality You Can Trust</h2>
            <p>Built for daily comfort with thoughtful materials and checks.</p>
          </div>
          <div className={styles.qualityBadges}>
            <div className={styles.qualityBadge}>
              <DermatologicallyTestedBadge size={120} />
              <span>Body-safe silicone</span>
            </div>
            <div className={styles.qualityBadge}>
              <ISOCompliantBadge size={120} />
              <span>Quality-checked manufacturing</span>
            </div>
            <div className={styles.qualityBadge}>
              <LatexQualityBadge size={120} />
              <span>Soft-touch finish</span>
            </div>
            <div className={styles.qualityBadge}>
              <MadeInIndiaBadge size={120} />
              <span>Ships across India</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className={styles.story}>
        <div className={styles.storyGrid}>
          <Reveal className={styles.storyImageWrap}>
            <StoryIllustration className={styles.storyImage} />
          </Reveal>
          <div className={styles.storyContent}>
            <h2>Relief, without the fuss</h2>
            <p>
              Silk Room sells personal wellness massagers for everyday pain
              relief — muscle tension, stiffness, and common aches. We keep
              product details clear, packaging discreet, and checkout prepaid
              and secure.
            </p>
            <p>
              {PRODUCT_NAME} is made for short, comfortable sessions at home.
              Choose Soft Rose or Mist Grey, charge with USB-C, and use the
              modes that feel right for you. This is not a medical device —
              if pain persists, please consult a doctor.
            </p>
            <Link href="/product" className={styles.storyCta}>
              Explore {PRODUCT_NAME}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <Reveal className={styles.finalCtaContent}>
          <h2>Ready when you are</h2>
          <p>
            ₹{PRODUCT_PRICE} · Free delivery · Discreet packaging · Secure
            Razorpay checkout
          </p>
          <Link href="/product" className={styles.ctaBtnLight}>
            Shop Now
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
              "Personal wellness massagers for everyday pain relief, with discreet delivery across India.",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-98765-43210",
              email: "support@silkroom.co",
              contactType: "customer service",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Silk Room",
            url: "https://silkroom.shop",
          }),
        }}
      />
    </>
  );
}
