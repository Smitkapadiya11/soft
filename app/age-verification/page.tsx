import Link from "next/link";

/** Age policy page — gate itself is the AgeGate modal on first visit */
export default function AgeVerificationPage() {
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
        Age Requirement
      </h1>
      <p>
        Silk Room sells condoms and sexual wellness products intended for adults aged{" "}
        <strong>18 years and above</strong>. By using this website and placing an order, you
        confirm that you meet this requirement.
      </p>
      <p style={{ marginTop: "1rem" }}>
        We may cancel orders if we reasonably believe the purchaser is under 18, with a refund
        as applicable under our policies.
      </p>
      <ul style={{ marginTop: "1.5rem" }}>
        <li>
          <Link href="/terms" style={{ textDecoration: "underline" }}>
            Terms &amp; Conditions
          </Link>
        </li>
        <li>
          <Link href="/privacy" style={{ textDecoration: "underline" }}>
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/contact" style={{ textDecoration: "underline" }}>
            Contact Us
          </Link>
        </li>
      </ul>
    </div>
  );
}
