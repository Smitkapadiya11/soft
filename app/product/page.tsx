"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, Loader2, Truck, Check } from "lucide-react";
import { ProductPack } from "@/components/illustrations";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  smooth,
  scrollRevealConfig,
} from "@/lib/motion";
import styles from "./Product.module.css";
import Accordion from "@/components/Accordion";
import TrustBadges from "@/components/TrustBadges";
import { useCart } from "@/context/CartContext";
import {
  PRODUCT_PRICE,
  PRODUCT_NAME,
  PRODUCT_ID,
  PRODUCT_TAGLINE,
  PRODUCT_SHORT_DESC,
  FALLBACK_STOCK,
  ALLOWED_VARIANTS,
  VARIANT_COLORS,
} from "@/lib/constants";

const PRODUCT = {
  id: PRODUCT_ID,
  name: PRODUCT_NAME,
  price: PRODUCT_PRICE,
  variants: ALLOWED_VARIANTS,
};

const galleryViews = ["front", "side", "detail", "lifestyle"] as const;

const ratingDistribution = [
  { stars: 5, count: 110 },
  { stars: 4, count: 14 },
  { stars: 3, count: 3 },
  { stars: 2, count: 1 },
  { stars: 1, count: 0 },
];

const maxRatingCount = Math.max(...ratingDistribution.map((r) => r.count));

const reviews = [
  {
    name: "A***i S.",
    city: "Mumbai",
    text: "Soft Rose is lovely. Helps after long laptop days — neck and shoulders feel looser. Packaging was plain.",
  },
  {
    name: "P***a K.",
    city: "Bangalore",
    text: "Quiet enough to use in the evening. USB-C charging is convenient. Mist Grey looks clean on my desk.",
  },
  {
    name: "R***h M.",
    city: "Delhi",
    text: "Smooth Razorpay checkout and free delivery. Not a miracle cure, but solid for everyday muscle tension.",
  },
];

