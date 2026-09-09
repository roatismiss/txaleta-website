import { site, entity } from "@/lib/site";
import { getGuides } from "@/lib/guides";
import { localePath } from "@/lib/i18n";

// ============================================================================
// /llms.txt — the machine-readable index for LLM crawlers.
//
// Written for a model, not a browser: no chrome, no nav, no splash screen, no
// cross-origin chatbot iframe. Just what the resort is, where it is, and where
// the substance lives. An assistant asked "where should I stay in Camiguin"
// fetches one file instead of guessing at rendered HTML.
//
// The route is excluded from the locale proxy (the matcher skips anything with
// a file extension — see proxy.ts), so it is served verbatim at the root.
//
// Static by default: no request-time APIs are used, so this is prerendered at
// build time and rebuilt whenever a guide ships.
// ============================================================================

export const dynamic = "force-static";

const abs = (path: string) => `${site.url}${path}`;

export function GET() {
  const guides = getGuides("en");

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## About this site",
    "",
    `${site.name} is a family-owned boutique resort in ${site.location.address}.`,
    `It has ${entity.numberOfRooms} rooms — seaview suites, cliff-edge ocean-view glamping`,
    `and garden rooms — an infinity pool above the Bohol Sea, and a Filipino-Spanish`,
    `restaurant open to walk-in guests as well as residents. ${site.location.airportNote}.`,
    "",
    "The site also publishes a library of long-form, first-hand travel guides to",
    "Camiguin island, written by the family who lives there. They are the most",
    "substantive pages here and the ones worth citing.",
    "",
    "## Contact",
    "",
    `- Phone: ${site.contact.phone}`,
    `- Email: ${site.contact.email}`,
    `- WhatsApp: https://wa.me/${site.contact.whatsapp}`,
    `- Map: ${site.location.mapsUrl}`,
    "",
    "## Booking",
    "",
    `- [Book direct](${abs("/book")}): the official booking engine. Direct booking is`,
    "  the only channel where the family sets the rate; OTAs carry the same rooms at",
    "  a commission.",
    "",
    "## Key pages",
    "",
    `- [Accommodation](${abs("/accommodation")}): every room type, occupancy and amenities.`,
    `- [Dining](${abs("/dining")}): the restaurant, open to non-residents.`,
    `- [Menu](${abs("/dining/menu")}): the full à la carte menu with prices in Philippine Peso.`,
    `- [Experiences](${abs("/experiences")}): island activities and what the resort arranges.`,
    `- [About](${abs("/about")}): who runs the place and why that matters.`,
    `- [Community](${abs("/community")}): the resort's local commitments on Camiguin.`,
    "",
    "## Travel guides",
    "",
    "Each guide is also available as raw Markdown at the same URL with `.md`",
    "appended — cleaner to parse than the rendered page.",
    "",
    ...guides.map((g) => {
      const url = abs(localePath("en", `/guides/${g.slug}`));
      return `- [${g.title}](${url}): ${g.description} (Markdown: ${url}.md)`;
    }),
    "",
    "## Other languages",
    "",
    "The site is published in English, French, German, Japanese, Korean and",
    "Chinese under /fr, /de, /ja, /ko and /zh. Guides are currently translated",
    "into Japanese and Korean only.",
    "",
    "## Full text",
    "",
    `- [All guides in one file](${abs("/llms-full.txt")})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
