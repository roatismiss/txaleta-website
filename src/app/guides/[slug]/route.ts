import { site } from "@/lib/site";
import { getGuide, getGuides, absoluteLinks } from "@/lib/guides";
import { localePath } from "@/lib/i18n";

// ============================================================================
// /guides/<slug>.md — the raw Markdown mirror of every English guide.
//
// Why this exists: the rendered article is React, wrapped in a splash screen, a
// mega-menu and a cross-origin chatbot iframe. The Markdown is the same words
// with none of that — cheaper and far more reliable for a model to parse, and
// it is the URL an LLM will guess at first (the HTML page plus `.md`).
//
// It lives OUTSIDE app/[lang] deliberately: a folder cannot hold both a page
// and a route handler, so the mirror gets its own unprefixed branch. It is
// reached at all because the locale proxy skips any path containing a dot (see
// the matcher in proxy.ts), so `/guides/foo.md` is never rewritten to
// `/en/guides/foo.md` — while `/guides/foo` still is, and lands on the real
// page as before.
//
// English only: this is the retrieval surface, not the site. Translations are
// discoverable through hreflang and the sitemap.
// ============================================================================

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getGuides("en").map((g) => ({ slug: `${g.slug}.md` }));
}

export async function GET(_request: Request, ctx: RouteContext<"/guides/[slug]">) {
  const { slug } = await ctx.params;

  // Only the `.md` mirror is served here. Anything else is a real page URL that
  // the proxy should have rewritten, so refuse rather than shadow it.
  if (!slug.endsWith(".md")) {
    return new Response("Not found", { status: 404 });
  }

  const guide = getGuide("en", slug.slice(0, -3));
  if (!guide) return new Response("Not found", { status: 404 });

  const canonical = `${site.url}${localePath("en", `/guides/${guide.slug}`)}`;
  const doc = [
    "---",
    `title: ${JSON.stringify(guide.title)}`,
    `description: ${JSON.stringify(guide.description)}`,
    `source: ${canonical}`,
    guide.dateISO ? `updated: ${guide.dateISO}` : null,
    `author: ${JSON.stringify(guide.author)}`,
    "---",
    "",
    `# ${guide.title}`,
    "",
    absoluteLinks(guide.body),
    "",
  ]
    // Only the optional `updated` line is dropped — the blank strings are the
    // paragraph breaks that keep the document readable.
    .filter((l): l is string => l !== null)
    .join("\n");

  return new Response(doc, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // Point crawlers at the HTML page as the indexable original, so the
      // mirror never competes with it in search results.
      Link: `<${canonical}>; rel="canonical"`,
      "X-Robots-Tag": "noindex, follow",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
