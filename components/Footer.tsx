import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { ShieldCheck, Package, Lock, RotateCcw } from "lucide-react";
import { BUSINESS, POLICY_LINKS } from "@/lib/constants";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/MotionWrapper";
import { BrandMark } from "@/components/illustrations";

const CURRENT_YEAR = 2026;

const trustItems = [
  { icon: Package, label: "Discreet Packaging" },
  { icon: Lock, label: "Secure Prepaid Checkout" },
  { icon: ShieldCheck, label: "Privacy Protected" },
  { icon: RotateCcw, label: "Easy Returns" },
];

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35ZM12.02 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.41-9.4 2.51 0 4.87.98 6.64 2.76a9.33 9.33 0 0 1 2.75 6.65c0 5.18-4.22 9.4-9.4 9.4ZM20.52 3.49A11.78 11.78 0 0 0 12.02 0C5.49 0 .19 5.3.18 11.82c0 2.08.54 4.12 1.58 5.92L.08 24l6.4-1.68a11.8 11.8 0 0 0 5.64 1.44h.01c6.52 0 11.83-5.3 11.83-11.83a11.77 11.77 0 0 0-3.45-8.44Z" />
    </svg>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <StaggerGroup className={styles.trustStrip}>
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <StaggerItem key={item.label} className={styles.trustItem}>
              <Icon size={24} />
              <span>{item.label}</span>
            </StaggerItem>
          );
        })}
      </StaggerGroup>

      <div className={styles.content}>
        <div className={styles.brandInfo}>
          <Link href="/" className={styles.logoLink}>
            <BrandMark className={styles.logo} variant="footer" />
          </Link>
          <p className={styles.tagline}>
            Premium self-care, delivered with total discretion.
          </p>
          <div className={styles.social}>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              className={styles.socialLink}
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className={styles.socialLink}
              aria-label="Email support"
            >
              <MailIcon />
            </a>
          </div>
        </div>

        <div className={styles.links}>
          <h4>Explore</h4>
          <Link href="/about">About Us</Link>
          <Link href="/product">Shop Now</Link>
          <Link href="/contact">Contact Us</Link>
        </div>

        <div className={styles.links}>
          <h4>Legal</h4>
          {POLICY_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className={styles.newsletter}>
          <h4>Need Help?</h4>
          <p className={styles.newsletterText}>
            Questions about your order or delivery? We&apos;re here to help.
          </p>
          <Link href="/contact" className={styles.contactCta}>
            Contact Support
          </Link>
        </div>

        <div className={styles.contact}>
          <h4>Contact Us</h4>
          <p>Email: {BUSINESS.email}</p>
          <p>WhatsApp: {BUSINESS.whatsapp}</p>
          <p>
            <Link href="/contact">Full contact &amp; grievance details</Link>
          </p>
        </div>
      </div>

      <Reveal className={styles.bottom}>
        <p>
          &copy; {CURRENT_YEAR} {BUSINESS.name}. All rights reserved.
        </p>
      </Reveal>
    </footer>
  );
}

export default React.memo(Footer);
