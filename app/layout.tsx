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
  title: "Silk Room — Personal Wellness Massager | Everyday Pain Relief India",
  description:
    "Shop Silk Room Ease — a personal wellness massager for muscle tension, cramps, and everyday aches. Soft Rose & Mist Grey. Discreet packaging, free delivery across India, secure prepaid checkout.",
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
