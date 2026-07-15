import type { MetadataRoute } from "next";
import { POLICY_LINKS } from "@/lib/constants";

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

  return [...staticRoutes, ...policyRoutes];
}
