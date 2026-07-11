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
  title: "Silk Room — Premium Condoms & Sexual Wellness | Discreet Delivery India",
  description:
    "Shop Silk Room Ultra Comfort condoms — natural latex, Ultra Thin & Dotted packs. Discreet packaging, free delivery across India, secure prepaid checkout via Razorpay. 18+ only.",
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
