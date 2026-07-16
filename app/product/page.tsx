"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, Loader2, Truck } from "lucide-react";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  smooth,
  spring,
  quick,
  scrollRevealConfig,
} from "@/lib/motion";
import styles from "./Product.module.css";
import Accordion from "@/components/Accordion";
import TrustBadges from "@/components/TrustBadges";
import { useCart } from "@/context/CartContext";
import Price from "@/components/Price";
import { formatINR } from "@/lib/format";
import {
  PRODUCT_PRICE,
  PRODUCT_MRP,
  PRODUCT_DISCOUNT_PERCENT,
  PRODUCT_NAME,
  PRODUCT_ID,
  PRODUCT_TAGLINE,
  PRODUCT_SHORT_DESC,
  PRODUCT_SPECS,
  PRODUCT_GALLERY,
  PRODUCT_COVER_IMAGE,
  FALLBACK_STOCK,
  ALLOWED_VARIANTS,
  VARIANT_COLORS,
  VARIANT_LABELS,
  variantLabel,
} from "@/lib/constants";
import { trackViewContent } from "@/lib/meta-pixel";

const PRODUCT = {
  id: PRODUCT_ID,
  name: PRODUCT_NAME,
  price: PRODUCT_PRICE,
  variants: ALLOWED_VARIANTS,
};

const ratingDistribution = [
  { stars: 5, count: 96 },
  { stars: 4, count: 18 },
  { stars: 3, count: 4 },
  { stars: 2, count: 1 },
  { stars: 1, count: 0 },
];
const maxRatingCount = Math.max(...ratingDistribution.map((r) => r.count));

const reviews = [
  {
    name: "N***a M.",
    city: "Mumbai",
    text: "Soft Rose feels gentle on sore shoulders. Easy evening recovery tool. Packaging was totally plain.",
  },
  {
    name: "R***a K.",
    city: "Bangalore",
    text: "Mist Grey looks calm on the shelf. Waterproof as promised — rinse and dry, done.",
  },
  {
    name: "A***i S.",
    city: "Delhi",
    text: "Smooth Razorpay checkout and free discreet delivery. Compact size, helpful for tension after desk work.",
  },
];

