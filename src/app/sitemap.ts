import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllGuides } from "@/lib/guides";
import { locales, localeTags, localePath } from "@/lib/i18n";

// Every route × every locale, each entry carrying its hreflang alternates so
// Google discovers all language versions straight from the sitemap.

type Entry = {
  path: string;
  lastModified: Date;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: Entry[] = [
    { path: "/", lastModified: now, changeFrequency: "weekly", priority: 1 },
    { path: "/accommodation", lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { path: "/dining", lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { path: "/dining/menu", lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { path: "/experiences", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/community", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/gallery", lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { path: "/guides", lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { path: "/book", lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...getAllGuides().map((g) => ({
      path: `/guides/${g.slug}`,
      lastModified: g.dateISO ? new Date(g.dateISO) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return pages.flatMap((page) => {
    // hreflang alternates are identical for every language version of a page.
    const languages = Object.fromEntries(
      locales.map((l) => [localeTags[l], `${site.url}${localePath(l, page.path)}`])
    );

    return locales.map((locale) => ({
      url: `${site.url}${localePath(locale, page.path)}`,
      lastModified: page.lastModified,
      changeFrequency: page.changeFrequency,
      // English pages keep their existing priority; translations slightly lower.
      priority: locale === "en" ? page.priority : Math.max(0.1, page.priority - 0.2),
      alternates: { languages },
    }));
  });
}
