"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import {
  DEFAULT_CHOICES,
  onOpenCookieSettings,
  openCookieSettings,
  readConsent,
  saveConsent,
  useConsent,
} from "@/lib/consent";
import { localePath, type Locale } from "@/lib/i18n";
import { legal } from "@/locales/legal";
import { PaperGrain } from "./brand-texture";

// ============================================================================
// Cookie consent — first-visit banner + preferences dialog.
//
// • Nothing optional loads until the visitor decides (see lib/consent.ts).
// • "Essential only" and "Accept all" are the same size and weight: refusing
//   is exactly as easy as accepting (GDPR / CNIL; NPC Circular 2023-04).
// • The banner waits for the opening splash to leave, so it never animates in
//   unseen underneath it.
// • While it is on screen, `html.consent-open` hides the WhatsApp button
//   (which sits where the card sits) and, on phones, the concierge chat
//   button (which would cover the card's buttons). See globals.css.
// • The footer's "Cookie settings" and the /cookies page reopen the dialog
//   through `openCookieSettings()`.
// ============================================================================

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";
const buttonBase = `label inline-flex min-h-12 items-center justify-center px-4 py-3 text-center text-[10.5px] leading-snug tracking-[0.16em] text-white transition-colors ${focusRing}`;

export function CookieConsent({ lang }: { lang: Locale }) {
  const t = legal[lang];
  const consent = useConsent();
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const [splashGone, setSplashGone] = useState(false);
  const [prefsOpen, setPrefsOpen] = useState(false);
  const [media, setMedia] = useState(DEFAULT_CHOICES.media);

  // Wait for the splash overlay to leave (first visit of a session), then a
  // short beat so the page is seen before we ask anything of the visitor.
  useEffect(() => {
    const splashDone = () =>
      document.documentElement.dataset.splashSeen === "1" ||
      !document.getElementById("txaleta-splash");
    let timer: ReturnType<typeof setTimeout> | undefined;
    const settle = () => {
      timer = setTimeout(() => setSplashGone(true), 600);
    };
    if (splashDone()) {
      settle();
      return () => clearTimeout(timer);
    }
    const observer = new MutationObserver(() => {
      if (!splashDone()) return;
      observer.disconnect();
      settle();
    });
    observer.observe(document.body, { childList: true });
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Footer link / cookies page → open the dialog with the current choices.
  useEffect(
    () =>
      onOpenCookieSettings(() => {
        setMedia(readConsent()?.media ?? DEFAULT_CHOICES.media);
        setPrefsOpen(true);
      }),
    []
  );

  // Keep the native <dialog> in step with state (focus trap + Esc for free).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (prefsOpen && !dialog.open) dialog.showModal();
    if (!prefsOpen && dialog.open) dialog.close();
  }, [prefsOpen]);

  const bannerVisible = consent === null && splashGone && !prefsOpen;

  useEffect(() => {
    document.documentElement.classList.toggle("consent-open", bannerVisible);
    return () => document.documentElement.classList.remove("consent-open");
  }, [bannerVisible]);

  const decide = (choices: { media: boolean }) => {
    saveConsent(choices);
    setPrefsOpen(false);
  };

  const openPrefs = () => {
    setMedia(consent?.media ?? DEFAULT_CHOICES.media);
    setPrefsOpen(true);
  };

  const policyLinks = (
    <>
      <Link href={localePath(lang, "/cookies")} className={`underline decoration-ink/25 underline-offset-[3px] transition-colors hover:text-clay hover:decoration-clay ${focusRing}`}>
        {t.docs.cookies}
      </Link>
      <span aria-hidden className="mx-2 text-ink/25">·</span>
      <Link href={localePath(lang, "/privacy")} className={`underline decoration-ink/25 underline-offset-[3px] transition-colors hover:text-clay hover:decoration-clay ${focusRing}`}>
        {t.docs.privacy}
      </Link>
    </>
  );

  return (
    <>
      <AnimatePresence>
        {bannerVisible && (
          <motion.section
            key="cookie-banner"
            role="region"
            aria-labelledby={`${titleId}-banner`}
            initial={{ opacity: 0, y: reduce ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : 16 }}
            transition={{ duration: reduce ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 bottom-3 z-[70] sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[440px] print:hidden"
          >
            <div className="relative overflow-hidden rounded-[3px] border border-ink/10 bg-coconut text-ink shadow-[0_28px_70px_-18px_rgba(20,32,20,0.45),0_2px_8px_rgba(20,32,20,0.08)]">
              <PaperGrain className="opacity-[0.05]" />
              <div aria-hidden className="h-[3px] w-full bg-gradient-to-r from-clay via-mango to-sea" />

              <div className="relative px-6 pb-6 pt-6 sm:px-7 sm:pb-7">
                <p className="label flex items-center gap-3 text-[10px] text-clay">
                  <span aria-hidden className="h-px w-6 bg-clay/60" />
                  {t.banner.kicker}
                </p>
                <h2 id={`${titleId}-banner`} className="font-display mt-3 text-[1.55rem] leading-[1.15] text-ink">
                  {t.banner.title}
                </h2>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink/70">{t.banner.body}</p>
                <p className="mt-3 text-[12px] text-ink/60">{policyLinks}</p>

                <div className="mt-6 grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => decide({ media: false })}
                    className={`${buttonBase} bg-ink hover:bg-ink-soft`}
                  >
                    {t.banner.essentialOnly}
                  </button>
                  <button
                    type="button"
                    onClick={() => decide({ media: true })}
                    className={`${buttonBase} bg-clay hover:bg-brand-dark`}
                  >
                    {t.banner.acceptAll}
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={openPrefs}
                    className={`text-[12.5px] text-ink/65 underline decoration-ink/25 underline-offset-4 transition-colors hover:text-clay hover:decoration-clay ${focusRing}`}
                  >
                    {t.banner.customise}
                  </button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <dialog
        ref={dialogRef}
        aria-labelledby={`${titleId}-prefs`}
        onClose={() => setPrefsOpen(false)}
        onClick={(e) => {
          // A click on the backdrop lands on the <dialog> itself.
          if (e.target === e.currentTarget) setPrefsOpen(false);
        }}
        className="m-auto max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-[540px] overflow-y-auto rounded-[3px] bg-coconut p-0 text-ink shadow-[0_40px_100px_-20px_rgba(10,20,10,0.6)] backdrop:bg-[#16211a]/60 backdrop:backdrop-blur-[3px] print:hidden"
      >
        <div className="relative">
          <PaperGrain className="opacity-[0.05]" />
          <div aria-hidden className="h-[3px] w-full bg-gradient-to-r from-clay via-mango to-sea" />

          <div className="relative px-6 pb-7 pt-6 sm:px-9 sm:pb-9 sm:pt-8">
            <div className="flex items-start justify-between gap-6">
              <p className="label flex items-center gap-3 pt-1 text-[10px] text-clay">
                <span aria-hidden className="h-px w-6 bg-clay/60" />
                {t.banner.kicker}
              </p>
              <button
                type="button"
                onClick={() => setPrefsOpen(false)}
                aria-label={t.prefs.close}
                className={`-mr-2 -mt-1 rounded-full p-2 text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink ${focusRing}`}
              >
                <X className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </button>
            </div>

            <h2 id={`${titleId}-prefs`} className="font-display mt-2 text-[2rem] leading-tight text-ink">
              {t.prefs.title}
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink/70">{t.prefs.intro}</p>

            <ul className="mt-7 divide-y divide-ink/10 border-y border-ink/10">
              <li className="flex items-start gap-6 py-5">
                <div className="flex-1">
                  <p className="text-[15px] font-bold text-ink">{t.prefs.essentialTitle}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink/65">{t.prefs.essentialBody}</p>
                </div>
                <span className="label shrink-0 whitespace-nowrap pt-1 text-[9.5px] tracking-[0.16em] text-sea">
                  {t.prefs.alwaysOn}
                </span>
              </li>
              <li className="flex items-start gap-6 py-5">
                <div className="flex-1">
                  <p id={`${titleId}-media`} className="text-[15px] font-bold text-ink">
                    {t.prefs.mediaTitle}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink/65">{t.prefs.mediaBody}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={media}
                  aria-labelledby={`${titleId}-media`}
                  onClick={() => setMedia((m) => !m)}
                  className={`relative mt-0.5 inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 ${focusRing} ${
                    media ? "bg-clay" : "bg-ink/20"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`inline-block h-[22px] w-[22px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-transform duration-200 ${
                      media ? "translate-x-[23px]" : "translate-x-[3px]"
                    }`}
                  />
                </button>
              </li>
            </ul>

            <div className="mt-7 grid gap-2.5 sm:grid-cols-2">
              <button type="button" onClick={() => decide({ media })} className={`${buttonBase} bg-ink hover:bg-ink-soft`}>
                {t.prefs.save}
              </button>
              <button type="button" onClick={() => decide({ media: true })} className={`${buttonBase} bg-clay hover:bg-brand-dark`}>
                {t.banner.acceptAll}
              </button>
            </div>

            <p className="mt-6 text-center text-[12px] text-ink/60">{policyLinks}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}

/** "Cookie settings" trigger for the footer and the /cookies page. */
export function CookieSettingsButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      {label}
    </button>
  );
}
