"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, Loader2, Truck, Check } from "lucide-react";
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
  PRODUCT_SPECS,
  PRODUCT_GALLERY,
  PRODUCT_COVER_IMAGE,
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
    text: "Natural finish looks and feels premium. Dual density is noticeable — soft outside, stable core. Packaging was totally plain.",
  },
  {
    name: "R***a K.",
    city: "Bangalore",
    text: "Espresso is gorgeous. Suction cup holds on tile. Fully waterproof as promised — easy to clean.",
  },
  {
    name: "A***i S.",
    city: "Delhi",
    text: "Smooth Razorpay checkout and free discreet delivery. Size is as described. Would recommend for self-care nights.",
  },
];

export default function ProductPage() {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] =
    useState<(typeof PRODUCT.variants)[number]>("Natural");
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState<Record<string, number>>({ ...FALLBACK_STOCK });
  const [stockLoading, setStockLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const gallery = PRODUCT_GALLERY[selectedVariant];
  const isCoverImage =
    selectedImageIndex === 0 ||
    gallery[selectedImageIndex]?.includes("product-cover-model") ||
    gallery[selectedImageIndex] === PRODUCT_COVER_IMAGE;

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

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedVariant]);

  const selectedStock = stock[selectedVariant] ?? 0;
  const isOutOfStock = !stockLoading && selectedStock < 1;
  const maxQty = Math.min(selectedStock, 10);

  const handleAddToCart = () => {
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
    "Dual-density body-safe liquid silicone",
    `${PRODUCT_SPECS.totalLength} total · ${PRODUCT_SPECS.insertableLength} usable length`,
    "Secure base for hands-free comfort",
    "Fully waterproof · easy to clean",
    "Two finishes: Natural & Espresso",
    "Discreet plain packaging on delivery",
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
        "Yes. Orders ship in a plain outer carton with no product name or adult branding on the label. Emails reference your order number only.",
    },
    {
      title: "What is dual density?",
      content:
        "A firmer inner core for structure and thrusting stability, wrapped in a softer outer silicone layer that feels more skin-like and warms to body temperature.",
    },
    {
      title: "Is it waterproof?",
      content:
        "Yes — fully waterproof for shower or bath use. Clean with warm water and mild soap (or a toy cleaner safe for silicone). Dry thoroughly before storage.",
    },
    {
      title: "What warranty do I get?",
      content:
        "6-month limited warranty against manufacturing defects from delivery date. Misuse, improper cleaning, or unauthorized modifications are not covered. Email support@silkroom.co with your order number.",
    },
    {
      title: "Can I return it?",
      content:
        "For hygiene reasons, opened or used intimate products cannot be returned unless defective or damaged on arrival. Unused items in original sealed packaging may be returned within 7 days. See our Return & Refund Policy.",
    },
    {
      title: "Is it safe for daily use?",
      content:
        "Yes for healthy adults 18+ when used with water-based lubricant as desired. Do not use oil-based lubes with silicone. Stop if irritation occurs. This is an adult pleasure product, not a medical device.",
    },
    {
      title: "Natural vs Espresso?",
      content:
        "Same dual-density design and size — Natural is a soft flesh tone; Espresso is a deep cocoa finish. Choose the look you prefer.",
    },
  ];

  const specs = [
    {
      title: "Product details",
      content: `Name: ${PRODUCT_NAME} · Material: ${PRODUCT_SPECS.material} · Total length: ${PRODUCT_SPECS.totalLength} · Insertable: ${PRODUCT_SPECS.insertableLength} · Diameter: ${PRODUCT_SPECS.diameter} · Weight: ${PRODUCT_SPECS.weight} · Base: ${PRODUCT_SPECS.base} · ${PRODUCT_SPECS.waterproof} · Colours: Natural, Espresso · Adults 18+ only`,
    },
    {
      title: "How to use",
      content: (
        <ul className={styles.infoList}>
          <li>Wash before first use with warm water and mild soap</li>
          <li>Apply water-based lubricant as desired</li>
          <li>For hands-free play, press the suction cup firmly onto a smooth, clean surface</li>
          <li>Start slowly; listen to your body</li>
          <li>Clean after use, dry fully, store in a cool dry place (pouch recommended)</li>
        </ul>
      ),
    },
    {
      title: "Care & safety",
      content: (
        <ul className={styles.infoList}>
          <li>For adult use only (18+)</li>
          <li>Body-safe liquid silicone — non-porous when intact</li>
          <li>Use water-based lubricant only with silicone toys</li>
          <li>Not a medical device</li>
          <li>If irritation occurs, discontinue use</li>
        </ul>
      ),
    },
    {
      title: "What's in the box",
      content: `${PRODUCT_NAME} (${selectedVariant}) · Storage pouch (where included) · Quick-start / care card · Shipped inside plain discreet packaging`,
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
                key={gallery[selectedImageIndex] + selectedVariant}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={styles.mainImageWrapper}
              >
                <Image
                  src={gallery[selectedImageIndex]}
                  alt={`${PRODUCT_NAME} ${selectedVariant} — view ${selectedImageIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.mainPhoto}
                  priority={selectedImageIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
            <span className={styles.variantBadge}>{selectedVariant}</span>
          </div>
          <div className={styles.galleryDots} role="tablist" aria-label="Gallery position">
            {gallery.map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                className={`${styles.galleryDot} ${selectedImageIndex === index ? styles.galleryDotActive : ""}`}
                aria-label={`Go to image ${index + 1}`}
                aria-current={selectedImageIndex === index}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>
          <div className={styles.thumbnails} role="group" aria-label="Product images">
            {gallery.map((src, index) => (
              <motion.button
                key={src}
                type="button"
                className={`${styles.thumb} ${selectedImageIndex === index ? styles.thumbActive : ""}`}
                onClick={() => setSelectedImageIndex(index)}
                aria-label={`View image ${index + 1}`}
                aria-pressed={selectedImageIndex === index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={src}
                  alt=""
                  width={152}
                  height={152}
                  className={styles.thumbnail}
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
            <span>(119 verified reviews) · Adults 18+</span>
          </div>

          <h1 className={styles.title}>{PRODUCT.name}</h1>
          <p className={styles.tagline}>{PRODUCT_TAGLINE}</p>

          <div className={styles.priceRow}>
            <p className={styles.price}>₹{PRODUCT.price}</p>
            <span className={styles.freeDelivery}>
              <Truck size={16} aria-hidden /> Free discreet delivery
            </span>
          </div>

          <p className={styles.description}>
            {PRODUCT_SHORT_DESC} Choose <strong>Natural</strong> or <strong>Espresso</strong> —
            same dual-density build, two finishes.
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
                    aria-label={`${variant}${out ? " — out of stock" : ""}`}
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
                  />
                );
              })}
            </div>
            <p className={styles.stockNote}>
              {selectedVariant === "Natural"
                ? "Natural — soft nude finish"
                : "Espresso — deep cocoa finish"}
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

          <div className={styles.addToCartSection} id="add-to-cart">
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

          <div className={styles.stickyBar} aria-hidden={false}>
            <div className={styles.stickyPrice}>
              <span>{PRODUCT.name}</span>
              <strong>₹{PRODUCT_PRICE}</strong>
            </div>
            <button
              type="button"
              className={styles.stickyBtn}
              onClick={handleAddToCart}
              disabled={isOutOfStock || isAdding || stockLoading}
            >
              {isOutOfStock ? "Sold out" : justAdded ? "Added" : "Add to cart"}
            </button>
          </div>

          <TrustBadges />
          <div className={styles.accordionSection}>
            <Accordion items={specs} />
          </div>
        </div>
      </div>

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
                {PRODUCT_SPECS.totalLength} total · {PRODUCT_SPECS.insertableLength} insertable ·{" "}
                {PRODUCT_SPECS.diameter} diameter
              </span>
            </div>
            <div className={styles.compositionItem}>
              <span className={styles.compositionLabel}>Weight</span>
              <span className={styles.compositionValue}>{PRODUCT_SPECS.weight}</span>
            </div>
            <div className={styles.compositionItem}>
              <span className={styles.compositionLabel}>Features</span>
              <span className={styles.compositionValue}>
                Dual density · suction cup · {PRODUCT_SPECS.waterproof}
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
            brand: { "@type": "Brand", name: "Silk Room" },
            description: PRODUCT_SHORT_DESC,
            image: [`https://silkroom.shop${PRODUCT_GALLERY.Natural[0]}`],
            offers: {
              "@type": "Offer",
              price: String(PRODUCT_PRICE),
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              reviewCount: "119",
            },
          }),
        }}
      />
    </div>
  );
}
