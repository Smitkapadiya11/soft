import { BUSINESS, PRODUCT_NAME, VARIANT_LABELS } from "@/lib/constants";
import LegalLayout from "@/components/LegalLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Silk Room",
  description:
    "About Silk Room — discreet online retail of personal wellness products for adults aged 18+ in India.",
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

export default function AboutPage() {
  return (
    <LegalLayout title="About Silk Room" lastUpdated="15 July 2026">
      <p>
        Silk Room is an Indian online store for personal wellness products for adults 18+. We
        focus on body-safe materials, clear product details, discreet packaging, and secure prepaid
        checkout.
      </p>
      <p>
        Our flagship product, {PRODUCT_NAME}, is a compact personal body wellness massager for
        tension relief and everyday recovery — available in {VARIANT_LABELS.Natural} and{" "}
        {VARIANT_LABELS.Espresso}. Adults 18+ only.
      </p>
      <h2>Legal Entity Details</h2>
      <ul>
        <li>
          Legal entity: <strong>{BUSINESS.legalName}</strong>
        </li>
        <li>Entity type: {BUSINESS.entityType}</li>
        <li>
          GSTIN: <strong>{BUSINESS.gstin}</strong>
        </li>
        <li>Registered address: {BUSINESS.address}</li>
        <li>
          Contact: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> · {BUSINESS.phone}
        </li>
      </ul>
      <p>
        <Link href="/contact">Contact Us</Link> · <Link href="/terms">Terms</Link> ·{" "}
        <Link href="/privacy">Privacy</Link> ·{" "}
        <Link href="/cancellation-and-refunds">Returns</Link>
      </p>
    </LegalLayout>
  );
}
