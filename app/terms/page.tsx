import { BUSINESS } from "@/lib/constants";
import LegalLayout from "@/components/LegalLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Silk Room",
  description:
    "Terms and Conditions for using silkroom.shop — an online retailer of personal wellness products for adults aged 18 and above in India.",
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

export default function Terms() {
  return (
    <LegalLayout title="Terms and Conditions" lastUpdated="11 July 2026">
      <h2>1. About us</h2>
      <p>
        silkroom.shop is operated by <strong>{BUSINESS.legalName}</strong> under the trading
        name <strong>{BUSINESS.tradingAs}</strong>, founded by <strong>{BUSINESS.founder}</strong>
        {" "}({BUSINESS.entityType}). Registered in India at {BUSINESS.address}. We are an online
        retailer of personal wellness products for adults aged 18 and above.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        Products sold on this Site are intended for adults aged <strong>18 years and
        above</strong>. By placing an order you confirm that you are 18 or older and accept
        these Terms.
      </p>

      <h2>3. Orders and pricing</h2>
      <p>
        All prices are in INR and inclusive of taxes as applicable. We accept{" "}
        <strong>prepaid</strong> orders only, processed securely via Razorpay. We reserve the
        right to cancel orders in cases of pricing errors, suspected fraud, or stock
        unavailability, with a full refund.
      </p>

      <h2>4. Product information</h2>
      <p>
        We sell genuine products inspected before dispatch. Please check the device and
        accessories on delivery. Use products in accordance with the included quick-start guide
        and these Terms.
      </p>

      <h2>5. Payments</h2>
      <p>
        Payments are handled by Razorpay. We do not store your payment credentials. By placing an
        order you agree to Razorpay&apos;s applicable terms for the payment transaction.
      </p>

      <h2>6. Shipping, returns, refunds</h2>
      <p>
        Governed by our{" "}
        <Link href="/shipping">
          Shipping Policy
        </Link>{" "}
        and{" "}
        <Link href="/cancellation-and-refunds">
          Return &amp; Refund Policy
        </Link>
        , incorporated here by reference.
      </p>

      <h2>7. Acceptable use</h2>
      <p>You agree to provide accurate information and to use the Site lawfully.</p>

      <h2>8. Intellectual property</h2>
      <p>
        All Site content and branding is owned by {BUSINESS.legalName} and may not be copied
        without consent.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the extent permitted by law, our liability for any claim relating to a purchase is
        limited to the amount paid for that order.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of India; courts at{" "}
        <strong>{BUSINESS.jurisdiction}</strong> have jurisdiction.
      </p>

      <h2>11. Contact</h2>
      <p>
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> · {BUSINESS.phone} · {BUSINESS.address}
        <br />
        See also{" "}
        <Link href="/contact">
          Contact Us
        </Link>
        .
      </p>

      <h2>12. Accepted Payment Methods</h2>
      <p>
        We accept the following prepaid payment methods through our payment gateway Razorpay: UPI,
        Credit Cards, Debit Cards, Net Banking, and Digital Wallets. Cash on Delivery (COD) is not
        available. All payments are processed securely through Razorpay&apos;s encrypted payment
        infrastructure.
      </p>

      <h2>13. Pricing &amp; Currency</h2>
      <p>
        All prices listed on our website are in Indian Rupees (INR) and are inclusive of all
        applicable taxes. The total amount payable at checkout is the final price — there are no
        hidden charges, processing fees, or shipping fees. Prices are subject to change without
        prior notice, but the price confirmed at the time of order placement shall remain binding.
      </p>

      <h2>14. Delivery Timelines</h2>
      <p>
        Orders are processed within 1-3 business days of payment confirmation. Delivery typically
        takes 3-7 business days depending on the destination. For more details, please refer to our{" "}
        <Link href="/shipping">Shipping Policy</Link>.
      </p>

      <h2>15. Product Disclaimers</h2>
      <p>
        Products sold on this Site are personal wellness products for adults aged 18+.
        They are <strong>not medical devices</strong> and are not intended to diagnose, treat, cure,
        or prevent any disease. Follow care instructions. If irritation occurs, discontinue use.
        Keep out of reach of minors.
      </p>

      <h2>16. Prohibited Activities</h2>
      <p>
        Users agree not to: (a) use the website for any unlawful purpose; (b) attempt to resell
        products purchased from Silk Room; (c) use automated systems (bots, scrapers) to access or
        collect data from the website; (d) place fraudulent orders; (e) provide false or misleading
        information; (f) attempt to compromise website security.
      </p>

      <h2>17. Force Majeure</h2>
      <p>
        Silk Room shall not be liable for any failure or delay in performance caused by
        circumstances beyond our reasonable control, including but not limited to natural
        disasters, government actions, strikes, pandemics, internet or telecommunication failures,
        or supplier disruptions.
      </p>

      <h2>18. Dispute Resolution &amp; Arbitration</h2>
      <p>
        Any dispute arising out of or relating to these Terms or the use of our website shall first
        be attempted to be resolved through amicable negotiation. If unresolved within 30 days, the
        dispute shall be referred to a sole arbitrator appointed by mutual consent. The seat of
        arbitration shall be {BUSINESS.jurisdiction}. The arbitration shall be conducted in
        accordance with the Arbitration and Conciliation Act, 1996. The language of arbitration
        shall be English.
      </p>

      <h2>19. Modifications to Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. Material changes will be notified
        via email to registered customers at least 7 days before taking effect. Continued use of
        the website after changes take effect constitutes acceptance of the updated Terms.
      </p>

      <h2>20. Account Termination</h2>
      <p>
        We reserve the right to suspend or terminate access to the website for any user who
        violates these Terms, engages in fraudulent activity, or is suspected of being under 18
        years of age.
      </p>

      <h2>21. Severability</h2>
      <p>
        If any provision of these Terms is found to be unenforceable or invalid by a court or
        arbitrator, the remaining provisions shall remain in full force and effect.
      </p>
    </LegalLayout>
  );
}
