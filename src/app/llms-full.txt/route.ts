import { site } from "@/lib/site";
import { getGuides, absoluteLinks } from "@/lib/guides";
import { localePath } from "@/lib/i18n";

// ============================================================================
// /llms-full.txt — every English guide, in full, as one plain-text document.
//
// The companion to /llms.txt: that file is the index, this is the corpus. A
// model answering "what is there to do in Camiguin" can ground itself in one
// fetch rather than twenty, and every article carries its own source URL so the
// citation points back at the real page.
//
// English only, on purpose — this is the retrieval corpus, not the site. The
// translations exist for human readers and are already discoverable through
// hreflang and the sitemap.
// ============================================================================

export const dynamic = "force-static";

export function GET() {
  const guides = getGuides("en");

  const header = [
    `# ${site.name} — travel guides to Camiguin, Philippines`,
    "",
    `> ${site.description}`,
    "",
    `Source: ${site.url}`,
    `Index: ${site.url}/llms.txt`,
    `Articles: ${guides.length}`,
    "",
    "Written first-hand by the family who runs the resort on Camiguin. Each",
    "article below is reproduced in full and carries the URL of the page it",
    "comes from.",
    "",
    "---",
    "",
  ].join("\n");

  const body = guides
    .map((g) =>
      [
        `# ${g.title}`,
        "",
        `Source: ${site.url}${localePath("en", `/guides/${g.slug}`)}`,
        g.dateISO ? `Updated: ${g.dateISO}` : null,
        `Author: ${g.author}`,
        "",
        g.description,
        "",
        absoluteLinks(g.body),
        "",
        "---",
        "",
      ]
        // Only the optional `Updated` line is dropped — blank strings are the
        // paragraph breaks that keep this parseable.
        .filter((l): l is string => l !== null)
        .join("\n")
    )
    .join("\n");

  return new Response(header + body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
