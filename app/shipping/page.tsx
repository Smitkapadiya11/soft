import { BUSINESS, PRODUCT_PRICE } from "@/lib/constants";
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
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "2rem" }}>
        Shipping Policy
      </h1>
      <p style={{ color: "var(--color-plum)", marginBottom: "2rem" }}>Last updated: July 10, 2026</p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>1. Shipping charges</h2>
      <p>
        Standard delivery across serviceable pin codes in India is <strong>free</strong>.
        The product price shown on the site (currently ₹{PRODUCT_PRICE} for our Deep Relief
        Massager) is the amount you pay at prepaid checkout — no separate shipping line item
        is added for standard delivery.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>2. Dispatch timelines</h2>
      <p>
        Orders are typically processed and handed to our courier partner within{" "}
        <strong>24–48 hours</strong> of successful payment confirmation (excluding Sundays and
        public holidays).
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>3. Delivery estimates</h2>
      <ul>
        <li>Metro cities: usually 2–4 business days after dispatch</li>
        <li>Other serviceable locations: usually 3–6 business days after dispatch</li>
      </ul>
      <p>
        Estimates may vary due to courier capacity, weather, remote locations, or peak seasons.
        You will receive tracking details by email once the shipment is live.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>4. Couriers</h2>
      <p>
        We ship through reputable pan-India courier and logistics partners. The specific
        courier for your order is assigned at dispatch and shown in your tracking update.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>5. Packaging</h2>
      <p>
        Orders ship in a secure outer carton. Outer labels show the information required for
        delivery. We keep packaging practical and professional — no unnecessary promotional
        messaging on the outside of the box.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>6. Prepaid orders only</h2>
      <p>
        All orders are prepaid via Razorpay. Cash on Delivery (COD) is not available. This
        helps ensure smooth, contactless delivery.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>7. Failed delivery</h2>
      <p>
        Please ensure your phone number and address are accurate. If a delivery attempt fails
        due to an incorrect address or unreachable contact, re-attempt or return-to-origin
        rules of the courier may apply. Contact{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> promptly for assistance.
      </p>

      <p style={{ marginTop: "2rem" }}>
        Related:{" "}
        <Link href="/replacement" style={{ textDecoration: "underline" }}>Return &amp; Refund Policy</Link>
        {" · "}
        <Link href="/contact" style={{ textDecoration: "underline" }}>Contact Us</Link>
      </p>
    </div>
  );
}
