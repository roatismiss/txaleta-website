// Tells IndexNow (Bing, which feeds ChatGPT search and Copilot; Naver; Seznam;
// Yandex; Yep) that pages are new or changed, so they are recrawled in minutes
// rather than whenever the crawler next comes round. Google does not take part:
// for Google, keep using Search Console.
//
// Run it AFTER a production deploy is live, never before. The search engines
// verify ownership by fetching the key file from the live site, and the URLs
// should already return the new content when they arrive.
//
//   npm run indexnow -- --since 2026-11-10       URLs whose sitemap lastmod is on/after the date
//   npm run indexnow -- guides/some-slug ...     specific paths or full URLs
//   npm run indexnow -- --all                    every URL in the sitemap (one-off, e.g. first run)
//   add --dry-run to any of them to print the list without submitting
//
// In Git Bash, write paths WITHOUT the leading slash (guides/x, not /guides/x):
// Git Bash rewrites /guides/x into C:/Program Files/Git/guides/x before Node
// ever sees it. PowerShell and full URLs are unaffected.
//
// Every URL is taken from, or checked against, the LIVE sitemap. A URL that is
// not in it has not been deployed yet, or has been removed, and is not sent.
// A guide's lastmod is its frontmatter `updated` (falling back to `date`), so
// `--since` picks up new articles and articles whose `updated` was bumped, and
// deliberately ignores small edits that did not bump it.

const HOST = "www.txaletadecamiguin.com";
const ORIGIN = `https://${HOST}`;
// Must match public/<KEY>.txt, whose only content is the key itself.
const KEY = "624df1cbb5c8d346d74fd34354fa18ca";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const RESPONSES = {
  200: "accepted",
  202: "accepted; the key is still being validated, which is normal on the first run",
  400: "bad request",
  403: "key not valid: the key file is missing or does not match",
  422: "some URLs do not belong to the host, or the key does not match the host",
  429: "too many requests: wait and retry later, and do not resubmit unchanged URLs",
};

class Stop extends Error {}
const fail = (msg) => {
  throw new Stop(msg);
};

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const all = args.includes("--all");
  const sinceIdx = args.indexOf("--since");
  const since = sinceIdx >= 0 ? args[sinceIdx + 1] : null;
  // Anything that is not a flag, and not the date that follows --since, is a path or URL.
  const explicit = args.filter((a, i) => !a.startsWith("--") && !(sinceIdx >= 0 && i === sinceIdx + 1));

  if (since !== null && !/^\d{4}-\d{2}-\d{2}$/.test(since ?? "")) {
    fail(`--since needs a date as YYYY-MM-DD, got "${since ?? ""}"`);
  }
  if (!all && !since && explicit.length === 0) {
    fail("nothing to submit. Pass paths/URLs, --since YYYY-MM-DD, or --all (see the header of this file).");
  }
  const mangled = explicit.find((a) => /^[A-Za-z]:[\\/]/.test(a));
  if (mangled) {
    fail(`"${mangled}" looks like a path Git Bash rewrote. Pass it without the leading slash (guides/x) or as a full URL.`);
  }

  // 1. The key file must be live, or every engine will reject the submission.
  const keyRes = await fetch(KEY_LOCATION);
  const keyBody = (await keyRes.text()).trim();
  if (!keyRes.ok || keyBody !== KEY) {
    const msg = `${KEY_LOCATION} is not serving the key (HTTP ${keyRes.status}). Deploy first, then run this.`;
    if (!dryRun) fail(msg);
    console.warn(`  warning: ${msg}`);
  }

  // 2. Read the live sitemap: it is the list of what is actually deployed.
  const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map(([, block]) => ({
      loc: block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim(),
      lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() ?? "",
    }))
    .filter((e) => e.loc);
  if (entries.length === 0) fail("the live sitemap has no <url> entries; refusing to guess.");
  const lastmodOf = new Map(entries.map((e) => [e.loc, e.lastmod]));

  // Compared decoded and without a trailing slash, so a Korean or Japanese slug
  // matches whether it was typed in its own script or copied percent-encoded.
  const norm = (u) => decodeURI(u).replace(/\/$/, "");
  const byNorm = new Map(entries.map((e) => [norm(e.loc), e.loc]));

  let urls;
  if (all) {
    urls = entries.map((e) => e.loc);
  } else if (since) {
    urls = entries.filter((e) => e.lastmod.slice(0, 10) >= since).map((e) => e.loc);
  } else {
    urls = [];
    for (const a of explicit) {
      const full = /^https?:\/\//.test(a) ? a : `${ORIGIN}/${a.replace(/^\/+/, "")}`;
      if (new URL(full).host !== HOST) fail(`${a} is not on ${HOST}`);
      const loc = byNorm.get(norm(full));
      if (loc) urls.push(loc);
      else console.warn(`  skipped (not in the live sitemap): ${full}`);
    }
  }

  urls = [...new Set(urls)];
  if (urls.length === 0) fail("no URLs matched. Nothing submitted.");

  console.log(`${urls.length} URL(s)${dryRun ? " (dry run, not submitted)" : ""}:`);
  for (const u of urls) console.log(`  ${(lastmodOf.get(u) ?? "").slice(0, 10).padEnd(10)}  ${decodeURI(u)}`);
  if (dryRun) return;

  // 3. One POST covers up to 10,000 URLs; this site is far below that.
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
  });
  const detail = (await res.text()).trim();
  console.log(`IndexNow: HTTP ${res.status}, ${RESPONSES[res.status] ?? "unexpected response"}${detail ? `: ${detail}` : ""}`);
  if (res.status !== 200 && res.status !== 202) process.exitCode = 1;
}

// Set the exit code rather than calling process.exit(): on Windows, exiting
// while fetch still holds a socket aborts Node with a libuv assertion.
main().catch((err) => {
  console.error(`indexnow: ${err instanceof Stop ? err.message : err.stack}`);
  process.exitCode = 1;
});
