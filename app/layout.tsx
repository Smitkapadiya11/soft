import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Silk Room — Dual Density Liquid Silicone | Discreet Delivery India",
  description:
    "Shop Silk Room Real Touch — 8.3″ dual-density body-safe liquid silicone with strong suction cup. Natural & Espresso. Fully waterproof. Discreet packaging, free delivery, secure prepaid checkout. Adults 18+.",
  openGraph: {
    title: "Silk Room — Real Touch Dual Density",
    description:
      "Lifelike dual-density liquid silicone. Discreet delivery across India. Adults 18+.",
    url: "https://silkroom.shop",
    siteName: "Silk Room",
    images: [{ url: "https://silkroom.shop/products/cover.png", width: 1200, height: 1200 }],
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
      <body className={`${inter.variable} ${playfair.variable}`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