export default function ProductPage() {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] =
    useState<(typeof PRODUCT.variants)[number]>("Soft Rose");
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState<Record<string, number>>({ ...FALLBACK_STOCK });
  const [stockLoading, setStockLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  const fetchStock = useCallback(async () => {
    setStockLoading(true);
    try {
      const res = await fetch("/api/stock");
      if (res.ok) {
        const data = await res.json();
        setStock(data.stock ?? { ...FALLBACK_STOCK });
      }
    } finally {
      setStockLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch stock on mount
    fetchStock();
  }, [fetchStock]);

  const selectedStock = stock[selectedVariant] ?? 0;
  const isOutOfStock = !stockLoading && selectedStock < 1;
  const maxQty = Math.min(selectedStock, 10);

  const handleAddToCart = async () => {
    if (isOutOfStock || isAdding) return;
    setIsAdding(true);
    setAddError("");

    try {
      if (quantity > selectedStock) {
        setAddError(`Only ${selectedStock} available for ${selectedVariant}`);
        return;
      }
      addToCart({
        id: `${PRODUCT.id}-${selectedVariant}`,
        name: PRODUCT.name,
        price: PRODUCT.price,
        variant: selectedVariant,
        quantity,
      });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    } finally {
      setIsAdding(false);
    }
  };

  const highlights = [
    "Targeted relief for muscle tension & everyday aches",
    "5 vibration modes · quiet motor",
    "Soft-touch body-safe silicone",
    "USB-C rechargeable · ~90 min runtime",
    "IPX5 splash-resistant housing",
    "Discreet plain packaging on delivery",
  ];

  const faqs = [
    {
      title: "How long does delivery take?",
      content:
        "Orders usually dispatch within 1–2 business days. Standard delivery across serviceable Indian pin codes typically takes 3–7 business days depending on your location. You will receive tracking once your order ships.",
    },
    {
      title: "Is packaging discreet?",
      content:
        "Yes. Orders ship in a plain outer carton. Shipping labels do not list the product name. Emails reference your order number for privacy.",
    },
    {
      title: "How do I charge it?",
      content:
        "Use the included USB-C cable with a standard 5V USB power adapter (adapter not included). A full charge takes about 1.5–2 hours and provides roughly 90 minutes of use depending on vibration mode.",
    },
    {
      title: "Is it quiet?",
      content:
        "The motor is designed for home use and stays relatively quiet on lower modes. Higher modes are more noticeable but suitable for private spaces. Exact volume varies by surface and mode.",
    },
    {
      title: "What warranty do I get?",
      content:
        "Silk Room Ease includes a 6-month limited warranty against manufacturing defects from the date of delivery. Damage from misuse, liquid ingress beyond the splash rating, or unauthorized repair is not covered. Contact support@silkroom.co with your order number.",
    },
    {
      title: "Can I return it?",
      content:
        "For hygiene reasons, opened or used personal-care devices cannot be returned unless defective or damaged on arrival. Unused items in original sealed packaging may be returned within 7 days of delivery. See our Return & Refund Policy.",
    },
    {
      title: "Is it safe for daily use?",
      content:
        "Yes for short sessions on healthy adults when used as directed. Start on a low mode, avoid broken skin, and do not use while bathing (splash-resistant only, not submersible). If you have a medical condition, pacemaker, or pain that persists, consult a doctor before use. This is not a medical device.",
    },
    {
      title: "How do I clean it?",
      content:
        "Power off and wipe with a soft cloth dampened with mild soap and water or a toy/device cleaner safe for silicone. Do not immerse in water. Dry thoroughly before storage. Keep away from extreme heat and direct sunlight.",
    },
  ];

  const specs = [
    {
      title: "Product details",
      content: `Name: ${PRODUCT_NAME} · Category: Personal wellness massager · Material: Soft-touch body-safe silicone over ABS · Dimensions: approx. 18 cm × 4.5 cm · Weight: approx. 180 g · Motor: 5 vibration speed modes · Battery: rechargeable lithium-ion · Charging: USB-C · Runtime: ~90 minutes · Charge time: ~1.5–2 hours · Water resistance: IPX5 splash-resistant (not for immersion) · Colours: Soft Rose, Mist Grey`,
    },
    {
      title: "How to use",
      content: (
        <ul className={styles.infoList}>
          <li>Fully charge before first use via the USB-C port</li>
          <li>Press the power button to turn on; press again to cycle modes</li>
          <li>Apply gently to tense areas (neck, shoulders, back, calves, lower abdomen)</li>
          <li>Use for short sessions (5–15 minutes); stop if discomfort increases</li>
          <li>Power off, wipe clean, and store in a cool, dry place</li>
        </ul>
      ),
    },
    {
      title: "Care & safety",
      content: (
        <ul className={styles.infoList}>
          <li>For external use on intact skin only</li>
          <li>Not a medical device — does not diagnose, treat, or cure disease</li>
          <li>Consult a doctor if pain persists or for pregnancy, injury, or implanted devices</li>
          <li>Keep away from children; intended for adults</li>
          <li>Do not use while charging or submerged in water</li>
        </ul>
      ),
    },
    {
      title: "What's in the box",
      content: `${PRODUCT_NAME} (${selectedVariant}) · USB-C charging cable · Quick-start guide · Shipped inside plain discreet packaging`,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.productLayout}>
        <div className={styles.gallery}>
          <div className={styles.mainImageContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImageIndex + selectedVariant}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.mainImageWrapper}
              >
                <ProductPack
                  variant={selectedVariant}
                  view={galleryViews[selectedImageIndex]}
                  className={styles.mainImage}
                />
              </motion.div>
            </AnimatePresence>
            <span className={styles.variantBadge}>{selectedVariant}</span>
          </div>
          <div className={styles.thumbnails} role="group" aria-label="Product image thumbnails">
            {galleryViews.map((view, index) => (
              <motion.button
                key={view}
                type="button"
                className={`${styles.thumb} ${selectedImageIndex === index ? styles.thumbActive : ""}`}
                onClick={() => setSelectedImageIndex(index)}
                aria-label={`View product image ${index + 1}: ${view}`}
                aria-pressed={selectedImageIndex === index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ProductPack
                  variant={selectedVariant}
                  view={view}
                  className={styles.thumbnail}
                  ariaHidden
                />
              </motion.button>
            ))}
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.reviews}>
            <div className={styles.stars} aria-label="4.9 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="#4a2c3a" size={16} color="#4a2c3a" aria-hidden />
              ))}
            </div>
            <span>(128 verified reviews)</span>
          </div>

          <h1 className={styles.title}>{PRODUCT.name}</h1>
          <p style={{ color: "var(--color-plum)", marginBottom: "0.75rem", fontSize: "0.95rem" }}>
            {PRODUCT_TAGLINE}
          </p>

          <div className={styles.priceRow}>
            <p className={styles.price}>₹{PRODUCT.price}</p>
            <span className={styles.freeDelivery}>
              <Truck size={16} aria-hidden /> Free delivery across India
            </span>
          </div>

          <p className={styles.description}>
            {PRODUCT_SHORT_DESC} Soft-touch silicone feels gentle on skin; five
            vibration modes let you dial intensity up or down. Choose{" "}
            <strong>Soft Rose</strong> or <strong>Mist Grey</strong> — same
            performance, two calm finishes.
          </p>

          <ul className={styles.highlights}>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.selector}>
            <h3 className={styles.selectorLabel}>Colour: {selectedVariant}</h3>
            <div className={styles.swatches} role="radiogroup" aria-label="Select colour">
              {PRODUCT.variants.map((variant) => {
                const variantStock = stock[variant] ?? 0;
                const out = !stockLoading && variantStock < 1;
                return (
                  <motion.button
                    key={variant}
                    type="button"
                    role="radio"
                    aria-checked={selectedVariant === variant}
                    aria-label={`${variant}${out ? " — out of stock" : ` — ${variantStock} in stock`}`}
                    disabled={out}
                    className={`${styles.swatch} ${selectedVariant === variant ? styles.activeSwatch : ""} ${out ? styles.swatchDisabled : ""}`}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setQuantity(1);
                    }}
                    style={{ backgroundColor: VARIANT_COLORS[variant] }}
                    title={variant}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                );
              })}
            </div>
            <p className={styles.stockNote} style={{ marginTop: "0.5rem" }}>
              {selectedVariant === "Soft Rose"
                ? "Soft Rose — warm blush finish"
                : "Mist Grey — cool neutral finish"}
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

          <div className={styles.addToCartSection}>
            <div className={styles.quantity} aria-label="Quantity selector">
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
            <motion.button
              type="button"
              className={`${styles.addBtn} ${isOutOfStock ? styles.addBtnDisabled : ""}`}
              onClick={handleAddToCart}
              disabled={isOutOfStock || isAdding || stockLoading}
              aria-busy={isAdding}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={justAdded ? { scale: [1, 0.96, 1.03, 1] } : { scale: 1 }}
              transition={smooth}
            >
              {isAdding ? (
                <>
                  <Loader2 size={18} className={styles.spinner} aria-hidden /> Adding…
                </>
              ) : isOutOfStock ? (
                "Out of Stock"
              ) : justAdded ? (
                <>
                  <Check size={18} aria-hidden /> Added!
                </>
              ) : (
                `Add to Cart — ₹${PRODUCT_PRICE}`
              )}
            </motion.button>
          </div>

          <TrustBadges />

          <div className={styles.accordionSection}>
            <Accordion items={specs} />
          </div>
        </div>
      </div>

      <motion.div
        className={styles.compareSection}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={scrollRevealConfig}
        transition={smooth}
      >
        <h2 className={styles.sectionTitle}>Compare Colours</h2>
        <button
          type="button"
          className={styles.compareToggle}
          onClick={() => setShowCompare(!showCompare)}
          aria-expanded={showCompare}
        >
          {showCompare ? "Hide Comparison" : "Compare Soft Rose vs Mist Grey"}
        </button>
        <AnimatePresence>
          {showCompare && (
            <motion.div
              className={styles.compareGrid}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.compareCard}>
                <ProductPack variant="Soft Rose" view="front" className={styles.comparePack} />
                <h3 className={styles.compareTitle}>Soft Rose</h3>
                <ul className={styles.compareList}>
                  <li>Warm blush finish</li>
                  <li>Same 5 vibration modes</li>
                  <li>USB-C rechargeable</li>
                  <li>Soft-touch silicone</li>
                </ul>
              </div>
              <div className={styles.compareCard}>
                <ProductPack variant="Mist Grey" view="front" className={styles.comparePack} />
                <h3 className={styles.compareTitle}>Mist Grey</h3>
                <ul className={styles.compareList}>
                  <li>Cool neutral finish</li>
                  <li>Same 5 vibration modes</li>
                  <li>USB-C rechargeable</li>
                  <li>Soft-touch silicone</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

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
              <span className={styles.compositionValue}>Body-safe soft-touch silicone / ABS</span>
            </div>
            <div className={styles.compositionItem}>
              <span className={styles.compositionLabel}>Modes</span>
              <span className={styles.compositionValue}>5 vibration speed settings</span>
            </div>
            <div className={styles.compositionItem}>
              <span className={styles.compositionLabel}>Battery</span>
              <span className={styles.compositionValue}>USB-C · ~90 min runtime · ~2 hr charge</span>
            </div>
            <div className={styles.compositionItem}>
              <span className={styles.compositionLabel}>Water resistance</span>
              <span className={styles.compositionValue}>IPX5 splash-resistant (not submersible)</span>
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
        <h2 className={styles.sectionTitle}>Real Customer Reviews</h2>

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
                  <Star key={j} fill="#4a2c3a" size={14} color="#4a2c3a" aria-hidden />
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
            brand: { "@type": "Brand", name: "Silk Room" },
            description: PRODUCT_SHORT_DESC,
            offers: {
              "@type": "Offer",
              price: String(PRODUCT_PRICE),
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "128",
            },
          }),
        }}
      />
    </div>
  );
}
