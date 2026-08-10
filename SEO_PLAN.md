# Txaleta de Camiguin — SEO Content Plan

**Owner:** Txaleta de Camiguin · **Drafted:** 10 August 2026 · **Horizon:** Aug 2026 – Feb 2027

**The goal is not traffic. The goal is direct bookings.** Every article in this plan exists to
intercept a traveller at a decision point ("which island?", "when do I go?", "where do I sleep?")
and hand them to `/book` while they are still deciding.

---

## 0. Scope assumption (please confirm)

The brief was *"8 articles, 2 per week, over the next 6 months."* Those numbers don't reconcile —
2/week for 6 months is ~48 articles. This plan reads it as the more likely intent:

- **Month 1 (Aug 2026): the sprint.** 8 articles, 2 per week. This is the contracted deliverable.
- **Months 2–6 (Sep 2026 – Feb 2027): consolidation.** 2 articles/month plus scheduled refreshes
  of the existing library. Enough to keep the cluster growing and Google returning, at a
  sustainable cost.

If the client actually wants 2/week sustained for six months, §5 lists 20 further topics — take
them in order. **Articles 1 and 2 of the sprint are already written and merged** (see §3).

---

## 1. Where we stand today

**Existing library:** 7 guides at `src/content/guides/*.md`, rendered at `/guides/[slug]`.
All are long-form (3,700–4,400 words), first-person, honest-broker tone, with GFM tables,
an FAQ section and a `BlogPosting` + `FAQPage` JSON-LD fence. **The quality bar is already
high — the job is coverage and technical hygiene, not a rewrite.**

| Slug | Primary keyword | Intent | Role |
|---|---|---|---|
| `camiguin-vs-siquijor` | Camiguin vs Siquijor | Decision | Destination-choice spoke |
| `where-to-stay-in-camiguin` | where to stay in Camiguin | **Commercial** | **Money page — NEW** |
| `camiguin-itinerary` | Camiguin itinerary | Planning | Planning spoke |
| `best-time-to-visit-camiguin` | best time to visit Camiguin | Planning | **Season pillar — NEW** |
| `how-to-get-to-camiguin-from-cebu` | how to get to Camiguin from Cebu | Logistics | Logistics spoke |
| `best-islands-in-the-philippines` | best islands in the Philippines | Discovery | Top-of-funnel pillar |
| `birdwatching-camiguin-hibok-hibok` | Camiguin birdwatching | Niche | Long-tail / E-E-A-T proof |

**What was missing before this sprint:** the two highest-value queries in the whole space —
*when to come* (the biggest evergreen planning query) and *where to sleep* (the query with the
shortest path to a booking). Both are now filled.

**What is still missing:** the attraction layer (White Island, Hibok-Hibok, Mantigue, the springs),
the cost layer, and the audience layer (honeymoon, family). That is the sprint.

---

## 2. Strategy in one page

**Play: topical authority on one small island.** We will never outrank Booking.com for
"Philippines hotels". We can absolutely own *Camiguin* — a place with a finite number of
questions, thin competition (mostly OTA templates and one-off blog posts), and one thing no
competitor has: **we live here.**

Four principles, all of which the existing guides already follow. Keep them.

1. **First-hand or don't publish.** Tide times, which barangay the bancas leave from, what the
   rain actually does at 4pm. This is the entire moat and it is also, conveniently, exactly what
   Google's helpful-content systems and the AI answer engines reward.
2. **Be honest against our own interest.** The Siquijor article credits Siquijor. The
   where-to-stay article says out loud "we're the wrong fit if you want nightlife." This is
   why people trust and convert, and it is the single most-copied thing about the existing set.
3. **One question, one page.** Never two pages chasing the same keyword (see §6).
4. **Every page ends at `/book`.** Guide → CTA block → booking engine, with the room deep-links
   (`/book?room=...`) already wired through `bookHref()`.

