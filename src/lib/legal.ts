import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { LegalDoc } from "@/locales/legal";

// ============================================================================
// Legal documents — Privacy Policy, Terms & Conditions, Cookie Policy.
//
// One English Markdown file per document in src/content/legal/. English is the
// binding version and is served in every locale (inside a translated frame).
// `updated` in the frontmatter is the date shown at the top of the page and
// in the sitemap: bump it whenever the TEXT of a document changes.
// ============================================================================

const LEGAL_DIR = path.join(process.cwd(), "src", "content", "legal");

export type LegalDocument = {
  doc: LegalDoc;
  title: string;
  description: string;
  /** YYYY-MM-DD */
  updated: string;
  body: string;
};

const cache = new Map<LegalDoc, LegalDocument>();

export function getLegalDoc(doc: LegalDoc): LegalDocument {
  const hit = cache.get(doc);
  if (hit) return hit;
  const raw = fs.readFileSync(path.join(LEGAL_DIR, `${doc}.md`), "utf8");
  const { data, content } = matter(raw);
  // gray-matter parses a bare YYYY-MM-DD into a Date — normalise back.
  const updated =
    data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : String(data.updated);
  const out: LegalDocument = {
    doc,
    title: String(data.title),
    description: String(data.description),
    updated,
    body: content.trim(),
  };
  cache.set(doc, out);
  return out;
}

/** "1. About us and these terms" → { n: "01", text: "About us and these terms" } */
export function splitNumbered(heading: string): { n: string | null; text: string } {
  const m = heading.match(/^(\d+)\.\s+(.*)$/);
  return m ? { n: m[1].padStart(2, "0"), text: m[2] } : { n: null, text: heading };
}
