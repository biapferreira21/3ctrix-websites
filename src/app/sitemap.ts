import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    ["", 1],
    ["/research", 0.9],
    ["/automations", 0.9],
    ["/websites", 0.9],
    ["/websites/como-funciona", 0.8],
    ["/websites/precos", 0.8],
    ["/websites/en", 0.8],
    ["/websites/en/how-it-works", 0.7],
    ["/websites/en/pricing", 0.7],
    [siteConfig.urls.privacy, 0.3],
    [siteConfig.urls.terms, 0.3],
  ] as const;

  return routes.map(([path, priority]) => ({
    url: `${siteConfig.siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path ? "monthly" : "weekly",
    priority,
  }));
}
