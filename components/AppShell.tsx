"use client";

import { MotionConfig } from "framer-motion";
import { CartProvider } from "@/context/CartContext";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartDrawer, AgeGate } from "@/components/ClientOnly";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <CartProvider>
        <MotionConfig reducedMotion="user">
          <AgeGate />
          <Navbar />
          <main style={{ minHeight: "calc(100vh - 400px)" }}>{children}</main>
          <CartDrawer />
          <Footer />
        </MotionConfig>
      </CartProvider>
    </Providers>
  );
}
