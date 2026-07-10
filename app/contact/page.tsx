import { BUSINESS } from "@/lib/constants";
import Link from "next/link";

const pageStyle = {
  maxWidth: "800px",
  margin: "4rem auto",
  padding: "0 1rem",
  lineHeight: 1.7,
  color: "var(--color-plum-dark)",
} as const;

export default function ContactPage() {
  return (
    <div style={pageStyle}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "1rem" }}>
        Contact Us
      </h1>
      <p style={{ color: "var(--color-plum)", marginBottom: "2rem" }}>
        We&apos;re here to help with orders, shipping, returns, and product questions.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Business</h2>
      <p>
        <strong>{BUSINESS.legalName}</strong>
        <br />
        Online retailer of consumer wellness massage devices in India
        <br />
        Website:{" "}
        <a href={BUSINESS.website} style={{ textDecoration: "underline" }}>
          {BUSINESS.website}
        </a>
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Customer support</h2>
      <ul>
        <li>
          Email:{" "}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        </li>
        <li>Phone / WhatsApp: {BUSINESS.phone}</li>
      </ul>
      <p>Typical response time: within 1–2 business days.</p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Grievance officer</h2>
      <p>
        For unresolved complaints or privacy grievances under the Digital Personal Data
        Protection Act, 2023:
      </p>
      <ul>
        <li>Officer: {BUSINESS.grievanceOfficer}</li>
        <li>
          Email:{" "}
          <a href={`mailto:${BUSINESS.grievanceEmail}`}>{BUSINESS.grievanceEmail}</a>
        </li>
        <li>Phone / WhatsApp: {BUSINESS.phone}</li>
      </ul>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Helpful links</h2>
      <ul>
        <li>
          <Link href="/shipping" style={{ textDecoration: "underline" }}>Shipping Policy</Link>
        </li>
        <li>
          <Link href="/replacement" style={{ textDecoration: "underline" }}>
            Return &amp; Refund Policy
          </Link>
        </li>
        <li>
          <Link href="/privacy" style={{ textDecoration: "underline" }}>Privacy Policy</Link>
        </li>
        <li>
          <Link href="/terms" style={{ textDecoration: "underline" }}>Terms &amp; Conditions</Link>
        </li>
      </ul>
    </div>
  );
}
