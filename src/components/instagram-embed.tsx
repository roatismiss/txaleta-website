"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const SCRIPT_SRC = "https://www.instagram.com/embed.js";

/**
 * Renders an Instagram post (incl. carousels) as an official embed.
 * Loads embed.js once per page, then asks it to (re)process the blockquote.
 * The script swaps the blockquote for Instagram's own iframe.
 */
export function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
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
  }, [url]);

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
