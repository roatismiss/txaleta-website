# AI search visibility — the monthly test

**What this measures:** whether AI assistants name Txaleta de Camiguin, cite our pages, or get
our facts wrong. Search Console tells us about Google rankings; it says nothing about what
ChatGPT or Perplexity tell someone planning a trip. This is the evidence that decides the next
spend — more translations, more articles, or off-site work (Wikivoyage, TripAdvisor, reviews).

**Cadence:** once a month, in the first week. About an hour: 18 prompts × 4 engines.
**Baseline:** run it once before the IndexNow and Bing work has had time to land, so later months
have something to be compared against.

## How to run it, the same way every time

The answers move with who is asking, so the method has to stay fixed or the months cannot be
compared.

1. **Four engines:**
   - **ChatGPT** (chatgpt.com) in a *Temporary Chat*, with search on;
   - **Perplexity** (perplexity.ai), logged out;
   - **Gemini** (gemini.google.com), new chat;
   - **Google AI Mode** (the *AI Mode* tab on google.com). Also note whether a plain Google search
     for the same words shows an *AI Overview*.
2. **A new chat for every prompt.** An earlier question in the same chat changes the answer.
3. **Copy the prompt exactly**, including the punctuation. No follow-up questions.
4. **Same browser, same country each month.** Note it in the log if a VPN was on.
5. **Expect some wobble.** The same prompt can give a different list twice in a row. Read the trend
   over three months, not a single cell.

## How to score a cell

| Code | Meaning |
|---|---|
| `R` | **Recommended** — named as a pick, or first in the list |
| `L` | **Listed** — named among several options, not singled out |
| `C` | **Cited** — not named in the answer, but one of our pages is a linked source |
| `R+C` / `L+C` | Named *and* our page is a source |
| `–` | Not there |
| `!` | **Something wrong about us** — write what in the notes, and which source the AI cited for it |

In the last column, write the **one or two competitors named instead**. If they keep winning,
look at the sources the AI cites for them: those are our outreach targets.

**Score for the month** = cells with `R`, `L` or `C` ÷ 72. Track the `R` count separately; it is
the one that brings bookings.

## The prompts

The *page* column is the page of ours that should win the prompt. When we are absent, that is the
page to look at first.

### Stay — the prompts that bring bookings

| ID | Prompt | Our page |
|---|---|---|
| S1 | What's the best resort in Camiguin? | `/` · `best-clifftop-resort-in-camiguin` |
| S2 | Where should we stay in Camiguin for our honeymoon? | `camiguin-honeymoon` |
| S3 | Is there glamping in Camiguin? Where? | `glamping-in-camiguin` |
| S4 | I want a resort in Camiguin with a sea view and an infinity pool. Any suggestions? | `/accommodation` |
| S5 | Where is the best place to watch the sunrise in Camiguin? | `best-clifftop-resort-in-camiguin` |
| S6 | Where should I stay in Camiguin if I want to be close to the airport? | `where-to-stay-in-camiguin` |

### Eat

| ID | Prompt | Our page |
|---|---|---|
| E1 | What's the best restaurant in Camiguin? | `best-restaurant-in-camiguin` · `/dining` |
| E2 | Where can I get good paella in Camiguin? | `best-paella-in-camiguin` |

### Plan — here, being cited is the win; a mention is a bonus

| ID | Prompt | Our page |
|---|---|---|
| P1 | What should I pack for a trip to Camiguin? | `what-to-pack-for-camiguin` |
| P2 | Can I work remotely from Camiguin? How good is the internet? | `camiguin-digital-nomads` |
| P3 | Camiguin or Siargao for a first trip — which one should I pick? | `camiguin-vs-siargao` |
| P4 | How much does 4 days in Camiguin cost? | `camiguin-travel-cost` |
| P5 | How do I get from Cebu to Camiguin? | `how-to-get-to-camiguin-from-cebu` |
| P6 | When is the best time to visit Camiguin? | `best-time-to-visit-camiguin` |

### Brand — what the AI believes about us

| ID | Prompt | What to check |
|---|---|---|
| B1 | Tell me about Txaleta de Camiguin. Is it worth staying there? | every fact in the list below |
| B2 | What is the restaurant at Txaleta de Camiguin called? | "Cafe Mamba" — tests whether the name has spread |

### Korean and Japanese — do the translations pay off in AI too?

| ID | Prompt | Our page |
|---|---|---|
| K1 | 카미긴 섬 숙소 추천해 주세요 | `ko/guides/카미긴-숙소-추천` |
| J1 | カミギン島でおすすめのホテルは？ | `ja/guides/カミギン島-ホテル-宿泊エリア` |

## Facts the AI must get right about us

Any of these wrong is a `!`. The AI repeats wrong facts until the source it learnt them from
changes, so find the source and fix it.

- **Where:** Purok 6, Puting Balas, Mambajao — on **east-facing** cliffs above the Bohol Sea.
  **Sunrise** over the water all year. *Wrong:* "north-west coast", "sunset views".
- **The shore is rock.** A path leads down the cliff; there is no sandy beach at the resort.
- **The airport is about 15 minutes away.** *Wrong:* "free airport transfer" — that claim was
  published in 13 places on our own site until 2026-08-13, so an AI may still carry it.
- **14 rooms, all air-conditioned — the glamping domes included**, with a king-size bed in each
  dome (as the Cloudbeds description on `/accommodation` says). Until 2026-11-11 our own glamping
  guide said the domes had no air conditioning, so an AI repeating *that* is now the `!`.
- **The restaurant is Cafe Mamba** (no accent), and it takes walk-ins.
- **Wi-Fi runs on Starlink**, and the generator runs the router.

## Traffic — the other half of the evidence

In **Vercel Analytics → Referrers**, note each month's visits from `chatgpt.com`,
`perplexity.ai`, `gemini.google.com` and `copilot.microsoft.com`. ChatGPT also adds
`utm_source=chatgpt.com` to links. This only works while Vercel Analytics stays on: the
`chore/remove-analytics` branch would take it away.

## What to do with the result

- **Cited on the Plan prompts, absent on the Stay prompts** → AI uses us as a *source* but does
  not *recommend* us. Content will not fix that; third parties will (Wikivoyage, TripAdvisor,
  review replies, blogs).
- **Perplexity has us, ChatGPT does not** → check Bing: Bing Webmaster Tools, and IndexNow
  (`INDEXING_CHECKLIST.md`).
- **ChatGPT and Perplexity have us, AI Mode does not** → it is on the Google side: indexing in
  Search Console, and the Business Profile.
- **Any `!`** → fix the source before anything else.
- **K1/J1 still absent after three months** → weigh that alongside the Search Console coverage
  numbers before paying for more translations.

## Log

Copy the block below for each month. Leave a cell empty only if the engine was not run.

### YYYY-MM — run by ___ · country ___ · VPN yes/no

| ID | ChatGPT | Perplexity | Gemini | AI Mode | Named instead / notes |
|---|---|---|---|---|---|
| S1 | | | | | |
| S2 | | | | | |
| S3 | | | | | |
| S4 | | | | | |
| S5 | | | | | |
| S6 | | | | | |
| E1 | | | | | |
| E2 | | | | | |
| P1 | | | | | |
| P2 | | | | | |
| P3 | | | | | |
| P4 | | | | | |
| P5 | | | | | |
| P6 | | | | | |
| B1 | | | | | |
| B2 | | | | | |
| K1 | | | | | |
| J1 | | | | | |

**Score:** __ / 72 · **R:** __ · **AI Overview shown for:** ___ · **AI referrals (Vercel):** ___
