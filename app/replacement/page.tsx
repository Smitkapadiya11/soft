import { BUSINESS } from "@/lib/constants";
import Link from "next/link";

const pageStyle = {
  maxWidth: "800px",
  margin: "4rem auto",
  padding: "0 1rem",
  lineHeight: 1.7,
  color: "var(--color-plum-dark)",
} as const;

export default function ReturnRefundPolicy() {
  return (
    <div style={pageStyle}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "1rem" }}>
        Return &amp; Refund Policy
      </h1>
      <p style={{ color: "var(--color-plum)", marginBottom: "2rem" }}>
        Last updated: July 10, 2026 · {BUSINESS.legalName}
      </p>

      <p>
        This policy explains when you may return a product purchased from Silk Room and how
        refunds are processed. Please read it before placing an order.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>1. Return window</h2>
      <p>
        You may request a return within <strong>7 days of delivery</strong> for unused products
        that are in original condition with all accessories, manuals, and packaging intact.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>2. Conditions for returns</h2>
      <p>Returns are accepted when:</p>
      <ul>
        <li>The product is unused and undamaged by the customer</li>
        <li>Original packaging and all included accessories are returned</li>
        <li>Proof of purchase (order number / payment confirmation) is provided</li>
      </ul>
      <p>Returns may be declined if the product shows signs of use, damage caused after delivery, missing parts, or return requests made after the 7-day window.</p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>3. Damaged or defective products</h2>
      <p>
        If your product arrives damaged, incomplete, or defective, contact us within{" "}
        <strong>7 days of delivery</strong> at{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> with your order number and
        clear photos or a short video. Eligible cases will be offered a{" "}
        <strong>replacement</strong> or a <strong>full refund</strong>, at our discretion based
        on stock and the nature of the issue.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>4. How to initiate a return</h2>
      <ol>
        <li>Email {BUSINESS.email} with your order number and reason for return</li>
        <li>Wait for return authorisation and pickup / drop-off instructions</li>
        <li>Ship or hand over the product as instructed (do not return without authorisation)</li>
      </ol>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>5. Refund method</h2>
      <p>
        Approved refunds are issued to the <strong>original payment method</strong> used at
        checkout via Razorpay (the same UPI / card / net-banking source). We do not issue cash
        refunds.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>6. Refund timelines</h2>
      <p>
        After we receive and inspect the returned product (typically within 3–5 business days
        of receipt), approved refunds are initiated within <strong>5–7 business days</strong>.
        Banks and UPI providers may take additional time to reflect the credit in your account
        (often 3–10 business days depending on your bank).
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>7. Non-returnable situations</h2>
      <ul>
        <li>Products returned after the 7-day window without a valid defect claim</li>
        <li>Products damaged due to misuse or unauthorised modification</li>
        <li>Orders cancelled after dispatch where courier return-to-origin fees may apply (case-by-case)</li>
      </ul>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>8. Contact</h2>
      <p>
        Returns &amp; refunds: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> ·{" "}
        {BUSINESS.phone}
        <br />
        Grievances: <a href={`mailto:${BUSINESS.grievanceEmail}`}>{BUSINESS.grievanceEmail}</a>
        <br />
        <Link href="/contact" style={{ textDecoration: "underline" }}>Contact Us</Link>
        {" · "}
        <Link href="/shipping" style={{ textDecoration: "underline" }}>Shipping Policy</Link>
      </p>
    </div>
  );
}
