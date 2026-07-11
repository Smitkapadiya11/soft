import Link from "next/link";
import styles from "./Home.module.css";
import { PRODUCT_PRICE, PRODUCT_NAME, PRODUCT_PACK_SIZE } from "@/lib/constants";
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
      {/* ===== Hero ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <HeroIllustration className={styles.heroImage} />
          <div className={styles.heroOverlay} />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>
            Premium Condoms Â· Discreet Delivery Â· 18+
          </span>
          <h1 className={styles.title}>Silk Room</h1>
          <p className={styles.tagline}>
            Thoughtfully made condoms for comfort and confidence â€” for him and
            for her. Sealed packs, plain packaging, free delivery across India.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/product" className={styles.ctaBtn}>
              Shop {PRODUCT_NAME} â€” â‚¹{PRODUCT_PRICE}
            </Link>
            <span className={styles.heroNote}>
              <DeliveryIcon size={16} /> Free delivery Â· Prepaid secure checkout
            </span>
          </div>
        </div>
      </section>

      {/* ===== Stats Bar ===== */}
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
            <strong>â‚¹0</strong>
            <span>Delivery fee nationwide</span>
          </StaggerItem>
        </StaggerGroup>
      </section>

      {/* ===== Featured Product ===== */}
      <section className={styles.featured}>
        <div className={styles.featuredGrid}>
          <Reveal className={styles.featuredImageWrap}>
            <div className={styles.featuredImageGlow} />
            <ProductPack
              variant="Ultra Thin"
              view="front"
              className={styles.featuredImage}
            />
          </Reveal>
          <div className={styles.featuredContent}>
            <span className={styles.featuredLabel}>
              Bestseller Â· {PRODUCT_PACK_SIZE}
            </span>
            <h2>{PRODUCT_NAME}</h2>
            <div className={styles.featuredRating}>
              <span className={styles.stars} aria-hidden>
                â˜…â˜…â˜…â˜…â˜…
              </span>
              <span>128 verified reviews</span>
            </div>
            <p className={styles.featuredDesc}>
              Natural latex condoms designed for everyday intimacy â€” choose
              Ultra Thin for a barely-there feel, or Dotted for added texture.
              Dermatologically considered, individually sealed, and shipped in
              plain outer packaging.
            </p>
            <ul className={styles.featuredList}>
              <li>Natural latex Â· individually sealed</li>
              <li>Two types: Ultra Thin &amp; Dotted</li>
              <li>
                {PRODUCT_PACK_SIZE} Â· â‚¹{PRODUCT_PRICE}
              </li>
              <li>Benefits for men &amp; women: comfort, confidence, protection</li>
            </ul>
            <div className={styles.featuredPriceRow}>
              <span className={styles.featuredPrice}>â‚¹{PRODUCT_PRICE}</span>
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

      {/* ===== Trust Strip ===== */}
      <section className={styles.trustStrip}>
        <StaggerGroup className={styles.trustContainer}>
          <StaggerItem className={styles.trustItem}>
            <div className={styles.trustIcon}>
              <DiscreetPackageIcon size={28} className={styles.trustIconSvg} />
            </div>
            <h3>100% Discreet Packaging</h3>
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
            <p>Razorpay Â· UPI, cards &amp; net banking. 18+ only.</p>
          </StaggerItem>
          <StaggerItem className={styles.trustItem}>
            <div className={styles.trustIcon}>
              <SealedProductIcon size={28} className={styles.trustIconSvg} />
            </div>
            <h3>Sealed &amp; Genuine</h3>
            <p>Factory-sealed packs. Check expiry on delivery.</p>
          </StaggerItem>
          <StaggerItem className={styles.trustItem}>
            <div className={styles.trustIcon}>
              <ReturnPolicyIcon size={28} className={styles.trustIconSvg} />
            </div>
            <h3>Clear Return Policy</h3>
            <p>Unopened packs within 7 days Â· defects covered.</p>
          </StaggerItem>
          <StaggerItem className={styles.trustItem}>
            <div className={styles.trustIcon}>
              <CouplesIcon size={28} className={styles.trustIconSvg} />
            </div>
            <h3>Made for Couples</h3>
            <p>Comfort-first options for women and men.</p>
          </StaggerItem>
        </StaggerGroup>
      </section>

      {/* ===== How It Works ===== */}
      <section className={styles.howItWorks}>
        <div className={styles.sectionHeader}>
          <h2>How It Works</h2>
          <p>Three simple steps to discreet delivery at your door.</p>
        </div>
        <StaggerGroup className={styles.stepsGrid}>
          <StaggerItem className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepIcon}>
              <BrowseStepIcon size={64} className={styles.stepIconSvg} />
            </div>
            <h3>Browse &amp; Choose</h3>
            <p>
              Explore our Ultra Thin and Dotted variants. Pick what suits you
              best.
            </p>
          </StaggerItem>
          <StaggerItem className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepIcon}>
              <OrderStepIcon size={64} className={styles.stepIconSvg} />
            </div>
            <h3>Secure Checkout</h3>
            <p>
              Pay safely via Razorpay. UPI, cards, and net banking accepted.
            </p>
          </StaggerItem>
          <StaggerItem className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepIcon}>
              <DeliveryStepIcon size={64} className={styles.stepIconSvg} />
            </div>
            <h3>Discreet Delivery</h3>
            <p>
              Free delivery in plain, unbranded packaging across India.
            </p>
          </StaggerItem>
        </StaggerGroup>
      </section>

      {/* ===== Compare Variants ===== */}
      <section className={styles.compare}>
        <div className={styles.sectionHeader}>
          <h2>Ultra Thin or Dotted?</h2>
          <p>Two premium variants designed for different sensations.</p>
        </div>
        <Reveal className={styles.compareContent}>
          <div className={styles.compareIllustration}>
            <ComparisonIllustration className={styles.compareImage} />
          </div>
          <div className={styles.compareGrid}>
            <div className={styles.compareCard}>
              <span className={styles.compareBadge}>Ultra Thin</span>
              <ul className={styles.compareList}>
                <li>Barely-there feel</li>
                <li>Natural sensitivity</li>
                <li>Extra lubricated</li>
                <li>Premium latex</li>
              </ul>
            </div>
            <div className={`${styles.compareCard} ${styles.compareCardDark}`}>
              <span className={styles.compareBadge}>Dotted</span>
              <ul className={styles.compareList}>
                <li>Textured for stimulation</li>
                <li>Unique dotted pattern</li>
                <li>Enhanced pleasure</li>
                <li>Premium latex</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== Testimonials ===== */}
      <section className={styles.testimonials}>
        <div className={styles.sectionHeader}>
          <h2>What Our Customers Say</h2>
          <p>Real reviews from real customers across India.</p>
        </div>
        <StaggerGroup className={styles.testimonialGrid}>
          <StaggerItem className={styles.testimonialCard}>
            <p className={styles.testimonialQuote}>
              &ldquo;Discreet, fast, and exactly as described.&rdquo;
            </p>
            <div className={styles.testimonialMeta}>
              <span className={styles.stars} aria-hidden>
                â˜…â˜…â˜…â˜…â˜…
              </span>
              <span className={styles.testimonialAuthor}>Priya, Mumbai</span>
            </div>
          </StaggerItem>
          <StaggerItem className={styles.testimonialCard}>
            <p className={styles.testimonialQuote}>
              &ldquo;Best quality I&rsquo;ve used. Packaging was completely
              plain.&rdquo;
            </p>
            <div className={styles.testimonialMeta}>
              <span className={styles.stars} aria-hidden>
                â˜…â˜…â˜…â˜…â˜…
              </span>
              <span className={styles.testimonialAuthor}>Arjun, Delhi</span>
            </div>
          </StaggerItem>
          <StaggerItem className={styles.testimonialCard}>
            <p className={styles.testimonialQuote}>
              &ldquo;Fast delivery and great product. Will order again.&rdquo;
            </p>
            <div className={styles.testimonialMeta}>
              <span className={styles.stars} aria-hidden>
                â˜…â˜…â˜…â˜…â˜…
              </span>
              <span className={styles.testimonialAuthor}>Sneha, Bangalore</span>
            </div>
          </StaggerItem>
          <StaggerItem className={styles.testimonialCard}>
            <p className={styles.testimonialQuote}>
              &ldquo;Comfortable and reliable. Exactly what I needed.&rdquo;
            </p>
            <div className={styles.testimonialMeta}>
              <span className={styles.stars} aria-hidden>
                â˜…â˜…â˜…â˜…â˜…
              </span>
              <span className={styles.testimonialAuthor}>Vikram, Chennai</span>
            </div>
          </StaggerItem>
          <StaggerItem className={styles.testimonialCard}>
            <p className={styles.testimonialQuote}>
              &ldquo;Smooth ordering process. Highly recommend.&rdquo;
            </p>
            <div className={styles.testimonialMeta}>
              <span className={styles.stars} aria-hidden>
                â˜…â˜…â˜…â˜…â˜…
              </span>
              <span className={styles.testimonialAuthor}>Anjali, Pune</span>
            </div>
          </StaggerItem>
          <StaggerItem className={styles.testimonialCard}>
            <p className={styles.testimonialQuote}>
              &ldquo;Premium quality at a fair price. Thank you Silk
              Room!&rdquo;
            </p>
            <div className={styles.testimonialMeta}>
              <span className={styles.stars} aria-hidden>
                â˜…â˜…â˜…â˜…â˜†
              </span>
              <span className={styles.testimonialAuthor}>Rohan, Hyderabad</span>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </section>

      {/* ===== Quality Assurance ===== */}
      <section className={styles.quality}>
        <Reveal className={styles.qualityContent}>
          <div className={styles.sectionHeader}>
            <h2>Quality You Can Trust</h2>
            <p>Every product meets our stringent quality standards.</p>
          </div>
          <div className={styles.qualityBadges}>
            <div className={styles.qualityBadge}>
              <DermatologicallyTestedBadge size={120} />
              <span>Dermatologically Tested</span>
            </div>
            <div className={styles.qualityBadge}>
              <ISOCompliantBadge size={120} />
              <span>ISO Compliant Manufacturing</span>
            </div>
            <div className={styles.qualityBadge}>
              <LatexQualityBadge size={120} />
              <span>Premium Natural Latex</span>
            </div>
            <div className={styles.qualityBadge}>
              <MadeInIndiaBadge size={120} />
              <span>Made in India</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== Story ===== */}
      <section className={styles.story}>
        <div className={styles.storyGrid}>
          <Reveal className={styles.storyImageWrap}>
            <StoryIllustration className={styles.storyImage} />
          </Reveal>
          <div className={styles.storyContent}>
            <h2>Intimacy, without the awkwardness</h2>
            <p>
              Silk Room is an online retailer of condoms and sexual wellness
              essentials for adults in India. We focus on comfort, clarity, and
              discretion â€” from product details to plain packaging and prepaid
              checkout.
            </p>
            <p>
              Whether you prefer Ultra Thin or Dotted, every pack is sealed and
              shipped with care. No surprise fees. No confusing policies. Just
              premium protection delivered to your door.
            </p>
            <Link href="/product" className={styles.storyCta}>
              Explore {PRODUCT_NAME}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className={styles.finalCta}>
        <Reveal className={styles.finalCtaContent}>
          <h2>Ready when you are</h2>
          <p>
            â‚¹{PRODUCT_PRICE} Â· Free delivery Â· Discreet packaging Â· Secure
            Razorpay checkout
          </p>
          <Link href="/product" className={styles.ctaBtnLight}>
            Shop Now
          </Link>
        </Reveal>
      </section>

      {/* ===== JSON-LD Structured Data ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Silk Room",
            url: "https://silkroom.shop",
            description:
              "Premium condoms and sexual wellness products with discreet delivery across India.",
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
