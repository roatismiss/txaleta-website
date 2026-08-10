// ============================================================================
// Txaleta de Camiguin — /guides travel-guide loader (locale-aware)
//
// Layout:  src/content/guides/<locale>/<localized-slug>.md
//
// Each file is frontmatter + body + a trailing ```json JSON-LD fence.
// Translations carry their OWN slug in the target language — /ko/guides/카미긴-여행-시기
// rather than /ko/guides/best-time-to-visit-camiguin — because a URL that
// contains the keyword in the reader's language ranks and converts better.
// They are tied back to the English original by `key` (the English slug), which
// is what powers the hreflang cluster and "related guides".
//
// An article that has NOT been translated into a locale simply does not exist
// there: no page, no sitemap entry, no hreflang alternate. That is deliberate —
// serving the English body under /fr, /de, /ja … is duplicate content, and
// declaring it a "translation" in hreflang is worse.
//
// Server-only (uses fs); imported only by the /guides server components.
// ============================================================================
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { locales, defaultLocale, type Locale } from "@/lib/i18n";

export type Guide = {
  /** Stable cross-language identifier — always the ENGLISH slug. */
  key: string;
  /** URL segment in THIS locale. Equals `key` for English. */
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  primaryKeyword: string;
  keywords: string[];
  dateISO: string;
  dateLabel: string;
  author: string;
  image: string;
  imageAlt: string;
  body: string; // markdown with the H1 + hero image stripped (rendered in the hero instead)
  jsonLd: unknown; // parsed JSON-LD @graph (or null)
  readingTime: number;
};

const GUIDES_DIR = path.join(process.cwd(), "src", "content", "guides");

// Curated cluster order, keyed by the ENGLISH slug: decision + planning first
// (highest intent), then logistics, then the top-of-funnel pillar.
const ORDER = [
  "camiguin-vs-siquijor",
  "where-to-stay-in-camiguin",
  "things-to-do-in-camiguin",
  "white-island-camiguin",
  "camiguin-itinerary",
  "best-time-to-visit-camiguin",
  "camiguin-lanzones-festival",
  "how-to-get-to-camiguin-from-cebu",
  "best-islands-in-the-philippines",
  "birdwatching-camiguin-hibok-hibok",
];

// Date labels in the reader's language ("Updated August 2026").
const DATE_LOCALES: Record<Locale, string> = {
  en: "en-US",
  fr: "fr-FR",
  de: "de-DE",
  ja: "ja-JP",
  ko: "ko-KR",
  zh: "zh-CN",
};

function toISO(d: unknown): string {
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  return String(d ?? "");
}

function parseGuide(locale: Locale, file: string): Guide {
  const raw = fs.readFileSync(path.join(GUIDES_DIR, locale, file), "utf8");
  const { data, content } = matter(raw);

  // Separate the JSON-LD fence from the prose body.
  let body = content;
  let jsonLd: unknown = null;
  const fence = content.match(/```json\s*([\s\S]*?)```\s*$/);
  if (fence) {
    try {
      jsonLd = JSON.parse(fence[1]);
    } catch {
      jsonLd = null;
    }
    body = content.slice(0, fence.index);
  }

  // Strip the leading H1 (the page renders the title once, in the hero) so we
  // keep a single H1 per page.
  body = body.replace(/^\s*#\s+.*$/m, "");

  // Strip the hero image if it appears inline at the top (avoids showing it twice).
  const image = (data.image as string) || "";
  if (image) {
    const esc = image.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(new RegExp(`!\\[[^\\]]*\\]\\(${esc}\\)\\s*`), "");
  }
  body = body.trim();

  // CJK has no spaces, so word-splitting under-counts badly. Count characters
  // there instead (~500 chars/min is the usual reading rate).
  const cjk = locale === "ja" || locale === "ko" || locale === "zh";
  const readingTime = cjk
    ? Math.max(1, Math.round(body.replace(/\s/g, "").length / 500))
    : Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 220));

  const slug = (data.slug as string) || file.replace(/\.md$/, "");
  const dateISO = toISO(data.date);
  const dateLabel = dateISO
    ? new Date(dateISO).toLocaleDateString(DATE_LOCALES[locale], { month: "long", year: "numeric" })
    : "";

  return {
    key: (data.key as string) || slug,
    slug,
    locale,
    title: data.title as string,
    description: data.description as string,
    primaryKeyword: (data.primaryKeyword as string) || "",
    keywords: (data.keywords as string[]) || [],
    dateISO,
    dateLabel,
    author: (data.author as string) || "Txaleta de Camiguin",
    image,
    imageAlt: (data.imageAlt as string) || (data.title as string),
    body,
    jsonLd,
    readingTime,
  };
}

