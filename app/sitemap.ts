import { MetadataRoute } from "next";

import { BASE_URLS } from "@/constants/links";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = BASE_URLS.SITE;

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
