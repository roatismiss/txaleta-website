// ============================================================================
// Press — editorial coverage of the resort, shown on the homepage ("In the
// Press") and fed to the `Resort` JSON-LD as `subjectOf`.
//
// Same rules as the guest quotes in site.ts:
//   - `quote` is a CONTIGUOUS verbatim sentence from the article as published.
//     No words changed, nothing stitched, no ellipsis. It stays in English in
//     every locale — it is the writer's words, not ours to translate.
//   - `url` is the publication's own canonical URL, with any tracking stripped
//     (links arrive from Facebook carrying `fbclid`).
//   - Only add a piece after reading it. A wrong attribution in a press strip
//     is worse than an empty one.
// ============================================================================

export type PressMention = {
  /** The publication, as it styles itself. */
  outlet: string;
  /** Publication homepage — the `publisher.url` in the JSON-LD. */
  outletUrl: string;
  /** Monochrome masthead in /public, or omit to set the name in type. */
  logo?: { src: string; width: number; height: number };
  headline: string;
  author: string;
  /** ISO date the piece went live. */
  date: string;
  url: string;
  quote: string;
  /**
   * True when the whole piece is ABOUT the resort, not a passing mention in a
   * wider story. Only those become `subjectOf` in the JSON-LD — schema.org's
   * `subjectOf` means "a work about this thing", and claiming a destination
   * round-up is about us would be a false assertion.
   */
  aboutUs: boolean;
};

export const press: PressMention[] = [
  {
    // Profile of Anton and Melinda and the resort. Links to the site with a
    // plain (followed) anchor — read off the live page 2026-11-18.
    outlet: "Simpol.ph",
    outletUrl: "https://www.simpol.ph/",
    logo: { src: "/images/press/simpol.png", width: 465, height: 110 },
    headline: "Txaleta de Camiguin: A Resort Built Like Home",
    author: "Hanz Daniel Cortez",
    date: "2026-11-16",
    url: "https://www.simpol.ph/txaleta-de-camiguin-a-resort-built-like-home/",
    quote:
      "What started as a simple plan to build a family vacation home eventually grew into Txaleta de Camiguin—a boutique resort where personal hospitality, thoughtful cooking, and a deep love for the island come together.",
    aboutUs: true,
  },
  {
    // A first-person Camiguin travel feature; Txaleta is named in the food
    // passage and in two photo captions. No link to the site (as of
    // 2026-11-18) — an unlinked mention, worth asking the writer to link.
    outlet: "Rappler",
    outletUrl: "https://www.rappler.com/",
    headline: "How Camiguin intensified the yearner in me",
    author: "Chau Morales",
    date: "2026-11-14",
    url: "https://www.rappler.com/features/culture-desk/camiguin-travel-guide/index.html",
    quote:
      "At Txaleta de Camiguin, a single meal of gambas and callos set a new standard for my palate.",
    aboutUs: false,
  },
];
