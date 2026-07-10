import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

/** Legacy route — adult age-gate removed for general wellness products. */
export default function PoliciesOverview() {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "4rem auto",
        padding: "0 1rem",
        lineHeight: 1.7,
        color: "var(--color-plum-dark)",
      }}
    >
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "1rem" }}>
        Store Policies
      </h1>
      <p>
        {BUSINESS.name} sells consumer wellness massage devices for personal muscle relief and
        relaxation. By using this website and placing an order, you agree to our published
        policies:
      </p>
      <ul style={{ marginTop: "1.5rem" }}>
        <li>
          <Link href="/terms" style={{ textDecoration: "underline" }}>Terms &amp; Conditions</Link>
        </li>
        <li>
          <Link href="/privacy" style={{ textDecoration: "underline" }}>Privacy Policy</Link>
        </li>
        <li>
          <Link href="/shipping" style={{ textDecoration: "underline" }}>Shipping Policy</Link>
        </li>
        <li>
          <Link href="/replacement" style={{ textDecoration: "underline" }}>
            Return &amp; Refund Policy
          </Link>
        </li>
        <li>
          <Link href="/contact" style={{ textDecoration: "underline" }}>Contact Us</Link>
        </li>
      </ul>
    </div>
  );
}
