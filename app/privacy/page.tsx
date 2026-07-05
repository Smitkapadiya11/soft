export default function PrivacyPolicy() {
  return (
    <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 1rem', lineHeight: 1.6, color: 'var(--color-plum-dark)' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '2rem' }}>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>1. Information We Collect</h2>
      <p>To process and fulfill your order, we collect the following Personally Identifiable Information (PII):</p>
      <ul>
        <li>Full Name</li>
        <li>Email Address</li>
        <li>Phone Number</li>
        <li>Complete Shipping Address (including Address Lines 1 & 2, City, State, and Pincode)</li>
      </ul>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
      <p>We use your data strictly for order fulfillment, customer support, and necessary transactional communication. Your email and phone number will only be used to send updates like "Your order has shipped." We do not use your information for marketing without explicit consent.</p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>3. Data Protection & Storage</h2>
      <p>Your data is stored securely in our encrypted database. We use bank-grade 256-bit SSL encryption for all transactions. We do not store your credit card or UPI details on our servers; payments are processed through secure, compliant third-party gateways.</p>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>4. Discretion</h2>
      <p>We guarantee complete discretion. We will never share or sell your PII to third parties. All shipping labels omit product details to maintain your privacy.</p>
    </div>
  );
}
