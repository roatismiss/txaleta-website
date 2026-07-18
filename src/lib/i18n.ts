// ============================================================================
// Txaleta i18n — locales, URL helpers, hreflang builders.
//
// URL contract (SEO):
//   • English stays EXACTLY on the current unprefixed URLs (/, /about, …) so
//     the 15 pages already indexed in Google keep their equity. src/proxy.ts
//     rewrites those paths to /en/* internally — the visitor never sees /en.
//   • Every other locale lives under a clean prefix: /ko/about, /de/about, …
//   • /en/* is redirected (308) to the unprefixed URL so Google never sees
//     two copies of the English site.
// ============================================================================

export const locales = ["en", "fr", "de", "ja", "ko", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Locales that carry a URL prefix (everything except English). */
export const prefixedLocales = locales.filter((l) => l !== defaultLocale);

export const hasLocale = (v: string): v is Locale =>
  (locales as readonly string[]).includes(v);

/** Native-language labels for the language switcher. */
export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
  ja: "日本語",
  ko: "한국어",
  zh: "中文",
};

/** BCP-47 values for <html lang> and hreflang annotations. */
export const localeTags: Record<Locale, string> = {
  en: "en",
  fr: "fr",
  de: "de",
  ja: "ja",
  ko: "ko",
  zh: "zh-Hans",
};

/** Open Graph locale values. */
export const ogLocales: Record<Locale, string> = {
  en: "en_PH",
  fr: "fr_FR",
  de: "de_DE",
  ja: "ja_JP",
  ko: "ko_KR",
  zh: "zh_CN",
};

/**
 * Build the public path of `path` (an unprefixed, "/"-leading route like
 * "/about" or "/guides/foo") in the given locale.
 *   localePath("en", "/about") → "/about"
 *   localePath("ko", "/about") → "/ko/about"
 *   localePath("ko", "/")      → "/ko"
 */
export function localePath(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === defaultLocale ? clean || "/" : `/${locale}${clean}`;
}

/**
 * hreflang map for Metadata.alternates.languages — every locale's URL for the
 * given unprefixed path, plus x-default pointing at the English page.
 */
export function hreflangAlternates(path: string): Record<string, string> {
  const entries: Record<string, string> = {};
  for (const locale of locales) {
    entries[localeTags[locale]] = localePath(locale, path);
  }
  entries["x-default"] = localePath(defaultLocale, path);
  return entries;
}

/**
 * Metadata.alternates for one page: SELF-referencing canonical (each language
 * version canonicals to itself — never to English, or Google would drop the
 * translations as duplicates) + the full hreflang cluster.
 */
export function pageAlternates(locale: Locale, path: string) {
  return {
    canonical: localePath(locale, path),
    languages: hreflangAlternates(path),
  };
}
