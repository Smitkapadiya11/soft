export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem', lineHeight: 1.6, color: 'var(--color-plum-dark)' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '2rem' }}>Privacy Policy</h1>
      <p>Last updated: July 7, 2026</p>
      
      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
      <p>To process and fulfill your order, we collect the following Personally Identifiable Information (PII):</p>
      <ul>
        <li>Full name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Complete shipping address (Address Line 1, optional Address Line 2, city, state, and pincode)</li>
      </ul>
      <p>We also collect transactional data such as order ID, payment status, and variant selection. We do not collect or store payment card or UPI credentials.</p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
      <p>We use your data strictly for:</p>
      <ul>
        <li>Order fulfillment and discreet shipping</li>
        <li>Customer support related to your purchase</li>
        <li>Transactional communication (e.g., order confirmation and shipping updates)</li>
      </ul>
      <p>Emails and messages reference your order number only — never product names. We do not use your information for marketing without your explicit consent.</p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Data Protection & Storage</h2>
      <p>Your data is stored in an encrypted PostgreSQL database hosted on Neon, accessed only through our secure server-side application. All web traffic is protected with HTTPS/TLS. Payment processing is handled by Razorpay; we never store card numbers, UPI PINs, or full payment credentials on our servers.</p>
      <p>We retain order and customer records as long as necessary to fulfill orders, comply with applicable law, and resolve disputes. You may request deletion of your data by contacting our support team.</p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. Discretion & Third Parties</h2>
      <p>We guarantee complete discretion. We do not sell or share your PII with third parties for marketing. Shipping labels and outer packaging omit product details. Data is shared only with service providers essential to operations (payment processing, hosting, email delivery), under strict confidentiality.</p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>5. Your Rights</h2>
      <p>You may request access to, correction of, or deletion of your personal data by emailing us. We will respond within a reasonable timeframe in accordance with applicable Indian privacy regulations.</p>
    </div>
  );
}
