// ============================================================================
// Txaleta de Camiguin — schema.org entity graph.
//
// ONE place that owns every JSON-LD node on the site. The point of this file is
// the `@id`s: Google (and the crawlers behind AI answers) only merge the resort,
// the restaurant, the menu, the rooms and the guide articles into a single
// entity if every page references the SAME identifiers. Nodes are emitted
// per-page, but they all point back to the ids declared here.
//
// Nothing in this file may be a guess. Facts the client has not confirmed live
// in `entity` (lib/site.ts) as `null` and are omitted from the output — an
// absent property costs nothing, a wrong one costs trust and, for `geo`, sends
// the local pack to the wrong beach.
// ============================================================================

import { site, entity, dining, type Room } from "@/lib/site";
import { menuPages, SERVICE_NOTE } from "@/lib/menu";
import { localePath, localeTags, type Locale } from "@/lib/i18n";
import { ui } from "@/locales/ui";
import { getPageSeo } from "@/locales/seo";

/** Stable node identifiers. Never change these — they ARE the entity. */
export const schemaId = {
  org: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  restaurant: `${site.url}/#restaurant`,
  menu: `${site.url}/dining/menu#menu`,
} as const;

/** Site-root-relative path → absolute URL (schema.org wants absolute). */
export const abs = (p: string) => (p.startsWith("http") ? p : `${site.url}${p}`);

/** Absolute URL of `path` in `locale` (English is unprefixed — see proxy.ts). */
const absLocale = (locale: Locale, path: string) => `${site.url}${localePath(locale, path)}`;

/** Drop keys whose value is null/undefined/empty so unconfirmed facts vanish. */
function compact<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined && v !== "")
  ) as T;
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: "Purok 6, Puting Balas",
  addressLocality: "Mambajao",
  addressRegion: "Camiguin",
  postalCode: "9100",
  addressCountry: "PH",
};

const geoNode = () =>
  entity.geo
    ? { "@type": "GeoCoordinates", latitude: entity.geo.lat, longitude: entity.geo.lng }
    : null;

const featureList = (names: readonly string[]) =>
  names.map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true }));

// ── The business itself ─────────────────────────────────────────────────────
// A `Resort` inherits from LodgingBusiness → LocalBusiness → Organization, so
// this single node is legitimately both the place guests book AND the publisher
// of the /guides articles. Deliberately ONE node rather than a separate
// Organization: two competing entities is the classic way to get neither ranked.
export function organizationNode() {
  return compact({
    "@type": "Resort",
    "@id": schemaId.org,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    slogan: site.tagline,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    logo: { "@type": "ImageObject", url: abs("/logo-txaleta.png") },
    image: [abs(site.hero.poster), ...entity.images.map(abs)],
    address: postalAddress,
    geo: geoNode(),
    hasMap: site.location.mapsUrl,
    priceRange: entity.priceRange,
    currenciesAccepted: entity.currency,
    numberOfRooms: entity.numberOfRooms,
    checkinTime: entity.checkinTime,
    checkoutTime: entity.checkoutTime,
    amenityFeature: featureList(entity.amenities),
    // Every profile that is provably the same business. `sameAs` is how Google
    // reconciles this site with the entity it already knows from Maps/socials.
    sameAs: [
      site.social.facebook,
      site.social.instagram,
      site.social.tiktok,
      ...entity.profiles,
    ].filter(Boolean),
  });
}

export function websiteNode(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": schemaId.website,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: localeTags[locale],
    publisher: { "@id": schemaId.org },
  };
}

/** The per-page node every graph hangs off. */
function webPageNode(
  locale: Locale,
  path: string,
  type: string,
  name: string,
  description: string,
  image?: string
) {
  return compact({
    "@type": type,
    "@id": `${absLocale(locale, path)}#webpage`,
    url: absLocale(locale, path),
    name,
    description,
    inLanguage: localeTags[locale],
    isPartOf: { "@id": schemaId.website },
    about: { "@id": schemaId.org },
    primaryImageOfPage: image ? { "@type": "ImageObject", url: abs(image) } : null,
  });
}

/** Breadcrumbs for any page one level below the homepage. */
function breadcrumbNode(locale: Locale, path: string, label: string, homeLabel: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absLocale(locale, path)}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: homeLabel, item: absLocale(locale, "/") },
      { "@type": "ListItem", position: 2, name: label, item: absLocale(locale, path) },
    ],
  };
}

const graph = (nodes: unknown[]) => ({ "@context": "https://schema.org", "@graph": nodes });

/** Chrome strings each page graph needs (page title, crumb label, home label). */
export type PageChrome = { name: string; description: string; label: string; home: string };

