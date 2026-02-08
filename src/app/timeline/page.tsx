"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type DailyMed = {
  med_id: string;
  med_name: string;
  total_daily_amount: number | null;
  unit: string;
  frequency_code: string | null;
  per_dose_amount: number | null;
};

type DailyResponse = {
  date: string;
  meds: DailyMed[];
  error?: string;
};

type Med = { id: string; name: string };

type DoseEvent = {
  id: string;
  med_id: string;
  effective_date: string;
  total_daily_amount: number | null;
  unit: string;
};

function isoToday() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeDate(value: string) {
  return value ? value.slice(0, 10) : value;
}

function parseDate(value: string) {
  const clean = normalizeDate(value);
  const [y, m, d] = clean.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatShort(value: string) {
  const d = parseDate(value);
  const yy = d.getFullYear().toString().slice(-2);
  return `${d.getMonth() + 1}/${d.getDate()}/${yy}`;
}

function formatMonth(value: string) {
  const d = parseDate(value);
  return `${d.getMonth() + 1}/${d.getFullYear().toString().slice(-2)}`;
}

function formatWeek(value: string) {
  const d = parseDate(value);
  const start = new Date(d);
  start.setDate(d.getDate() - d.getDay());
  return `Wk ${start.getMonth() + 1}/${start.getDate()}`;
}

function toDayIndex(date: Date) {
  return Math.floor(date.getTime() / 86400000);
}

function fromDayIndex(day: number) {
  return new Date(day * 86400000);
}

export default function TimelinePage() {
  const [date, setDate] = useState(isoToday());
  const [daily, setDaily] = useState<DailyResponse | null>(null);
  const [meds, setMeds] = useState<Med[]>([]);
  const [events, setEvents] = useState<DoseEvent[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [zoom, setZoom] = useState<"day" | "week" | "month">("day");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const [medRes, dailyRes, eventsRes] = await Promise.all([
          fetch("/api/meds"),
          fetch(`/api/daily?date=${date}`),
          fetch("/api/timeline/events"),
        ]);
        const medJson = (await medRes.json()) as { meds: Med[] };
        const dailyJson = (await dailyRes.json()) as DailyResponse;
        const eventsJson = (await eventsRes.json()) as { events: DoseEvent[] };
        if (active) {
          setMeds(medJson.meds ?? []);
          setDaily(dailyJson);
          setEvents(eventsJson.events ?? []);
          setStatus("ready");
        }
      } catch {
        if (active) setStatus("error");
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [date]);

  const timeline = useMemo(() => {
    if (!events.length) return null;
    const dates = events.map((e) => new Date(e.effective_date));
    const min = new Date(Math.min(...dates.map((d) => d.getTime())));
    const max = new Date(Math.max(...dates.map((d) => d.getTime())));
    const span = Math.max(1, max.getTime() - min.getTime());
    const width = Math.max(900, events.length * 70);
    const padding = 56;
    const points = events.map((event) => {
      const t = new Date(event.effective_date).getTime();
      const ratio = (t - min.getTime()) / span;
      const x = padding + ratio * (width - padding * 2);
      return { event, x };
    });
    const rawDates = Array.from(
      new Set(events.map((event) => normalizeDate(event.effective_date))),
    ).sort();
    const dateColumns = rawDates;
    return { min, max, width, padding, points, dateColumns };
  }, [events]);

  const groupedColumns = useMemo(() => {
    if (!timeline) return [];
    if (zoom === "day") return timeline.dateColumns.map((col) => ({ key: col, label: formatShort(col), dates: [col] }));

    if (zoom === "week") {
      const buckets = new Map<string, string[]>();
      for (const col of timeline.dateColumns) {
        const d = parseDate(col);
        const start = new Date(d);
        start.setDate(d.getDate() - d.getDay());
        const key = start.toISOString().slice(0, 10);
        if (!buckets.has(key)) buckets.set(key, []);
        buckets.get(key)!.push(col);
      }
      return Array.from(buckets.entries()).map(([key, dates]) => ({
        key,
        label: formatWeek(key),
        dates,
      }));
    }

    const monthBuckets = new Map<string, string[]>();
    for (const col of timeline.dateColumns) {
      const d = parseDate(col);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
      if (!monthBuckets.has(key)) monthBuckets.set(key, []);
      monthBuckets.get(key)!.push(col);
    }
    return Array.from(monthBuckets.entries()).map(([key, dates]) => ({
      key,
      label: formatMonth(key),
      dates,
    }));
  }, [timeline, zoom]);

  const eventsByMed = useMemo(() => {
    const map = new Map<string, DoseEvent[]>();
    for (const event of events) {
      const list = map.get(event.med_id) ?? [];
      list.push(event);
      map.set(event.med_id, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) =>
        normalizeDate(a.effective_date).localeCompare(normalizeDate(b.effective_date)),
      );
    }
    return map;
  }, [events]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff8e8,transparent_50%),radial-gradient(circle_at_20%_40%,#ffe1d4,transparent_45%),radial-gradient(circle_at_80%_20%,#d6efe6,transparent_45%)]">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12">
        <header className="flex flex-col gap-3">
          <Link href="/" className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-semibold text-[var(--ink)]">Timeline Explorer</h1>
          <p className="text-sm text-[var(--muted)]">
            Drag the slider or type a date to see active meds. Scroll to inspect all changes.
          </p>
        </header>

        <section className="rounded-3xl border border-[var(--line)] bg-white/80 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2 text-sm"
              />
              <div className="text-xs text-[var(--muted)]">Selected date</div>
            </div>
            <div className="w-full md:max-w-md">
              <input
                type="range"
                min={timeline ? toDayIndex(timeline.min) : toDayIndex(parseDate(date))}
                max={timeline ? toDayIndex(timeline.max) : toDayIndex(parseDate(date))}
                value={toDayIndex(parseDate(date))}
                onChange={(event) => {
                  const next = fromDayIndex(Number(event.target.value));
                  setDate(next.toISOString().slice(0, 10));
                }}
                className="w-full"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {(["day", "week", "month"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setZoom(level)}
                className={`rounded-full border px-3 py-1 ${
                  zoom === level
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-[var(--line)] text-[var(--muted)]"
                }`}
              >
                {level.toUpperCase()}
              </button>
            ))}
          </div>

          {status === "ready" && daily && (
            <div className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-4">
              <div className="text-xs font-semibold text-[var(--muted)]">
                Active meds on {daily.date}
              </div>
              <div className="mt-3 grid gap-2 text-sm">
                {daily.meds.map((med) => (
                  <div
                    key={med.med_id}
                    className="flex items-center justify-between border-b border-[var(--line)] pb-2"
                  >
                    <span className="font-semibold text-[var(--ink)]">{med.med_name}</span>
                    <span>
                      {med.total_daily_amount ?? "inactive"} {med.unit}
                    </span>
                    <span className="text-xs text-[var(--muted)]">
                      {med.frequency_code ?? "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {timeline && (
          <section className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6">
            <p className="text-xs font-semibold text-[var(--muted)]">
              Change Events Timeline (scroll left/right)
            </p>
            <div className="mt-3 overflow-x-auto pb-4">
              <svg width={timeline.width} height={120}>
                <line
                  x1={timeline.padding}
                  y1={60}
                  x2={timeline.width - timeline.padding}
                  y2={60}
                  stroke="#eadfcd"
                  strokeWidth={3}
                />
                {timeline.points.map(({ event, x }) => (
                  <g key={event.id}>
                    <circle
                      cx={x}
                      cy={60}
                      r={7}
                      fill="#0f6b5f"
                      title={`${event.effective_date} · ${event.total_daily_amount ?? "inactive"} ${event.unit}`}
                    />
                    <text
                      x={x}
                      y={30}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#5c574f"
                    >
                      {formatShort(event.effective_date)}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </section>
        )}

        <section className="rounded-3xl border border-[var(--line)] bg-white/90 p-6">
          <p className="text-xs font-semibold text-[var(--muted)]">
            Sheet View (scroll) · Zoom: {zoom.toUpperCase()}
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-[900px] border-collapse text-xs">
              <thead>
                <tr className="bg-[var(--background)] text-[var(--muted)]">
                  <th className="sticky left-0 top-0 z-20 bg-[var(--background)] px-3 py-2 text-left">
                    Med
                  </th>
                  {groupedColumns.map((col) => (
                    <th
                      key={col.key}
                      className="sticky top-0 bg-[var(--background)] px-3 py-2 text-left"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {meds.map((med) => (
                  <tr key={med.id} className="border-t border-[var(--line)]">
                    <td className="sticky left-0 z-10 bg-white px-3 py-2 font-semibold text-[var(--ink)]">
                      {med.name}
                    </td>
                    {groupedColumns.map((col) => {
                      const list = eventsByMed.get(med.id) ?? [];
                      const lastDate = normalizeDate(col.dates[col.dates.length - 1]);
                      const match = [...list]
                        .filter(
                          (event) =>
                            normalizeDate(event.effective_date) <= lastDate,
                        )
                        .pop();
                      const show =
                        match && match.total_daily_amount !== null
                          ? `${match.total_daily_amount} ${match.unit}`
                          : "";
                      return (
                        <td key={`${med.id}-${col.key}`} className="px-3 py-2">
                          {show}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
