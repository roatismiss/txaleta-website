"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { useMenu } from "@/contexts/menu-context";

/**
 * Injects the CloudReef chatbot + booking widget (floating button, bottom-right).
 * One script, resolved per-resort by the widget key.
 */
export function ChatbotEmbed() {
  const { isMenuOpen } = useMenu();
  const pathname = usePathname();

  useEffect(() => {
    if (document.getElementById("cloudreef-chatbot-script")) return;
    const s = document.createElement("script");
    s.id = "cloudreef-chatbot-script";
    // ?v=… cache-busts the 4h-cached chatbot.js so visitors pick up widget
    // updates (e.g. the Cloudbeds booking handoff) without waiting for the TTL.
    s.src = `${site.cloudreef.baseUrl}/widget/chatbot.js?v=20260609`;
    s.async = true;
    s.defer = true;
    s.setAttribute("data-resort-key", site.cloudreef.widgetKey);
    // Heritage palette (see globals.css @theme) so the whole widget — FAB *and*
    // the in-chat iframe UI — matches the site instead of CloudReef's sky blue.
    // data-color themes the FAB; data-accent/ambient/ink/surface are forwarded
    // into the iframe by chatbot.js and drive the chat theme.
    s.setAttribute("data-color", "#9c6b66");      // Heritage Clay — FAB + CTAs
    s.setAttribute("data-accent", "#9c6b66");     // Heritage Clay — bubbles, buttons
    s.setAttribute("data-ambient", "#6f8a6a");    // Palm/Sage green — glass + tints
    s.setAttribute("data-ink", "#2c3a2c");        // Palm Leaf Green (deep) — text
    s.setAttribute("data-surface", "#f4efe3");    // Coconut White — background base
    s.setAttribute("data-position", "right");
    document.body.appendChild(s);
  }, []);

  // Hide the floating chatbot while the mobile menu is open so it never overlaps
  // the drawer. We toggle a class on <html> and let a global CSS rule (see
  // globals.css) hide the widget with `!important` — robust against the widget
  // mounting late or re-setting its own inline `display`, unlike a querySelector
  // write that only acts on elements present the moment the effect runs.
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", isMenuOpen);
    return () => document.documentElement.classList.remove("menu-open");
  }, [isMenuOpen]);

  // Hide the floating chatbot on /book: there the Cloudbeds engine is embedded
  // in-page (be-plus), and the FAB (pinned bottom-right at z-index ~2147483646)
  // covers the engine's Confirm/Cancel buttons on mobile. Same class + global
  // CSS pattern as `menu-open` above so it survives the widget mounting late.
  useEffect(() => {
    const onBooking = pathname === "/book" || pathname.startsWith("/book/");
    document.documentElement.classList.toggle("booking-open", onBooking);
    return () => document.documentElement.classList.remove("booking-open");
  }, [pathname]);

  return null;
}