/**
 * Assemble a page's schema chrome from the dictionaries that already exist:
 * the localized SEO title/description (locales/seo.ts, which returns undefined
 * for English so the page's own metadata stays the source of truth), and the
 * localized nav label for the breadcrumb. `fallback` is the English metadata
 * the page file already declares — passed in rather than re-typed here.
 */
export function pageChrome(
  locale: Locale,
  path: string,
  fallback: { name: string; description: string }
): PageChrome {
  const seo = getPageSeo(locale, path);
  const t = ui[locale];
  const label =
    t.nav[path] ??
    (path === "/dining/menu" ? t.crumbs.menu : path === "/book" ? t.crumbs.book : fallback.name);

  return {
    name: seo?.title ?? fallback.name,
    description: seo?.description ?? fallback.description,
    label,
    home: t.crumbs.home,
  };
}

// ── Page graphs ─────────────────────────────────────────────────────────────

/** Homepage: the business + the website. The root of the whole graph. */
export function homeGraph(locale: Locale, name: string, description: string) {
  return graph([
    organizationNode(),
    websiteNode(locale),
    webPageNode(locale, "/", "WebPage", name, description, site.hero.poster),
  ]);
}

/**
 * /accommodation — one `HotelRoom` per room type, each with the occupancy and
 * amenities we actually publish. No `offers.price`: live rates come from the
 * Cloudbeds engine at /book and a stale price in markup is a rich-result
 * penalty, so we describe the room and let the booking URL carry the rate.
 */
export function accommodationGraph(
  locale: Locale,
  rooms: Pick<Room, "slug" | "name" | "description" | "amenities" | "cover" | "maxOccupancy">[],
  page: PageChrome
) {
  const path = "/accommodation";
  return graph([
    webPageNode(locale, path, "CollectionPage", page.name, page.description, rooms[0]?.cover),
    breadcrumbNode(locale, path, page.label, page.home),
    ...rooms.map((room) =>
      compact({
        "@type": "HotelRoom",
        "@id": `${absLocale(locale, path)}#${room.slug}`,
        name: room.name,
        description: room.description,
        url: `${absLocale(locale, path)}#${room.slug}`,
        image: abs(room.cover),
        containedInPlace: { "@id": schemaId.org },
        occupancy: {
          "@type": "QuantitativeValue",
          unitText: "person",
          maxValue: room.maxOccupancy,
        },
        amenityFeature: featureList(room.amenities),
        potentialAction: { "@type": "ReserveAction", target: absLocale(locale, "/book") },
      })
    ),
  ]);
}

/** /dining — the restaurant as its own node, pointing at the menu. */
export function diningGraph(locale: Locale, page: PageChrome) {
  const path = "/dining";
  return graph([
    webPageNode(locale, path, "WebPage", page.name, page.description, dining.images[0]),
    breadcrumbNode(locale, path, page.label, page.home),
    compact({
      "@type": "Restaurant",
      "@id": schemaId.restaurant,
      name: `${site.name} — ${dining.heading}`,
      description: dining.body,
      url: absLocale(locale, path),
      image: dining.images.map(abs),
      telephone: site.contact.phone,
      email: site.contact.email,
      address: postalAddress,
      geo: geoNode(),
      servesCuisine: entity.cuisine,
      priceRange: entity.priceRange,
      currenciesAccepted: entity.currency,
      acceptsReservations: true,
      // The restaurant is inside the resort but open to walk-ins (see
      // dining.body), so it is a real, separately-searchable entity — while
      // still declaring the resort as its parent so the two never compete.
      parentOrganization: { "@id": schemaId.org },
      isPartOf: { "@id": schemaId.org },
      hasMenu: { "@id": schemaId.menu },
      sameAs: [site.social.facebook, site.social.instagram].filter(Boolean),
    }),
  ]);
}

/** Peso string from menu.ts ("1,330") → a number schema.org accepts. */
function menuPrice(price?: string): string | null {
  if (!price) return null;
  const n = price.replace(/,/g, "").trim();
  return /^\d+(\.\d+)?$/.test(n) ? n : null;
}

/**
 * /dining/menu — the full à la carte menu as `Menu` → `MenuSection` →
 * `MenuItem`. This is the highest-value markup on the site for LLM answers:
 * "what can you eat at Txaleta / how much is paella in Camiguin" becomes
 * answerable from the markup alone, without parsing the flip-book UI.
 */
