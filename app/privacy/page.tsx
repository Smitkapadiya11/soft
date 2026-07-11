import { BUSINESS } from "@/lib/constants";
import LegalLayout from "@/components/LegalLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Silk Room",
  description:
    "Privacy Policy for silkroom.shop — how we collect, use, store, and protect your personal data in compliance with the DPDP Act, 2023 and IT Act, 2000.",
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="10 July 2026">
      <p>
        Silk Room (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), operated by{" "}
        <strong>{BUSINESS.legalName}</strong>, a {BUSINESS.entityType} registered in India at{" "}
        {BUSINESS.address}, operates silkroom.shop (the &ldquo;Site&rdquo;). We are committed to
        protecting your personal data in accordance with the Digital Personal Data Protection Act,
        2023 and the Information Technology Act, 2000.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>Identity and contact data: name, email address, phone number</li>
        <li>Delivery data: shipping address, city, state, pincode</li>
        <li>Order data: products ordered, order value, order history</li>
        <li>Technical data: IP address, browser type, device information (via standard cookies)</li>
      </ul>
      <p>
        We do <strong>NOT</strong> collect or store your card/UPI/bank details. All payment
        information is handled directly by our payment processor, Razorpay, under their own
        security standards.
      </p>

      <h2>2. Why we collect it</h2>
      <ul>
        <li>To process and fulfil your orders</li>
        <li>To communicate order and delivery updates</li>
        <li>To handle returns, refunds, and support requests</li>
        <li>To comply with legal and tax obligations</li>
        <li>To prevent fraud and secure the Site</li>
      </ul>

      <h2>3. Legal basis</h2>
      <p>
        We process your data on the basis of your consent (given at checkout), to perform our
        contract with you (fulfilling your order), and to meet legal obligations under Indian law.
      </p>

      <h2>4. How we store and protect it</h2>
      <p>
        Personal data is stored on secured, access-controlled database infrastructure (Neon
        PostgreSQL). We apply reasonable technical and organisational security measures, including
        encryption in transit (HTTPS) and restricted administrative access.
      </p>

      <h2>5. Data sharing</h2>
      <p>
        We share data only with: (a) Razorpay, to process payments; (b) our shipping/courier
        partners, to deliver your order; (c) authorities, where required by law. We do not sell
        your personal data.
      </p>

      <h2>6. Retention</h2>
      <p>
        We retain order and customer records for as long as needed to fulfil orders and for the
        period required under applicable tax and commercial law, after which data is deleted or
        anonymised.
      </p>

      <h2>7. Your rights (DPDP Act, 2023)</h2>
      <p>
        You have the right to access, correct, and request deletion of your personal data, and to
        withdraw consent. To exercise these, contact our Grievance Officer below.
      </p>

      <h2>8. Grievance Officer</h2>
      <ul>
        <li>Name: {BUSINESS.grievanceOfficer}</li>
        <li>
          Email:{" "}
          <a href={`mailto:${BUSINESS.grievanceEmail}`}>{BUSINESS.grievanceEmail}</a>
        </li>
        <li>Phone / WhatsApp: {BUSINESS.phone}</li>
        <li>Address: {BUSINESS.address}</li>
      </ul>
      <p>
        We will acknowledge grievances within <strong>{BUSINESS.grievanceAcknowledgmentHours} hours</strong>{" "}
        and resolve them within <strong>{BUSINESS.grievanceResolutionDays} days</strong>, in
        accordance with the Digital Personal Data Protection (DPDP) Act, 2023 and the Consumer
        Protection (E-Commerce) Rules, 2020.
      </p>
      <p>
        Full contact details are also listed on our{" "}
        <Link href="/contact">
          Contact Us
        </Link>{" "}
        page.
      </p>

      <h2>9. Changes</h2>
      <p>
        We may update this policy; changes take effect when posted here with a revised date.
      </p>

      <h2>10. Cookies &amp; Tracking Technologies</h2>
      <p>
        Our website uses cookies and similar tracking technologies to enhance user experience and
        analyze website traffic. We use: (a) Essential cookies — required for shopping cart
        functionality and age verification; (b) Analytics cookies — to understand how visitors use
        our website (these may be disabled in your browser settings). You can control cookies
        through your browser settings. Disabling essential cookies may affect website
        functionality.
      </p>

      <h2>11. Third-Party Processors</h2>
      <p>
        We share specific data with trusted third-party service providers: (a) Razorpay —
        processes payment transactions. Payment card data is handled entirely by Razorpay and is
        never stored on our servers. (b) Courier partners — receive your name, address, and phone
        number for delivery purposes only. (c) Vercel — provides website hosting infrastructure.
        (d) Neon (PostgreSQL) — provides database hosting with encryption at rest. Each processor
        is bound by appropriate data protection agreements.
      </p>

      <h2>12. Data Retention</h2>
      <p>
        We retain order data (customer name, contact details, shipping address, order details) for
        7 years as required by Indian tax law. After this period, data is permanently deleted or
        anonymized. Payment data is not retained by Silk Room — it is processed entirely by
        Razorpay.
      </p>

      <h2>13. Children&apos;s Data</h2>
      <p>
        Our website is strictly for adults aged 18 and above. We do not knowingly collect personal
        information from individuals under 18. Our age verification gate requires users to confirm
        they are 18 or older before accessing the website. If we become aware that we have
        collected data from a minor, we will delete it immediately.
      </p>

      <h2>14. Data Security Measures</h2>
      <p>
        We implement industry-standard security measures including: HTTPS encryption for all data
        in transit; access controls limiting data access to authorized personnel only; database
        encryption at rest via Neon PostgreSQL; regular security reviews. However, no method of
        transmission or storage is 100% secure.
      </p>

      <h2>15. Data Breach Notification</h2>
      <p>
        In the event of a data breach that is likely to cause harm to our users, we commit to
        notifying affected users and the Data Protection Board within 72 hours of becoming aware of
        the breach, in accordance with the Digital Personal Data Protection (DPDP) Act, 2023.
      </p>

      <h2>16. International Data Transfers</h2>
      <p>
        Your data is stored on cloud infrastructure (Vercel hosting, Neon database) which may
        process data in data centers outside India. By using our services, you consent to such
        transfers. We ensure our service providers maintain adequate data protection standards.
      </p>

      <h2>17. Do Not Track</h2>
      <p>
        Our website does not respond to &lsquo;Do Not Track&rsquo; signals from browsers, as there
        is no standardized interpretation of this signal. You can manage cookies and tracking
        through your browser settings.
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy - Silk Room",
            url: "https://silkroom.shop/privacy",
            lastReviewed: "2026-07-10",
          }),
        }}
      />
    </LegalLayout>
  );
}