**Realistic timeline.** New pages take **6–12 weeks** to settle in Google, longer for the
competitive head terms. Expect movement on long-tail FAQ queries in weeks 3–6, and meaningful
positions on primary keywords around **November–December 2026**. Do not judge the sprint in
September.

---

## 3. The sprint: 8 articles, 2 per week

Hero images: the two published articles reuse existing resort photography. Every article below
needs **one 16:10 hero at ≥1600px wide, WebP**, named as its slug.

### Week 1 (11–17 Aug) — DONE ✅

| # | Article | Primary keyword | Why first |
|---|---|---|---|
| 1 | **Best Time to Visit Camiguin: Month by Month** `best-time-to-visit-camiguin` | best time to visit Camiguin | Biggest evergreen planning query; feeds every other page in the cluster |
| 2 | **Where to Stay in Camiguin: Best Areas & How to Choose** `where-to-stay-in-camiguin` | where to stay in Camiguin | Shortest path from search to booking; the money page |

Both are live in `src/content/guides/`, wired into `ORDER` in `src/lib/guides.ts`, and linked
from all five older guides.

### Week 2 (18–24 Aug)

| # | Article | Primary keyword | Notes |
|---|---|---|---|
| 3 | **Lanzones Festival 2026: The Complete Guide** `camiguin-lanzones-festival` | Lanzones Festival Camiguin | **Time-critical.** Festival is second half of Oct 2026; publishing in August gives ~8 weeks to rank. Confirm the official schedule with the provincial tourism office and put the exact dates in an `Event` JSON-LD. Highest-urgency piece in the plan. |
| 4 | **25 Best Things to Do in Camiguin** `things-to-do-in-camiguin` | things to do in Camiguin | The highest-volume head term on the island. Build it as an **attraction index** — one tight paragraph per place, each linking out to a future deep-dive. It becomes the hub the rest of the sprint links back to. Must NOT duplicate the itinerary: this is *what*, the itinerary is *in what order*. |

### Week 3 (25–31 Aug)

| # | Article | Primary keyword | Notes |
|---|---|---|---|
| 5 | **White Island Camiguin: Everything Before You Go** `white-island-camiguin` | White Island Camiguin | The island's single most-searched attraction. Win with the practical detail nobody publishes: boat fare, jump-off barangay, tide and sunrise timing, no shade, environmental fee, what to bring. |
| 6 | **How Much Does a Camiguin Trip Cost?** `camiguin-travel-cost` | Camiguin travel budget / cost | Budget queries convert well and are trivially winnable — build a real table (flights, room bands, boat, entrance fees, scooter, food) in PHP with a USD/EUR column. Feeds the where-to-stay page. |

### Week 4 (1–7 Sep)

| # | Article | Primary keyword | Notes |
|---|---|---|---|
| 7 | **Camiguin Honeymoon: A Romantic Island Guide** `camiguin-honeymoon` | Camiguin honeymoon | Highest-margin audience and the most on-brand. Signature experiences (Almusal sa Bahay, Sunrise Saludo, La Merienda, Tahimik Nights) do the selling. Deep-links to the glamping and seaview rooms. |
| 8 | **Climbing Mt. Hibok-Hibok: The Honest Trekking Guide** `hibok-hibok-hike` | Mt Hibok-Hibok hike | Strong E-E-A-T play via the local guides we already partner with (see `/community`). Needs real numbers: permit, guide fee, start time, duration, difficulty, what the summit actually looks like. **Verify current fees with the guides before publishing.** |

---

## 4. Months 2–6 — consolidation (2/month)

