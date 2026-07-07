export default function Shipping() {
  return (
    <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem', lineHeight: 1.7, color: 'var(--color-plum-dark)' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '2rem' }}>Shipping Policy</h1>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Free Delivery Across India</h2>
      <p>
        Every Silk Room order includes <strong>free doorstep delivery</strong> to all serviceable
        pin codes in India. The price you see on the product page (₹549) is your final price —
        no shipping charges are added at checkout.
      </p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. Discreet Packaging</h2>
      <p>
        All orders ship in plain, unbranded outer boxes. The shipping label contains only your
        name and delivery address. There is no mention of &ldquo;Silk Room&rdquo; or product
        contents anywhere on the outside of the package.
      </p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Processing &amp; Delivery Times</h2>
      <p>
        Orders are processed and dispatched within <strong>24 hours</strong> of payment confirmation.
      </p>
      <ul>
        <li>Metro cities: 2–4 business days</li>
        <li>Other regions: 3–6 business days</li>
      </ul>
      <p>Delivery timelines may vary during peak seasons or in remote areas.</p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. Prepaid Orders Only</h2>
      <p>
        We accept prepaid orders only (UPI, cards, net banking via Razorpay). Cash on Delivery
        (COD) is not available — this ensures contactless, secure delivery every time.
      </p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>5. Order Tracking</h2>
      <p>
        Once dispatched, you will receive a discreet order confirmation email with your tracking
        details. Emails reference your order number only — never product names.
      </p>
    </div>
  );
}
