"use client";

import { useEffect, useState } from "react";

type DailyMed = {
  med_id: string;
  med_name: string;
  med_product_id: string | null;
  brand_name: string | null;
  total_daily_amount: number | null;
  unit: string;
  per_dose_amount: number | null;
  frequency_code: string | null;
  notes: string | null;
};

type DailyResponse = {
  date: string;
  meds: DailyMed[];
  error?: string;
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export default function ActiveTodayPanel() {
  const [data, setData] = useState<DailyResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const date = todayIso();
        const res = await fetch(`/api/daily?date=${date}`);
        const json = (await res.json()) as DailyResponse;
        if (!res.ok) throw new Error(json.error ?? "Failed");
        if (active) {
          setData(json);
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
  }, []);

  return (
    <section className="rounded-[32px] border border-[var(--line)] bg-[var(--card)] p-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--ink)]">
            Active Meds Today
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Alphabetical list with total daily volume and any dosing details.
          </p>
        </div>
        {data?.date && (
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-xs font-semibold text-[var(--ink)]">
              {data.date}
            </div>
            <div className="text-xs text-[var(--muted)]">
              {data.meds.length} active
            </div>
          </div>
        )}
      </div>

      {status === "loading" && (
        <p className="mt-6 text-sm text-[var(--muted)]">Loading...</p>
      )}
      {status === "error" && (
        <p className="mt-6 text-sm text-red-600">Failed to load meds.</p>
      )}

      {status === "ready" && data && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--background)] text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3">Med</th>
                <th className="px-4 py-3">Total Daily</th>
                <th className="px-4 py-3">Per Dose</th>
                <th className="px-4 py-3">Frequency</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {data.meds.map((med) => (
                <tr key={med.med_id} className="border-t border-[var(--line)]">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[var(--ink)]">
                      {med.med_name}
                    </div>
                    {med.brand_name && (
                      <div className="text-xs text-[var(--muted)]">
                        {med.brand_name}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[var(--ink)]">
                    {med.total_daily_amount ?? "inactive"} {med.unit}
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {med.per_dose_amount ?? "—"} {med.per_dose_amount ? med.unit : ""}
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {med.frequency_code ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {med.notes ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
