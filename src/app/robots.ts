import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// ============================================================================
// robots.txt
//
// `User-agent: *` already permits everything below, so why name the AI crawlers
// explicitly? Two reasons, both real:
//
//   1. Google-Extended is NOT covered by Googlebot. It is the separate opt-out
//      that governs whether Gemini and AI Overviews may use this site as a
//      grounding source. Staying visible in AI answers means allowing it by
//      name — silence is read as "no" by some tooling, and a future edit to the
//      wildcard rule would otherwise take it out without anyone noticing.
//   2. Naming them documents the decision. "Should the LLMs be allowed to read
//      the guides?" is a business question (we want the citations and the
//      referral traffic), and the answer belongs in the file, not in someone's
//      memory of a default.
//
// If the client ever wants to withdraw from AI training while staying in AI
// SEARCH results, the split is: block GPTBot / ClaudeBot / Google-Extended
// (training + grounding corpora) but keep OAI-SearchBot, PerplexityBot and
// Bingbot (live retrieval that cites and links back). Today we allow all of it —
// a small resort needs to be found far more than it needs to be withheld.
// ============================================================================

/** Crawlers that feed AI search and assistant answers. */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI — training corpus
  "OAI-SearchBot", // OpenAI — ChatGPT Search retrieval (cites + links back)
  "ChatGPT-User", // OpenAI — a user asked ChatGPT to open this page
  "ClaudeBot", // Anthropic — crawling
  "Claude-User", // Anthropic — a user asked Claude to open this page
  "Claude-SearchBot", // Anthropic — search retrieval
  "PerplexityBot", // Perplexity — indexing (cites + links back)
  "Perplexity-User", // Perplexity — user-initiated fetch
  "Google-Extended", // Google — Gemini / AI Overviews grounding (NOT Googlebot)
  "Applebot-Extended", // Apple — Apple Intelligence
  "Bingbot", // Microsoft — Bing + Copilot
  "Amazonbot",
  "Meta-ExternalAgent",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
