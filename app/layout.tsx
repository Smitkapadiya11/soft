import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Silk Room — Deep Relief Massager | Muscle Recovery & Relaxation",
  description:
    "Shop the Silk Room Deep Relief Massager — a cordless percussion massage gun for muscle relief and everyday relaxation. Free delivery across India. Prepaid secure checkout.",
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
