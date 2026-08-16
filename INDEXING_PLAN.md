# Manual indexing plan — 70 URLs over 7 days

10 URLs per day in Google Search Console → **URL Inspection** → **Request Indexing**.
That's roughly the daily quota per property, so don't try to do more in one sitting.

---

## Before day 1 — do these two things once

**1. Verify the Search Console property.**
Nothing below works until this is done. Use a **Domain property** (`txaletadecamiguin.com`)
verified by DNS TXT record, not a URL-prefix property — the domain property covers
`www`, non-`www`, http and https in one place.

**2. Submit the sitemap.**
Search Console → **Sitemaps** → enter `sitemap.xml` → Submit.

This matters more than the whole list below. The sitemap tells Google about all 70 URLs
at once and keeps working after you stop clicking. Manual requests are a *nudge* that
moves a page up the crawl queue — they are not a guarantee, and they are not a substitute
for the sitemap.

---

## Two things that will waste your quota if you get them wrong

**English URLs have no `/en/` in them.** The site serves English unprefixed and 308-redirects
`/en/*` to the clean URL. If you paste `.../en/guides/camiguin-itinerary` you're submitting a
redirect and burning one of your ten daily slots on nothing. Copy the URLs below exactly.

**Korean and Japanese URLs contain non-Latin characters.** That's intentional and correct.
Paste them as they appear here — Search Console encodes them itself. If the field looks like
it mangled them into `%ED%8E%98...`, that's fine, it's the same URL.

---

## Day 1 — homepage, hub, and the seven highest-intent English guides

| # | URL |
|---|---|
| 1 | `https://www.txaletadecamiguin.com/` |
| 2 | `https://www.txaletadecamiguin.com/guides` |
| 3 | `https://www.txaletadecamiguin.com/guides/things-to-do-in-camiguin` |
| 4 | `https://www.txaletadecamiguin.com/guides/where-to-stay-in-camiguin` |
| 5 | `https://www.txaletadecamiguin.com/guides/camiguin-itinerary` |
| 6 | `https://www.txaletadecamiguin.com/guides/how-to-get-to-camiguin-from-cebu` |
| 7 | `https://www.txaletadecamiguin.com/guides/white-island-camiguin` |
| 8 | `https://www.txaletadecamiguin.com/guides/best-time-to-visit-camiguin` |
| 9 | `https://www.txaletadecamiguin.com/guides/camiguin-lanzones-festival` |
| 10 | `https://www.txaletadecamiguin.com/book` |

**Why Lanzones on day 1:** the festival is in October. It needs the longest possible runway
to rank before the search interest spikes. Everything else can wait a day; this can't.

## Day 2 — the rest of the commercial English guides

| # | URL |
|---|---|
| 11 | `https://www.txaletadecamiguin.com/guides/camiguin-travel-cost` |
| 12 | `https://www.txaletadecamiguin.com/guides/camiguin-vs-siquijor` |
| 13 | `https://www.txaletadecamiguin.com/guides/best-islands-in-the-philippines` |
| 14 | `https://www.txaletadecamiguin.com/guides/camiguin-honeymoon` |
| 15 | `https://www.txaletadecamiguin.com/guides/camiguin-with-kids` |
| 16 | `https://www.txaletadecamiguin.com/guides/mantigue-island-camiguin` |
| 17 | `https://www.txaletadecamiguin.com/guides/sunken-cemetery-camiguin` |
| 18 | `https://www.txaletadecamiguin.com/guides/camiguin-springs` |
| 19 | `https://www.txaletadecamiguin.com/guides/camiguin-waterfalls` |
| 20 | `https://www.txaletadecamiguin.com/guides/what-to-eat-in-camiguin` |

## Day 3 — last English guides, then the money pages

| # | URL |
|---|---|
| 21 | `https://www.txaletadecamiguin.com/guides/hibok-hibok-hike` |
| 22 | `https://www.txaletadecamiguin.com/guides/camiguin-vs-siargao` |
| 23 | `https://www.txaletadecamiguin.com/guides/birdwatching-camiguin-hibok-hibok` |
| 24 | `https://www.txaletadecamiguin.com/accommodation` |
| 25 | `https://www.txaletadecamiguin.com/dining` |
| 26 | `https://www.txaletadecamiguin.com/dining/menu` |
| 27 | `https://www.txaletadecamiguin.com/experiences` |
| 28 | `https://www.txaletadecamiguin.com/about` |
| 29 | `https://www.txaletadecamiguin.com/community` |
| 30 | `https://www.txaletadecamiguin.com/gallery` |

**English is complete after day 3.** If you only ever do three days, do these three.

---

## Day 4 — Korean, top ten

| # | URL |
|---|---|
| 31 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-가볼만한-곳` |
| 32 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-숙소-추천` |
| 33 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-여행-일정` |
| 34 | `https://www.txaletadecamiguin.com/ko/guides/세부에서-카미긴-가는법` |
| 35 | `https://www.txaletadecamiguin.com/ko/guides/화이트-아일랜드-카미긴` |
| 36 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-여행-시기` |
| 37 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-란소네스-축제` |
| 38 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-여행-경비` |
| 39 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-시키호르-비교` |
| 40 | `https://www.txaletadecamiguin.com/ko/guides/필리핀-여행-추천-섬` |

