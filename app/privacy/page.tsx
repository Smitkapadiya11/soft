export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem', lineHeight: 1.7, color: 'var(--color-plum-dark)' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--color-plum)', marginBottom: '2rem' }}>Last updated: July 7, 2026</p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Your Privacy Matters</h2>
      <p>
        At Silk Room, discretion is not an afterthought — it is built into everything we do.
        We collect only what is needed to fulfill your order and deliver it safely to your door.
        Your data is safe, secure, and never used for anything beyond your purchase.
      </p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>How We Protect You</h2>
      <ul>
        <li><strong>End-to-end encrypted orders</strong> — your checkout and order details are encrypted from the moment you submit to the moment we fulfill</li>
        <li><strong>256-bit SSL on every page</strong> — the same security standard used by leading banks</li>
        <li><strong>Secure payment processing</strong> — handled entirely by Razorpay; we never see or store your card number or UPI PIN</li>
        <li><strong>Discreet communications</strong> — emails and messages reference your order number only, never product names</li>
        <li><strong>No data selling</strong> — we never sell, rent, or share your information with marketers or advertisers</li>
      </ul>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>What We Use Your Information For</h2>
      <p>
        The details you provide at checkout are used exclusively to process your payment, ship
        your order, and assist you if something goes wrong. That is it. We do not send
        promotional emails unless you explicitly opt in.
      </p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Discreet Shipping</h2>
      <p>
        Outer packaging is completely plain and unbranded. Shipping labels show only what is
        legally required for delivery — nothing that reveals the contents of your package.
      </p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Data Retention</h2>
      <p>
        Order records are retained only as long as needed to fulfill your purchase, comply with
        applicable law, and resolve any disputes. You may request deletion of your data at any
        time by contacting our support team.
      </p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Your Rights</h2>
      <p>
        You have the right to access, correct, or request deletion of your personal information.
        Contact us and we will respond within a reasonable timeframe in accordance with applicable
        Indian privacy regulations.
      </p>
    </div>
  );
}
