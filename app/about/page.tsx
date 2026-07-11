import { BUSINESS } from "@/lib/constants";
import LegalLayout from "@/components/LegalLayout";
import Link from "next/link";
import type { Metadata } from "next";
import { StoryIllustration } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "About Us | Silk Room",
  description:
    "About Silk Room — an Indian online store for personal wellness massagers designed for everyday pain relief, with discreet delivery nationwide.",
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

export default function AboutPage() {
  return (
    <LegalLayout title="About Silk Room" lastUpdated="11 July 2026">
      <div style={{ marginBottom: "2rem" }}>
        <StoryIllustration />
      </div>

      <p>
        Silk Room is an Indian online store for personal wellness massagers designed to ease
        everyday muscle tension, stiffness, and common aches. We focus on clear product
        information, discreet packaging, and secure prepaid checkout.
      </p>

      <p>
        Our flagship product, Silk Room Ease, is a compact rechargeable massager with soft-touch
        silicone and multiple vibration modes — made for short, comfortable sessions at home. It
        is not a medical device; if pain persists, we encourage customers to speak with a doctor.
      </p>

      <p>
        Based in India, we ship free to serviceable pin codes nationwide in plain outer packaging
        so your privacy stays protected.
      </p>

      <h2>Our Mission</h2>
      <ul>
        <li>
          <strong>Comfort:</strong> Thoughtful devices that feel good to use day to day.
        </li>
        <li>
          <strong>Clarity:</strong> Honest specs, transparent pricing, and straightforward
          policies.
        </li>
        <li>
          <strong>Discretion:</strong> Plain packaging and secure payments — no unnecessary
          fuss.
        </li>
      </ul>

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
          Website: <a href={BUSINESS.website}>{BUSINESS.website}</a>
        </li>
        <li>
          Contact:{" "}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> · {BUSINESS.phone}
        </li>
      </ul>

      <h2>Get in Touch</h2>
      <p>
        Visit our <Link href="/contact">Contact Us</Link> page, or read our{" "}
        <Link href="/terms">Terms and Conditions</Link>,{" "}
        <Link href="/privacy">Privacy Policy</Link>,{" "}
        <Link href="/shipping">Shipping Policy</Link>, and{" "}
        <Link href="/cancellation-and-refunds">Return &amp; Refund Policy</Link>.
      </p>
    </LegalLayout>
  );
}
