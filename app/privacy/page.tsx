import { BUSINESS } from "@/lib/constants";
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
        Last updated: July 10, 2026
      </p>

      <p>
        Silk Room (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), operated by{" "}
        <strong>{BUSINESS.legalName}</strong>, a proprietorship registered in India at India
        (online retail — contact support for correspondence), operates silkroom.shop (the
        &ldquo;Site&rdquo;). We are committed to protecting your personal data in accordance with
        the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>1. Information we collect</h2>
      <ul>
        <li>Identity and contact data: name, email address, phone number</li>
        <li>Delivery data: shipping address, city, state, pincode</li>
        <li>Order data: products ordered, order value, order history</li>
        <li>Technical data: IP address, browser type, device information (via standard cookies)</li>
      </ul>
      <p>
        We do <strong>NOT</strong> collect or store your card/UPI/bank details. All payment
        information is handled directly by our payment processor, Razorpay, under their own
        security standards.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>2. Why we collect it</h2>
      <ul>
        <li>To process and fulfil your orders</li>
        <li>To communicate order and delivery updates</li>
        <li>To handle returns, refunds, and support requests</li>
        <li>To comply with legal and tax obligations</li>
        <li>To prevent fraud and secure the Site</li>
      </ul>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>3. Legal basis</h2>
      <p>
        We process your data on the basis of your consent (given at checkout), to perform our
        contract with you (fulfilling your order), and to meet legal obligations under Indian law.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>4. How we store and protect it</h2>
      <p>
        Personal data is stored on secured, access-controlled database infrastructure (Neon
        PostgreSQL). We apply reasonable technical and organisational security measures, including
        encryption in transit (HTTPS) and restricted administrative access.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>5. Data sharing</h2>
      <p>
        We share data only with: (a) Razorpay, to process payments; (b) our shipping/courier
        partners, to deliver your order; (c) authorities, where required by law. We do not sell
        your personal data.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>6. Retention</h2>
      <p>
        We retain order and customer records for as long as needed to fulfil orders and for the
        period required under applicable tax and commercial law, after which data is deleted or
        anonymised.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>7. Your rights (DPDP Act, 2023)</h2>
      <p>
        You have the right to access, correct, and request deletion of your personal data, and to
        withdraw consent. To exercise these, contact our Grievance Officer below.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>8. Grievance Officer</h2>
      <ul>
        <li>Name: {BUSINESS.grievanceOfficer}</li>
        <li>
          Email:{" "}
          <a href={`mailto:${BUSINESS.grievanceEmail}`}>{BUSINESS.grievanceEmail}</a>
        </li>
        <li>Phone / WhatsApp: {BUSINESS.phone}</li>
        <li>Address: India (online retail — contact support for correspondence)</li>
      </ul>
      <p>
        We will acknowledge grievances within <strong>3 days</strong> and resolve them within the
        timelines prescribed under applicable law.
      </p>
      <p>
        Full contact details are also listed on our{" "}
        <Link href="/contact" style={{ textDecoration: "underline" }}>
          Contact Us
        </Link>{" "}
        page.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>9. Changes</h2>
      <p>
        We may update this policy; changes take effect when posted here with a revised date.
      </p>
    </div>
  );
}
