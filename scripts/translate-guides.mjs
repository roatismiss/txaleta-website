#!/usr/bin/env node
// ============================================================================
// Translate /guides articles into the site's other locales.
//
//   node scripts/translate-guides.mjs --locale ko
//   node scripts/translate-guides.mjs --locale ko,ja --slug best-time-to-visit-camiguin
//   node scripts/translate-guides.mjs --all --dry-run
//
// Reads  src/content/guides/en/<slug>.md
// Writes src/content/guides/<locale>/<localized-slug>.md
//
// This is an AUTHORING tool, not a build step. It runs once, the output is
// committed, and the site keeps building with zero API calls. Translations are
// files a human can read, edit and reject — which matters, because unreviewed
// machine translation published at scale is exactly what Google's scaled-content
// policy targets. Treat every file this produces as a FIRST DRAFT.
//
// Requires ANTHROPIC_API_KEY in the environment.
// ============================================================================
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const MODEL = "claude-opus-5";
const ROOT = path.join(process.cwd(), "src", "content", "guides");
const SRC = path.join(ROOT, "en");

const LANGS = {
  fr: { name: "French", slugScript: "latin" },
  de: { name: "German", slugScript: "latin" },
  ja: { name: "Japanese", slugScript: "native" },
  ko: { name: "Korean", slugScript: "native" },
  zh: { name: "Simplified Chinese", slugScript: "native" },
};

// ── args ────────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const arg = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? null : argv[i + 1];
};
const has = (name) => argv.includes(`--${name}`);

const targets = has("all")
  ? Object.keys(LANGS)
  : (arg("locale") || "").split(",").map((s) => s.trim()).filter(Boolean);
const onlySlug = arg("slug");
const dryRun = has("dry-run");
const force = has("force");

if (targets.length === 0) {
  console.error("Usage: node scripts/translate-guides.mjs --locale ko[,ja] [--slug <en-slug>] [--all] [--force] [--dry-run]");
  process.exit(1);
}
for (const t of targets) {
  if (!LANGS[t]) {
    console.error(`Unknown locale "${t}". Known: ${Object.keys(LANGS).join(", ")}`);
    process.exit(1);
  }
}

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey && !dryRun) {
  console.error("ANTHROPIC_API_KEY is not set. Export it, or pass --dry-run to preview the plan.");
  process.exit(1);
}

// ── prompt ──────────────────────────────────────────────────────────────────
function buildPrompt(lang, slug, source) {
  const { name, slugScript } = LANGS[lang];
  return `You are translating a travel guide for Txaleta de Camiguin, a family-owned boutique resort on Camiguin Island in the Philippines. The target language is ${name}.

This is NOT a literal translation job. Produce the article as a native ${name} travel writer would have written it: natural register, idiomatic phrasing, sentence rhythm that belongs in ${name}. A reader must never be able to tell it started in English. Keep the voice of the original — warm, first-person plural ("we"), honest to the point of admitting what the island is bad at, never breathless marketing.

STRICT REQUIREMENTS:

1. Output ONLY the finished Markdown file: frontmatter, body, and the trailing \`\`\`json JSON-LD fence. No preamble, no explanation, no code fence around the whole file.

2. Frontmatter must keep exactly these keys: title, description, slug, key, primaryKeyword, keywords, date, author, image, imageAlt.
   - "key" must be exactly: ${slug}   (this is the cross-language ID — do not translate or alter it)
   - "slug" must be a NEW ${name} slug${slugScript === "latin" ? ", lowercase, hyphen-separated, ASCII only, no accents" : ", lowercase, hyphen-separated, written in the native script of the language"}. It must read as a natural ${name} URL containing the main keyword. Never reuse the English slug.
   - "title" (aim for 60 characters or fewer), "description" (150-160 characters), "imageAlt" are translated.
   - "primaryKeyword" and "keywords" are NOT translations of the English keywords. They must be the phrases ${name} speakers ACTUALLY TYPE into Google when researching this topic. Think about real search behaviour in that language and market. Give 7-11 keywords.
   - "date", "author" and "image" are copied unchanged.

3. Internal links: keep every Markdown link's URL EXACTLY as it appears in the source, unchanged, including /guides/... paths. A later pass rewrites them to the translated slugs. Translate only the visible link text.

4. Translate the FAQ questions into the question forms real ${name} speakers search for, not word-for-word renderings.

5. The JSON-LD fence at the end must be translated in parallel and stay valid JSON:
   - "headline", "description", "keywords" and every FAQ question/answer text → ${name}, and the FAQ entries must match the translated FAQ section in the body word for word.
   - "inLanguage" → "${lang === "zh" ? "zh-Hans" : lang}"
   - Every "url", "@id" and "mainEntityOfPage" URL → insert the /${lang} prefix AND the new translated slug, e.g. https://www.txaletadecamiguin.com/${lang}/guides/<your-new-slug>
   - Proper nouns in "about"/"mentions", the publisher block, address and telephone stay unchanged.

6. Never translate: Txaleta de Camiguin, Camiguin, Mambajao, White Island, Mantigue, Mt. Hibok-Hibok, Bohol Sea, Siquijor, Cebu, barangay names, the dish names (Almusal sa Bahay, pan de sal, adobo, lanzones), or the tagline "More Than a Resort. A Place to Belong." Where the language conventionally uses its own form for a place name, give that form with the original in parentheses on first mention.

7. Keep all Markdown structure identical: the same heading levels, the same tables with the same columns, the same bold/italic emphasis, the same number of FAQ entries.

Here is the source file:

---
${source}`;
}

