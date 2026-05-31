"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Search, Menu, X, Phone, ChevronDown } from "lucide-react";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./icons";
import { MegaPanel } from "./mega-menu";
import { Logo } from "./logo";
import { nav, site, type NavItem } from "@/lib/site";
import { useMenu } from "@/contexts/menu-context";

const leftNav = nav.slice(0, 3);
const rightNav = nav.slice(3);

function Social({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <a href={site.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity hover:opacity-100 hover:text-brand">
        <FacebookIcon className="h-4 w-4" />
      </a>
      <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity hover:opacity-100 hover:text-brand">
        <InstagramIcon className="h-4 w-4" />
      </a>
      <a href={site.social.tiktok} aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="opacity-70 transition-opacity hover:opacity-100 hover:text-brand">
        <TikTokIcon className="h-4 w-4" />
      </a>
    </div>
  );
}

// Mobile drawer animation — panel slides in from the right, items stagger.
const panelVariants: Variants = {
  hidden: { x: "100%" },
  show: {
    x: 0,
    transition: { type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.55, when: "beforeChildren", staggerChildren: 0.07, delayChildren: 0.15 },
  },
  exit: { x: "100%", transition: { duration: 0.4, ease: [0.4, 0, 1, 1] } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

// One desktop top-level link. Items with a mega open it on hover; plain items
// close any open mega when hovered.
function DesktopNavItem({
  item,
  active,
  onHover,
  onLeaveToNavigate,
}: {
  item: NavItem;
  active: boolean;
  onHover: (key: string | null) => void;
  onLeaveToNavigate: () => void;
}) {
  const hasMega = !!item.mega;
  return (
    <Link
      href={item.href}
      onMouseEnter={() => onHover(hasMega ? item.label : null)}
      // Open the panel when a mega trigger is focused; plain triggers leave any
      // open panel alone so keyboard users can keep tabbing into it.
      onFocus={() => { if (hasMega) onHover(item.label); }}
      onClick={onLeaveToNavigate}
      aria-haspopup={hasMega ? "menu" : undefined}
      aria-expanded={hasMega ? active : undefined}
      className={`label flex items-center gap-1.5 rounded-sm text-[13px] font-medium tracking-[0.12em] transition-colors hover:text-brand focus-visible:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand ${active ? "text-brand" : ""}`}
    >
      {item.label}
      {hasMega && (
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-300 ${active ? "rotate-180" : ""}`}
          strokeWidth={1.75}
        />
      )}
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { setIsMenuOpen } = useMenu();

  const megaOpen = activeMega !== null;

  // Sync local state with context
  useEffect(() => {
    setIsMenuOpen(open);
  }, [open, setIsMenuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      // Scrolling dismisses an open mega (cleaner than locking body scroll).
      setActiveMega(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape closes the desktop mega; clean up any pending close timer on unmount.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveMega(null); };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const openMega = (key: string | null) => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
    setActiveMega(key);
  };
  // Small grace period so the pointer can travel from a link into the panel.
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMega(null), 140);
  };

  const activeItem = activeMega ? nav.find((n) => n.label === activeMega && n.mega) : undefined;

  // Logo + paddings track scroll ONLY — not megaOpen — so opening a mega never
  // collapses the header (which would fight the panel's drop-in animation).
  // `barLogoH` is the height the logo *reserves* in the nav row; the desktop logo
  // (the trimmed "mark" variant, so CSS height ≈ visible height) is taller than
  // that and is bottom-anchored, overflowing *upward* into the empty center of the
  // utility row — never below the bar. 115 keeps its top within the header
  // (utility 44 + nav 90 = 134) bottom-anchored.
  const logoH = scrolled ? 50 : 115;
  const barLogoH = scrolled ? 60 : 90;
  // Mobile: the bar reserves `barMobileLogoH`; unscrolled the visible logo is 2×
  // that and overflows downward, so the mobile navbar height stays unchanged.
  const mobileLogoH = scrolled ? 44 : 128;
  const barMobileLogoH = scrolled ? 44 : 60;

  return (
    <>
      <header
        onMouseLeave={scheduleClose}
        // Close the mega once focus leaves the header entirely (keyboard).
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setActiveMega(null);
        }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
          scrolled
            ? "bg-white/95 text-ink backdrop-blur-md shadow-[0_8px_30px_rgba(12,28,34,0.10)]"
            : "bg-transparent text-white lg:bg-white/75 lg:text-ink lg:backdrop-blur-md lg:shadow-[0_2px_20px_rgba(12,28,34,0.05)]"
        } ${megaOpen ? "lg:!bg-white lg:!text-ink lg:!shadow-[0_8px_30px_rgba(12,28,34,0.10)]" : ""}`}
      >
        {/* Mobile: top scrim so the white logo + menu stay legible over the hero —
            reaches behind the full unscrolled logo (≈128px + 16 top) and is strong
            enough to read even where the hero is a bright/hazy sky (before scroll only). */}
        {!scrolled && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-44 bg-gradient-to-b from-black/50 via-black/25 to-transparent lg:hidden" />
        )}
        {/* ── Utility row (top state only) ───────────────────────────────── */}
        <motion.div
          initial={false}
          animate={{ height: scrolled ? 0 : 44, opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="hidden overflow-hidden border-b border-ink/10 lg:block"
        >
          <div className="flex h-11 items-center justify-between px-14">
            <div className="hidden items-center gap-5 md:flex">
              <Social />
              <span className="label text-[10px] text-ink/60">Stay Connected</span>
            </div>
            <a href={`tel:${site.contact.phoneRaw}`} className="label flex items-center gap-2 text-[10px] md:hidden">
              <Phone className="h-3.5 w-3.5" strokeWidth={1.5} /> {site.contact.phone}
            </a>
            <div className="flex items-center gap-5">
              <Link href="/#contact" className="hidden label text-[10px] text-ink/60 transition-colors hover:text-brand sm:inline">Contact</Link>
              <Link href="/book" className="hidden bg-brand px-5 py-2 label text-[10px] text-white transition-colors hover:bg-brand-dark sm:inline-block">
                Book Now
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── Mobile bar: logo left · hamburger right, aligned on one line ── */}
        <div
          className="relative z-10 flex items-start justify-between px-5 transition-[padding] duration-500 lg:hidden"
          style={{ paddingTop: scrolled ? 7 : 16, paddingBottom: scrolled ? 7 : 12 }}
        >
          {/* Logo reserves only `barMobileLogoH` of bar height; the 2× logo
              overflows downward so the mobile navbar stays the same height. */}
          <div className="relative" style={{ height: barMobileLogoH }}>
            <Logo
              height={mobileLogoH}
              className={`absolute left-0 top-0 transition-[height] duration-500 ${
                scrolled
                  ? "[filter:drop-shadow(0_2px_6px_rgba(0,0,0,0.12))]"
                  : "[filter:brightness(0)_invert(1)_drop-shadow(0_2px_10px_rgba(0,0,0,0.9))_drop-shadow(0_0_3px_rgba(0,0,0,0.8))]"
              }`}
            />
          </div>
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="flex items-center gap-2 pt-1 transition-colors hover:text-brand">
            <span className="label text-[11px]">Menu</span>
            <Menu className="h-7 w-7" strokeWidth={1.5} />
          </button>
        </div>

        {/* ── Desktop nav row — edge-to-edge flex, logo centered by equal-flex sides ── */}
        <div
          className="relative z-10 hidden items-center px-8 transition-[padding] duration-500 lg:flex"
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          {/* Left nav — flex-1 fills half the remaining space, items pushed to the
              left edge so the center stays clear for the logo */}
          <nav className="flex w-0 flex-1 items-center justify-start gap-12">
            {leftNav.map((n) => (
              <DesktopNavItem
                key={n.href}
                item={n}
                active={activeMega === n.label}
                onHover={openMega}
                onLeaveToNavigate={() => setActiveMega(null)}
              />
            ))}
          </nav>

          {/* Logo — centered by equal flex sides. The container only reserves
              `barLogoH` of bar height; the trimmed "mark" logo is taller and
              bottom-anchored so it overflows *upward* into the utility row, never
              below the bar. bottom-[8px] lifts it slightly off the nav-row seam. */}
          <div className="relative flex-shrink-0 px-8" style={{ height: barLogoH }}>
            <Logo
              variant="mark"
              height={logoH}
              className="absolute bottom-[8px] left-1/2 -translate-x-1/2 transition-[height] duration-500 [filter:drop-shadow(0_3px_8px_rgba(0,0,0,0.18))]"
            />
          </div>

          {/* Right nav — flex-1 fills half the remaining space, items pushed to the
              right edge so the center stays clear for the logo */}
          <nav className="flex w-0 flex-1 items-center justify-end gap-12">
            {rightNav.map((n) => (
              <DesktopNavItem
                key={n.href}
                item={n}
                active={activeMega === n.label}
                onHover={openMega}
                onLeaveToNavigate={() => setActiveMega(null)}
              />
            ))}
            <button aria-label="Search" className="opacity-70 transition-opacity hover:opacity-100">
              <Search className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </nav>
        </div>

        {/* ── Desktop mega menu ── */}
        <AnimatePresence mode="wait">
          {activeItem?.mega && (
            <MegaPanel
              key={activeItem.label}
              menu={activeItem.mega}
              onNavigate={() => setActiveMega(null)}
              onMouseEnter={() => openMega(activeItem.label)}
            />
          )}
        </AnimatePresence>
      </header>

      {/* Dim the page behind an open mega — moving onto it (or clicking) closes the menu */}
      <AnimatePresence>
        {megaOpen && (
          <motion.button
            aria-hidden
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onMouseEnter={scheduleClose}
            onClick={() => setActiveMega(null)}
            className="fixed inset-0 z-20 hidden cursor-default bg-ink/30 backdrop-blur-[1px] lg:block"
          />
        )}
      </AnimatePresence>

      {/* Vertical BOOK NOW tab (desktop) — red */}
      <Link
        href="/book"
        className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 bg-brand px-2.5 py-5 text-white shadow-lg transition-colors hover:bg-brand-dark lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        <span className="label text-[11px] rotate-180">Book Now</span>
      </Link>

      {/* ── Mobile drawer — slides in from the right, glassmorphism, staggered ── */}
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] lg:hidden" initial="hidden" animate="show" exit="exit">
            {/* Scrim */}
            <motion.button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 }, exit: { opacity: 0 } }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 h-full w-full bg-ink/30 backdrop-blur-[2px]"
            />

            {/* Glass panel (50% width) */}
            <motion.aside
              variants={panelVariants}
              className="absolute right-0 top-0 flex h-full w-1/2 min-w-[16rem] flex-col border-l border-white/40 bg-white/65 shadow-[-20px_0_60px_rgba(12,28,34,0.18)] backdrop-blur-2xl"
            >
              {/* Close — floats in the top-right corner */}
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="absolute right-5 top-6 z-10 text-ink/70 transition-colors hover:text-brand">
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>

              {/* Big logo — centered in the upper half, above the menu */}
              <div className="flex flex-1 items-center justify-center px-6 pt-10">
                <Logo height={140} />
              </div>

              <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
                {nav.map((n) => (
                  <motion.div key={n.href} variants={itemVariants} className="border-b border-ink/10">
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className="label block py-4 text-right text-[12px] text-ink transition-colors hover:text-brand"
                    >
                      {n.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants} className="pt-6">
                  <Link
                    href="/book"
                    onClick={() => setOpen(false)}
                    className="label block bg-brand py-3.5 text-center text-[11px] text-white transition-colors hover:bg-brand-dark"
                  >
                    Book Now
                  </Link>
                </motion.div>
              </nav>

              <motion.div variants={itemVariants} className="flex flex-col items-end gap-3 px-6 py-6">
                <Social />
                <a href={`tel:${site.contact.phoneRaw}`} className="text-[13px] text-ink/70">{site.contact.phone}</a>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
