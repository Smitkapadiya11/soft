import { BUSINESS } from "@/lib/constants";
import Link from "next/link";

const pageStyle = {
  maxWidth: "800px",
  margin: "4rem auto",
  padding: "0 1rem",
  lineHeight: 1.7,
  color: "var(--color-plum-dark)",
} as const;

export default function Shipping() {
  return (
    <div style={pageStyle}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "1rem" }}>
        Shipping Policy
      </h1>
      <p style={{ color: "var(--color-plum)", marginBottom: "2rem" }}>
        Last updated: July 10, 2026
      </p>

      <ul>
        <li>
          Orders are dispatched within <strong>1–3 business days</strong> of successful prepaid
          payment.
        </li>
        <li>
          Estimated delivery: <strong>3–7 business days</strong> depending on your location in
          India.
        </li>
        <li>
          Shipping charges: <strong>Free on all orders</strong> (shown at checkout as Free).
        </li>
        <li>
          We ship across India via pan-India courier partners. A tracking link is emailed on
          dispatch.
        </li>
        <li>
          All orders ship in plain, unbranded, discreet packaging for your privacy.
        </li>
        <li>We currently ship only within India.</li>
        <li>
          Delays due to courier, weather, or force majeure are outside our control; we&apos;ll help
          you track and resolve any issue.
        </li>
      </ul>

      <p style={{ marginTop: "2rem" }}>
        Contact:{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> · {BUSINESS.phone}
      </p>

      <p style={{ marginTop: "1.5rem" }}>
        Related:{" "}
        <Link href="/replacement" style={{ textDecoration: "underline" }}>
          Return &amp; Refund Policy
        </Link>
        {" · "}
        <Link href="/contact" style={{ textDecoration: "underline" }}>
          Contact Us
        </Link>
      </p>
    </div>
  );
}
