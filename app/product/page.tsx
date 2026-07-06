"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Star, ShieldCheck, Loader2 } from "lucide-react";
import styles from "./Product.module.css";
import Accordion from "@/components/Accordion";
import TrustBadges from "@/components/TrustBadges";
import { useCart } from "@/context/CartContext";
import { PRODUCT_PRICE } from "@/lib/constants";

const PRODUCT = {
  id: "silk-room-signature",
  name: "The Signature Curve",
  price: PRODUCT_PRICE,
  variants: ["Blush", "Plum"] as const,
};

export default function ProductPage() {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<(typeof PRODUCT.variants)[number]>("Blush");
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState<Record<string, number>>({ Blush: 0, Plum: 0 });
  const [stockLoading, setStockLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState("");

  const fetchStock = useCallback(async () => {
    setStockLoading(true);
    try {
      const res = await fetch("/api/stock");
      if (res.ok) {
        const data = await res.json();
        setStock(data.stock ?? { Blush: 0, Plum: 0 });
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

  const faqs = [
    {
      title: "Is the packaging completely discreet?",
      content: "Absolutely. We ship in a plain, unbranded brown box. There is no mention of Silk Room or the contents on the shipping label. The sender will appear as a generic fulfillment center.",
    },
    {
      title: "When will my order arrive?",
      content: "Orders are processed within 24 hours. Delivery typically takes 2-4 business days depending on your location in India.",
    },
    {
      title: "Is my payment secure?",
      content: "Yes, we use bank-grade 256-bit SSL encryption via Razorpay. We do not store your credit card or UPI details on our servers.",
    },
    {
      title: "What is your replacement policy?",
      content: "Due to the intimate nature of the product, we do not accept general returns. However, we offer a 7-day hassle-free replacement if the product arrives damaged or defective.",
    },
  ];

  const specs = [
    {
      title: "Materials & Care",
      content: "Made from 100% medical-grade, body-safe silicone. Phthalate-free and non-porous. Clean with warm water and mild unscented soap before and after each use. Store in the provided satin pouch.",
    },
    {
      title: "Specifications",
      content: "Length: 7.5 inches. Width: 1.4 inches. Whisper-quiet motor (<50dB). Waterproof (IPX7 rating). USB magnetic charging (cable included).",
    },
  ];

  const productImages = ["/product-1.jpg", "/product-2.jpg", "/product-3.jpg", "/product-4.jpg"];
  const [mainImage, setMainImage] = useState(productImages[0]);

  return (
    <div className={styles.container}>
      <div className={styles.productLayout}>
        <div className={styles.gallery}>
          <div className={styles.mainImageContainer}>
            <Image
              src={mainImage}
              alt={`The Signature Curve in ${selectedVariant} — premium silicone wellness product`}
              fill
              style={{ objectFit: "cover" }}
              className={styles.actualImage}
              priority
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
                <Image src={img} alt="" fill style={{ objectFit: "cover" }} className={styles.thumbImage} aria-hidden />
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
          <p className={styles.price}>₹{PRODUCT.price}</p>
          <p className={styles.description}>
            Ergonomically designed for precise comfort. The Signature Curve offers deep,
            rumbling vibrations wrapped in velvety, premium medical-grade silicone.
          </p>

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
                    }}
                    style={{ backgroundColor: variant === "Blush" ? "#f4e9e4" : "#4a2c3a" }}
                  />
                );
              })}
            </div>
            {stockLoading ? (
              <p className={styles.stockNote} aria-live="polite">Checking availability…</p>
            ) : isOutOfStock ? (
              <p className={styles.outOfStock} role="status">Out of Stock</p>
            ) : (
              <p className={styles.stockNote}>{selectedStock} available</p>
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
                "Add to Cart"
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
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.reviewCard}>
              <div className={styles.stars} aria-label="5 out of 5 stars">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} fill="#4a2c3a" size={14} color="#4a2c3a" aria-hidden />
                ))}
              </div>
              <p className={styles.reviewText}>
                &ldquo;Absolutely incredible quality. The packaging was so discreet, even my roommate had no idea what it was. Worth every penny.&rdquo;
              </p>
              <div className={styles.reviewer}>
                <span className={styles.reviewerName}>A***i S.</span>
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
