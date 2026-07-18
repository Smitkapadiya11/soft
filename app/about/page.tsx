import { BUSINESS } from "@/lib/constants";
import { CATALOG_PRODUCTS } from "@/lib/products";
import LegalLayout from "@/components/LegalLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Silk Room — KAPADIYA AND SONS",
  description:
    "Silk Room is owned by KAPADIYA AND SONS, founded by Smit Kapadiya — discreet personal wellness for women in India.",
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

export default function AboutPage() {
  return (
    <LegalLayout title="About Silk Room" lastUpdated="17 July 2026">
      <p>{BUSINESS.mission}</p>
      <p>
        Silk Room offers three adult personal-wellness products:{" "}
        {CATALOG_PRODUCTS.map((product) => product.name).join(", ")}. Each product page shows
        its real gallery, specifications, price, care guidance, and stock before checkout.
        Adults 18+ only. Every order ships in plain packaging with prepaid Razorpay checkout.
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
