import { BUSINESS } from "@/lib/constants";
import { CATALOG_PRODUCTS } from "@/lib/products";
import LegalLayout from "@/components/LegalLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Silk Room — KAPADIYA AND SONS",
  description:
    "Silk Room by KAPADIYA AND SONS — Ease, Lick, Trio, and Chulli care with discreet delivery across India.",
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

export default function AboutPage() {
  return (
    <LegalLayout title="About Silk Room" lastUpdated="22 July 2026">
      <p>{BUSINESS.mission}</p>
      <p>
        Silk Room is India’s care-first personal-wellness brand. Featured originals sit alongside
        Others — Chulli Ultra-thin and Dotted flavoured care — all designed for private, premium
        experiences:
      </p>
      <ul>
        {CATALOG_PRODUCTS.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> — {product.tagline}. ₹{product.price}
            {product.discountPercent > 0
              ? ` (MRP ₹${product.mrp}, ${product.discountPercent}% OFF)`
              : ` (MRP ₹${product.mrp})`}
            .{" "}
            <Link href={product.slug === "ease" ? "/product" : `/product/${product.slug}`}>
              View product
            </Link>
          </li>
        ))}
      </ul>
      <p>
        Each product page shows the real gallery, specifications, honest sale price, care
        guidance, and live stock before checkout. Adults 18+ only. Every order ships free in
        plain packaging with prepaid Razorpay checkout.
      </p>
      <h2>Legal Entity Details</h2>
      <ul>
        <li>
          Trading name: <strong>{BUSINESS.tradingAs}</strong>
        </li>
        <li>
          Legal entity: <strong>{BUSINESS.legalName}</strong>
        </li>
        <li>
          Founder: <strong>{BUSINESS.founder}</strong>
        </li>
        <li>Entity type: {BUSINESS.entityType}</li>
        <li>
          GSTIN: <strong>{BUSINESS.gstin}</strong>
        </li>
        <li>Registered address: {BUSINESS.address}</li>
        <li>
          Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        </li>
        <li>
          WhatsApp:{" "}
          <a href={`https://wa.me/${BUSINESS.whatsapp}`}>{BUSINESS.phone}</a>
        </li>
      </ul>
      <h2>Our standard of care</h2>
      <p>
        We publish shipping, returns, privacy, and grievance policies before you pay. If anything
        is unclear, contact us on WhatsApp before ordering — we would rather answer questions than
        lose trust.
      </p>
      <p>
        <Link href="/contact">Contact Us</Link> · <Link href="/terms">Terms</Link> ·{" "}
        <Link href="/privacy">Privacy</Link> ·{" "}
        <Link href="/cancellation-and-refunds">Returns</Link> ·{" "}
        <Link href="/#shop-all-products">Shop all products</Link>
      </p>
    </LegalLayout>
  );
}
