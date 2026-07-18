import type { MetadataRoute } from "next";
import { POLICY_LINKS } from "@/lib/constants";
import { CATALOG_PRODUCTS } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://silkroom.shop";
  const now = new Date();

  const staticRoutes = ["", "/product", "/about"].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const policyRoutes = POLICY_LINKS.map((link) => ({
    url: `${base}${link.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const productRoutes = CATALOG_PRODUCTS.filter((product) => product.slug !== "ease").map(
    (product) => ({
      url: `${base}/product/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })
  );

  return [...staticRoutes, ...productRoutes, ...policyRoutes];
}
