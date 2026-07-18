"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Loader2, ShieldCheck, Star, Truck } from "lucide-react";
import Accordion from "@/components/Accordion";
import Price from "@/components/Price";
import TrustBadges from "@/components/TrustBadges";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";
import { trackViewContent } from "@/lib/meta-pixel";
import type { CatalogProduct } from "@/lib/products";
import { smooth } from "@/lib/motion";
import styles from "../Product.module.css";

type Props = {
  product: CatalogProduct;
};

export default function ProductCatalogClient({ product }: Props) {
  const router = useRouter();
  const { addToCart, setIsCartOpen } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState(0);
  const [stockLoading, setStockLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const requestedSku = product.sku;

    fetch("/api/stock", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!controller.signal.aborted) {
          setStock(data?.stock?.[requestedSku] ?? 0);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === "AbortError") return;
        if (!controller.signal.aborted) setStock(0);
      })
      .finally(() => {
        if (!controller.signal.aborted) setStockLoading(false);
      });

    return () => controller.abort();
  }, [product.sku]);

  useEffect(() => {
    trackViewContent({
      contentName: product.name,
      contentIds: [product.id],
      value: product.price,
      variant: product.sku,
    });
  }, [product.id, product.name, product.price, product.sku]);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    []
  );

  const activeImage = product.gallery[selectedImageIndex] ?? product.gallery[0];
  const outOfStock = !stockLoading && stock < 1;
  const busy = stockLoading || isAdding || isBuying;
  const maxQuantity = Math.min(stock, 10);

  const cartItem = () => ({
    id: `${product.id}-${product.sku}`,
    name: product.name,
    price: product.price,
    variant: product.sku,
    quantity,
  });

  const add = (buyNow: boolean) => {
    if (outOfStock || busy) return;
    if (quantity > stock) {
      setError(`Only ${stock} available`);
      return;
    }

    setError("");
    if (buyNow) setIsBuying(true);
    else setIsAdding(true);

    try {
      addToCart(cartItem(), { openDrawer: false });
      if (buyNow) {
        router.push("/checkout");
      } else {
        setShowToast(true);
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setShowToast(false), 3200);
      }
    } finally {
      if (!buyNow) setIsAdding(false);
    }
  };

  const information = [
    {
      title: "Product details",
      content: product.specs.map((spec) => `${spec.label}: ${spec.value}`).join(" · "),
    },
    {
      title: "Care and hygiene",
      content:
        "Wash before and after each use with warm water and mild soap. Dry fully before storage. Use only as directed, stop if irritation occurs, and never share personal wellness products.",
    },
    {
      title: "What’s in the box",
      content: product.whatsInBox,
    },
    {
      title: "Delivery, returns, and warranty",
      content:
        "Free delivery in plain outer packaging. Typical delivery is 3–7 business days. A 6-month manufacturing warranty applies. Opened personal-wellness products cannot be returned unless defective or damaged on arrival.",
    },
  ];

  return (
    <div className={`${styles.container} ${styles.catalogProductContainer}`}>
      <div className={styles.productLayout}>
        <div className={styles.gallery}>
          <div className={styles.mainImageContainer}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                className={styles.mainImageWrapper}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Image
                  src={activeImage}
                  alt={`${product.name} — product view ${selectedImageIndex + 1}`}
                  fill
                  priority={selectedImageIndex === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.mainPhoto}
                />
              </motion.div>
            </AnimatePresence>
            <span className={styles.variantBadge}>{product.variantLabel}</span>
          </div>

          <div className={styles.galleryDots} aria-label="Gallery position">
            {product.gallery.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`${styles.galleryDot} ${
                  index === selectedImageIndex ? styles.galleryDotActive : ""
                }`}
                aria-label={`View image ${index + 1}`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div>

          <div className={styles.thumbnails}>
            {product.gallery.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`${styles.thumb} ${
                  index === selectedImageIndex ? styles.thumbActive : ""
                }`}
                onClick={() => setSelectedImageIndex(index)}
                aria-label={`View ${product.name} image ${index + 1}`}
                aria-pressed={index === selectedImageIndex}
              >
                <Image
                  src={image}
                  alt=""
                  width={152}
                  height={152}
                  className={styles.thumbnail}
                />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.reviews}>
            <div className={styles.stars} aria-label="Premium Silk Room product">
              {[...Array(5)].map((_, index) => (
                <Star key={index} fill="#6b3d52" size={16} color="#6b3d52" aria-hidden />
              ))}
            </div>
            <span>Silk Room quality · Adults 18+</span>
          </div>

          <p className={styles.tagline}>{product.category}</p>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.tagline}>{product.tagline}</p>

          <div className={styles.priceRow}>
            <p className={styles.price}>
              <Price amount={product.price} />
            </p>
            <span className={styles.freeDelivery}>
              <Truck size={16} aria-hidden /> Free discreet delivery
            </span>
          </div>

          <p className={styles.description}>{product.description}</p>

          <ul className={styles.highlights}>
            {product.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <div className={styles.selector}>
            <h3 className={styles.selectorLabel}>Option: {product.variantLabel}</h3>
            {stockLoading ? (
              <p className={styles.stockNote}>Checking availability…</p>
            ) : outOfStock ? (
              <p className={styles.outOfStock}>Out of stock</p>
            ) : (
              <p className={styles.inStock}>In Stock — {stock} available</p>
            )}
          </div>

          {error && (
            <p className={styles.addError} role="alert">
              {error}
            </p>
          )}

          <div className={styles.addToCartSection}>
            <div className={styles.quantity} aria-label="Quantity">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={outOfStock || quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                disabled={outOfStock || quantity >= maxQuantity}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <div className={styles.ctaColumn}>
              <motion.button
                type="button"
                className={`${styles.buyNowBtn} ${styles.buyNowPulse}`}
                onClick={() => add(true)}
                disabled={outOfStock || busy}
                whileHover={outOfStock || busy ? undefined : { scale: 1.02 }}
                whileTap={outOfStock || busy ? undefined : { scale: 0.98 }}
                transition={smooth}
              >
                {isBuying ? (
                  <>
                    <Loader2 size={18} className={styles.spinner} aria-hidden /> Checkout…
                  </>
                ) : outOfStock ? (
                  "Out of Stock"
                ) : (
                  `Buy Now — ${formatINR(product.price)}`
                )}
              </motion.button>
              <button
                type="button"
                className={styles.addLink}
                onClick={() => add(false)}
                disabled={outOfStock || busy}
              >
                {isAdding ? "Adding…" : "Add to cart"}
              </button>
            </div>
          </div>

          <TrustBadges />
          <div className={styles.accordionSection}>
            <Accordion items={information} />
          </div>
        </div>
      </div>

      <div className={styles.compositionSection}>
        <h2 className={styles.sectionTitle}>Product specifications</h2>
        <div className={styles.compositionCard}>
          <div className={styles.compositionList}>
            {product.specs.map((spec) => (
              <div className={styles.compositionItem} key={spec.label}>
                <span className={styles.compositionLabel}>{spec.label}</span>
                <span className={styles.compositionValue}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <h2 className={styles.sectionTitle}>Silk Room care standard</h2>
        <ul className={styles.highlights}>
          <li>
            <BadgeCheck size={16} aria-hidden /> Product details shown before checkout
          </li>
          <li>
            <ShieldCheck size={16} aria-hidden /> Secure prepaid Razorpay checkout
          </li>
          <li>
            <Truck size={16} aria-hidden /> Plain-box free delivery across India
          </li>
        </ul>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            className={styles.toast}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            role="status"
          >
            <span>Added to cart</span>
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
    </div>
  );
}
