"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { saveConsent, useConsent } from "@/lib/consent";
import type { Locale } from "@/lib/i18n";
import { legal } from "@/locales/legal";
import { InstagramIcon } from "./icons";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const SCRIPT_SRC = "https://www.instagram.com/embed.js";

/**
 * Renders an Instagram post (incl. carousels) as an official embed — but only
 * once the visitor has allowed "external media". Loading embed.js hands Meta
 * the visitor's IP and lets it read/set its cookies, so until consent the
 * component shows a branded placeholder that can grant it in one click, plus a
 * plain link that opens the post on Instagram without loading anything here.
 */
export function InstagramEmbed({
  url,
  lang = "en",
  poster,
}: {
  url: string;
  lang?: Locale;
  /** Local photo shown behind the placeholder until the post is loaded. */
  poster?: string;
}) {
  const consent = useConsent();
  const allowed = consent?.media === true;

  useEffect(() => {
    if (!allowed) return;
    const process = () => window.instgrm?.Embeds?.process();
    if (window.instgrm) {
      process();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", process, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", process, { once: true });
    document.body.appendChild(script);
  }, [url, allowed]);

  if (!allowed) {
    const t = legal[lang].instagram;
    return (
      <div className="relative isolate flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-ink sm:aspect-[16/10]">
        {poster ? (
          <Image src={poster} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="-z-10 object-cover opacity-45" />
        ) : null}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/40" />

        <div className="flex max-w-sm flex-col items-center px-8 text-center text-white">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/35">
            <InstagramIcon className="h-5 w-5" />
          </span>
          <p className="label mt-5 text-[10px] text-mango">{t.kicker}</p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-white/85">{t.body}</p>
          <button
            type="button"
            onClick={() => saveConsent({ media: true })}
            className="label mt-6 inline-flex min-h-11 items-center bg-white px-6 py-3 text-[10.5px] tracking-[0.16em] text-ink transition-colors hover:bg-coconut focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {t.load}
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] text-white/75 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
          >
            {t.open}
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
          </a>
          <p className="mt-5 text-[11px] leading-snug text-white/50">{t.remember}</p>
        </div>
      </div>
    );
  }

  return (
    <blockquote
      className="instagram-media w-full"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{
        background: "#FFF",
        border: 0,
        borderRadius: 3,
        boxShadow: "0 1px 10px 0 rgba(0,0,0,0.10)",
        margin: 0,
        maxWidth: 540,
        minWidth: 0,
        padding: 0,
        width: "100%",
      }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        View this post on Instagram
      </a>
    </blockquote>
  );
}
