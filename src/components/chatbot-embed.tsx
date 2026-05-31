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
    s.src = `${site.cloudreef.baseUrl}/widget/chatbot.js`;
    s.async = true;
    s.defer = true;
    s.setAttribute("data-resort-key", site.cloudreef.widgetKey);
    s.setAttribute("data-color", "#0b1c22");
    s.setAttribute("data-position", "right");
    document.body.appendChild(s);
  }, []);

  // Hide chatbot when menu is open
  useEffect(() => {
    const chatbotButton = document.querySelector('[data-cloudreef-chatbot]') as HTMLElement;
    const chatbotWidget = document.querySelector('[data-cloudreef-widget]') as HTMLElement;
    
    if (chatbotButton) {
      chatbotButton.style.display = isMenuOpen ? 'none' : '';
    }
    if (chatbotWidget) {
      chatbotWidget.style.display = isMenuOpen ? 'none' : '';
    }
  }, [isMenuOpen]);

  return null;
}
