#!/usr/bin/env node
// ============================================================================
// Rewrite internal links inside translated guides.
//
//   node scripts/relink-guides.mjs            # fix every non-English locale
//   node scripts/relink-guides.mjs --locale ko --dry-run
//
// The translation step deliberately keeps every link URL exactly as it was in
// the English source, because at that moment the translated slugs of the OTHER
// articles don't exist yet. This pass runs afterwards, once all the files are
// on disk, and fixes them:
//
//   /guides/best-time-to-visit-camiguin  →  /ko/guides/<the Korean slug>
//   /accommodation                       →  /ko/accommodation
//
// A link to an article that has NOT been translated into this locale is left
// pointing at the English page — a working page in the wrong language beats a
// 404 — and reported at the end so you know what to translate next.
// ============================================================================
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = path.join(process.cwd(), "src", "content", "guides");
const LOCALES = ["fr", "de", "ja", "ko", "zh"];

const argv = process.argv.slice(2);
const arg = (n) => {
  const i = argv.indexOf(`--${n}`);
  return i === -1 ? null : argv[i + 1];
};
const dryRun = argv.includes("--dry-run");
const targets = arg("locale")
  ? arg("locale").split(",").map((s) => s.trim()).filter((l) => LOCALES.includes(l))
  : LOCALES;

/** key → slug, for one locale. */
function slugMap(locale) {
  const dir = path.join(ROOT, locale);
  const map = new Map();
  if (!fs.existsSync(dir)) return map;
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_"))) {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    const key = raw.match(/^key:\s*"?([^"\n]+)"?\s*$/m)?.[1]?.trim();
    if (key) map.set(key, f.replace(/\.md$/, ""));
  }
  return map;
}

let totalFixed = 0;
const missing = new Map(); // locale → Set of untranslated keys still linked

for (const locale of targets) {
  const dir = path.join(ROOT, locale);
  if (!fs.existsSync(dir)) continue;

  const map = slugMap(locale);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  for (const file of files) {
    const full = path.join(dir, file);
    const before = fs.readFileSync(full, "utf8");
    let fixed = 0;

    // 1. Guide-to-guide links.
    let after = before.replace(/\]\(\/guides\/([a-z0-9-]+)([^)]*)\)/g, (whole, key, rest) => {
      const translated = map.get(key);
      if (!translated) {
        if (!missing.has(locale)) missing.set(locale, new Set());
        missing.get(locale).add(key);
        return whole; // leave the English URL — it works
      }
      fixed++;
      return `](/${locale}/guides/${translated}${rest})`;
    });

    // 2. Every other site-internal link. Skip anchors, external URLs, and
    //    anything already carrying a locale prefix.
    after = after.replace(/\]\((\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)((?:\?|#)[^)]*)?\)/g, (whole, p, rest = "") => {
      if (p.startsWith("/guides/")) return whole; // handled above
      const first = p.split("/")[1];
      if (LOCALES.includes(first) || first === "en") return whole;
      fixed++;
      return `](/${locale}${p}${rest})`;
    });

    if (fixed > 0) {
      totalFixed += fixed;
      console.log(`  ${dryRun ? "would fix" : "fixed"}  ${locale}/${file} — ${fixed} link(s)`);
      if (!dryRun) fs.writeFileSync(full, after, "utf8");
    }
  }
}

console.log(`\n${totalFixed} link(s) ${dryRun ? "would be " : ""}rewritten.`);

for (const [locale, keys] of missing) {
  console.log(`\n${locale}: still linking to English for ${keys.size} untranslated article(s):`);
  for (const k of keys) console.log(`  - ${k}`);
}
