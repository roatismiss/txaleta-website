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
};

export function DateRangePicker({ checkin, checkout, onChangeCheckin, onChangeCheckout, minDate }: Props) {
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

  function handleSelect(r: DateRange | undefined) {
    const from = r?.from;
    const to = r?.to;

    if (from) onChangeCheckin(format(from, "yyyy-MM-dd"));
    else onChangeCheckin("");

    if (to) {
      onChangeCheckout(format(to, "yyyy-MM-dd"));
      setOpen(false);
    } else {
      onChangeCheckout("");
    }
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
        <CalendarDays className="absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-sand" strokeWidth={1.5} />
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
        <CalendarDays className="absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-sand" strokeWidth={1.5} />
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div
          className="absolute bottom-full left-0 z-[300] mb-3 bg-white shadow-[0_32px_80px_rgba(12,28,34,0.25)]"
          style={{ minWidth: 320 }}
        >
          {/* Header */}
          <div className="flex border-b border-ink/8 px-5 pt-4 pb-3 gap-8">
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
            disabled={{ before: minDate ?? new Date() }}
            classNames={{
              root: "p-5 w-[320px]",
              months: "flex flex-col",
              month: "space-y-2",
              month_caption: "flex justify-center items-center relative h-8 mb-1",
              caption_label: "font-display text-[15px] font-light tracking-wide text-ink",
              nav: "absolute inset-x-0 top-0 flex items-center justify-between",
              button_previous: "flex h-8 w-8 items-center justify-center text-ink/40 transition-colors hover:text-ink",
              button_next: "flex h-8 w-8 items-center justify-center text-ink/40 transition-colors hover:text-ink",
              month_grid: "w-full",
              weekdays: "flex mb-1",
              weekday: "w-[42px] text-center text-[9px] font-medium uppercase tracking-[0.1em] text-ink/30",
              weeks: "",
              week: "flex",
              day: "p-0",
              day_button: "h-[40px] w-[40px] text-[13px] font-light text-ink transition-colors hover:bg-cream focus:outline-none",
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

          <div className="flex items-center justify-between border-t border-ink/8 px-5 py-3">
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
};

export function DatePicker({ label, value, onChange, minDate, placeholder, disabledDates }: SingleProps) {
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
        <CalendarDays className="h-4 w-4 text-sand" strokeWidth={1.5} />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-[200] mt-3 -translate-x-1/2 bg-white shadow-[0_32px_80px_rgba(12,28,34,0.22)]">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            disabled={[{ before: minDate ?? new Date() }, ...(disabledDates ?? [])]}
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
              day: "p-0",
              day_button: "h-[40px] w-[40px] text-[13px] font-light text-ink transition-colors hover:bg-cream focus:outline-none",
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
