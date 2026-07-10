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
  const [selectedVariant, setSelectedVariant] = useState<(typeof PRODUCT.variants)[number]>("Pearl");
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
    "Cordless percussion massage for muscle relief",
    "6 adjustable speed levels",
    "Quiet brushless motor",
    "USB-C rechargeable · ~4 hour runtime",
    "Soft silicone massage heads included",
    "Lightweight design for home or travel",
  ];

  const faqs = [
    {
      title: "What is this massager used for?",
      content:
        "The Deep Relief Massager is a personal muscle massage device for everyday wellness. Use it on sore shoulders, neck, back, calves, and other large muscle groups to support recovery after workouts, long desk days, or general tension.",
    },
    {
      title: "Is delivery free across India?",
      content: `Yes — ₹${PRODUCT_PRICE} is your all-in price. We offer free doorstep delivery to every serviceable pincode in India. No hidden shipping fees at checkout.`,
    },
    {
      title: "When will my order arrive?",
      content:
        "Orders are typically dispatched within 24–48 hours of payment confirmation. Delivery usually takes 2–4 business days in metro cities and 3–6 business days elsewhere in India.",
    },
    {
      title: "Is payment secure?",
      content:
        "Yes. Checkout is prepaid only via Razorpay with bank-grade 256-bit SSL encryption. We never store your card number or UPI PIN on our servers.",
    },
    {
      title: "What is your return & refund policy?",
      content:
        "Unused products in original packaging may be returned within 7 days of delivery. Defective or damaged items are eligible for replacement or refund. See our Return & Refund Policy for full details.",
    },
  ];

  const specs = [
    {
      title: "Materials & Care",
      content:
        "Durable ABS housing with soft silicone massage attachments. Wipe the device and heads with a clean, slightly damp cloth after use. Do not immerse the motor unit in water. Store in the included pouch away from extreme heat.",
    },
    {
      title: "Specifications",
      content:
        "Type: Cordless percussion muscle massager · Speeds: 6 levels · Motor: Quiet brushless · Battery: Rechargeable lithium-ion · Runtime: up to ~4 hours · Charge: USB-C, ~2–3 hours · Weight: approx. 450 g · Noise: designed for home use · Intended use: muscle relief & relaxation on large muscle groups",
    },
    {
      title: "What's in the Box",
      content:
        "Deep Relief Massager · Soft silicone massage heads · USB-C charging cable · Soft storage pouch · Quick-start guide",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.productLayout}>
        <div className={styles.gallery}>
          <div className={styles.mainImageContainer}>
            <Image
              src={mainImage}
              alt={`${PRODUCT.name} in ${selectedVariant} — cordless muscle massage gun`}
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
            <span>(128 verified reviews)</span>
          </div>

          <h1 className={styles.title}>{PRODUCT.name}</h1>

          <div className={styles.priceRow}>
            <p className={styles.price}>₹{PRODUCT.price}</p>
            <span className={styles.freeDelivery}>
              <Truck size={16} aria-hidden /> Free delivery across India
            </span>
          </div>

          <p className={styles.description}>
            A cordless percussion massager built for targeted muscle relief and everyday
            relaxation. Six speed levels and a quiet brushless motor help you work through
            tension in the neck, shoulders, back, and legs — at home, at the gym, or after a long day.
          </p>

          <ul className={styles.highlights}>
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className={styles.selector}>
            <h3 className={styles.selectorLabel}>Color: {selectedVariant}</h3>
            <div className={styles.swatches} role="radiogroup" aria-label="Select color variant">
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
                      if (variant === "Sage") setMainImage(productImages[2]);
                      else setMainImage(productImages[0]);
                    }}
                    style={{ backgroundColor: VARIANT_COLORS[variant] }}
                  />
                );
              })}
            </div>
            {stockLoading ? (
              <p className={styles.stockNote} aria-live="polite">Checking availability…</p>
            ) : isOutOfStock ? (
              <p className={styles.outOfStock} role="status">Out of Stock</p>
            ) : (
              <p className={styles.inStock} role="status">In Stock — {selectedStock} available</p>
            )}
          </div>

          {addError && <p className={styles.addError} role="alert">{addError}</p>}

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
            <button
              type="button"
              className={`${styles.addBtn} ${isOutOfStock ? styles.addBtnDisabled : ""}`}
              onClick={handleAddToCart}
              disabled={isOutOfStock || isAdding || stockLoading}
              aria-busy={isAdding}
            >
              {isAdding ? (
                <>
                  <Loader2 size={18} className={styles.spinner} aria-hidden /> Adding…
                </>
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
            { name: "A***i S.", city: "Mumbai", text: "Great for post-gym shoulder and calf relief. Quiet enough to use at home in the evening. Packaging was plain and delivery was free." },
            { name: "P***a K.", city: "Bangalore", text: "Solid build for the price. Six speeds are useful — I keep it on mid for desk-day neck tension. Arrived in 3 days." },
            { name: "R***h M.", city: "Delhi", text: "Checkout was smooth and prepaid felt secure. The Sage colour looks premium. Already using it after long workdays." },
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
