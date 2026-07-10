import { BUSINESS, PRODUCT_PRICE } from "@/lib/constants";
import Link from "next/link";

const pageStyle = {
  maxWidth: "800px",
  margin: "4rem auto",
  padding: "0 1rem",
  lineHeight: 1.7,
  color: "var(--color-plum-dark)",
} as const;

export default function PrivacyPolicy() {
  return (
    <div style={pageStyle}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "1rem" }}>
        Privacy Policy
      </h1>
      <p style={{ color: "var(--color-plum)", marginBottom: "2rem" }}>
        Last updated: July 10, 2026 · Applies to {BUSINESS.website}
      </p>

      <p>
        This Privacy Policy explains how <strong>{BUSINESS.legalName}</strong> (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses, stores, and protects personal data when
        you purchase wellness massage devices from our website. We process personal data in
        accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and other
        applicable Indian laws.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>1. What personal data we collect</h2>
      <p>To process and deliver your order, we collect the following Personally Identifiable Information (PII):</p>
      <ul>
        <li>Full name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Shipping address (Address Line 1, optional Address Line 2, city, state, and pincode)</li>
      </ul>
      <p>
        We also store order-related transactional data such as order ID, product variant,
        quantity, amount, and payment status. We do <strong>not</strong> collect or store
        payment card numbers, CVV, UPI PINs, or net-banking credentials.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>2. Why we collect this data</h2>
      <p>We use your personal data only for:</p>
      <ul>
        <li>Processing prepaid orders and fulfilling delivery</li>
        <li>Customer support related to your purchase, returns, or refunds</li>
        <li>Transactional communication (order confirmation and shipping updates)</li>
        <li>Compliance with applicable law and dispute resolution</li>
      </ul>
      <p>We do not sell your personal data. We do not use it for marketing without your explicit consent.</p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>3. How data is stored and protected</h2>
      <p>
        Order and customer records are stored in a PostgreSQL database hosted on Neon,
        accessed only through our secure server-side application. Website traffic is protected
        with HTTPS/TLS. Payment processing is handled entirely by <strong>Razorpay</strong>;
        payment credentials are never stored on our servers.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>4. Retention</h2>
      <p>
        We retain order and customer records for up to <strong>36 months</strong> from the date
        of the order (or longer if required by law for tax, accounting, or dispute purposes).
        After that period, we delete or anonymise personal data that is no longer needed.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>5. Your rights under the DPDP Act</h2>
      <p>Subject to applicable law, you may request:</p>
      <ul>
        <li>Access to the personal data we hold about you</li>
        <li>Correction of inaccurate or incomplete data</li>
        <li>Deletion of your personal data (where we are not required to retain it by law)</li>
        <li>Withdrawal of consent where processing is based on consent</li>
      </ul>
      <p>
        To exercise these rights, email{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>. We will respond within a
        reasonable period as required under applicable law.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>6. Grievance redressal</h2>
      <p>
        For privacy-related grievances, contact our Grievance Officer:
      </p>
      <ul>
        <li>Name / Role: {BUSINESS.grievanceOfficer}</li>
        <li>Email: <a href={`mailto:${BUSINESS.grievanceEmail}`}>{BUSINESS.grievanceEmail}</a></li>
        <li>Phone / WhatsApp: {BUSINESS.phone}</li>
      </ul>
      <p>
        Full contact details are also listed on our{" "}
        <Link href="/contact" style={{ textDecoration: "underline" }}>Contact Us</Link> page.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>7. Third parties</h2>
      <p>
        We share data only with service providers necessary to operate the store (payment
        processing via Razorpay, hosting, email delivery, and logistics partners), under
        confidentiality obligations. We do not share personal data with advertisers.
      </p>

      <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "var(--color-plum)" }}>
        Product price reference on this site starts at ₹{PRODUCT_PRICE} INR (inclusive of free
        standard delivery within India unless stated otherwise at checkout).
      </p>
    </div>
  );
}
