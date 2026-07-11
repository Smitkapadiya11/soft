import { BUSINESS } from "@/lib/constants";
import LegalLayout from "@/components/LegalLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Silk Room",
  description:
    "About Silk Room — an Indian online retailer of premium condoms and sexual wellness products, founded with a mission to make intimacy more comfortable and accessible.",
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

import { StoryIllustration } from "@/components/illustrations";

export default function AboutPage() {
  return (
    <LegalLayout title="About Silk Room" lastUpdated="10 July 2026">
      <div style={{ marginBottom: "2rem" }}>
        <StoryIllustration />
      </div>

      <p>
        Silk Room is an Indian online retailer of premium condoms and sexual wellness products.
        Founded with a mission to make intimacy more comfortable and accessible, we believe that
        sexual wellness is an essential part of overall well-being — and that everyone deserves
        access to high-quality products delivered with discretion, care, and respect.
      </p>

      <p>
        We started Silk Room because we saw a gap in the Indian market: a place where adults could
        purchase premium intimate products without embarrassment, confusion, or compromise on
        quality. Our products are sourced from licensed suppliers and authorised distributors,
        ensuring authenticity and safety with every order. We operate exclusively online, which
        allows us to offer competitive pricing while maintaining the highest standards of privacy
        and discretion in packaging and delivery.
      </p>

      <p>
        Based in India, we serve customers across the country with free shipping and a commitment
        to prompt, reliable service. Every order is shipped in plain, unbranded packaging so your
        privacy is always protected.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is built on three core values:
      </p>
      <ul>
        <li>
          <strong>Comfort:</strong> We curate products that prioritise comfort and safety,
          ensuring a positive experience for our customers.
        </li>
        <li>
          <strong>Clarity:</strong> We believe in transparent communication — clear pricing,
          honest product information, and straightforward policies with no hidden charges.
        </li>
        <li>
          <strong>Discretion:</strong> Your privacy is our priority. From plain packaging to
          secure payment processing, every step of your experience is designed with discretion
          in mind.
        </li>
      </ul>

      <h2>Legal Entity Details</h2>
      <ul>
        <li>
          Legal entity: <strong>{BUSINESS.legalName}</strong>
        </li>
        <li>
          Entity type: {BUSINESS.entityType}
        </li>
        <li>
          GSTIN: <strong>{BUSINESS.gstin}</strong>
        </li>
        <li>
          Registered address: {BUSINESS.address}
        </li>
        <li>
          Website: <a href={BUSINESS.website}>{BUSINESS.website}</a>
        </li>
        <li>
          Contact:{" "}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> · {BUSINESS.phone}
        </li>
      </ul>

      <h2>Commitment to Quality &amp; Discretion</h2>
      <p>
        Every product we sell is genuine, sealed, and sourced from licensed suppliers. We conduct
        due diligence on our supply chain to ensure product authenticity and safety. Our commitment
        to discretion extends beyond packaging — we do not sell your personal data, and all
        payments are processed securely through Razorpay, meaning your payment information never
        touches our servers.
      </p>

      <h2>Get in Touch</h2>
      <p>
        Have questions? We&apos;re here to help. Visit our{" "}
        <Link href="/contact">Contact Us</Link> page for support, or explore our{" "}
        <Link href="/terms">Terms and Conditions</Link>,{" "}
        <Link href="/privacy">Privacy Policy</Link>,{" "}
        <Link href="/shipping">Shipping Policy</Link>, and{" "}
        <Link href="/cancellation-and-refunds">Cancellation and Refunds</Link> for more
        information.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Silk Room",
            url: BUSINESS.website,
            email: BUSINESS.email,
            telephone: BUSINESS.phone,
            address: {
              "@type": "PostalAddress",
              addressCountry: "IN",
              streetAddress: BUSINESS.address,
            },
          }),
        }}
      />
    </LegalLayout>
  );
}
