import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllGuides } from "@/lib/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const guides = getAllGuides().map((g) => ({
    url: `${site.url}/guides/${g.slug}`,
    lastModified: g.dateISO ? new Date(g.dateISO) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/accommodation`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/dining`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${site.url}/dining/menu`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/experiences`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/community`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...guides,
  ];
}
