# Manual indexing checklist — Google Search Console

Regenerated 13 August 2026. **42 URLs** (20 English guides + 20 Korean + both hub
pages), across four days at roughly 10 requests/day.

**How:** Search Console → **URL Inspection** → paste the URL → **Request Indexing**.

**Before you start:** verify the property (Domain property, DNS TXT) and submit
`sitemap.xml` once under *Sitemaps*. The sitemap regenerates automatically on every
deploy — there is nothing to update by hand, ever.

**Do not** re-request the same URL. It burns quota and changes nothing.

**Korean URLs:** if Search Console rejects them in native script, visit the page in a
browser and copy the URL from the address bar — it will already be percent-encoded.

---

## Day 1 — hub, deadline, money pages

- [ ] https://www.txaletadecamiguin.com/guides
- [ ] https://www.txaletadecamiguin.com/guides/camiguin-lanzones-festival
- [ ] https://www.txaletadecamiguin.com/guides/things-to-do-in-camiguin
- [ ] https://www.txaletadecamiguin.com/guides/where-to-stay-in-camiguin
- [ ] https://www.txaletadecamiguin.com/guides/best-time-to-visit-camiguin
- [ ] https://www.txaletadecamiguin.com/guides/camiguin-vs-siquijor
- [ ] https://www.txaletadecamiguin.com/guides/white-island-camiguin
- [ ] https://www.txaletadecamiguin.com/guides/camiguin-honeymoon
- [ ] https://www.txaletadecamiguin.com/guides/camiguin-itinerary
- [ ] https://www.txaletadecamiguin.com/guides/camiguin-travel-cost

## Day 2 — rest of the English cluster

- [ ] https://www.txaletadecamiguin.com/guides/camiguin-vs-siargao
- [ ] https://www.txaletadecamiguin.com/guides/camiguin-with-kids
- [ ] https://www.txaletadecamiguin.com/guides/mantigue-island-camiguin
- [ ] https://www.txaletadecamiguin.com/guides/camiguin-springs
- [ ] https://www.txaletadecamiguin.com/guides/camiguin-waterfalls
- [ ] https://www.txaletadecamiguin.com/guides/sunken-cemetery-camiguin
- [ ] https://www.txaletadecamiguin.com/guides/hibok-hibok-hike
- [ ] https://www.txaletadecamiguin.com/guides/what-to-eat-in-camiguin
- [ ] https://www.txaletadecamiguin.com/guides/how-to-get-to-camiguin-from-cebu
- [ ] https://www.txaletadecamiguin.com/guides/best-islands-in-the-philippines
- [ ] https://www.txaletadecamiguin.com/guides/birdwatching-camiguin-hibok-hibok

## Day 3 — Korean, part 1

- [ ] https://www.txaletadecamiguin.com/ko/guides
- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-란소네스-축제
- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-가볼만한-곳
- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-숙소-추천
- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-여행-시기
- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-시키호르-비교
- [ ] https://www.txaletadecamiguin.com/ko/guides/화이트-아일랜드-카미긴
- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-신혼여행
- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-여행-일정
- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-여행-경비

## Day 4 — Korean, part 2

- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-시아르가오-비교
- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-아이와-여행
- [ ] https://www.txaletadecamiguin.com/ko/guides/만티게-섬-대왕조개
- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-온천-냉천
- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-폭포
- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-침몰-묘지
- [ ] https://www.txaletadecamiguin.com/ko/guides/히복히복-등반
- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-먹거리
- [ ] https://www.txaletadecamiguin.com/ko/guides/세부에서-카미긴-가는법
- [ ] https://www.txaletadecamiguin.com/ko/guides/필리핀-여행-추천-섬
- [ ] https://www.txaletadecamiguin.com/ko/guides/카미긴-탐조-가이드

---

## What each Search Console status means

| Status | What it means | What to do |
|---|---|---|
| **Indexed** | Done | Nothing |
| **Crawled – currently not indexed** | Google read it and wasn't convinced it was worth keeping | Do **not** re-request. This is an authority problem — get backlinks |
| **Discovered – currently not indexed** | Google knows it exists but hasn't crawled it yet | Wait. It's queued |
| **Duplicate, Google chose different canonical** | Two of our pages look the same to Google | Tell the developer — that would mean a cannibalization we missed |
| **Alternate page with proper canonical tag** | Normal for hreflang pairs | Nothing. This is the system working |

Realistically: the hubs and 3–5 articles indexed within 1–2 weeks, the rest over 4–8
weeks, and some sitting in "Discovered" until the domain earns links.

## After indexing, the only lever left is backlinks

All five are legitimate, relevant and free — already partners featured on `/community`:

- [ ] **Scuba de Oro** — reciprocal mention; we send them divers
- [ ] **Natalia Sea Glass** — we feature her work, ask for a link back
- [ ] **Mt. Hibok-Hibok guides** — we send them climbers
- [ ] **Grei the Merchant** — his paintings hang in the resort
- [ ] **Camiguin provincial tourism office** — the guides are a genuine resource for the island

For a domain this young, those five links are worth more than the next five articles.

## Also worth ten minutes

- [ ] **Bing Webmaster Tools** — imports directly from Search Console, indexes faster than
      Google, and feeds ChatGPT Search.

**Avoid:** the Google Indexing API. It is officially supported only for `JobPosting` and
`BroadcastEvent`. Using it for ordinary articles is against Google's stated terms.
