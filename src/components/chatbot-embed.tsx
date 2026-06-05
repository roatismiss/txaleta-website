"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";
import { useMenu } from "@/contexts/menu-context";

/**
 * Injects the CloudReef chatbot + booking widget (floating button, bottom-right).
 * One script, resolved per-resort by the widget key.
 */
export function ChatbotEmbed() {
  const { isMenuOpen } = useMenu();

  useEffect(() => {
    if (document.getElementById("cloudreef-chatbot-script")) return;
    const s = document.createElement("script");
    s.id = "cloudreef-chatbot-script";
    // ?v=… cache-busts the 4h-cached chatbot.js so visitors pick up widget
    // updates (e.g. the Cloudbeds booking handoff) without waiting for the TTL.
    s.src = `${site.cloudreef.baseUrl}/widget/chatbot.js?v=20260605`;
    s.async = true;
    s.defer = true;
    s.setAttribute("data-resort-key", site.cloudreef.widgetKey);
    s.setAttribute("data-color", "#0b1c22");
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

  return null;
}