| Month | New articles | Maintenance |
|---|---|---|
| **Sep 2026** | Mantigue Island & the Giant Clam Sanctuary · Camiguin Hot Springs (Ardent, Sto. Niño, Bura) | Refresh the Lanzones article with the confirmed schedule the week it's announced |
| **Oct 2026** | What to Eat in Camiguin · Camiguin with Kids: Family Guide | Post-festival: add real photos + a "what it was actually like" section to the Lanzones piece — this is what makes it win 2027 |
| **Nov 2026** | Sunken Cemetery & the Church Ruins · Camiguin vs Siargao | Refresh `how-to-get-to-camiguin-from-cebu` with the current Cebgo timetable |
| **Dec 2026** | Katibawasan & Tuasan Falls · Diving in Camiguin (with Scuba de Oro) | Update all `dateModified` on 2026 guides; re-verify prices in `camiguin-travel-cost` |
| **Jan 2027** | What to Pack for Camiguin · Camiguin for Digital Nomads | Q1 review: prune or merge anything with zero impressions after 90 days |
| **Feb 2027** | Weddings & Elopements at Txaleta · Camiguin vs Bohol | Full-library refresh pass; roll 2026 titles to 2027 |

**Further backlog** if the cadence stays at 2/week: Camiguin from Manila · Camiguin from Cagayan
de Oro · the 64km ring road self-drive guide · Camiguin in 2 days · solo travel in Camiguin ·
Camiguin for seniors/accessibility · the Walkway to the Old Volcano · Camiguin's beaches ranked ·
best sunset spots · lanzones and what else grows here · Camiguin travel safety · Camiguin SIM and
connectivity · scuba vs snorkel · Camiguin's seven volcanoes explained · Filipino-Spanish food
explained · a Camiguin packing list for the green season · Camiguin nightlife (honestly: there
isn't any, and that ranks) · how locals spend a Sunday · Camiguin photography spots ·
Camiguin FAQ mega-page.

---

## 5. Internal linking — the rule set

This is where most hotel blogs leak all their value. Enforce it.

**The topology:**

```
                    /guides  (hub)
                        │
   ┌────────────────────┼────────────────────┐
   │                    │                    │
DISCOVERY           PLANNING             MONEY PAGES
best-islands ──► camiguin-vs-siquijor ──► where-to-stay ──► /book
                 best-time-to-visit  ──► camiguin-itinerary
                 how-to-get-to       ──► travel-cost
                        │
                 ATTRACTIONS (things-to-do hub)
                 white-island · hibok-hibok · mantigue · springs · falls
                        │
                 AUDIENCE
                 honeymoon · family · birdwatching
```

**Rules:**

1. **Every new article links to at least 3 existing guides**, in body prose, with descriptive
   anchor text — never "click here", never the bare URL.
2. **Every new article gets at least 2 links back from older articles.** Retrofitting these is
   not optional; it is how a new page inherits authority. Done for articles 1–2 already.
3. **Every article links to `/book` at least twice** — once mid-body, once in the closing CTA —
   plus one deep-link to a specific room via `/book?room=<slug>` where it's natural.
4. **Anchor text must vary.** Five links all reading "where to stay in Camiguin" looks
   manufactured. Mix exact, partial and natural phrasing.
5. **Attraction articles link up to `things-to-do-in-camiguin`; it links down to all of them.**
   Classic hub-and-spoke.
6. **Money pages link out too.** `/accommodation` and `/dining` should each carry 2–3 links into
   the guides — currently they carry none, which wastes the strongest pages on the site.

---

## 6. Anti-cannibalization — already applied, keep applying

Two pages chasing one keyword means Google picks the weaker one, or neither. When articles 1–2
were added, four collisions existed in the older set. All four were fixed on 10 Aug 2026:

| Where | Was | Now |
|---|---|---|
| `camiguin-itinerary` H2 | "Where to stay in Camiguin: base yourself in Mambajao" | "Your base for these three days" + link to the new page |
| `camiguin-itinerary` H2 + FAQ | "When is the best time to visit Camiguin?" | "Which months suit this itinerary best" + link to the season pillar |
| `camiguin-itinerary` keywords | targeted `where to stay in Camiguin Mambajao` | swapped for `Camiguin 3 days 2 nights itinerary` |
| `best-islands` FAQ | "When is the best time to visit Camiguin?" | "Which months are most reliable for island-hopping in Camiguin?" |

A factual inconsistency was corrected in the same pass: two older guides claimed the dry season
ran "March to early November" / "March to early June". It is **March–May**, and Google notices
when a site contradicts itself on a fact it has structured data for.

**The standing rule:** before writing, grep the library for the primary keyword. If an existing
article has it as an H2 or an FAQ question, either demote that section to a one-line teaser with
a link, or don't write the new article.

```bash
grep -rin "your primary keyword" src/content/guides/
```

---

## 7. The on-page template

What makes the existing articles work — replicate exactly.

**Frontmatter:** `title` (≤60 chars where possible, year in parentheses for freshness),
`description` (150–160 chars, primary keyword in the first half, written as a promise not a
summary), `slug`, `primaryKeyword`, `keywords` (7–11, including the question forms people
actually type), `date`, `author`, `image`, `imageAlt`.

**Body structure:**

1. **H1** = the title, once. The loader strips it and the hero renders it.
2. **A hook that isn't a hook.** Open by contradicting the generic advice, then earn it.
3. **"The short answer"** — a bulleted verdict in the first 150 words. This is what gets lifted
   into AI Overviews and featured snippets, and it's why readers stay.
4. **A comparison table early.** Screenshot-able. Tables win position zero.
5. **H2s phrased as the queries people type**, not as clever headlines.
6. **The honest section.** Every article names something we lose at: black sand, rain, no
   nightlife, Siquijor's better diving access. This is the trust engine.
7. **3+ internal links, 2 CTAs.**
8. **FAQ: 10–12 questions**, each answered in 40–80 words, mirrored exactly into `FAQPage`
   JSON-LD.
9. **"Come home to Camiguin"** closing + contact block + the `More Than a Resort` signoff.
10. **JSON-LD fence** at the very end: `BlogPosting` + `FAQPage` in an `@graph`, absolute URLs,
    `datePublished` = `dateModified` on first publish.

**Length:** 3,500–4,500 words. Not for the word count — because that's what it takes to answer
a travel-planning question completely, and completeness is what ranks.

**Voice:** first-person plural, present tense, British-leaning spelling to match the existing
set, em-dashes, no exclamation marks, no "nestled", no "hidden gem" unless we're arguing with it.

---

## 8. Technical SEO backlog

Ordered by impact-to-effort. **P0 items are worth more than the next four articles.**

### P0 — DONE ✅ (10 Aug 2026)

**1. Six-language duplicate content on every guide — fixed.**
Guide bodies were English-only, but `/[lang]/guides/[slug]` prerendered them under all six
locales (**42 guide URLs for 7 articles**) and `sitemap.ts` declared each as a legitimate
`hreflang` alternate — telling Google six identical English pages were six translations.
Rebuilt as a real translation system (see §13). Build now emits **7 URLs for 7 articles**, and
each translation added creates a genuinely new URL rather than a duplicate.

**2. Breadcrumb + CollectionPage JSON-LD ignored the locale — fixed.**
Both hardcoded `${site.url}/guides/...` on every language version. Now routed through
`localePath()`, with `inLanguage` set on the collection.

**3. `getRelatedGuides()` now matches on shared keywords** instead of returning the first three
in `ORDER`, and stays inside the reader's language.

**4. `openGraph.publishedTime` / `modifiedTime` / `authors`** added to article metadata.

### P1 — this month

**5. Guide hero images are PNG.** `public/images/guides/*.png` are the LCP element on every
article. Convert to WebP (or AVIF) — typically a 60–80% size cut and a direct Core Web Vitals win.

**6. No named author.** `author` is the Organization on every article. For a
"written by people who live here" strategy, a **named `Person` author with a real bio page** is
the strongest available E-E-A-T signal and costs one page. Add `/about/authors`, reference it from
each article's JSON-LD `author`.

**7. Placeholder testimonials.** `src/lib/site.ts:452` is explicitly marked PLACEHOLDER. Real
Google reviews should replace them before any `Review`/`AggregateRating` schema is added —
marking up invented reviews is a manual-action risk, not a shortcut.

### P2 — this quarter

8. **Table of contents** on articles over 3,000 words (jump links also produce sitelinks in the SERP).
9. **`LodgingBusiness` schema** on `/` and `/accommodation` with address, geo, amenities, price range — verify what exists today before adding.
10. **Links from money pages into the guides** (§5 rule 6).
11. **Image filenames and alt text** on new uploads: `white-island-sandbar-sunrise.webp`, not `IMG_2043.webp`.
12. **Google Business Profile** — post the guides there; strongest local-pack signal available to a resort.

---

## 9. Distribution — publishing isn't the job

An article with no promotion takes twice as long to rank.

- **Google Search Console:** submit each URL for indexing on publish day. Non-negotiable.
- **Facebook / Instagram:** each article yields 3–5 posts. The comparison tables perform as carousels; the "short answer" section is a caption.
- **The concierge chatbot** (CloudReef, cross-origin iframe) should be able to cite the guides. Its answers about seasons and rooms and the new articles must agree.
- **Reddit r/Philippines, r/PHTravel and the Camiguin Facebook groups:** answer real questions genuinely, link only where it actually helps. Every existing article was written against questions asked in those threads — go back and answer them.
- **Local partners** (`/community`: Scuba de Oro, Natalia Sea Glass, the Hibok-Hibok guides) are natural, legitimate reciprocal links.
- **Guest email:** a pre-arrival email linking the best-time and things-to-do guides reduces front-desk questions and lifts dwell time.

---

## 10. Measurement

**Set up first (week 1):** GSC verified with the sitemap submitted; a GSC filter saved for
`/guides/`; the seven primary keywords tracked weekly in a sheet.

**Report monthly:**

| Metric | Source | Target by Feb 2027 |
|---|---|---|
| Guide impressions/month | GSC | 25,000+ |
| Guide clicks/month | GSC | 1,200+ |
| Primary keywords in top 10 | GSC | 6 of 15 |
| Guide → `/book` click-through | Vercel Analytics (`analytics-beacon.tsx`) | 4%+ |
| Direct bookings attributed to organic | Cloudbeds | the only number that matters |

**Reviews:** monthly on the numbers, quarterly on the strategy. At 90 days, any article with
zero impressions gets diagnosed (indexed? cannibalized? wrong intent?) and either fixed or merged.

**Expectation to set with the client now:** nothing meaningful will show in September. The
sprint's return lands in November–January — which, conveniently, is when people book the
March–May dry season.

---

## 11. Article brief template

Copy this per article before writing.

```yaml
slug:
primary keyword:
secondary keywords:        # 7-11, include question forms
search intent:             # informational | commercial | transactional
target reader:             # one sentence, a real person
the promise:               # what they can do after reading that they couldn't before
the honest bit:            # what we admit we're not good at — mandatory
comparison table:          # what two things get compared, and on which axes
internal links out:        # min 3 guides + /book + 1 room deep-link
internal links in:         # which existing articles get edited to link here
cannibalization check:     # grep result — what already targets this keyword
facts to verify:           # fees, schedules, timetables — with the source
hero image:                # 16:10, >=1600px, WebP, named after the slug
FAQ:                       # 10-12 questions from real SERP "People also ask"
```

---

## 12. Translation — entering other SERPs

**The reason to translate is not "more pages".** Duplicating one article across six languages
does not multiply its authority: `hreflang` explicitly tells Google these are *one* article in
several languages, and no PageRank is created by copying. The reason to translate is narrower and
better: **you enter search results the English page can physically cannot win.** A Korean
traveller typing 카미긴 여행 시기 never sees an English URL. That query is only winnable in Korean.

So translate where there are searchers, not to inflate a URL count.

### Which languages are actually worth it

The site ships six locales. They are not equally valuable for a Philippine resort:

| Locale | Case for translating | Priority |
|---|---|---|
| **ko** Korean | Korea is consistently one of the largest inbound tourism markets for the Philippines. Highest-value non-English audience by a distance. | **1st** |
| **zh** Chinese | Large outbound market, low competition on Camiguin queries specifically. | **2nd** |
| **ja** Japanese | Strong Philippines interest, high-quality traffic, thin competition. | **3rd** |
| **de** German | Long-haul Southeast Asia travellers, but they overwhelmingly search in English for Philippine islands. | 4th |
| **fr** French | Same as German, with less Philippines volume. | 5th |

**Recommendation:** do **ko + zh + ja** first, across all articles. Hold `fr`/`de` until
Search Console shows non-English impressions worth chasing. That's 21 translations instead of 35,
concentrated where the searchers actually are.

### The architecture (built 10 Aug 2026)

```
src/content/guides/
  en/best-time-to-visit-camiguin.md      → /guides/best-time-to-visit-camiguin
  ko/카미긴-여행-시기.md                    → /ko/guides/카미긴-여행-시기
  ja/<Japanese slug>.md                  → /ja/guides/<Japanese slug>
```

- **Every translation gets its own slug in its own language** — a URL carrying the keyword in the
  reader's language ranks and gets clicked more than `/ko/guides/best-time-to-visit-camiguin`.
  Frontmatter `key:` (always the English slug) is what ties the versions together.
- **`hreflang` is built from the files that actually exist**, per article, with reciprocal links
  and `x-default` → English. An article translated into Korean only declares `en` + `ko`.
  Verified in the build output.
- **An untranslated article does not exist in that locale.** No route, no sitemap entry, no
  hreflang. Showing the English body under `/ja` would be duplicate content pretending to be a
  translation — the exact problem we just removed.
- **Page chrome is localized too** (back-link, byline, "Read also", the booking CTA), so a Korean
  reader never hits an English button.

### The tooling

```bash
export ANTHROPIC_API_KEY=...

node scripts/translate-guides.mjs --locale ko --dry-run   # see the plan
node scripts/translate-guides.mjs --locale ko             # translate all 7
node scripts/relink-guides.mjs --locale ko                # fix internal links
npm run build                                             # verify
```

`translate-guides.mjs` asks for a native-register rewrite rather than a literal translation,
generates the localized slug, researches the **keywords speakers of that language actually type**
(not translations of the English keywords), and translates the FAQ and the JSON-LD in parallel so
the structured data matches the visible text. It validates the output — frontmatter, `key`,
translated slug, valid JSON-LD carrying the locale prefix — and quarantines anything that fails as
`_REJECTED_*.md` instead of writing a broken page.

`relink-guides.mjs` runs afterwards and rewrites `/guides/x` → `/ko/guides/<korean slug>` and
`/accommodation` → `/ko/accommodation`. Links to articles not yet translated stay pointing at
English (a working page beats a 404) and are listed in the output.

### The rule that keeps this safe

**Unreviewed machine translation published at scale is named in Google's scaled-content-abuse
policy.** The script's output is a *first draft*. Before any locale goes live, a fluent speaker
should read at least the title, description, opening and FAQ of every article — that is where
awkwardness costs clicks, and where an error costs trust. Publish one locale at a time and check
Search Console between them; 21 long articles appearing overnight on a small site is a pattern
worth avoiding regardless of quality.

---

## 13. Open items needing the client

1. **Confirm the cadence** (§0): 8 articles total, or 2/week sustained?
2. **Lanzones Festival 2026 exact dates** from the provincial tourism office — blocks article 3.
3. **Hibok-Hibok permit and guide fees, current** — blocks article 8.
4. **Real Google reviews** to replace the placeholders in `site.ts`.
5. **A named author** for the byline — decision needed before the E-E-A-T fix.
6. **Six hero images** for articles 3–8.
7. **GSC access** for whoever is reporting.
8. **An `ANTHROPIC_API_KEY`** to run the translation scripts, and **a fluent reviewer per
   language** before any locale is published (§12).
