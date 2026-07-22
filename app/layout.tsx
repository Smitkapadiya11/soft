import type { Metadata, Viewport } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || "2205854633526316";

/** Official Meta base code — must be in HTML so Pixel Helper / Events Manager detect install */
const META_PIXEL_SCRIPT = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Silk Room — Discreet Personal Wellness | India",
  description:
    "Shop Silk Room Ease, Lick, Trio, and Chulli care — clear product photos, free plain-box delivery, and secure Razorpay checkout. Adults 18+.",
  metadataBase: new URL("https://silkroom.shop"),
  icons: {
    icon: [
      { url: "/brand/silk-seal.svg", type: "image/svg+xml" },
      { url: "/brand/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/brand/silk-room-icon.png", type: "image/png" }],
  },
  openGraph: {
    title: "Silk Room — Personal wellness, shown clearly and delivered discreetly",
    description:
      "Full Silk Room collection from ₹90 · 4s product + model showcase · free plain-box delivery across India. Adults 18+.",
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
      <body>
        <script dangerouslySetInnerHTML={{ __html: META_PIXEL_SCRIPT }} />
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
