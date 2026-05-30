"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

/**
 * Injects the CloudReef chatbot + booking widget (floating button, bottom-right).
 * One script, resolved per-resort by the widget key.
 */
export function ChatbotEmbed() {
  useEffect(() => {
    if (document.getElementById("cloudreef-chatbot-script")) return;
    const s = document.createElement("script");
    s.id = "cloudreef-chatbot-script";
    s.src = `${site.cloudreef.baseUrl}/widget/chatbot.js`;
    s.async = true;
    s.defer = true;
    s.setAttribute("data-resort-key", site.cloudreef.widgetKey);
    s.setAttribute("data-color", "#b89a63");
    s.setAttribute("data-position", "right");
    document.body.appendChild(s);
  }, []);

  return null;
}
