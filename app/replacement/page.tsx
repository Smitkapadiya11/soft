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

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Returns</h2>
      <p>
        Because condoms are an intimate hygiene product, for health and safety reasons we can only
        accept returns where the product is:
      </p>
      <ul>
        <li>
          Unopened and in its original sealed packaging, <strong>AND</strong> returned within{" "}
          <strong>7 days</strong> of delivery, <strong>OR</strong>
        </li>
        <li>
          Defective, damaged in transit, incorrectly supplied, or past/near expiry on arrival.
        </li>
      </ul>
      <p>
        Opened or unsealed products cannot be returned unless they were defective or damaged on
        arrival. This is a standard hygiene rule for this product category.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>How to request a return</h2>
      <p>
        Email{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or WhatsApp {BUSINESS.whatsapp}{" "}
        with your order number and, for damaged/defective/expiry issues, a photo. We&apos;ll
        respond within <strong>2 business days</strong> with instructions.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Refunds</h2>
      <ul>
        <li>Approved refunds are issued to your original payment method via Razorpay.</li>
        <li>
          Refunds are processed within <strong>5–7 business days</strong> of us receiving and
          inspecting the returned item (or approving a damaged/defective claim).
        </li>
        <li>
          Bank/UPI processing may add <strong>2–5</strong> additional business days.
        </li>
      </ul>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Non-returnable situations</h2>
      <ul>
        <li>Opened or unsealed products (except where defective/damaged on arrival)</li>
        <li>Change-of-mind requests after the return window</li>
        <li>Products damaged by misuse or improper storage after delivery</li>
      </ul>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Cancellations</h2>
      <p>
        Orders can be cancelled before dispatch by contacting us; a full refund is issued for
        cancelled pre-dispatch orders.
      </p>

      <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Contact</h2>
      <p>
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> · {BUSINESS.phone} · Mon–Sat,
        10am–6pm IST
        <br />
        Grievances:{" "}
        <a href={`mailto:${BUSINESS.grievanceEmail}`}>{BUSINESS.grievanceEmail}</a>
        <br />
        <Link href="/contact" style={{ textDecoration: "underline" }}>
          Contact Us
        </Link>
        {" · "}
        <Link href="/shipping" style={{ textDecoration: "underline" }}>
          Shipping Policy
        </Link>
      </p>
    </div>
  );
}
