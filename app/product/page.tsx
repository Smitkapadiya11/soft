"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Star, ShieldCheck, Loader2, Truck } from "lucide-react";
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

const productImages = [
  "/product-1.png",
  "/product-2.png",
  "/product-3.png",
  "/product-4.png",
];

export default function ProductPage() {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<(typeof PRODUCT.variants)[number]>("Ultra Thin");
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState<Record<string, number>>({ ...FALLBACK_STOCK });
  const [stockLoading, setStockLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState("");
  const [mainImage, setMainImage] = useState(productImages[0]);

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
        image: "/placeholder.png",
      });
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
        <div className={styles.gallery}>
          <div className={styles.mainImageContainer}>
            <Image
              src={mainImage}
              alt={`${PRODUCT.name} ${selectedVariant} condoms — ${PRODUCT_PACK_SIZE}`}
              fill
              style={{ objectFit: "cover" }}
              className={styles.actualImage}
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <span className={styles.variantBadge}>{selectedVariant}</span>
          </div>
          <div className={styles.thumbnails} role="list" aria-label="Product image thumbnails">
            {productImages.map((img, index) => (
              <button
                key={index}
                type="button"
                role="listitem"
                className={`${styles.thumb} ${mainImage === img ? styles.thumbActive : ""}`}
                onClick={() => setMainImage(img)}
                aria-label={`View product image ${index + 1}`}
                aria-pressed={mainImage === img}
              >
                <Image src={img} alt="" fill style={{ objectFit: "cover" }} className={styles.thumbImage} aria-hidden sizes="80px" />
              </button>
            ))}
          </div>
        </div>

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
                  <button
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
                      setMainImage(variant === "Dotted" ? productImages[1] : productImages[0]);
                    }}
                    style={{ backgroundColor: VARIANT_COLORS[variant] }}
                    title={variant}
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
            <button
              type="button"
              className={`${styles.addBtn} ${isOutOfStock ? styles.addBtnDisabled : ""}`}
              onClick={handleAddToCart}
              disabled={isOutOfStock || isAdding || stockLoading}
              aria-busy={isAdding}
            >
              {isAdding ? (
                <><Loader2 size={18} className={styles.spinner} aria-hidden /> Adding…</>
              ) : isOutOfStock ? (
                "Out of Stock"
              ) : (
                `Add to Cart — ₹${PRODUCT_PRICE}`
              )}
            </button>
          </div>

          <TrustBadges />

          <div className={styles.accordionSection}>
            <Accordion items={specs} />
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <div className={styles.faqWrapper}>
          <Accordion items={faqs} />
        </div>
      </div>

      <div className={styles.reviewsSection}>
        <h2 className={styles.sectionTitle}>Real Customer Reviews</h2>
        <div className={styles.reviewGrid}>
          {[
            { name: "A***i S.", city: "Mumbai", text: "Ultra Thin feels great and packaging was completely discreet. Delivery was free and fast." },
            { name: "P***a K.", city: "Bangalore", text: "Ordered Dotted for my partner and me — quality seals, clear expiry, no awkward branding on the box." },
            { name: "R***h M.", city: "Delhi", text: "Smooth Razorpay checkout. Good to have a trusted online option with a real return policy for unopened packs." },
          ].map((review) => (
            <div key={review.name} className={styles.reviewCard}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
