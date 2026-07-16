import { BUSINESS, POLICY_LINKS } from "@/lib/constants";
import LegalLayout from "@/components/LegalLayout";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Silk Room",
  description:
    "Contact Silk Room — customer support, grievance officer, business hours, GSTIN, registered address, and grievance escalation path.",
  robots: { index: true, follow: true },
};

export const revalidate = 86400;

export default function ContactPage() {
  return (
    <LegalLayout
      title="Contact Us"
      lastUpdated="17 July 2026"
      subtitle="We're here to help with orders, returns, and any questions."
    >
      <h2>Business Details</h2>
      <ul>
        <li>
          Trading name: <strong>{BUSINESS.tradingAs}</strong>
        </li>
        <li>
          Legal entity: <strong>{BUSINESS.legalName}</strong>
        </li>
        <li>
          Founder: <strong>{BUSINESS.founder}</strong>
        </li>
        <li>Entity type: {BUSINESS.entityType}</li>
        <li>
          GSTIN: <strong>{BUSINESS.gstin}</strong>
        </li>
        <li>Registered address: {BUSINESS.address}</li>
        <li>
          Website: <a href={BUSINESS.website}>{BUSINESS.website}</a>
        </li>
      </ul>

      <h2>Contact Channels</h2>
      <ul>
        <li>
          Email: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        </li>
        <li>Phone / WhatsApp: {BUSINESS.phone}</li>
        <li>
          WhatsApp chat:{" "}
          <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer">
            Open WhatsApp
          </a>
        </li>
        <li>
          Grievance Officer: {BUSINESS.grievanceOfficer},{" "}
          <a href={`mailto:${BUSINESS.grievanceEmail}`}>{BUSINESS.grievanceEmail}</a>
        </li>
      </ul>

      <h2>Business Hours</h2>
      <p>
        <strong>{BUSINESS.hours}</strong>
      </p>
      <ul>
        <li>Email & WhatsApp support: {BUSINESS.hours}</li>
        <li>
          Grievance redressal: Acknowledged within {BUSINESS.grievanceAcknowledgmentHours}{" "}
          hours, resolved within {BUSINESS.grievanceResolutionDays} days
        </li>
      </ul>

      <h2>Grievance Redressal Timeline</h2>
      <p>
        We acknowledge all grievances within{" "}
        <strong>{BUSINESS.grievanceAcknowledgmentHours} hours</strong> and resolve them within{" "}
        <strong>{BUSINESS.grievanceResolutionDays} days</strong>, in accordance with the DPDP Act,
        2023 and Consumer Protection (E-Commerce) Rules, 2020.
      </p>

      <h2>Grievance Escalation Path</h2>
      <ul>
        <li>
          <strong>Level 1 — Customer Support:</strong> Contact{" "}
          <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or WhatsApp {BUSINESS.whatsapp}.
          We aim to resolve queries within 2 business days.
        </li>
        <li>
          <strong>Level 2 — Grievance Officer:</strong> If your issue is not resolved at Level 1,
          escalate to our Grievance Officer at{" "}
          <a href={`mailto:${BUSINESS.grievanceEmail}`}>{BUSINESS.grievanceEmail}</a>. Your
          grievance will be acknowledged within {BUSINESS.grievanceAcknowledgmentHours} hours and
          resolved within {BUSINESS.grievanceResolutionDays} days.
        </li>
        <li>
          <strong>Level 3 — Consumer Disputes Redressal Commission:</strong> If your grievance
          remains unresolved after Level 2, you may approach the Consumer Disputes Redressal
          Commission having jurisdiction over {BUSINESS.jurisdiction}, in accordance with the
          Consumer Protection Act, 2019.
        </li>
      </ul>

      <h2>Helpful Links</h2>
      <ul>
        {POLICY_LINKS.filter((l) => l.href !== "/contact").map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Us - Silk Room",
            url: "https://silkroom.shop/contact",
            lastReviewed: "2026-07-11",
            mainEntity: {
              "@type": "Organization",
              name: BUSINESS.legalName,
              email: BUSINESS.email,
              telephone: BUSINESS.phone,
              url: BUSINESS.website,
              address: {
                "@type": "PostalAddress",
                addressCountry: "IN",
                addressLocality: "Ahmedabad",
                addressRegion: "Gujarat",
              },
            },
          }),
        }}
      />
    </LegalLayout>
  );
}
