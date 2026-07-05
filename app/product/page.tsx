"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ShieldCheck } from "lucide-react";
import styles from "./Product.module.css";
import Accordion from "@/components/Accordion";
import TrustBadges from "@/components/TrustBadges";
import { useCart } from "@/context/CartContext";

const PRODUCT = {
  id: "silk-room-signature",
  name: "The Signature Curve",
  price: 4999,
  variants: ["Blush", "Plum"],
};

export default function ProductPage() {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(PRODUCT.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({
      id: `${PRODUCT.id}-${selectedVariant}`,
      name: PRODUCT.name,
      price: PRODUCT.price,
      variant: selectedVariant,
      quantity,
      image: "/placeholder.png"
    });
  };

  const faqs = [
    {
      title: "Is the packaging completely discreet?",
      content: "Absolutely. We ship in a plain, unbranded brown box. There is no mention of Silk Room or the contents on the shipping label. The sender will appear as a generic fulfillment center."
    },
    {
      title: "When will my order arrive?",
      content: "Orders are processed within 24 hours. Delivery typically takes 2-4 business days depending on your location in India."
    },
    {
      title: "Is my payment secure?",
      content: "Yes, we use bank-grade 256-bit SSL encryption. We do not store your credit card or UPI details on our servers."
    },
    {
      title: "What is your replacement policy?",
      content: "Due to the intimate nature of the product, we do not accept general returns. However, we offer a 7-day hassle-free replacement if the product arrives damaged or defective."
    }
  ];

  const specs = [
    {
      title: "Materials & Care",
      content: "Made from 100% medical-grade, body-safe silicone. Phthalate-free and non-porous. Clean with warm water and mild unscented soap before and after each use. Store in the provided satin pouch."
    },
    {
      title: "Specifications",
      content: "Length: 7.5 inches. Width: 1.4 inches. Whisper-quiet motor (<50dB). Waterproof (IPX7 rating). USB magnetic charging (cable included)."
    }
  ];

  const productImages = [
    "/product-1.jpg",
    "/product-2.jpg",
    "/product-3.jpg",
    "/product-4.jpg"
  ];
  const [mainImage, setMainImage] = useState(productImages[0]);

  return (
    <div className={styles.container}>
      <div className={styles.productLayout}>
        <div className={styles.gallery}>
          <div className={styles.mainImageContainer}>
            <Image 
              src={mainImage} 
              alt="Silk Room Product" 
              fill 
              style={{ objectFit: 'cover' }} 
              className={styles.actualImage}
              priority
            />
            <span className={styles.variantBadge}>{selectedVariant}</span>
          </div>
          <div className={styles.thumbnails}>
            {productImages.map((img, index) => (
              <div 
                key={index} 
                className={`${styles.thumb} ${mainImage === img ? styles.thumbActive : ''}`}
                onClick={() => setMainImage(img)}
              >
                <Image src={img} alt={`Thumbnail ${index + 1}`} fill style={{ objectFit: 'cover' }} className={styles.thumbImage} />
              </div>
            ))}
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.reviews}>
            <div className={styles.stars}>
              <Star fill="#4a2c3a" size={16} color="#4a2c3a" />
              <Star fill="#4a2c3a" size={16} color="#4a2c3a" />
              <Star fill="#4a2c3a" size={16} color="#4a2c3a" />
              <Star fill="#4a2c3a" size={16} color="#4a2c3a" />
              <Star fill="#4a2c3a" size={16} color="#4a2c3a" />
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
            <div className={styles.swatches}>
              {PRODUCT.variants.map((variant) => (
                <button 
                  key={variant}
                  className={`${styles.swatch} ${selectedVariant === variant ? styles.activeSwatch : ''}`}
                  onClick={() => setSelectedVariant(variant)}
                  style={{ backgroundColor: variant === "Blush" ? "#f4e9e4" : "#4a2c3a" }}
                  aria-label={`Select ${variant}`}
                />
              ))}
            </div>
          </div>

          <div className={styles.addToCartSection}>
            <div className={styles.quantity}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className={styles.addBtn} onClick={handleAddToCart}>
              Add to Cart
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
              <div className={styles.stars}>
                <Star fill="#4a2c3a" size={14} color="#4a2c3a" />
                <Star fill="#4a2c3a" size={14} color="#4a2c3a" />
                <Star fill="#4a2c3a" size={14} color="#4a2c3a" />
                <Star fill="#4a2c3a" size={14} color="#4a2c3a" />
                <Star fill="#4a2c3a" size={14} color="#4a2c3a" />
              </div>
              <p className={styles.reviewText}>
                "Absolutely incredible quality. The packaging was so discreet, even my roommate had no idea what it was. Worth every penny."
              </p>
              <div className={styles.reviewer}>
                <span className={styles.reviewerName}>A***i S.</span>
                <span className={styles.verified}><ShieldCheck size={14} /> Verified Buyer</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
