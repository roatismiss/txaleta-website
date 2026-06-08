"use client";

import { useState, useRef, useEffect } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import "react-day-picker/style.css";

type Props = {
  checkin: string;
  checkout: string;
  onChangeCheckin: (d: string) => void;
  onChangeCheckout: (d: string) => void;
  minDate?: Date;
  /** Fully-booked days to grey out / block (live availability from CloudReef). */
  disabledDates?: Date[];
  /** Which way the calendar opens. "up" suits the hero bar; "down" the booking flow. */
  dropDirection?: "up" | "down";
};

export function DateRangePicker({ checkin, checkout, onChangeCheckin, onChangeCheckout, minDate, disabledDates, dropDirection = "up" }: Props) {
  const [open, setOpen] = useState(false);
  const [activeField, setActiveField] = useState<"checkin" | "checkout">("checkin");
  const containerRef = useRef<HTMLDivElement>(null);

  const range: DateRange = {
    from: checkin ? new Date(checkin + "T00:00:00") : undefined,
    to: checkout ? new Date(checkout + "T00:00:00") : undefined,
  };

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  function handleSelect(_range: DateRange | undefined, clicked: Date) {
    const day = format(clicked, "yyyy-MM-dd");
    const from = checkin ? new Date(checkin + "T00:00:00") : undefined;

    // First click — or a click on/before the current check-in — (re)starts the
    // range: set check-in, clear check-out, and keep the calendar open with the
    // focus moved to Departure so the very next click picks the check-out.
    if (activeField === "checkin" || !from || clicked <= from) {
      onChangeCheckin(day);
      onChangeCheckout("");
      setActiveField("checkout");
      return;
    }

    // Second click completes the stay and closes.
    onChangeCheckout(day);
    setOpen(false);
  }

  function openOn(field: "checkin" | "checkout") {
    setActiveField(field);
    setOpen(true);
  }

  const fmt = (d: string) => d ? format(new Date(d + "T00:00:00"), "MMM dd, yyyy") : "";

  return (
    <div ref={containerRef} className="contents">
      {/* ARRIVAL trigger */}
      <button
        type="button"
        onClick={() => openOn("checkin")}
        className="relative flex-1 border-b border-black/10 px-6 py-4 text-left transition-colors hover:bg-cream/30 sm:border-b-0 sm:border-r"
      >
        <span className="label block text-[9px] tracking-widest text-ink/45">Arrival</span>
        <span className={`mt-1.5 block text-sm ${checkin ? "text-ink" : "text-ink/35"}`}>
          {fmt(checkin) || "Select date"}
        </span>
        <CalendarDays className="absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" strokeWidth={1.5} />
      </button>

      {/* DEPARTURE trigger */}
      <button
        type="button"
        onClick={() => openOn("checkout")}
        className="relative flex-1 border-b border-black/10 px-6 py-4 text-left transition-colors hover:bg-cream/30 sm:border-b-0 sm:border-r"
      >
        <span className="label block text-[9px] tracking-widest text-ink/45">Departure</span>
        <span className={`mt-1.5 block text-sm ${checkout ? "text-ink" : "text-ink/35"}`}>
          {fmt(checkout) || "Select date"}
        </span>
        <CalendarDays className="absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" strokeWidth={1.5} />
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div
          className={`absolute left-0 z-[300] bg-white shadow-[0_32px_80px_rgba(12,28,34,0.25)] ${dropDirection === "down" ? "top-full mt-3" : "bottom-full mb-3"}`}
        >
          {/* Header */}
          <div className="flex border-b border-ink/8 px-4 pt-3 pb-2.5 gap-5 sm:px-5 sm:pt-4 sm:pb-3 sm:gap-8">
            <div className={`flex-1 border-b-2 pb-1 transition-colors ${activeField === "checkin" ? "border-ink" : "border-transparent"}`}>
              <p className="label text-[9px] tracking-widest text-ink/40">Arrival</p>
              <p className="mt-0.5 text-sm text-ink">{fmt(checkin) || "—"}</p>
            </div>
            <div className={`flex-1 border-b-2 pb-1 transition-colors ${activeField === "checkout" ? "border-ink" : "border-transparent"}`}>
              <p className="label text-[9px] tracking-widest text-ink/40">Departure</p>
              <p className="mt-0.5 text-sm text-ink">{fmt(checkout) || "—"}</p>
            </div>
          </div>

          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelect}
            defaultMonth={range.from ?? (minDate ?? new Date())}
            disabled={[{ before: minDate ?? new Date() }, ...(disabledDates ?? [])]}
            classNames={{
              root: "p-3 w-[280px] sm:p-5 sm:w-[320px]",
              months: "flex flex-col",
              month: "space-y-2",
              month_caption: "flex justify-center items-center relative h-7 mb-1 sm:h-8",
              caption_label: "font-display text-sm font-light tracking-wide text-ink sm:text-[15px]",
              nav: "absolute inset-x-0 top-0 flex items-center justify-between",
              button_previous: "flex h-7 w-7 items-center justify-center text-ink/40 transition-colors hover:text-ink sm:h-8 sm:w-8",
              button_next: "flex h-7 w-7 items-center justify-center text-ink/40 transition-colors hover:text-ink sm:h-8 sm:w-8",
              month_grid: "w-full",
              weekdays: "flex mb-1",
              weekday: "w-9 text-center text-[9px] font-medium uppercase tracking-[0.1em] text-ink/30 sm:w-[42px]",
              weeks: "",
              week: "flex",
              day: "p-0 text-ink",
              day_button: "h-9 w-9 text-[12px] font-light transition-colors hover:bg-cream focus:outline-none sm:h-[40px] sm:w-[40px] sm:text-[13px]",
              selected: "!bg-ink !text-white",
              range_start: "!bg-ink !text-white",
              range_end: "!bg-ink !text-white",
              range_middle: "!bg-ink/10 !text-ink",
              today: "font-semibold !text-brand",
              outside: "opacity-20",
              disabled: "opacity-20 cursor-not-allowed",
              hidden: "invisible",
            }}
          />

          <div className="flex items-center justify-between border-t border-ink/8 px-4 py-2.5 sm:px-5 sm:py-3">
            <button
              type="button"
              onClick={() => { onChangeCheckin(""); onChangeCheckout(""); }}
              className="label text-[10px] text-ink/40 underline-offset-2 hover:text-ink hover:underline transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="label text-[10px] bg-ink px-4 py-2 text-white transition-colors hover:bg-brand"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Single-date picker (used in booking form / flow) ─────────────────────────

type SingleProps = {
  label: string;
  value: string;
  onChange: (date: string) => void;
  minDate?: Date;
  placeholder?: string;
  disabledDates?: Date[];
  /** Latest selectable day (e.g. capped at the next booked night so a stay can't span it). */
  maxDate?: Date;
  /** Bump this number to open the calendar programmatically (e.g. arrival → departure). */
  openSignal?: number;
  /** Month the calendar opens to when nothing is selected yet. */
  defaultMonth?: Date;
};

export function DatePicker({ label, value, onChange, minDate, placeholder, disabledDates, maxDate, openSignal, defaultMonth }: SingleProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | undefined>(
    value ? new Date(value + "T00:00:00") : undefined
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelected(value ? new Date(value + "T00:00:00") : undefined);
  }, [value]);

  useEffect(() => {
    function onOut(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onOut);
    return () => document.removeEventListener("mousedown", onOut);
  }, [open]);

  // Open programmatically when the parent bumps openSignal (arrival → departure).
  useEffect(() => {
    if (openSignal) setOpen(true);
  }, [openSignal]);

  function handleSelect(date: Date | undefined) {
    setSelected(date);
    if (date) { onChange(format(date, "yyyy-MM-dd")); setOpen(false); }
  }

  const displayValue = selected ? format(selected, "MMM dd, yyyy") : "";

  return (
    <div ref={ref} className="relative">
      <span className="label block text-[9px] tracking-widest text-ink/45">{label}</span>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="mt-1.5 flex w-full items-center justify-between bg-transparent text-left outline-none"
      >
        <span className={`text-sm ${displayValue ? "text-ink" : "text-ink/35"}`}>
          {displayValue || placeholder || "Select date"}
        </span>
        <CalendarDays className="h-4 w-4 text-brand" strokeWidth={1.5} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-[200] mt-3 -translate-x-1/2 bg-white shadow-[0_32px_80px_rgba(12,28,34,0.22)]">
          <DayPicker
            mode="single"
            selected={selected}
            defaultMonth={selected ?? defaultMonth ?? minDate}
            onSelect={handleSelect}
            disabled={[
              { before: minDate ?? new Date() },
              ...(maxDate ? [{ after: maxDate }] : []),
              ...(disabledDates ?? []),
            ]}
            classNames={{
              root: "p-5 w-[300px]",
              months: "flex flex-col",
              month: "space-y-2",
              month_caption: "flex justify-center items-center relative h-8 mb-1",
              caption_label: "font-display text-[15px] font-light tracking-wide text-ink",
              nav: "absolute inset-x-0 top-0 flex items-center justify-between",
              button_previous: "flex h-8 w-8 items-center justify-center text-ink/40 hover:text-ink",
              button_next: "flex h-8 w-8 items-center justify-center text-ink/40 hover:text-ink",
              month_grid: "w-full",
              weekdays: "flex mb-1",
              weekday: "w-[40px] text-center text-[9px] font-medium uppercase tracking-[0.1em] text-ink/30",
              weeks: "",
              week: "flex",
              day: "p-0 text-ink",
              day_button: "h-[40px] w-[40px] text-[13px] font-light transition-colors hover:bg-cream focus:outline-none",
              selected: "!bg-ink !text-white",
              today: "font-semibold !text-brand",
              outside: "opacity-20",
              disabled: "opacity-20 cursor-not-allowed",
              hidden: "invisible",
            }}
          />
        </div>
      )}
    </div>
  );
}
