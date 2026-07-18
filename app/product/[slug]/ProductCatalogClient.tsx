"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Loader2,
  Lock,
  Package,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import Price from "@/components/Price";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";
import { trackViewContent } from "@/lib/meta-pixel";
import {
  CATALOG_PRODUCTS,
  type CatalogProduct,
} from "@/lib/products";
import styles from "./CatalogProduct.module.css";

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
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const requestedSku = product.sku;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset loading before stock fetch
    setStockLoading(true);

    fetch("/api/stock", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!controller.signal.aborted) {
          setStock(data?.stock?.[requestedSku] ?? 0);
        }
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === "AbortError") return;
        if (!controller.signal.aborted) setStock(0);
      })
      .finally(() => {
        if (!controller.signal.aborted) setStockLoading(false);
      });

    return () => controller.abort();
  }, [product.sku]);

  useEffect(() => {
    trackViewContent({
      contentName: product.metaContentName,
      contentIds: [product.id],
      value: product.price,
      variant: product.sku,
    });
  }, [product.id, product.metaContentName, product.price, product.sku]);

  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
  const others = CATALOG_PRODUCTS.filter((item) => item.id !== product.id);

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

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link href="/#shop-all-products">Shop</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span>{product.shortName}</span>
      </nav>

      <div className={styles.layout}>
        <div className={styles.gallery}>
          <div className={styles.mainFrame}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ position: "absolute", inset: 0 }}
              >
                <Image
                  src={activeImage}
                  alt={`${product.name} — view ${selectedImageIndex + 1}`}
                  fill
                  priority={selectedImageIndex === 0}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.mainImage}
                />
              </motion.div>
            </AnimatePresence>
            <span className={styles.badge}>{product.variantLabel}</span>
            <span className={styles.saleBadge}>{product.discountPercent}% OFF</span>
          </div>

          <div className={styles.thumbs} role="group" aria-label="Product images">
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
                  className={styles.thumbImg}
                />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.details}>
          <p className={styles.kicker}>{product.category}</p>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}
            aria-label="Silk Room quality"
          >
            {[...Array(5)].map((_, index) => (
              <Star key={index} fill="#6b3d52" size={15} color="#6b3d52" aria-hidden />
            ))}
            <span style={{ fontSize: "0.85rem", color: "rgba(61,36,51,0.55)", marginLeft: 4 }}>
              Adults 18+
            </span>
          </div>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.tagline}>{product.tagline}</p>

          <div className={styles.priceBlock}>
            <Price amount={product.price} mrp={product.mrp} sale />
            <span className={styles.freeShip}>
              <Truck size={15} aria-hidden /> Free discreet delivery
            </span>
          </div>

          <p className={styles.description}>{product.description}</p>

          <ul className={styles.highlights}>
            {product.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>

          <div className={styles.stockRow}>
            <span className={styles.optionChip}>
              <span
                className={styles.swatchDot}
                style={{ backgroundColor: product.accent }}
                aria-hidden
              />
              {product.variantLabel}
            </span>
            {stockLoading ? (
              <span className={styles.inStock}>Checking availability…</span>
            ) : outOfStock ? (
              <span className={styles.outOfStock}>Out of stock</span>
            ) : (
              <span className={styles.inStock}>In Stock — {stock} available</span>
            )}
          </div>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <div className={styles.ctaRow} ref={ctaRef}>
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
            <button
              type="button"
              className={styles.buyNow}
              onClick={() => add(true)}
              disabled={outOfStock || busy}
            >
              {isBuying ? (
                <>
                  <Loader2 size={18} className="spinner" aria-hidden /> Checkout…
                </>
              ) : outOfStock ? (
                "Out of Stock"
              ) : (
                `Buy Now — ${formatINR(product.price)}`
              )}
            </button>
            <button
              type="button"
              className={styles.addLink}
              onClick={() => add(false)}
              disabled={outOfStock || busy}
            >
              {isAdding ? "Adding…" : "Add to cart — keep shopping"}
            </button>
          </div>

          <div className={styles.trustGrid}>
            <div className={styles.trustCard}>
              <Lock size={16} aria-hidden />
              <strong>Secure checkout</strong>
              <span>Razorpay · UPI & cards</span>
            </div>
            <div className={styles.trustCard}>
              <Package size={16} aria-hidden />
              <strong>Plain-box delivery</strong>
              <span>Free across India</span>
            </div>
            <div className={styles.trustCard}>
              <ShieldCheck size={16} aria-hidden />
              <strong>6-month warranty</strong>
              <span>WhatsApp support</span>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.section} aria-labelledby="specs-title">
        <h2 id="specs-title" className={styles.sectionTitle}>
          Specifications
        </h2>
        <div className={styles.specGrid}>
          {product.specs.map((spec) => (
            <div className={styles.specCard} key={spec.label}>
              <span>{spec.label}</span>
              <strong>{spec.value}</strong>
            </div>
          ))}
          <div className={styles.specCard}>
            <span>What&apos;s in the box</span>
            <strong>{product.whatsInBox}</strong>
          </div>
          <div className={styles.specCard}>
            <span>Sale</span>
            <strong>
              {formatINR(product.price)} · MRP {formatINR(product.mrp)} ·{" "}
              {product.discountPercent}% OFF
            </strong>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="faq-title">
        <h2 id="faq-title" className={styles.sectionTitle}>
          Frequently asked questions
        </h2>
        <div className={styles.faqList}>
          {product.faqs.map((faq) => (
            <details key={faq.title} className={styles.faqItem}>
              <summary>{faq.title}</summary>
              <p>{faq.content}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="reviews-title">
        <h2 id="reviews-title" className={styles.sectionTitle}>
          Customer notes
        </h2>
        <div className={styles.reviewGrid}>
          {product.reviews.map((review) => (
            <article key={review.name} className={styles.reviewCard}>
              <div aria-hidden>
                {[...Array(5)].map((_, index) => (
                  <Star key={index} fill="#6b3d52" size={13} color="#6b3d52" />
                ))}
              </div>
              <p>&ldquo;{review.text}&rdquo;</p>
              <div className={styles.reviewer}>
                {review.name} · {review.city}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="more-title">
        <h2 id="more-title" className={styles.sectionTitle}>
          Explore the full Silk Room collection
        </h2>
        <div className={styles.crossSell}>
          {others.map((item) => {
            const href = item.slug === "ease" ? "/product" : `/product/${item.slug}`;
            return (
              <Link key={item.id} href={href} className={styles.crossCard}>
                <span className={styles.crossImgWrap}>
                  <Image
                    src={item.gallery[0]}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className={styles.crossImg}
                  />
                </span>
                <span>
                  <h3>{item.name}</h3>
                  <p>{item.tagline}</p>
                  <Price amount={item.price} mrp={item.mrp} sale />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <AnimatePresence>
        {showSticky && (
          <motion.div
            className={styles.stickyBar}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            role="region"
            aria-label="Quick buy"
          >
            <div>
              <div style={{ fontWeight: 700 }}>{product.shortName}</div>
              <Price amount={product.price} mrp={product.mrp} sale />
            </div>
            <button
              type="button"
              className={styles.stickyBtn}
              onClick={() => add(true)}
              disabled={outOfStock || busy}
            >
              {outOfStock ? "Sold out" : "Buy Now"}
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
