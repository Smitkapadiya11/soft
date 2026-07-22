import { BUSINESS } from "@/lib/constants";
import { CATALOG_PRODUCTS } from "@/lib/products";
import LegalLayout from "@/components/LegalLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Silk Room",
  description:
    "Shipping Policy for silkroom.shop — free plain-box delivery for Silk Room products across India.",
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

export default function Shipping() {
  return (
    <LegalLayout title="Shipping Policy" lastUpdated="19 July 2026">
      <p>
        This Shipping Policy applies to all Silk Room products currently sold on the Site:{" "}
        {CATALOG_PRODUCTS.map((product) => product.name).join(", ")}. Mixed-product orders ship
        together in the same discreet carton whenever stock allows.
      </p>

      <h2>Order Processing</h2>
      <p>
        Orders are processed within 1-3 business days after prepaid payment confirmation. Orders
        placed on weekends or public holidays are processed on the next business day.
      </p>

      <h2>Delivery Timelines</h2>
      <p>
        Delivery typically takes 3-7 business days from dispatch: 2-4 business days for metro
        cities (Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Ahmedabad, Pune); 5-7
        business days for other areas. Remote locations may take up to 10 business days.
      </p>

      <h2>Shipping Charges</h2>
      <p>
        Shipping is free on all orders, regardless of order value or destination. There are no
        hidden shipping fees.
      </p>

      <h2>Geographic Coverage</h2>
      <p>
        We deliver across India to all serviceable pincodes. If your pincode is not serviceable,
        we will notify you within 24 hours and process a full refund. We do not ship
        internationally.
      </p>

      <h2>Order Tracking</h2>
      <p>
        A tracking number and link will be sent to your registered email address once your order is
        dispatched. You can track your shipment on the courier partner&apos;s website.
      </p>

      <h2>Packaging</h2>
      <p>
        All orders are shipped in plain, unbranded outer packaging. The product name &lsquo;Silk
        Room&rsquo; does not appear on the external package. Your privacy is our priority.
      </p>

      <h2>Failed Delivery Attempts</h2>
      <p>
        If delivery is unsuccessful, the courier will make 2 additional attempts on subsequent
        business days. If all attempts fail, the package will be returned to us and a full refund
        will be processed within 5-7 business days.
      </p>

      <h2>Address Change</h2>
      <p>
        Shipping address can be changed only before dispatch. Once the order is dispatched, the
        address cannot be modified. Please contact support immediately if you need to change your
        address.
      </p>

      <h2>International Shipping</h2>
      <p>
        We currently do not ship outside India. International shipping is not available.
      </p>

      <p>
        Contact:{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> · {BUSINESS.phone}
      </p>

      <p>
        Related:{" "}
        <Link href="/cancellation-and-refunds">
          Cancellation and Refunds
        </Link>
        {" · "}
        <Link href="/contact">
          Contact Us
        </Link>
      </p>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Shipping Policy - Silk Room",
            url: "https://silkroom.shop/shipping",
            lastReviewed: "2026-07-10",
          }),
        }}
      />
    </LegalLayout>
  );
}
