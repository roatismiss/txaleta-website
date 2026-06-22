"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
  type Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import {
  menuMeta,
  menuPages,
  SERVICE_NOTE,
  type MenuItem,
  type MenuPage,
} from "@/lib/menu";
import { PaperGrain, PalmCorner, CalachuchiCorner, FabricBand } from "./brand-texture";

// Page 0 is the cover; pages 1..N map to menuPages[0..N-1].
const TOTAL = menuPages.length + 1;

const EASE = [0.22, 1, 0.36, 1] as const;

// Direction-aware 3D page turn. dir = +1 (forward) / −1 (back).
const flipVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, rotateY: dir > 0 ? 42 : -42, x: dir > 0 ? 90 : -90 }),
  center: { opacity: 1, rotateY: 0, x: 0 },
  exit: (dir: number) => ({ opacity: 0, rotateY: dir > 0 ? -42 : 42, x: dir > 0 ? -90 : 90 }),
};
const fadeVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

const SWIPE_THRESHOLD = 7000;
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;

/** A single dish row — name + dotted leader + price, with optional tag,
 *  variant list and italic description. */
function Dish({ item }: { item: MenuItem }) {
  return (
    <li className="py-2.5">
      <div className="flex items-baseline gap-1">
        <span className="font-medium text-ink">{item.name}</span>
        {item.tag && (
          <span className="ml-2 shrink-0 rounded-full bg-brand/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-brand">
            {item.tag}
          </span>
        )}
        <span
          aria-hidden
          className="mx-1 mb-[0.32em] min-w-5 flex-1 border-b border-dotted border-ink/25"
        />
        {item.priceNote ? (
          <span className="shrink-0 font-mono text-[13px] italic text-ink/55">{item.priceNote}</span>
        ) : item.wasPrice ? (
          <span className="shrink-0 whitespace-nowrap font-mono text-ink/90">
            <span className="mr-1.5 text-[13px] text-ink/40 line-through">₱{item.wasPrice}</span>
            ₱{item.price}
          </span>
        ) : (
          <span className="shrink-0 font-mono text-ink/90">₱{item.price}</span>
        )}
      </div>
      {item.variants && (
        <p className="mt-0.5 text-[12px] uppercase tracking-[0.1em] text-ink/45">
          {item.variants.join(" · ")}
        </p>
      )}
      {item.desc && (
        <p className="mt-1 max-w-prose text-[13px] italic leading-snug text-ink/60">{item.desc}</p>
      )}
    </li>
  );
}

/** The printed content of one menu page (cover handled separately). */
function PageFace({ page, n }: { page: MenuPage; n: number }) {
  return (
    <div className="flex h-full flex-col">
      <header className="text-center">
        <p className="label text-[10px] text-brand">{page.eyebrow}</p>
        <h2 className="font-display mt-2 text-3xl font-light leading-tight text-ink sm:text-4xl">
          {page.title}
        </h2>
        {page.note && (
          <p className="mx-auto mt-3 max-w-md text-[13px] italic leading-relaxed text-ink/55">
            {page.note}
          </p>
        )}
        <FabricBand className="mx-auto mt-5 max-w-[60%] opacity-50" />
      </header>

      <div className="mt-6 flex-1 space-y-7">
        {page.groups.map((group, gi) => (
          <section key={group.title ?? gi}>
            {group.title && (
              <h3 className="label mb-1 text-[11px] text-sand-dark">{group.title}</h3>
            )}
            {group.note && (
              <p className="mb-1 text-[12px] italic leading-snug text-ink/50">{group.note}</p>
            )}
            <ul className="divide-y divide-ink/5">
              {group.items.map((item) => (
                <Dish key={item.name} item={item} />
              ))}
            </ul>
          </section>
        ))}
      </div>

      <footer className="mt-8 flex items-end justify-between gap-4 border-t border-ink/10 pt-4">
        <p className="max-w-[78%] text-[11px] leading-relaxed text-ink/45">
          {page.footnote ?? SERVICE_NOTE}
        </p>
        <span className="font-mono text-[11px] tabular-nums text-ink/40">
          {String(n).padStart(2, "0")}
        </span>
      </footer>
    </div>
  );
}

