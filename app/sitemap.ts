import { MetadataRoute } from "next";

import { BASE_URLS } from "@/constants/links";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = BASE_URLS.SITE;
  const now = new Date();

  const paths = [
    "",
    "/audit",
    "/docs",
    "/blog",
    // "/discord",
    // "/tg",
    // "/twitter",
    "/x",
  ];

  return paths.map((path, index) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: index === 0 ? "daily" : "weekly",
    priority: index === 0 ? 1 : 0.7,
  }));
}
