"use client";

import { useEffect, useState } from "react";

/**
 * Entry splash: white-paper canvas on which the Txaleta mark is "drawn" by an
 * invisible calligraphy pen, then the TXALETA wordmark writes itself in. Shows
 * once per browser session (sessionStorage) — a full reload starts a new one.
 *
 * No-flash for returning visitors is handled by the pre-paint script in
 * layout.tsx, which sets `html[data-splash-seen]` so CSS hides the overlay
 * before this component's effect can unmount it.
 */
const SPLASH_KEY = "txaleta:splash-seen";
const HOLD_MS = 5800; // animation ends ~5.4s — hold a beat, then leave
const HOLD_MS_REDUCED = 1400; // reduced-motion: logo shows instantly, brief hold
const FADE_MS = 700; // must match the CSS opacity transition on .is-leaving

export function SplashScreen() {
  // "show" = on screen (matches SSR markup), "leaving" = fading, "gone" = unmounted
  const [stage, setStage] = useState<"show" | "leaving" | "gone">("show");

  useEffect(() => {
    // Already played this session → never show again until a new session/reload.
    if (sessionStorage.getItem(SPLASH_KEY)) {
      setStage("gone");
      return;
    }
    sessionStorage.setItem(SPLASH_KEY, "1");

    // Lock scroll while the splash owns the viewport.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hold = reduced ? HOLD_MS_REDUCED : HOLD_MS;

    const leave = setTimeout(() => setStage("leaving"), hold);
    const done = setTimeout(() => {
      setStage("gone");
      document.body.style.overflow = prevOverflow;
    }, hold + FADE_MS);

    return () => {
      clearTimeout(leave);
      clearTimeout(done);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const dismiss = () => {
    setStage("leaving");
    setTimeout(() => {
      setStage("gone");
      document.body.style.overflow = "";
    }, FADE_MS);
  };

  if (stage === "gone") return null;

  return (
    <div
      id="txaleta-splash"
      className={stage === "leaving" ? "is-leaving" : ""}
      role="presentation"
    >
      <div className="splash-lockup">
        {/* MARK: arch with a negative-space X ---------------------------- */}
        <svg
          className="splash-mark"
          viewBox="0 0 300 270"
          role="img"
          aria-label="Txaleta de Camiguin"
        >
          <defs>
            <radialGradient id="splashNib">
              <stop offset="0%" stopColor="#ff5b5b" />
              <stop offset="45%" stopColor="#c62828" />
              <stop offset="100%" stopColor="rgba(198,40,40,0)" />
            </radialGradient>
            <clipPath id="splashArchClip">
              <path d="M 60 240 L 60 125 Q 60 35 150 22 Q 240 35 240 125 L 240 240 Z" />
            </clipPath>
          </defs>

          {/* 1) black fill, revealed after the outline is drawn */}
          <path
            className="splash-arch-fill"
            d="M 60 240 L 60 125 Q 60 35 150 22 Q 240 35 240 125 L 240 240 Z"
          />

          {/* 2) white X (negative space), clipped to the arch */}
          <g clipPath="url(#splashArchClip)">
            <path className="splash-x a" pathLength="1" d="M 88 55 L 212 205" />
            <path className="splash-x b" pathLength="1" d="M 212 55 L 88 205" />
          </g>

          {/* 3) the drawn ink outline */}
          <path
            className="splash-arch-stroke"
            pathLength="1"
            d="M 60 240 L 60 125 Q 60 35 150 22 Q 240 35 240 125 L 240 240 Z"
          />

          {/* 4) pen nib glow following the arch */}
          <circle className="splash-nib" r="7" fill="url(#splashNib)">
            <animateMotion
              begin="0.3s"
              dur="1.6s"
              fill="freeze"
              rotate="auto"
              keyPoints="0;1"
              keyTimes="0;1"
              calcMode="linear"
              path="M 60 240 L 60 125 Q 60 35 150 22 Q 240 35 240 125 L 240 240 Z"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.08;0.92;1"
              begin="0.3s"
              dur="1.7s"
              fill="freeze"
            />
          </circle>
        </svg>

        {/* WORDMARK: T X A L E T A (X in red) --------------------------- */}
        <div className="splash-wordmark" aria-hidden="true">
          <span>T</span>
          <span className="x">X</span>
          <span>A</span>
          <span>L</span>
          <span>E</span>
          <span>T</span>
          <span>A</span>
        </div>

        {/* SUB-LINES --------------------------------------------------- */}
        <div className="splash-sub camiguin" aria-hidden="true">
          De Camiguin
        </div>
        <div className="splash-desde-row" aria-hidden="true">
          <span className="rule" />
          <span className="splash-sub desde">Desde 2023</span>
          <span className="rule" />
        </div>
      </div>

      <button type="button" className="splash-skip" onClick={dismiss}>
        Skip
      </button>
    </div>
  );
}
