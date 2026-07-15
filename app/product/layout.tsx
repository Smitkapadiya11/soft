import type { Metadata } from "next";
import { PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_SHORT_DESC } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} | Silk Room — Discreet Delivery India`,
  description: `${PRODUCT_SHORT_DESC} ₹${PRODUCT_PRICE}. Natural & Espresso. Free discreet delivery. Adults 18+.`,
  openGraph: {
    title: `${PRODUCT_NAME} | Silk Room`,
    description: PRODUCT_SHORT_DESC,
    url: "https://silkroom.shop/product",
    images: [
      {
        url: "https://silkroom.shop/products/product-cover-model.jpg",
        width: 1200,
        height: 750,
        alt: PRODUCT_NAME,
      },
    ],
  },
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
