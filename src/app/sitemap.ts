import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${SITE.url}/images/hero-platter.jpg`,
        `${SITE.url}/images/snack-box.jpg`,
        `${SITE.url}/images/nasi-box.jpeg`,
        `${SITE.url}/images/logo.jpg`,
      ],
    },
  ];
}
