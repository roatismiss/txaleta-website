// ============================================================================
// Txaleta de Camiguin — /guides travel-guide loader
// Reads Markdown articles from src/content/guides at build time. Each file is
// frontmatter + body + a trailing ```json JSON-LD fence. Server-only (uses fs);
// imported only by the /guides server components.
// ============================================================================
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Guide = {
  slug: string;
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

// Curated cluster order: decision + planning first (highest intent), then
// logistics, then the top-of-funnel pillar.
const ORDER = [
  "camiguin-vs-siquijor",
  "camiguin-itinerary",
  "how-to-get-to-camiguin-from-cebu",
  "best-islands-in-the-philippines",
  "birdwatching-camiguin-hibok-hibok",
];

function toISO(d: unknown): string {
  if (d instanceof Date) return d.toISOString().slice(0, 10);
  return String(d ?? "");
}

function parseGuide(file: string): Guide {
  const raw = fs.readFileSync(path.join(GUIDES_DIR, file), "utf8");
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

  const words = body.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(words / 220));

  const dateISO = toISO(data.date);
  const dateLabel = dateISO
    ? new Date(dateISO).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "";

  return {
    slug: (data.slug as string) || file.replace(/\.md$/, ""),
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

let cache: Guide[] | null = null;

export function getAllGuides(): Guide[] {
  if (cache) return cache;
  const files = fs.readdirSync(GUIDES_DIR).filter((f) => f.endsWith(".md"));
  const guides = files.map(parseGuide);
  guides.sort((a, b) => {
    const ia = ORDER.indexOf(a.slug);
    const ib = ORDER.indexOf(b.slug);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });
  cache = guides;
  return guides;
}

export function getGuide(slug: string): Guide | undefined {
  return getAllGuides().find((g) => g.slug === slug);
}

export function getRelatedGuides(slug: string, limit = 3): Guide[] {
  return getAllGuides()
    .filter((g) => g.slug !== slug)
    .slice(0, limit);
}

// Single source of truth for building booking links. Today bookingProvider is
// "cloudbeds" (the embed reads only checkin/checkout/guests), so ?room= is a
// harmless no-op; it activates automatically when the property flips to the
// CloudReef BookingFlow, which reads ?room=. Routing every CTA through here
// means the day that changes, nothing else has to.
export function bookHref(opts: { room?: string } = {}): string {
  return opts.room ? `/book?room=${encodeURIComponent(opts.room)}` : "/book";
}
