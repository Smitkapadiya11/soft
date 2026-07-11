import LegalLayout from "@/components/LegalLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age & Terms Acknowledgment | Silk Room",
  description:
    "Age and terms acknowledgment for silkroom.shop — personal wellness massagers for adults aged 18 and above.",
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

export default function AgeVerificationPage() {
  return (
    <LegalLayout title="Age & Terms Acknowledgment" lastUpdated="11 July 2026">
      <p>
        Silk Room sells personal wellness massagers for everyday pain relief. By using this
        website and placing an order, you confirm that you are aged{" "}
        <strong>18 years and above</strong> and that you agree to our Terms and Conditions and
        Privacy Policy.
      </p>

      <h2>How acknowledgment works</h2>
      <p>
        On first visit, visitors confirm they are 18 or older and accept our policies. This
        preference is stored locally in your browser so you are not asked on every page load.
      </p>

      <h2>Product disclaimer</h2>
      <p>
        Silk Room Ease is a personal wellness product for temporary relief of everyday muscle
        tension and similar discomfort. It is <strong>not a medical device</strong> and does not
        diagnose, treat, or cure any medical condition. Consult a doctor if pain persists.
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
