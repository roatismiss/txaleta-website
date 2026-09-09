import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getGuides, getGuideAlternates } from "@/lib/guides";
import { locales, localeTags, localePath, defaultLocale, type Locale } from "@/lib/i18n";

// Every route × every locale, each entry carrying its hreflang alternates so
// Google discovers all language versions straight from the sitemap.

type Entry = {
  path: string;
  lastModified: Date;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

// ── Content-change dates, NOT build dates ───────────────────────────────────
// `lastModified: new Date()` re-stamps all 70 URLs on every deploy. Google
// learns within a few weeks that the signal is noise and stops reading it —
// which costs us the one place we can honestly tell it a page is fresh.
//
// So each page carries the date its VISIBLE CONTENT last changed. Seeded from
// `git log -1 --format=%cs -- <page file>`.
//
// BUMP THE DATE when you change a page's copy, photos or rooms.
// LEAVE IT ALONE for styling, refactors, dependency bumps and markup-only
// changes (adding JSON-LD does not make a page newer to a reader).
//
// /guides is absent on purpose: it is derived from the newest article below.
const CONTENT_UPDATED: Record<string, string> = {
  "/": "2026-07-30",
  "/accommodation": "2026-07-30",
  "/dining": "2026-07-18",
  "/dining/menu": "2026-07-30",
  "/experiences": "2026-07-18",
  "/about": "2026-07-18",
  "/community": "2026-07-22",
  "/gallery": "2026-07-30",
  "/book": "2026-07-30",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // The hub is exactly as fresh as its freshest article — real, and it updates
  // itself every time a guide ships, with nothing to remember.
  const guideDates = locales
    .flatMap((l) => getGuides(l).map((g) => g.dateISO))
    .filter(Boolean) as string[];
  const guidesUpdated = guideDates.length
    ? new Date(guideDates.reduce((a, b) => (a > b ? a : b)))
    : now;

  const on = (path: string) =>
    CONTENT_UPDATED[path] ? new Date(CONTENT_UPDATED[path]) : now;

  const pages: Entry[] = [
    { path: "/", lastModified: on("/"), changeFrequency: "weekly", priority: 1 },
    { path: "/accommodation", lastModified: on("/accommodation"), changeFrequency: "weekly", priority: 0.9 },
    { path: "/dining", lastModified: on("/dining"), changeFrequency: "weekly", priority: 0.85 },
    { path: "/dining/menu", lastModified: on("/dining/menu"), changeFrequency: "weekly", priority: 0.8 },
    { path: "/experiences", lastModified: on("/experiences"), changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", lastModified: on("/about"), changeFrequency: "monthly", priority: 0.7 },
    { path: "/community", lastModified: on("/community"), changeFrequency: "monthly", priority: 0.7 },
    { path: "/gallery", lastModified: on("/gallery"), changeFrequency: "monthly", priority: 0.6 },
    { path: "/guides", lastModified: guidesUpdated, changeFrequency: "weekly", priority: 0.8 },
    { path: "/book", lastModified: on("/book"), changeFrequency: "monthly", priority: 0.9 },
  ];

  // Fixed pages: every route × every locale, since all six exist everywhere.
  const staticEntries = pages.flatMap((page) => {
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

  // Guides are different: each article exists only in the languages it has
  // actually been translated into, and every translation has its OWN slug. So
  // the alternates are built per article from the real files on disk — never
  // by pattern — and an untranslated locale produces no URL at all.
  const guideEntries = locales.flatMap((locale) =>
    getGuides(locale).map((g) => {
      const alts = getGuideAlternates(g.key);
      const languages = Object.fromEntries(
        Object.entries(alts).map(([l, s]) => [
          localeTags[l as Locale],
          `${site.url}${localePath(l as Locale, `/guides/${s}`)}`,
        ])
      );
      return {
        url: `${site.url}${localePath(locale, `/guides/${g.slug}`)}`,
        lastModified: g.dateISO ? new Date(g.dateISO) : now,
        changeFrequency: "monthly" as const,
        priority: locale === defaultLocale ? 0.7 : 0.5,
        alternates: { languages },
      };
    })
  );

  return [...staticEntries, ...guideEntries];
}