## Day 5 — Korean, remaining ten

| # | URL |
|---|---|
| 41 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-신혼여행` |
| 42 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-아이와-여행` |
| 43 | `https://www.txaletadecamiguin.com/ko/guides/만티게-섬-대왕조개` |
| 44 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-침몰-묘지` |
| 45 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-온천-냉천` |
| 46 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-폭포` |
| 47 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-먹거리` |
| 48 | `https://www.txaletadecamiguin.com/ko/guides/히복히복-등반` |
| 49 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-시아르가오-비교` |
| 50 | `https://www.txaletadecamiguin.com/ko/guides/카미긴-탐조-가이드` |

---

## Day 6 — Japanese, top ten

| # | URL |
|---|---|
| 51 | `https://www.txaletadecamiguin.com/ja/guides/カミギン島-観光スポット` |
| 52 | `https://www.txaletadecamiguin.com/ja/guides/カミギン島-ホテル-宿泊エリア` |
| 53 | `https://www.txaletadecamiguin.com/ja/guides/カミギン島-3日間-モデルコース` |
| 54 | `https://www.txaletadecamiguin.com/ja/guides/セブからカミギン島への行き方` |
| 55 | `https://www.txaletadecamiguin.com/ja/guides/ホワイトアイランド-カミギン島` |
| 56 | `https://www.txaletadecamiguin.com/ja/guides/カミギン島-ベストシーズン` |
| 57 | `https://www.txaletadecamiguin.com/ja/guides/ランソネス祭-カミギン島` |
| 58 | `https://www.txaletadecamiguin.com/ja/guides/カミギン島-旅行費用` |
| 59 | `https://www.txaletadecamiguin.com/ja/guides/カミギン島とシキホール島の比較` |
| 60 | `https://www.txaletadecamiguin.com/ja/guides/フィリピンでおすすめの島` |

## Day 7 — Japanese, remaining ten

| # | URL |
|---|---|
| 61 | `https://www.txaletadecamiguin.com/ja/guides/カミギン島-新婚旅行` |
| 62 | `https://www.txaletadecamiguin.com/ja/guides/カミギン島-子連れ旅行` |
| 63 | `https://www.txaletadecamiguin.com/ja/guides/マンティグ島-シャコガイ保護区` |
| 64 | `https://www.txaletadecamiguin.com/ja/guides/沈没墓地-カミギン島` |
| 65 | `https://www.txaletadecamiguin.com/ja/guides/カミギン島の温泉と冷泉` |
| 66 | `https://www.txaletadecamiguin.com/ja/guides/カミギン島の滝-カティバワサンとトゥアサン` |
| 67 | `https://www.txaletadecamiguin.com/ja/guides/カミギン島の食べ物` |
| 68 | `https://www.txaletadecamiguin.com/ja/guides/ヒボクヒボク山-登山ガイド` |
| 69 | `https://www.txaletadecamiguin.com/ja/guides/カミギン島とシアルガオ島の比較` |
| 70 | `https://www.txaletadecamiguin.com/ja/guides/カミギン島-バードウォッチング` |

---

## What the status messages mean

| What Search Console says | What it means | What to do |
|---|---|---|
| **URL is not on Google** | Not indexed yet. Normal for a new page. | Click Request Indexing. |
| **URL is on Google** | Indexed. | Nothing. Skip it, save the quota. |
| **Crawled — currently not indexed** | Google looked and chose not to index. | Don't re-request repeatedly. It's a quality/priority signal, not a bug. Give it weeks. |
| **Discovered — currently not indexed** | Google knows about it but hasn't crawled. | Usually resolves on its own. Requesting can help once. |
| **Page with redirect** | You submitted the wrong URL. | Check you didn't include `/en/`. |
| **Alternate page with proper canonical tag** | Google picked a different URL as canonical. | Expected on some hreflang pages. Not an error. |

**Requesting the same URL twice does nothing.** The quota resets daily but re-submitting a
URL already in the queue doesn't move it up. One request per URL, then wait.

---

## Realistic expectations

- **Days, not hours.** Requested URLs typically get crawled within a few days to two weeks.
- **Indexed ≠ ranking.** A page can be indexed and still get zero traffic for months. That's
  normal for a new site in a competitive niche.
- **Not everything will get indexed.** Google indexes selectively. If 45 of 70 are in after a
  month, that's a healthy result, not a failure.
- **The sitemap keeps working.** After these seven days, stop clicking. Check back in Search
  Console → **Pages** in three or four weeks and read the coverage report instead.

## What to look at after four weeks

1. **Pages report** — how many indexed vs excluded, and the reasons given.
2. **Performance report**, filtered by country — this is the one that tells you whether the
   per-language URLs were worth it. If Korea and Japan show impressions, the strategy works
   and Chinese/French/German are worth writing. If they show nothing after two months of
   being indexed, we should stop and reconsider before writing 60 more translations.
3. **Any hreflang errors** under the international targeting reporting, if it surfaces.

That second point is the real reason to do this properly. Right now we have 60 pages and no
data. After this, we'll have data.
