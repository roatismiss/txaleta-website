"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Copy, Check, Sparkles } from "lucide-react";
import { fetchFeaturedPromo, type FeaturedPromo } from "@/lib/booking-api";

// Dismissible marketing pop-up for the resort's FEATURED promo. Self-gating: it
// fetches /api/widget/promos and renders nothing unless a featured code exists
// and hasn't been dismissed for that code in this browser. "Copy code" stashes
// the code so the booking flow can pre-fill + auto-apply it.

const DISMISS_PREFIX = "txaleta:promo-dismissed:";
const CODE_KEY = "txaleta:promo-code";

export function PromoPopup() {
  const [promo, setPromo] = useState<FeaturedPromo | null>(null);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    (async () => {
      try {
        const p = await fetchFeaturedPromo();
        if (!alive || !p) return;
        let dismissed = false;
        try {
          dismissed = localStorage.getItem(DISMISS_PREFIX + p.code) === "1";
        } catch {
          /* ignore */
        }
        if (dismissed) return;
        setPromo(p);
        // Small delay so it doesn't fight the splash / first paint.
        timer = setTimeout(() => {
          if (alive) setOpen(true);
        }, 1400);
      } catch {
        /* no pop-up on error */
      }
    })();
    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
    };
  }, []);

  function dismiss() {
    setOpen(false);
    if (promo) {
      try {
        localStorage.setItem(DISMISS_PREFIX + promo.code, "1");
      } catch {
        /* ignore */
      }
    }
  }

  async function copy() {
    if (!promo) return;
    try {
      await navigator.clipboard.writeText(promo.code);
    } catch {
      /* ignore */
    }
    try {
      localStorage.setItem(CODE_KEY, promo.code);
    } catch {
      /* ignore */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  if (!promo) return null;

  const offer =
    promo.discountType === "percentage"
      ? `${promo.discountValue}% off your stay`
      : promo.description || "Use this code at checkout";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${promo.title} — promotion`}
            className="fixed left-1/2 top-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-ink/10 bg-cream shadow-2xl"
          >
            <button
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-8 py-10 text-center">
              <span className="label inline-flex items-center gap-1.5 text-[10px] text-brand">
                <Sparkles className="h-3.5 w-3.5" /> Exclusive offer
              </span>
              <h2 className="font-display mt-3 text-3xl font-light leading-tight text-ink">{promo.title}</h2>
              <p className="mt-2 text-[14px] leading-relaxed text-ink/65">{offer}</p>

              <div className="mt-6 flex items-center justify-center">
                <button
                  type="button"
                  onClick={copy}
                  className="group inline-flex items-center gap-3 border border-dashed border-ink/30 bg-white px-5 py-3 transition-colors hover:border-ink"
                  aria-label={`Copy code ${promo.code}`}
                >
                  <span className="font-mono text-lg tracking-[0.2em] text-ink">{promo.code}</span>
                  <span className="text-ink/40 transition-colors group-hover:text-ink">
                    {copied ? <Check className="h-4 w-4 text-brand" /> : <Copy className="h-4 w-4" />}
                  </span>
                </button>
              </div>
              <p className="mt-2 text-[11px] text-ink/40">{copied ? "Copied to clipboard" : "Tap the code to copy"}</p>

              <Link
                href={`/book?promo=${encodeURIComponent(promo.code)}`}
                onClick={dismiss}
                className="label mt-7 inline-block bg-ink px-10 py-4 text-[11px] text-white transition-colors hover:bg-sand"
              >
                Book now
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
