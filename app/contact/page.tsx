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
        We&apos;re here to help with orders, returns, and any questions.
      </p>

      <ul>
        <li>
          Business name: <strong>{BUSINESS.legalName}</strong>
        </li>
        <li>
          Email:{" "}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        </li>
        <li>Phone / WhatsApp: {BUSINESS.phone}</li>
        <li>Hours: Mon–Sat, 10am–6pm IST</li>
        <li>
          Registered address: India (online retail — contact support for correspondence)
        </li>
        <li>
          Grievance Officer: {BUSINESS.grievanceOfficer},{" "}
          <a href={`mailto:${BUSINESS.grievanceEmail}`}>{BUSINESS.grievanceEmail}</a>
        </li>
      </ul>

      <p style={{ marginTop: "1.5rem" }}>
        We aim to respond to all queries within <strong>2 business days</strong>. Privacy
        grievances are acknowledged within <strong>3 days</strong>.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Helpful links</h2>
      <ul>
        <li>
          <Link href="/privacy" style={{ textDecoration: "underline" }}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/terms" style={{ textDecoration: "underline" }}>
            Terms &amp; Conditions
          </Link>
        </li>
        <li>
          <Link href="/replacement" style={{ textDecoration: "underline" }}>
            Return &amp; Refund Policy
          </Link>
        </li>
        <li>
          <Link href="/shipping" style={{ textDecoration: "underline" }}>
            Shipping Policy
          </Link>
        </li>
      </ul>
    </div>
  );
}
