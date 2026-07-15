import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "1366981978831016";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
  title: "Silk Room — Personal Body Wellness | Discreet Delivery India",
  description:
    "Silk Room Ease — personal body wellness massager for tension relief & everyday recovery. Soft Rose & Mist Grey. ₹599. Discreet packaging, free delivery, secure prepaid checkout. Adults 18+.",
  metadataBase: new URL("https://silkroom.shop"),
  icons: {
    icon: [{ url: "/brand/sr-monogram.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/sr-monogram.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "Silk Room — Body care, delivered discreetly",
    description:
      "Personal wellness massager · body-safe silicone · discreet packaging · free delivery across India. Adults 18+.",
    url: "https://silkroom.shop",
    siteName: "Silk Room",
    images: [
      {
        url: "https://silkroom.shop/products/product-cover-model.jpg",
        width: 1200,
        height: 750,
        alt: "Silk Room Ease — personal wellness",
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
        {/* Noscript fallback for Meta crawlers (live events inject client-side) */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
