"use client";

import { useEffect, useState } from "react";

type DailyMed = {
  med_id: string;
  med_name: string;
  med_product_id: string | null;
  brand_name: string | null;
  total_daily_amount: number | null;
  unit: string;
};

type DailyResponse = {
  date: string;
  meds: DailyMed[];
  error?: string;
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default function DailyLookupPanel() {
  const [date, setDate] = useState(todayIso());
  const [data, setData] = useState<DailyResponse | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    let active = true;
    async function load() {
      setStatus("loading");
      try {
        const res = await fetch(`/api/daily?date=${date}`);
        const json = (await res.json()) as DailyResponse;
        if (!res.ok) throw new Error(json.error ?? "Failed");
        if (active) {
          setData(json);
          setStatus("idle");
        }
      } catch {
        if (active) setStatus("error");
      }
    }
    if (date) load();
    return () => {
      active = false;
    };
  }, [date]);

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white/70 p-6 backdrop-blur">
      <p className="text-sm font-semibold text-[var(--ink)]">Daily Lookup</p>
      <p className="mt-3 text-sm text-[var(--muted)]">
        Pick any date to see the exact meds and total daily amounts.
      </p>
      <div className="mt-5 flex flex-col gap-3">
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--muted)]"
        />
        {status === "loading" && (
          <p className="text-xs text-[var(--muted)]">Loading...</p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-600">Failed to load daily meds.</p>
        )}
        {data && (
          <div className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-xs text-[var(--muted)]">
            <div className="text-[var(--ink)]">
              {data.meds.length} active meds
            </div>
            <div className="mt-2 space-y-1">
              {data.meds.slice(0, 6).map((med) => (
                <div key={med.med_id} className="flex items-center justify-between">
                  <span>
                    {med.med_name}
                    {med.brand_name ? ` · ${med.brand_name}` : ""}
                  </span>
                  <span>
                    {med.total_daily_amount ?? "inactive"} {med.unit}
                  </span>
                </div>
              ))}
            </div>
            {data.meds.length > 6 && (
              <div className="mt-2 text-[var(--muted)]">
                +{data.meds.length - 6} more
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
