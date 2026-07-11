import { BUSINESS, POLICY_LINKS } from "@/lib/constants";
import LegalLayout from "@/components/LegalLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Refund Policy | Silk Room",
  description:
    "Return and refund policy for silkroom.shop — cancellation before dispatch, hygiene rules for personal-care devices, refund timelines via Razorpay.",
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

export default function CancellationAndRefundsPage() {
  return (
    <LegalLayout
      title="Return & Refund Policy"
      lastUpdated="11 July 2026"
      subtitle={`${BUSINESS.name} · silkroom.shop`}
    >
      <p>
        This Return &amp; Refund Policy applies to all prepaid orders placed on{" "}
        <a href={BUSINESS.website}>{BUSINESS.website}</a>. Payments are processed by Razorpay.
        Please read this policy before placing an order.
      </p>

      <h2>1. Order cancellation</h2>
      <p>
        You may cancel an order <strong>before it is dispatched</strong>. To cancel, email{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or WhatsApp {BUSINESS.whatsapp}{" "}
        with your order number. We will confirm cancellation and issue a{" "}
        <strong>full refund</strong> to your original payment method.
      </p>
      <p>
        Once an order has been handed to the courier (dispatched), it cannot be cancelled. You may
        still request a return under the conditions below after delivery.
      </p>
      <p>
        We may cancel an order before dispatch in case of pricing errors, suspected fraud, payment
        failure, or stock unavailability. In such cases, a <strong>full refund</strong> is issued.
      </p>

      <h2>2. Returns</h2>
      <p>
        Because wellness massagers are personal-care devices, for health and hygiene reasons we
        accept returns only when the product is:
      </p>
      <ul>
        <li>
          <strong>Unused</strong> and in its original sealed packaging,{" "}
          <strong>and</strong> returned within <strong>7 days</strong> of delivery;{" "}
          <strong>or</strong>
        </li>
        <li>
          Defective, damaged in transit, or incorrectly supplied on arrival.
        </li>
      </ul>
      <p>
        Opened or used devices cannot be returned unless they were defective or damaged on
        arrival.
      </p>

      <h2>3. How to request a cancellation or return</h2>
      <ol>
        <li>
          Email <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or WhatsApp{" "}
          {BUSINESS.whatsapp} with your order number.
        </li>
        <li>
          For damaged or defective items, attach clear photos.
        </li>
        <li>
          We respond within <strong>2 business days</strong> with next steps (cancellation
          confirmation or return instructions).
        </li>
      </ol>

      <h2>4. Refunds</h2>
      <ul>
        <li>
          Approved refunds are credited to your <strong>original payment method</strong> via
          Razorpay (same UPI / card / net banking source). We do not offer cash refunds.
        </li>
        <li>
          After we approve a cancellation or inspect a returned item, refunds are initiated within{" "}
          <strong>5–7 business days</strong>.
        </li>
        <li>
          Banks and UPI providers may take an additional <strong>2–5 business days</strong> to
          show the credit in your account.
        </li>
      </ul>

      <h2>5. Damaged in transit</h2>
      <p>
        If your order arrives damaged, contact us within <strong>48 hours</strong> of delivery with
        photos. We will arrange a replacement or a full refund.
      </p>

      <h2>6. Non-refundable situations</h2>
      <ul>
        <li>Opened or used products (except defective / damaged on arrival)</li>
        <li>Change-of-mind requests after the 7-day return window</li>
        <li>Damage caused by misuse or improper storage after delivery</li>
      </ul>

      <h2>7. Contact for cancellations and refunds</h2>
      <ul>
        <li>
          Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        </li>
        <li>Phone / WhatsApp: {BUSINESS.phone}</li>
        <li>Hours: {BUSINESS.hours}</li>
        <li>
          Grievance Officer: {BUSINESS.grievanceOfficer} —{" "}
          <a href={`mailto:${BUSINESS.grievanceEmail}`}>{BUSINESS.grievanceEmail}</a>
        </li>
      </ul>

      <h2>8. Related policies</h2>
      <ul>
        {POLICY_LINKS.filter((l) => l.href !== "/cancellation-and-refunds").map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Return & Refund Policy - Silk Room",
            url: "https://silkroom.shop/cancellation-and-refunds",
            lastReviewed: "2026-07-11",
            isPartOf: { "@type": "WebSite", name: "Silk Room", url: "https://silkroom.shop" },
          }),
        }}
      />
    </LegalLayout>
  );
}
