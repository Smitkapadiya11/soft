import { BUSINESS, PRODUCT_NAME, PRODUCT_PRICE } from "@/lib/constants";
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
        These Terms &amp; Conditions govern your use of the website operated by{" "}
        <strong>{BUSINESS.legalName}</strong> (&ldquo;Silk Room&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;). We retail consumer wellness products, including cordless personal
        muscle massage devices such as the <strong>{PRODUCT_NAME}</strong>, for home and
        personal use in India.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>2. Agreement</h2>
      <p>
        By browsing or placing an order on {BUSINESS.website}, you agree to these Terms, our{" "}
        <Link href="/privacy" style={{ textDecoration: "underline" }}>Privacy Policy</Link>,{" "}
        <Link href="/shipping" style={{ textDecoration: "underline" }}>Shipping Policy</Link>, and{" "}
        <Link href="/replacement" style={{ textDecoration: "underline" }}>Return &amp; Refund Policy</Link>.
        If you do not agree, please do not use the website.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>3. Products &amp; pricing</h2>
      <p>
        Product descriptions, specifications, and images are provided for accurate retail
        information. Prices are displayed in Indian Rupees (INR). The listed price for the{" "}
        {PRODUCT_NAME} is ₹{PRODUCT_PRICE} unless otherwise updated on the product page.
        Standard delivery within India is free unless stated otherwise. We may update pricing
        or discontinue products at any time.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>4. Orders &amp; payment</h2>
      <p>
        Orders are accepted only after successful <strong>prepaid</strong> payment. We do not
        offer Cash on Delivery (COD). Payments are processed by Razorpay (UPI, cards, and net
        banking as available). An order confirmation does not guarantee stock; if an item cannot
        be fulfilled after payment, we will refund you as described in our Return &amp; Refund Policy.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>5. User obligations</h2>
      <ul>
        <li>Provide accurate shipping and contact details</li>
        <li>Use products only as intended for personal muscle massage / wellness use</li>
        <li>Follow the care and safety instructions included with the product</li>
        <li>Do not misuse the website or attempt unauthorised access</li>
      </ul>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>6. Shipping &amp; returns</h2>
      <p>
        Delivery timelines and packaging are described in our Shipping Policy. Returns and
        refunds are governed exclusively by our Return &amp; Refund Policy.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>7. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by Indian law, Silk Room is not liable for indirect,
        incidental, or consequential damages arising from use of the website or products.
        Nothing in these Terms excludes liability that cannot be excluded under applicable law
        (including liability for proven manufacturing defects where required by consumer law).
        Products must be used as intended; we are not responsible for misuse or failure to
        follow safety instructions.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>8. Governing law</h2>
      <p>
        These Terms are governed by the laws of India. Subject to applicable consumer
        protection rights, courts in India shall have jurisdiction over disputes arising from
        these Terms or your purchase.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>9. Contact</h2>
      <p>
        Questions about these Terms:{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> · {BUSINESS.phone}. See also{" "}
        <Link href="/contact" style={{ textDecoration: "underline" }}>Contact Us</Link>.
      </p>
    </div>
  );
}