let cache: Map<Locale, Guide[]> | null = null;

function load(): Map<Locale, Guide[]> {
  if (cache) return cache;
  const map = new Map<Locale, Guide[]>();

  for (const locale of locales) {
    const dir = path.join(GUIDES_DIR, locale);
    if (!fs.existsSync(dir)) {
      map.set(locale, []);
      continue;
    }
    const guides = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => parseGuide(locale, f));

    guides.sort((a, b) => {
      const ia = ORDER.indexOf(a.key);
      const ib = ORDER.indexOf(b.key);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
    map.set(locale, guides);
  }

  cache = map;
  return map;
}

/** Every guide available in `locale`, in curated cluster order. */
export function getGuides(locale: Locale): Guide[] {
  return load().get(locale) ?? [];
}

/**
 * One guide by its slug **in that locale**.
 *
 * Translated slugs are written in the target script (/ko/guides/카미긴-여행-시기),
 * and Next hands those back percent-encoded, so the incoming param must be
 * decoded before it can match the filename on disk. Without this every
 * non-Latin slug 404s at prerender time.
 */
export function getGuide(locale: Locale, slug: string): Guide | undefined {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // Malformed escape sequence — fall back to the raw value.
  }
  return getGuides(locale).find((g) => g.slug === decoded || g.slug === slug);
}

/**
 * Every { lang, slug } pair that should be prerendered — the ONLY source of
 * truth for which guide pages exist. Untranslated articles produce no route.
 */
export function getAllGuidePaths(): { lang: Locale; slug: string }[] {
  return locales.flatMap((lang) => getGuides(lang).map((g) => ({ lang, slug: g.slug })));
}

/**
 * The hreflang cluster for one article: every locale it has been translated
 * into, mapped to that locale's own slug. Locales without a translation are
 * absent — never point hreflang at a page that doesn't exist in that language.
 */
export function getGuideAlternates(key: string): Partial<Record<Locale, string>> {
  const out: Partial<Record<Locale, string>> = {};
  for (const locale of locales) {
    const match = getGuides(locale).find((g) => g.key === key);
    if (match) out[locale] = match.slug;
  }
  return out;
}

/** True when the English original exists — used for the x-default fallback. */
export function hasEnglish(key: string): boolean {
  return getGuides(defaultLocale).some((g) => g.key === key);
}

/**
 * Related reading, within the same locale. Prefers guides that share keywords
 * with this one (a real topical relationship), then falls back to cluster order
 * so the slots are always filled.
 */
export function getRelatedGuides(locale: Locale, key: string, limit = 3): Guide[] {
  const all = getGuides(locale);
  const self = all.find((g) => g.key === key);
  if (!self) return all.slice(0, limit);

  const mine = new Set(self.keywords.map((k) => k.toLowerCase()));
  const scored = all
    .filter((g) => g.key !== key)
    .map((g) => ({
      guide: g,
      score: g.keywords.filter((k) => mine.has(k.toLowerCase())).length,
    }))
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.guide);
}

// Single source of truth for building booking links. Today bookingProvider is
// "cloudbeds" (the embed reads only checkin/checkout/guests), so ?room= is a
// harmless no-op; it activates automatically when the property flips to the
// CloudReef BookingFlow, which reads ?room=. Routing every CTA through here
// means the day that changes, nothing else has to.
export function bookHref(opts: { room?: string } = {}): string {
  return opts.room ? `/book?room=${encodeURIComponent(opts.room)}` : "/book";
}