export function menuGraph(locale: Locale, page: PageChrome) {
  const path = "/dining/menu";
  return graph([
    webPageNode(locale, path, "WebPage", page.name, page.description, dining.images[0]),
    breadcrumbNode(locale, path, page.label, page.home),
    {
      "@type": "Menu",
      "@id": schemaId.menu,
      name: "À la Carte",
      url: absLocale(locale, path),
      inLanguage: "en",
      description: SERVICE_NOTE,
      // Dish names are the same in every language, so the menu is emitted
      // identically on every locale — one menu, one @id, referenced by the
      // restaurant node above.
      hasMenuSection: menuPages.map((mp) =>
        compact({
          "@type": "MenuSection",
          "@id": `${site.url}${path}#${mp.id}`,
          name: mp.title,
          description: mp.note,
          hasMenuItem: mp.groups.flatMap((group) =>
            group.items.map((item) =>
              compact({
                "@type": "MenuItem",
                name: item.name,
                description: item.desc,
                offers: menuPrice(item.price)
                  ? {
                      "@type": "Offer",
                      price: menuPrice(item.price),
                      priceCurrency: entity.currency,
                      availability: "https://schema.org/InStock",
                    }
                  : null,
              })
            )
          ),
        })
      ),
    },
  ]);
}

/**
 * /experiences — each activity as a `TouristAttraction` the resort offers, and
 * the island landmarks as the `TouristDestination`s they actually are. These
 * are the nodes that put us in "things to do in Camiguin" answers.
 */
export function experiencesGraph(
  locale: Locale,
  cards: readonly { title: string; description: string }[],
  island: readonly { name: string; note: string }[],
  page: PageChrome
) {
  const path = "/experiences";
  return graph([
    webPageNode(locale, path, "CollectionPage", page.name, page.description),
    breadcrumbNode(locale, path, page.label, page.home),
    {
      "@type": "ItemList",
      "@id": `${absLocale(locale, path)}#experiences`,
      name: page.name,
      itemListElement: cards.map((card, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "TouristAttraction",
          name: card.title,
          description: card.description,
          url: absLocale(locale, path),
          provider: { "@id": schemaId.org },
        },
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${absLocale(locale, path)}#island`,
      name: "Camiguin landmarks",
      itemListElement: island.map((place, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "TouristDestination",
          name: place.name,
          description: place.note,
          address: { "@type": "PostalAddress", addressRegion: "Camiguin", addressCountry: "PH" },
        },
      })),
    },
  ]);
}

/**
 * Fold an article's authored JSON-LD (the ```json fence at the foot of every
 * guide markdown file) into the site graph.
 *
 * Those fences each declare their own inline `author`/`publisher` Organization
 * with no `@id` — 60 anonymous copies of the same company, which is how you end
 * up with a fistful of competing entities and none of them ranked. Rewriting 60
 * markdown files by hand would go stale the moment a phone number changes, so
 * the swap happens here, at render time: the inline copies become `@id`
 * references to the one Resort node the homepage publishes.
 *
 * Unrecognised shapes are returned untouched — a malformed fence must never
 * take a page down.
 */
export function linkGuideGraph(jsonLd: unknown): unknown {
  if (!jsonLd || typeof jsonLd !== "object") return jsonLd;
  const doc = jsonLd as { "@graph"?: unknown[] };
  if (!Array.isArray(doc["@graph"])) return jsonLd;

  return {
    ...doc,
    "@graph": doc["@graph"].map((node) => {
      if (!node || typeof node !== "object") return node;
      const n = node as Record<string, unknown>;
      if (n["@type"] !== "BlogPosting" && n["@type"] !== "Article") return node;
      return {
        ...n,
        author: { "@id": schemaId.org },
        publisher: { "@id": schemaId.org },
        isPartOf: { "@id": schemaId.website },
      };
    }),
  };
}

/**
 * The business node, emitted alongside a guide so the `@id` references added by
 * `linkGuideGraph` actually resolve on that page (a crawler that lands on an
 * article from search never saw the homepage).
 */
export function guideEntityGraph(locale: Locale) {
  return graph([organizationNode(), websiteNode(locale)]);
}

/** /about — the family story, attached to the business as `AboutPage`. */
export function aboutGraph(locale: Locale, page: PageChrome) {
  const path = "/about";
  return graph([
    webPageNode(locale, path, "AboutPage", page.name, page.description),
    breadcrumbNode(locale, path, page.label, page.home),
    organizationNode(),
  ]);
}

/** /book — the reservation page, so the rooms' ReserveAction target resolves. */
export function bookGraph(locale: Locale, page: PageChrome) {
  const path = "/book";
  return graph([
    webPageNode(locale, path, "WebPage", page.name, page.description),
    breadcrumbNode(locale, path, page.label, page.home),
    {
      "@type": "ReserveAction",
      "@id": `${absLocale(locale, path)}#reserve`,
      name: page.name,
      object: { "@id": schemaId.org },
      target: {
        "@type": "EntryPoint",
        urlTemplate: absLocale(locale, path),
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  ]);
}