export default function ProductPage() {
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedVariant, setSelectedVariant] =
    useState<(typeof PRODUCT.variants)[number]>("Natural");
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState<Record<string, number>>({
    Natural: 0,
    Espresso: 0,
  });
  const [stockLoading, setStockLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [addError, setAddError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const gallery = PRODUCT_GALLERY[selectedVariant];
  const safeIndex = Math.min(selectedImageIndex, Math.max(0, gallery.length - 1));
  const activeSrc = gallery[safeIndex] ?? gallery[1] ?? gallery[0];
  const isCoverImage =
    safeIndex === 0 ||
    activeSrc?.includes("product-cover-model") ||
    activeSrc === PRODUCT_COVER_IMAGE;
  const selectedLabel = variantLabel(selectedVariant);

  const handleImageError = () => {
    if (safeIndex === 0 && gallery.length > 1) {
      setSelectedImageIndex(1);
    }
  };

  const fetchStock = useCallback(async () => {
    setStockLoading(true);
    try {
      const res = await fetch("/api/stock");
      if (res.ok) {
        const data = await res.json();
        setStock(data.stock ?? { Natural: 0, Espresso: 0 });
      } else {
        setStock({ Natural: 0, Espresso: 0 });
      }
    } catch {
      setStock({ Natural: 0, Espresso: 0 });
    } finally {
      setStockLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch stock on mount
    fetchStock();
  }, [fetchStock]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedVariant]);

  useEffect(() => {
    trackViewContent({
      contentName: PRODUCT_NAME,
      contentIds: [PRODUCT_ID],
      value: PRODUCT_PRICE,
      variant: selectedVariant,
    });
  }, [selectedVariant]);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const selectedStock = stock[selectedVariant] ?? 0;
  const isOutOfStock = !stockLoading && selectedStock < 1;
  const maxQty = Math.min(selectedStock, 10);
  const ctaBusy = isAdding || isBuying || stockLoading;

  const buildCartItem = () => ({
    id: `${PRODUCT.id}-${selectedVariant}`,
    name: PRODUCT.name,
    price: PRODUCT.price,
    variant: selectedVariant,
    quantity,
  });

  const handleAddToCart = () => {
    if (isOutOfStock || ctaBusy) return;
    setIsAdding(true);
    setAddError("");
    try {
      if (quantity > selectedStock) {
        setAddError(`Only ${selectedStock} available for ${selectedLabel}`);
        return;
      }
      addToCart(buildCartItem(), { openDrawer: false });
      setShowToast(true);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setShowToast(false), 3200);
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = () => {
    if (isOutOfStock || ctaBusy) return;
    setIsBuying(true);
    setAddError("");
    try {
      if (quantity > selectedStock) {
        setAddError(`Only ${selectedStock} available for ${selectedLabel}`);
        return;
      }
      addToCart(buildCartItem(), { openDrawer: false });
      router.push("/checkout");
    } catch {
      setAddError("Something went wrong. Please try again.");
    } finally {
      setIsBuying(false);
    }
  };

  const highlights = [
    "Body-safe silicone for skin-friendly use",
    `${PRODUCT_SPECS.length} compact handheld · ${PRODUCT_SPECS.diameter} diameter`,
    PRODUCT_SPECS.base,
    "Fully waterproof · easy to rinse clean",
    `Two colours: ${VARIANT_LABELS.Natural} & ${VARIANT_LABELS.Espresso}`,
    "Plain discreet packaging on delivery",
  ];

  const faqs = [
    {
      title: "How long does delivery take?",
      content:
        "Orders usually dispatch within 1–2 business days. Standard delivery across serviceable Indian pin codes typically takes 3–7 business days. Tracking is emailed once shipped.",
    },
    {
      title: "Is packaging discreet?",
      content:
        "Yes. Orders ship in a plain outer carton with no product name or brand messaging on the label. Emails reference your order number only.",
    },
    {
      title: "How do I clean it?",
      content:
        "Rinse with warm water and mild soap after each use. Fully waterproof. Dry thoroughly before storage. Avoid abrasive cleaners.",
    },
    {
      title: "Is it waterproof?",
      content:
        "Yes — fully waterproof so you can rinse it easily after use. Dry thoroughly before storing in a cool, dry place.",
    },
    {
      title: "What warranty do I get?",
      content:
        "6-month limited warranty against manufacturing defects from delivery date. Misuse, improper cleaning, or unauthorized modifications are not covered. Email kapadiya.working@gmail.com or WhatsApp +91 75758 07403 with your order number.",
    },
    {
      title: "Can I return it?",
      content:
        "For hygiene reasons, opened or used wellness products cannot be returned unless defective or damaged on arrival. Unused items in original sealed packaging may be returned within 7 days. See our Return & Refund Policy.",
    },
    {
      title: "Is it safe for daily use?",
      content:
        "Yes for healthy adults 18+ as a personal body massager for tension relief and everyday recovery. Stop if irritation occurs. This is a personal wellness product, not a medical device.",
    },
    {
      title: `${VARIANT_LABELS.Natural} vs ${VARIANT_LABELS.Espresso}?`,
      content: `Same size and build — ${VARIANT_LABELS.Natural} is a soft rose finish; ${VARIANT_LABELS.Espresso} is a calm mist grey. Choose the look you prefer.`,
    },
  ];

  const specs = [
    {
      title: "Product details",
      content: `Name: ${PRODUCT_NAME} · Category: personal body wellness massager · Material: ${PRODUCT_SPECS.material} · Length: ${PRODUCT_SPECS.length} · Contact length: ${PRODUCT_SPECS.contactLength} · Diameter: ${PRODUCT_SPECS.diameter} · Weight: ${PRODUCT_SPECS.weight} · Form: ${PRODUCT_SPECS.form} · Base: ${PRODUCT_SPECS.base} · ${PRODUCT_SPECS.waterproof} · Colours: ${VARIANT_LABELS.Natural}, ${VARIANT_LABELS.Espresso} · Adults 18+ only`,
    },
    {
      title: "How to use",
      content: (
        <ul className={styles.infoList}>
          <li>Wash before first use with warm water and mild soap</li>
          <li>Apply to tense muscle areas with gentle, even pressure</li>
          <li>For hands-free recovery, press the base firmly onto a smooth, clean surface</li>
          <li>Start gently; listen to your body</li>
          <li>Clean after use, dry fully, store in a cool dry place</li>
        </ul>
      ),
    },
    {
      title: "Care & safety",
      content: (
        <ul className={styles.infoList}>
          <li>For adults 18+ only</li>
          <li>Body-safe silicone — non-porous when intact</li>
          <li>Personal wellness massager for tension relief — not a medical device</li>
          <li>If irritation occurs, discontinue use</li>
          <li>Keep out of reach of minors</li>
        </ul>
      ),
    },
    {
      title: "What's in the box",
      content: `${PRODUCT_NAME} (${selectedLabel}) · Care card · Shipped inside plain discreet packaging`,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.productLayout}>
        <div className={styles.gallery}>
          <div
            className={`${styles.mainImageContainer} ${isCoverImage ? styles.mainImageContainerCover : ""}`}
            onTouchStart={(e) => {
              touchStartX.current = e.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              const start = touchStartX.current;
              const end = e.changedTouches[0]?.clientX;
              touchStartX.current = null;
              if (start == null || end == null) return;
              const delta = end - start;
              if (Math.abs(delta) < 40) return;
              if (delta < 0) {
                setSelectedImageIndex((i) => Math.min(gallery.length - 1, i + 1));
              } else {
                setSelectedImageIndex((i) => Math.max(0, i - 1));
              }
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSrc + selectedVariant}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.mainImageWrapper}
              >
                <Image
                  src={activeSrc}
                  alt={`${PRODUCT_NAME} ${selectedLabel} — view ${safeIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.mainPhoto}
                  priority={safeIndex === 0}
                  onError={handleImageError}
                />
              </motion.div>
            </AnimatePresence>
            <span className={styles.variantBadge}>{selectedLabel}</span>
          </div>
          <div className={styles.galleryDots} role="tablist" aria-label="Gallery position">
            {gallery.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                className={`${styles.galleryDot} ${safeIndex === index ? styles.galleryDotActive : ""}`}
                aria-label={`Go to image ${index + 1}`}
                aria-current={safeIndex === index}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
          <div className={styles.thumbnails} role="group" aria-label="Product images">
            {gallery.map((src, index) => (
              <motion.button
                key={src}
                type="button"
                className={`${styles.thumb} ${safeIndex === index ? styles.thumbActive : ""}`}
                onClick={() => setSelectedImageIndex(index)}
                aria-label={`View image ${index + 1}`}
                aria-pressed={safeIndex === index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={src}
                  alt=""
                  width={152}
                  height={152}
                  className={styles.thumbnail}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
                  }}
                />
              </motion.button>
            ))}
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.reviews}>
            <div className={styles.stars} aria-label="4.8 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="#6b3d52" size={16} color="#6b3d52" aria-hidden />
              ))}
            </div>
            <span>Customer feedback · Adults 18+</span>
          </div>

          <h1 className={styles.title}>{PRODUCT.name}</h1>
          <p className={styles.tagline}>{PRODUCT_TAGLINE}</p>

          <div className={styles.priceRow}>
            <p className={styles.price}>
              <Price amount={PRODUCT.price} sale />
            </p>
            <span className={styles.saleNote}>Sale price · no coupon needed</span>
            <span className={styles.freeDelivery}>
              <Truck size={16} aria-hidden /> Free discreet delivery
            </span>
          </div>

          <p className={styles.description}>
            {PRODUCT_SHORT_DESC} Choose <strong>{VARIANT_LABELS.Natural}</strong> or{" "}
            <strong>{VARIANT_LABELS.Espresso}</strong> — same build, two colours.
          </p>

          <ul className={styles.highlights}>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.selector}>
            <h3 className={styles.selectorLabel}>Colour: {selectedLabel}</h3>
            <div className={styles.swatches} role="radiogroup" aria-label="Select colour">
              {PRODUCT.variants.map((variant) => {
                const variantStock = stock[variant] ?? 0;
                const out = !stockLoading && variantStock < 1;
                const label = variantLabel(variant);
                return (
                  <motion.button
                    key={variant}
                    type="button"
                    role="radio"
                    aria-checked={selectedVariant === variant}
                    aria-label={`${label}${out ? " — out of stock" : ""}`}
                    disabled={out}
                    className={`${styles.swatch} ${selectedVariant === variant ? styles.activeSwatch : ""} ${out ? styles.swatchDisabled : ""}`}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setQuantity(1);
                    }}
                    style={{ backgroundColor: VARIANT_COLORS[variant] }}
                    title={label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  />
                );
              })}
            </div>
            <p className={styles.stockNote}>
              {selectedVariant === "Natural"
                ? `${VARIANT_LABELS.Natural} — soft rose finish`
                : `${VARIANT_LABELS.Espresso} — calm mist grey`}
            </p>
            {stockLoading ? (
              <p className={styles.stockNote} aria-live="polite">
                Checking availability…
              </p>
            ) : isOutOfStock ? (
              <p className={styles.outOfStock} role="status">
                Out of Stock
              </p>
            ) : (
              <p className={styles.inStock} role="status">
                In Stock — {selectedStock} available
              </p>
            )}
          </div>

          {addError && (
            <p className={styles.addError} role="alert">
              {addError}
            </p>
          )}

          <div className={styles.addToCartSection} id="add-to-cart" ref={ctaRef}>
            <div className={styles.quantity} aria-label="Quantity">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={isOutOfStock || quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                disabled={isOutOfStock || quantity >= maxQty}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <div className={styles.ctaColumn}>
              <motion.button
                type="button"
                className={`${styles.buyNowBtn} ${styles.buyNowPulse} ${isOutOfStock ? styles.addBtnDisabled : ""}`}
                onClick={handleBuyNow}
                disabled={isOutOfStock || ctaBusy}
                aria-busy={isBuying}
                whileHover={isOutOfStock || ctaBusy ? undefined : { scale: 1.02 }}
                whileTap={isOutOfStock || ctaBusy ? undefined : { scale: 0.98 }}
                transition={smooth}
              >
                {isBuying ? (
                  <>
                    <Loader2 size={18} className={styles.spinner} aria-hidden /> Taking you to
                    checkout…
                  </>
                ) : isOutOfStock ? (
                  "Out of Stock"
                ) : (
                  `Buy Now — ${formatINR(PRODUCT_PRICE)}`
                )}
              </motion.button>
              <button
                type="button"
                className={styles.addLink}
                onClick={handleAddToCart}
                disabled={isOutOfStock || ctaBusy}
              >
                {isAdding ? "Adding…" : "Add to cart"}
              </button>
            </div>
          </div>

          <TrustBadges />
          <div className={styles.accordionSection}>
            <Accordion items={specs} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            className={styles.stickyBar}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={spring}
            role="region"
            aria-label="Quick buy"
          >
            <div className={styles.stickyPrice}>
              <span>{selectedLabel}</span>
              <Price amount={PRODUCT_PRICE} as="strong" sale />
            </div>
            <button
              type="button"
              className={`${styles.stickyBtn} ${styles.buyNowPulse}`}
              onClick={handleBuyNow}
              disabled={isOutOfStock || ctaBusy}
            >
              {isBuying ? "Checkout…" : isOutOfStock ? "Sold out" : "Buy Now"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showToast && (
          <motion.div
            className={styles.toast}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={quick}
            role="status"
          >
            <span>Added</span>
            <button
              type="button"
              className={styles.toastAction}
              onClick={() => {
                setShowToast(false);
                setIsCartOpen(true);
              }}
            >
              View cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={styles.compositionSection}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={scrollRevealConfig}
        transition={smooth}
      >
        <h2 className={styles.sectionTitle}>Specifications</h2>
        <div className={styles.compositionCard}>
          <div className={styles.compositionList}>
            <div className={styles.compositionItem}>
              <span className={styles.compositionLabel}>Material</span>
              <span className={styles.compositionValue}>{PRODUCT_SPECS.material}</span>
            </div>
            <div className={styles.compositionItem}>
              <span className={styles.compositionLabel}>Size</span>
              <span className={styles.compositionValue}>
                {PRODUCT_SPECS.length} length · {PRODUCT_SPECS.diameter} diameter ·{" "}
                {PRODUCT_SPECS.form}
              </span>
            </div>
            <div className={styles.compositionItem}>
              <span className={styles.compositionLabel}>Weight</span>
              <span className={styles.compositionValue}>{PRODUCT_SPECS.weight}</span>
            </div>
            <div className={styles.compositionItem}>
              <span className={styles.compositionLabel}>Features</span>
              <span className={styles.compositionValue}>
                Body-safe silicone · stable base · {PRODUCT_SPECS.waterproof}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className={styles.bottomSection}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqWrapper}>
          <Accordion items={faqs} />
        </div>
      </div>

      <div className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>Customer Reviews</h2>
        <div className={styles.ratingDistribution}>
          {ratingDistribution.map((rating) => (
            <div key={rating.stars} className={styles.ratingBar}>
              <span className={styles.ratingBarLabel}>{rating.stars}★</span>
              <div className={styles.ratingBarTrack}>
                <motion.div
                  className={styles.ratingBarFill}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(rating.count / maxRatingCount) * 100}%` }}
                  viewport={scrollRevealConfig}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <span className={styles.ratingBarCount}>{rating.count}</span>
            </div>
          ))}
        </div>
        <motion.div
          className={styles.reviewGrid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealConfig}
        >
          {reviews.map((review) => (
            <motion.div key={review.name} className={styles.reviewCard} variants={staggerItem}>
              <div className={styles.stars} aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} fill="#6b3d52" size={14} color="#6b3d52" aria-hidden />
                ))}
              </div>
              <p className={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
              <div className={styles.reviewer}>
                <span className={styles.reviewerName}>
                  {review.name} · {review.city}
                </span>
                <span className={styles.verified}>
                  <ShieldCheck size={14} aria-hidden /> Verified Buyer
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: PRODUCT_NAME,
            category: "Massage Device",
            brand: { "@type": "Brand", name: "Silk Room" },
            description: PRODUCT_SHORT_DESC,
            image: [`https://silkroom.shop${PRODUCT_GALLERY.Natural[0]}`],
            offers: {
              "@type": "Offer",
              price: String(PRODUCT_PRICE),
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              priceValidUntil: "2026-12-31",
            },
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "MRP",
                value: String(PRODUCT_MRP),
              },
              {
                "@type": "PropertyValue",
                name: "Discount",
                value: `${PRODUCT_DISCOUNT_PERCENT}% OFF`,
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: String(reviews.length),
            },
          }),
        }}
      />
    </div>
  );
}
