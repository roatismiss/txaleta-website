// ============================================================================
// Anchor ids and the table of contents for a guide body.
//
// SEO_PLAN §8 P2-8: articles run 3,500–4,500 words with no internal
// navigation, and jump links also earn sitelinks in the SERP. The H2s already
// carried `scroll-mt-24` in the renderer, so the anchors were anticipated and
// never wired.
//
// `slugify` and `guideToc` are the single source of the id for a heading, used
// by BOTH the list and the renderer, so the link and its target can never
// disagree. Unicode letters are kept rather than transliterated — a Japanese
// or Korean heading gets a Japanese or Korean fragment, which is valid HTML5
// and survives percent-encoding, whereas stripping to ASCII would leave every
// CJK heading with an empty id.
// ============================================================================

export type TocEntry = { text: string; id: string };

/** Heading text → anchor id. Must stay in step with `guideToc`. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Strip the inline Markdown a heading may carry (`**bold**`, `` `code` ``). */
export function headingText(raw: string): string {
  return raw.replace(/[*`_]/g, "").trim();
}

/**
 * The H2 headings of a guide body, in document order, with ids de-duplicated
 * by suffix the same way the renderer does it.
 *
 * `(?!#)` keeps H3s out. The body never contains a fenced code block — the
 * loader splits the trailing JSON-LD fence off before this ever sees it.
 */
export function guideToc(body: string): TocEntry[] {
  const seen = new Map<string, number>();
  const out: TocEntry[] = [];

  for (const match of body.matchAll(/^##(?!#)[ \t]+(.+?)[ \t]*$/gm)) {
    const text = headingText(match[1]);
    if (!text) continue;
    const base = slugify(text);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.push({ text, id: n ? `${base}-${n}` : base });
  }

  return out;
}

/**
 * Below this many sections a contents list is noise rather than navigation,
 * and it would push the opening paragraphs below the fold for nothing.
 */
export const TOC_MIN_SECTIONS = 5;
