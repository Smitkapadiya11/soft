import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Silk Room — Premium Intimate Self-Care | Discreet Delivery India",
  description:
    "Silk Room Real Touch — body-safe dual-density silicone for private self-care. Natural & Espresso. ₹599. Discreet packaging, free delivery, secure prepaid checkout. Adults 18+.",
  openGraph: {
    title: "Silk Room — Intimate self-care, delivered discreetly",
    description:
      "Premium body-safe silicone · discreet packaging · free delivery across India. Adults 18+.",
    url: "https://silkroom.shop",
    siteName: "Silk Room",
    images: [
      {
        url: "https://silkroom.shop/products/hero-lifestyle.png",
        width: 1200,
        height: 1600,
        alt: "Silk Room — premium self-care",
      },
    ],
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${cormorant.variable}`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