// ── api ─────────────────────────────────────────────────────────────────────
async function translate(lang, slug, source) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 32000,
      messages: [{ role: "user", content: buildPrompt(lang, slug, source) }],
    }),
  });

  if (!res.ok) {
    throw new Error(`API ${res.status}: ${await res.text()}`);
  }
  const json = await res.json();
  return json.content.map((b) => (b.type === "text" ? b.text : "")).join("").trim();
}

// ── validation ──────────────────────────────────────────────────────────────
function validate(out, lang, slug) {
  const problems = [];
  if (!out.startsWith("---")) problems.push("does not begin with frontmatter");

  const fm = out.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) {
    problems.push("frontmatter not parseable");
    return { problems, newSlug: null };
  }

  const readKey = (k) => {
    const m = fm[1].match(new RegExp(`^${k}:\\s*"?([^"\\n]+)"?\\s*$`, "m"));
    return m ? m[1].trim() : null;
  };

  const newSlug = readKey("slug");
  if (!newSlug) problems.push("no slug in frontmatter");
  if (newSlug === slug) problems.push(`slug was not translated (still "${slug}")`);
  if (readKey("key") !== slug) problems.push(`key must be "${slug}", got "${readKey("key")}"`);

  const fence = out.match(/```json\s*([\s\S]*?)```\s*$/);
  if (!fence) {
    problems.push("missing trailing JSON-LD fence");
  } else {
    try {
      const ld = JSON.parse(fence[1]);
      const s = JSON.stringify(ld);
      if (!s.includes(`/${lang}/guides/`)) problems.push("JSON-LD URLs are missing the locale prefix");
    } catch (e) {
      problems.push(`JSON-LD is not valid JSON: ${e.message}`);
    }
  }
  return { problems, newSlug };
}

// ── run ─────────────────────────────────────────────────────────────────────
const files = fs
  .readdirSync(SRC)
  .filter((f) => f.endsWith(".md"))
  .filter((f) => !onlySlug || f === `${onlySlug}.md`);

if (files.length === 0) {
  console.error(onlySlug ? `No English source for slug "${onlySlug}".` : "No English guides found.");
  process.exit(1);
}

console.log(`\n${files.length} article(s) × ${targets.length} locale(s) = ${files.length * targets.length} translation(s)\n`);

let written = 0;
let skipped = 0;
let failed = 0;

for (const lang of targets) {
  const outDir = path.join(ROOT, lang);
  if (!dryRun) fs.mkdirSync(outDir, { recursive: true });

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");

    // Already translated? Match on `key:`, since the filename is localized.
    if (!force && fs.existsSync(outDir)) {
      const done = fs
        .readdirSync(outDir)
        .filter((f) => f.endsWith(".md"))
        .some((f) => fs.readFileSync(path.join(outDir, f), "utf8").includes(`key: ${slug}`));
      if (done) {
        console.log(`  skip  ${lang}/${slug} (already translated — use --force to redo)`);
        skipped++;
        continue;
      }
    }

    if (dryRun) {
      console.log(`  plan  ${lang}/${slug}`);
      continue;
    }

    process.stdout.write(`  ...   ${lang}/${slug}`);
    try {
      const source = fs.readFileSync(path.join(SRC, file), "utf8");
      const out = await translate(lang, slug, source);
      const { problems, newSlug } = validate(out, lang, slug);

      if (problems.length) {
        // Keep the output for inspection rather than throwing work away.
        const bad = path.join(outDir, `_REJECTED_${slug}.md`);
        fs.writeFileSync(bad, out, "utf8");
        console.log(`\r  FAIL  ${lang}/${slug} — ${problems.join("; ")}\n        saved to ${path.relative(process.cwd(), bad)}`);
        failed++;
        continue;
      }

      fs.writeFileSync(path.join(outDir, `${newSlug}.md`), out, "utf8");
      console.log(`\r  ok    ${lang}/${newSlug}`);
      written++;
    } catch (e) {
      console.log(`\r  FAIL  ${lang}/${slug} — ${e.message}`);
      failed++;
    }
  }
}

console.log(`\n${written} written, ${skipped} skipped, ${failed} failed.`);
if (written > 0) {
  console.log(`\nNext: node scripts/relink-guides.mjs   (rewrites /guides/... links to the translated slugs)`);
  console.log(`Then: READ the output before committing. It is a first draft, not a finished page.\n`);
}
