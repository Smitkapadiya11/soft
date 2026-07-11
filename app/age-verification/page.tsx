import LegalLayout from "@/components/LegalLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Verification Policy | Silk Room",
  description:
    "Age verification policy for silkroom.shop — an online retailer of adult products for customers aged 18 and above. Learn about our age verification methodology and legal basis.",
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

/** Age policy page — gate itself is the AgeGate modal on first visit */
export default function AgeVerificationPage() {
  return (
    <LegalLayout title="Age Requirement & Verification" lastUpdated="10 July 2026">
      <p>
        Silk Room sells condoms and sexual wellness products intended for adults aged{" "}
        <strong>18 years and above</strong>. By using this website and placing an order, you
        confirm that you meet this requirement.
      </p>

      <h2>Age Verification Methodology</h2>
      <p>
        Age verification is performed through self-declaration at the point of entry and during
        checkout. Users must confirm they are 18 years or older to access our website and place
        orders.
      </p>

      <h2>Order Cancellation for Suspected Minors</h2>
      <p>
        We reserve the right to cancel any order if we have reasonable grounds to believe the
        purchaser is under 18 years of age. A full refund will be processed in such cases.
      </p>

      <h2>Legal Basis</h2>
      <p>
        The age restriction is in accordance with applicable Indian laws, including the Information
        Technology Act, 2000, and relevant state-specific regulations governing the sale of adult
        products.
      </p>

      <h2>Related Policies</h2>
      <ul>
        <li>
          <Link href="/terms">Terms and Conditions</Link>
        </li>
        <li>
          <Link href="/privacy">Privacy Policy</Link>
        </li>
        <li>
          <Link href="/cancellation-and-refunds">Cancellation and Refunds</Link>
        </li>
        <li>
          <Link href="/contact">Contact Us</Link>
        </li>
      </ul>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Age Verification Policy - Silk Room",
            url: "https://silkroom.shop/age-verification",
            lastReviewed: "2026-07-10",
          }),
        }}
      />
    </LegalLayout>
  );
}
