"use client";

import { Printer } from "lucide-react";

/** "Print or save as PDF" — the legal pages carry print styles for this. */
export function PrintButton({ label, className = "" }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={className}>
      <Printer className="h-4 w-4" strokeWidth={1.5} aria-hidden />
      {label}
    </button>
  );
}
