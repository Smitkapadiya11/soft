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

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 2.76a5.46 5.46 0 1 1 0 10.92 5.46 5.46 0 0 1 0-10.92Zm0 9a3.54 3.54 0 1 0 0-7.08 3.54 3.54 0 0 0 0 7.08Zm5.68-9.22a1.28 1.28 0 1 1 0 2.56 1.28 1.28 0 0 1 0-2.56Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
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
            <BrandMark className={styles.logo} variant="full" />
          </Link>
          <p className={styles.tagline}>
            Premium self-care, delivered with total discretion.
          </p>
          <div className={styles.social}>
            <a href="#" className={styles.socialLink} aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="#" className={styles.socialLink} aria-label="Twitter / X">
              <TwitterIcon />
            </a>
            <a href="#" className={styles.socialLink} aria-label="WhatsApp">
              <WhatsAppIcon />
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
          <h4>Stay Updated</h4>
          <p className={styles.newsletterText}>
            Get wellness tips and exclusive offers in your inbox.
          </p>
          <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className={styles.newsletterInput}
              aria-label="Email address for newsletter"
            />
            <button type="submit" className={styles.newsletterBtn}>
              Subscribe
            </button>
          </form>
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
