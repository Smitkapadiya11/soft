import { BUSINESS } from "@/lib/constants";
import Link from "next/link";

const pageStyle = {
  maxWidth: "800px",
  margin: "4rem auto",
  padding: "0 1rem",
  lineHeight: 1.7,
  color: "var(--color-plum-dark)",
} as const;

export default function Terms() {
  return (
    <div style={pageStyle}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "1rem" }}>
        Terms &amp; Conditions
      </h1>
      <p style={{ color: "var(--color-plum)", marginBottom: "2rem" }}>
        Last updated: July 10, 2026
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>1. About us</h2>
      <p>
        silkroom.shop is operated by <strong>{BUSINESS.legalName}</strong>, a proprietorship
        registered in India at India (online retail — contact support for correspondence). We are
        an online retailer of condoms and sexual wellness products.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>2. Eligibility</h2>
      <p>
        The products sold on this Site are intended for adults aged <strong>18 years and
        above</strong>. By placing an order you confirm that you are 18 or older.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>3. Orders and pricing</h2>
      <p>
        All prices are in INR and inclusive of taxes as applicable. We accept{" "}
        <strong>prepaid</strong> orders only, processed securely via Razorpay. We reserve the
        right to cancel orders in cases of pricing errors, suspected fraud, or stock
        unavailability, with a full refund.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>4. Product information</h2>
      <p>
        We sell genuine, sealed products sourced from licensed suppliers and authorised
        distributors. Please check product details and expiry information on delivery. Use
        products in accordance with the manufacturer&apos;s instructions printed on the packaging.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>5. Payments</h2>
      <p>
        Payments are handled by Razorpay. We do not store your payment credentials. By placing an
        order you agree to Razorpay&apos;s applicable terms for the payment transaction.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>6. Shipping, returns, refunds</h2>
      <p>
        Governed by our{" "}
        <Link href="/shipping" style={{ textDecoration: "underline" }}>
          Shipping Policy
        </Link>{" "}
        and{" "}
        <Link href="/replacement" style={{ textDecoration: "underline" }}>
          Return &amp; Refund Policy
        </Link>
        , incorporated here by reference.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>7. Acceptable use</h2>
      <p>You agree to provide accurate information and to use the Site lawfully.</p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>8. Intellectual property</h2>
      <p>
        All Site content and branding is owned by {BUSINESS.legalName} and may not be copied
        without consent.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>9. Limitation of liability</h2>
      <p>
        To the extent permitted by law, our liability for any claim relating to a purchase is
        limited to the amount paid for that order.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of India; courts at{" "}
        <strong>Ahmedabad</strong> have jurisdiction.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>11. Contact</h2>
      <p>
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> · {BUSINESS.phone} · India
        (online retail — contact support for correspondence)
        <br />
        See also{" "}
        <Link href="/contact" style={{ textDecoration: "underline" }}>
          Contact Us
        </Link>
        .
      </p>
    </div>
  );
}