/** The opening cover spread. */
function CoverFace({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex h-full flex-col items-center justify-center py-10 text-center">
      <p className="label text-[11px] text-brand">{menuMeta.eyebrow}</p>
      <h2 className="font-display mt-6 text-5xl font-light leading-none text-ink sm:text-7xl">
        {menuMeta.title}
      </h2>
      <p className="rule-line mt-7 text-[11px] uppercase tracking-[0.3em] text-ink/55">
        {menuMeta.subtitle}
      </p>
      <p className="mx-auto mt-8 max-w-sm text-[14px] leading-relaxed text-ink/60">
        {menuMeta.intro}
      </p>
      <button
        type="button"
        onClick={onOpen}
        className="label mt-10 inline-flex items-center gap-3 bg-brand px-8 py-3.5 text-[11px] text-white transition-colors hover:bg-brand-dark"
      >
        Open the Menu <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
      </button>
      <p className="mt-6 text-[11px] text-ink/40">Use the arrows, swipe, or tap a section to turn the page.</p>
    </div>
  );
}

export function MenuBook() {
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const stageRef = useRef<HTMLDivElement>(null);
  // Only let ← / → turn pages while the book is actually on screen.
  const inViewRef = useRef(true);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ── Page-flip sound (synthesised — ships no audio file) ──
  const audioRef = useRef<AudioContext | null>(null);
  const [sound, setSound] = useState(true);

  // Release the AudioContext when the book unmounts.
  useEffect(() => {
    const ctx = audioRef;
    return () => {
      ctx.current?.close().catch(() => {});
    };
  }, []);

  const toggleSound = useCallback(() => setSound((s) => !s), []);

  // A soft paper "whoosh": a short burst of decaying noise swept through a
  // band-pass filter. Web Audio API, so no asset to ship; it starts on the
  // first turn (a user gesture, so the autoplay policy is satisfied).
  const playFlip = useCallback(
    (direction: number) => {
      if (!sound) return;
      try {
        let ctx = audioRef.current;
        if (!ctx) {
          const AC =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
          if (!AC) return;
          ctx = new AC();
          audioRef.current = ctx;
        }
        if (ctx.state === "suspended") void ctx.resume();
        const now = ctx.currentTime;
        const dur = 0.22;
        const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = (Math.random() * 2 - 1) * (1 - i / data.length); // decaying noise
        }
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.Q.value = 0.8;
        // Slightly brighter forward, softer back — a subtle directional cue.
        filter.frequency.setValueAtTime(direction >= 0 ? 1900 : 1500, now);
        filter.frequency.exponentialRampToValueAtTime(direction >= 0 ? 620 : 520, now + dur);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
        src.connect(filter).connect(gain).connect(ctx.destination);
        src.start(now);
        src.stop(now + dur);
      } catch {
        /* audio is a nice-to-have — never let it break navigation */
      }
    },
    [sound],
  );

  const paginate = useCallback((target: number, direction: number) => {
    const clamped = Math.max(0, Math.min(TOTAL - 1, target));
    setState(([cur]) => (clamped === cur ? [cur, direction] : [clamped, direction]));
  }, []);

  const next = useCallback(() => {
    if (index >= TOTAL - 1) return;
    playFlip(1);
    paginate(index + 1, 1);
  }, [index, paginate, playFlip]);
  const prev = useCallback(() => {
    if (index <= 0) return;
    playFlip(-1);
    paginate(index - 1, -1);
  }, [index, paginate, playFlip]);
  // Jump to a content page (1-based into menuPages).
  const goTo = useCallback(
    (pageNo: number) => {
      if (pageNo === index) return;
      const d = pageNo > index ? 1 : -1;
      playFlip(d);
      paginate(pageNo, d);
    },
    [index, paginate, playFlip],
  );

  // Keyboard: ← / → turn pages (ignore while typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inViewRef.current) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const onDragEnd = (_e: unknown, info: PanInfo) => {
    const power = swipePower(info.offset.x, info.velocity.x);
    if (power < -SWIPE_THRESHOLD || info.offset.x < -120) next();
    else if (power > SWIPE_THRESHOLD || info.offset.x > 120) prev();
  };

  const isCover = index === 0;
  const page = isCover ? null : menuPages[index - 1];
  const variants = reduce ? fadeVariants : flipVariants;
  const liveLabel = isCover ? "Menu cover" : page ? `Page ${index} of ${TOTAL - 1}: ${page.title}` : "";

  return (
    <div className="mx-auto w-full max-w-3xl">
      {/* ── Chapter navigation — scrollable pills ── */}
      <nav
        aria-label="Menu sections"
        className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
      >
        {menuPages.map((p, i) => {
          const active = index === i + 1;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => goTo(i + 1)}
              aria-current={active ? "page" : undefined}
              className={`label shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-[10px] transition-colors ${
                active
                  ? "border-brand bg-brand text-white"
                  : "border-ink/15 text-ink/55 hover:border-brand/50 hover:text-brand"
              }`}
            >
              {p.tab}
            </button>
          );
        })}
      </nav>

      {/* Screen-reader announcement on each page turn. */}
      <span className="sr-only" role="status" aria-live="polite">
        {liveLabel}
      </span>

      {/* ── The book stage ── */}
      <div ref={stageRef} className="relative" style={{ perspective: 2000 }}>
        {/* Desktop side arrows */}
        <button
          type="button"
          onClick={prev}
          disabled={isCover}
          aria-label="Previous page"
          className="absolute -left-16 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-white/80 p-3 text-ink/60 shadow-sm backdrop-blur transition-all hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-0 lg:flex"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={index === TOTAL - 1}
          aria-label="Next page"
          className="absolute -right-16 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-white/80 p-3 text-ink/60 shadow-sm backdrop-blur transition-all hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-0 lg:flex"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
        </button>

        {/* Stacked-paper shadow layers behind the card (booklet feel) */}
        <div aria-hidden className="absolute inset-x-3 -bottom-2 top-2 -z-10 rounded-sm bg-ink/5" />
        <div aria-hidden className="absolute inset-x-1.5 -bottom-1 top-1 -z-10 rounded-sm bg-ink/10" />

        <AnimatePresence custom={dir} mode="wait" initial={false}>
          <motion.article
            key={index}
            custom={dir}
            role="group"
            aria-roledescription="Menu page"
            aria-label={liveLabel}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0.22 : 0.4, ease: EASE, opacity: { duration: 0.28 } }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            dragDirectionLock
            onDragEnd={reduce ? undefined : onDragEnd}
            style={{ transformStyle: "preserve-3d" }}
            className="relative min-h-[64vh] cursor-grab overflow-hidden rounded-sm border border-ink/10 bg-cream px-6 py-9 shadow-[0_24px_70px_-30px_rgba(28,25,23,0.55)] active:cursor-grabbing sm:min-h-[66vh] sm:px-12 sm:py-12"
          >
            {/* Paper texture + faint corner foliage on every page */}
            <PaperGrain className="opacity-[0.05]" />
            {isCover ? (
              <>
                <PalmCorner corner="tl" className="text-palm opacity-[0.10]" />
                <PalmCorner corner="br" className="text-palm opacity-[0.10]" />
              </>
            ) : index % 2 === 0 ? (
              <CalachuchiCorner corner="tr" seed={20 + index} className="text-brand opacity-[0.16]" />
            ) : (
              <PalmCorner corner="bl" className="text-palm opacity-[0.10]" />
            )}

            {/* Bound spine edge */}
            <div
              aria-hidden
              className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-ink/15 to-transparent"
            />

            <div className="relative z-10 h-full">
              {isCover ? <CoverFace onOpen={next} /> : page && <PageFace page={page} n={index} />}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* ── Bottom control bar (all sizes) ── */}
      <div className="relative mt-7 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={prev}
          disabled={isCover}
          aria-label="Previous page"
          className="flex items-center justify-center rounded-full border border-ink/15 p-2.5 text-ink/60 transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <span className="font-mono text-[12px] tabular-nums tracking-widest text-ink/50">
          {isCover ? "Cover" : `${String(index).padStart(2, "0")} / ${String(TOTAL - 1).padStart(2, "0")}`}
        </span>
        <button
          type="button"
          onClick={next}
          disabled={index === TOTAL - 1}
          aria-label="Next page"
          className="flex items-center justify-center rounded-full border border-ink/15 p-2.5 text-ink/60 transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
        </button>

        {/* Page-turn sound toggle — pinned right so the pager stays centered */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={sound ? "Mute page-turn sound" : "Unmute page-turn sound"}
          aria-pressed={sound}
          title={sound ? "Sound on" : "Sound off"}
          className="absolute right-0 flex items-center justify-center rounded-full border border-ink/15 p-2.5 text-ink/50 transition-colors hover:border-brand hover:text-brand"
        >
          {sound ? (
            <Volume2 className="h-4 w-4" strokeWidth={1.5} />
          ) : (
            <VolumeX className="h-4 w-4" strokeWidth={1.5} />
          )}
        </button>
      </div>
    </div>
  );
}
