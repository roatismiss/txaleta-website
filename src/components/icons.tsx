// Brand glyphs as inline SVG — lucide-react dropped its brand icons.

export function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M16.5 3c.3 2.1 1.6 3.6 3.5 3.8v2.4c-1.2.1-2.4-.2-3.5-.8v5.8c0 3.3-2.4 5.8-5.6 5.8-3 0-5.4-2.3-5.4-5.3 0-3.1 2.6-5.4 6-5.1v2.5c-.4-.1-.9-.2-1.3-.2-1.4 0-2.4 1-2.4 2.4 0 1.5 1.1 2.5 2.5 2.5 1.5 0 2.6-1.1 2.6-2.9V3h3.6z" />
    </svg>
  );
}
