import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import AgeGate from "@/components/AgeGate";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
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
        <Providers>
          <CartProvider>
            <AgeGate />
            <Navbar />
            <main style={{ minHeight: "calc(100vh - 400px)" }}>{children}</main>
            <CartDrawer />
            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
