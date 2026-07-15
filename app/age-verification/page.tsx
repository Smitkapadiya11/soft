import LegalLayout from "@/components/LegalLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Verification | Silk Room",
  description:
    "Age verification for silkroom.shop — personal wellness products for adults aged 18 and above.",
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

export default function AgeVerificationPage() {
  return (
    <LegalLayout title="Age Requirement & Verification" lastUpdated="15 July 2026">
      <p>
        Silk Room sells personal wellness products for adults aged{" "}
        <strong>18 years and above</strong>. By using this website and placing an order, you
        confirm that you meet this requirement and accept our Terms and Privacy Policy.
      </p>
      <h2>How verification works</h2>
      <p>
        Age is confirmed by self-declaration at entry (stored locally in your browser) and again
        when you place an order.
      </p>
      <h2>Related Policies</h2>
      <ul>
        <li>
          <Link href="/terms">Terms and Conditions</Link>
        </li>
        <li>
          <Link href="/privacy">Privacy Policy</Link>
        </li>
        <li>
          <Link href="/cancellation-and-refunds">Return &amp; Refund Policy</Link>
        </li>
        <li>
          <Link href="/contact">Contact Us</Link>
        </li>
      </ul>
    </LegalLayout>
  );
}
