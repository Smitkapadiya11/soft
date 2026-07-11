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
  PRODUCT_PACK_SIZE,
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
  { stars: 5, count: 120 },
  { stars: 4, count: 8 },
  { stars: 3, count: 2 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

const maxRatingCount = Math.max(...ratingDistribution.map((r) => r.count));

const reviews = [
  { name: "A***i S.", city: "Mumbai", text: "Ultra Thin feels great and packaging was completely discreet. Delivery was free and fast." },
  { name: "P***a K.", city: "Bangalore", text: "Ordered Dotted for my partner and me — quality seals, clear expiry, no awkward branding on the box." },
  { name: "R***h M.", city: "Delhi", text: "Smooth Razorpay checkout. Good to have a trusted online option with a real return policy for unopened packs." },
];

export default function ProductPage() {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<(typeof PRODUCT.variants)[number]>("Ultra Thin");
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
    "Natural latex · individually sealed foils",
    `${PRODUCT_PACK_SIZE} per order`,
    "Ultra Thin — barely-there comfort",
    "Dotted — textured for added sensation",
    "Designed for comfort for women & men",
    "Discreet plain packaging on delivery",
  ];

  const faqs = [
    {
      title: "Who is this product for?",
      content:
        "Silk Room Ultra Comfort condoms are for adults aged 18+. They support safer intimacy with options focused on comfort (Ultra Thin) and texture (Dotted) — suitable for couples who want reliable protection without compromising feel.",
    },
    {
      title: "What material are they made of?",
      content:
        "Natural latex. If you have a latex allergy, do not use these products and consult a healthcare professional for alternatives.",
    },
    {
      title: "Is packaging discreet?",
      content:
        "Yes. Orders ship in a plain outer carton. Shipping labels do not list product names. Emails reference your order number for privacy.",
    },
    {
      title: "Is delivery free?",
      content: `Yes — ₹${PRODUCT_PRICE} is your all-in price for ${PRODUCT_PACK_SIZE}. Free standard delivery across serviceable pin codes in India.`,
    },
    {
      title: "Can I return opened packs?",
      content:
        "For hygiene reasons, opened or unsealed condoms cannot be returned unless defective or damaged on arrival. Unopened sealed packs may be returned within 7 days. See our Return & Refund Policy.",
    },
    {
      title: "Usage Instructions",
      content: (
        <ul className={styles.infoList}>
          <li>Store in a cool, dry place away from direct sunlight</li>
          <li>Check expiry date before use</li>
          <li>Use a new condom for each act of intercourse</li>
          <li>Dispose of responsibly after use</li>
        </ul>
      ),
    },
    {
      title: "Safety Information",
      content: (
        <ul className={styles.infoList}>
          <li>This product is for adult use only (18+)</li>
          <li>Not a medical device — does not guarantee 100% protection</li>
          <li>If irritation occurs, discontinue use and consult a doctor</li>
          <li>Do not use if the packaging is damaged</li>
        </ul>
      ),
    },
  ];

  const specs = [
    {
      title: "Product details",
      content: `Name: ${PRODUCT_NAME} · Category: Condoms / sexual wellness · Material: Natural latex · Pack size: ${PRODUCT_PACK_SIZE} · Variants: Ultra Thin (smooth, thinner feel) and Dotted (textured) · Use: as directed on the manufacturer packaging · Check expiry date on delivery`,
    },
    {
      title: "Benefits",
      content:
        "For men: reliable barrier protection with a comfortable fit. For women: smoother comfort-focused options and discreet delivery. For couples: two clear choices — Ultra Thin for sensitivity, Dotted for texture — without awkward in-store shopping.",
    },
    {
      title: "What's in the box",
      content: `${PRODUCT_PACK_SIZE} of sealed ${selectedVariant} condoms · Outer retail carton · Shipped inside plain discreet packaging`,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.productLayout}>
        {/* Gallery */}
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
          <div className={styles.thumbnails} role="list" aria-label="Product image thumbnails">
            {galleryViews.map((view, index) => (
              <motion.button
                key={index}
                type="button"
                role="listitem"
                className={`${styles.thumb} ${selectedImageIndex === index ? styles.thumbActive : ""}`}
                onClick={() => setSelectedImageIndex(index)}
                aria-label={`View product image ${index + 1}`}
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

        {/* Details */}
        <div className={styles.details}>
          <div className={styles.reviews}>
            <div className={styles.stars} aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} fill="#4a2c3a" size={16} color="#4a2c3a" aria-hidden />
              ))}
            </div>
            <span>(128 verified reviews) · Adults 18+</span>
          </div>

          <h1 className={styles.title}>{PRODUCT.name}</h1>
          <p style={{ color: "var(--color-plum)", marginBottom: "0.75rem", fontSize: "0.95rem" }}>
            {PRODUCT_PACK_SIZE} · Natural latex condoms
          </p>

          <div className={styles.priceRow}>
            <p className={styles.price}>₹{PRODUCT.price}</p>
            <span className={styles.freeDelivery}>
              <Truck size={16} aria-hidden /> Free delivery across India
            </span>
          </div>

          <p className={styles.description}>
            Premium sealed condoms for comfortable, confident intimacy. Choose{" "}
            <strong>Ultra Thin</strong> for a barely-there feel, or <strong>Dotted</strong> for
            gentle texture — both made from natural latex and shipped in discreet packaging.
          </p>

          <ul className={styles.highlights}>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.selector}>
            <h3 className={styles.selectorLabel}>Type: {selectedVariant}</h3>
            <div className={styles.swatches} role="radiogroup" aria-label="Select condom type">
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
              {selectedVariant === "Ultra Thin"
                ? "Ultra Thin — smooth, thinner feel for maximum sensitivity"
                : "Dotted — textured surface for added sensation"}
            </p>
            {stockLoading ? (
              <p className={styles.stockNote} aria-live="polite">Checking availability…</p>
            ) : isOutOfStock ? (
              <p className={styles.outOfStock} role="status">Out of Stock</p>
            ) : (
              <p className={styles.inStock} role="status">In Stock — {selectedStock} packs available</p>
            )}
          </div>

          {addError && <p className={styles.addError} role="alert">{addError}</p>}

          <div className={styles.addToCartSection}>
            <div className={styles.quantity} aria-label="Quantity selector">
              <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={isOutOfStock || quantity <= 1} aria-label="Decrease quantity">−</button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" onClick={() => setQuantity(Math.min(maxQty, quantity + 1))} disabled={isOutOfStock || quantity >= maxQty} aria-label="Increase quantity">+</button>
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
                <><Loader2 size={18} className={styles.spinner} aria-hidden /> Adding…</>
              ) : isOutOfStock ? (
                "Out of Stock"
              ) : justAdded ? (
                <><Check size={18} aria-hidden /> Added!</>
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

      {/* Compare Variants */}
      <motion.div
        className={styles.compareSection}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={scrollRevealConfig}
        transition={smooth}
      >
        <h2 className={styles.sectionTitle}>Compare Variants</h2>
        <button
          type="button"
          className={styles.compareToggle}
          onClick={() => setShowCompare(!showCompare)}
          aria-expanded={showCompare}
        >
          {showCompare ? "Hide Comparison" : "Compare Ultra Thin vs Dotted"}
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
                <ProductPack variant="Ultra Thin" view="front" className={styles.comparePack} />
                <h3 className={styles.compareTitle}>Ultra Thin</h3>
                <ul className={styles.compareList}>
                  <li>Smooth, thinner feel for maximum sensitivity</li>
                  <li>Thickness ~0.05mm</li>
                  <li>Silk-smooth silicone lubricant</li>
                  <li>Barely-there comfort</li>
                </ul>
              </div>
              <div className={styles.compareCard}>
                <ProductPack variant="Dotted" view="front" className={styles.comparePack} />
                <h3 className={styles.compareTitle}>Dotted</h3>
                <ul className={styles.compareList}>
                  <li>Textured surface for added sensation</li>
                  <li>Thickness ~0.07mm</li>
                  <li>Silicone-based lubricant</li>
                  <li>Raised dotted texture</li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Material & Composition */}
      <motion.div
        className={styles.compositionSection}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={scrollRevealConfig}
        transition={smooth}
      >
        <h2 className={styles.sectionTitle}>Material &amp; Composition</h2>
        <div className={styles.compositionCard}>
          <div className={styles.compositionList}>
            <div className={styles.compositionItem}>
              <span className={styles.compositionLabel}>Material</span>
              <span className={styles.compositionValue}>Premium natural latex rubber</span>
            </div>
            <div className={styles.compositionItem}>
              <span className={styles.compositionLabel}>Lubrication</span>
              <span className={styles.compositionValue}>Silicone-based lubricant</span>
            </div>
            <div className={styles.compositionItem}>
              <span className={styles.compositionLabel}>Thickness</span>
              <span className={styles.compositionValue}>Ultra Thin ~0.05mm / Dotted ~0.07mm</span>
            </div>
            <div className={styles.compositionItem}>
              <span className={styles.compositionLabel}>Shelf life</span>
              <span className={styles.compositionValue}>5 years from manufacture date</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAQ */}
      <div className={styles.bottomSection}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqWrapper}>
          <Accordion items={faqs} />
        </div>
      </div>

      {/* Reviews */}
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
                <span className={styles.reviewerName}>{review.name} · {review.city}</span>
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
            name: "Silk Room Ultra Comfort",
            brand: { "@type": "Brand", name: "Silk Room" },
            description: "Natural latex condoms — Ultra Thin & Dotted variants. Pack of 10.",
            offers: {
              "@type": "Offer",
              price: "299",
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
