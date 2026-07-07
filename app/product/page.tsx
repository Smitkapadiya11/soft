"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Star, ShieldCheck, Loader2, Truck } from "lucide-react";
import styles from "./Product.module.css";
import Accordion from "@/components/Accordion";
import TrustBadges from "@/components/TrustBadges";
import { useCart } from "@/context/CartContext";
import { PRODUCT_PRICE, FALLBACK_STOCK } from "@/lib/constants";

const PRODUCT = {
  id: "silk-room-signature",
  name: "The Signature Curve",
  price: PRODUCT_PRICE,
  variants: ["Blush", "Plum"] as const,
};

const productImages = [
  "/product-1.png",
  "/product-2.png",
  "/product-3.png",
  "/product-4.png",
];

export default function ProductPage() {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<(typeof PRODUCT.variants)[number]>("Blush");
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
    "100% platinum-cured, medical-grade silicone",
    "Phthalate-free, hypoallergenic & non-porous",
    "Whisper-quiet motor under 50dB",
    "Fully waterproof — IPX7 rated",
    "Magnetic USB charging included",
    "Includes satin storage pouch",
  ];

  const faqs = [
    {
      title: "Is the packaging completely discreet?",
      content:
        "Absolutely. Every order ships in a plain, unbranded outer box with no mention of Silk Room or product contents on the label. The sender name appears as a generic fulfillment partner.",
    },
    {
      title: "Is delivery really free across India?",
      content:
        "Yes — ₹549 is your all-in price. We offer free doorstep delivery to every pincode in India. No hidden shipping fees at checkout.",
    },
    {
      title: "When will my order arrive?",
      content:
        "Orders are dispatched within 24 hours. Delivery typically takes 2–4 business days across metro cities and 3–6 business days for other regions in India.",
    },
    {
      title: "Is my payment and order data secure?",
      content:
        "Yes. Checkout is protected with bank-grade 256-bit SSL encryption. Your order details are secured with end-to-end encryption — we never store card numbers or UPI PINs.",
    },
    {
      title: "What is your replacement policy?",
      content:
        "Due to hygiene standards, we do not accept general returns. We offer a hassle-free 7-day replacement if your product arrives damaged or defective.",
    },
  ];

  const specs = [
    {
      title: "Materials & Care",
      content:
        "Crafted from 100% platinum-cured, medical-grade silicone — the same purity standard used in medical devices. Non-porous, phthalate-free, and body-safe. Clean with warm water and mild unscented soap before and after each use. Store in the included satin pouch away from direct sunlight.",
    },
    {
      title: "Specifications",
      content:
        "Length: 7.5 in (19 cm) · Width: 1.4 in (3.5 cm) · Weight: 180 g · Motor: 10 rumbling vibration modes · Noise: <50 dB · Battery: 90 min runtime · Charge: 2 hrs via magnetic USB · Waterproof: IPX7 · Certifications: ISO 10993 biocompatibility tested",
    },
    {
      title: "What's in the Box",
      content:
        "The Signature Curve device · Magnetic USB charging cable · Satin storage pouch · Quick-start guide · Discreet outer packaging",
    },
  ];

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
            Ergonomically sculpted for precise, comfortable stimulation. The Signature Curve
            delivers deep, rumbling vibrations through velvety platinum-cured silicone — designed
            to feel as beautiful on your nightstand as it does in use.
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
                      if (variant === "Plum") setMainImage(productImages[2]);
                      else setMainImage(productImages[0]);
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
                "Add to Cart — ₹549"
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
            { name: "A***i S.", city: "Mumbai", text: "Absolutely incredible quality for the price. Packaging was completely discreet — even my roommate had no idea. Arrived in 3 days." },
            { name: "P***a K.", city: "Bangalore", text: "The silicone feels premium, not cheap at all. Free delivery was a pleasant surprise. Already recommended to two friends." },
            { name: "R***h M.", city: "Delhi", text: "Smooth checkout, encrypted payment felt safe. Product exceeded expectations. The blush colour is gorgeous in person." },
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
