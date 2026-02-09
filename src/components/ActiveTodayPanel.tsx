"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const csvEscape = (value: string) => {
  if (value.includes(",") || value.includes("\"") || value.includes("\n")) {
    return `"${value.replace(/"/g, "\"\"")}"`;
  }
  return value;
};

const buildCsv = (date: string, meds: DailyMed[]) => {
  const header = ["Date", "Med", "Total Daily", "Per Dose", "Frequency"].join(",");
  const rows = meds.map((med) =>
    [
      date,
      med.med_name,
      med.total_daily_amount === null ? "" : `${med.total_daily_amount} ${med.unit}`,
      med.per_dose_amount === null ? "" : `${med.per_dose_amount} ${med.unit}`,
      med.frequency_code ?? "",
    ]
      .map((value) => csvEscape(String(value)))
      .join(","),
  );
  return [header, ...rows].join("\n");
};

const buildPrintHtml = (date: string, meds: DailyMed[]) => {
  const rows = meds
    .map(
      (med) => `
      <tr>
        <td>${med.med_name}</td>
        <td>${med.total_daily_amount ?? ""} ${med.total_daily_amount === null ? "" : med.unit}</td>
        <td>${med.per_dose_amount ?? ""} ${med.per_dose_amount === null ? "" : med.unit}</td>
        <td>${med.frequency_code ?? ""}</td>
      </tr>
    `,
    )
    .join("");

  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Medication list ${date}</title>
      <style>
        body { font-family: "Georgia", serif; padding: 32px; color: #1b1916; }
        h1 { font-size: 22px; margin-bottom: 8px; }
        .meta { color: #5c574f; margin-bottom: 16px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { text-align: left; padding: 8px 6px; border-bottom: 1px solid #e7dcc7; font-size: 12px; }
        th { text-transform: uppercase; letter-spacing: 0.2em; font-size: 10px; color: #7a736a; }
      </style>
    </head>
    <body>
      <h1>Medication list</h1>
      <div class="meta">Date: ${date}</div>
      <table>
        <thead>
          <tr>
            <th>Med</th>
            <th>Total Daily</th>
            <th>Per Dose</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </body>
  </html>`;
};

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        if (active) {
          setErrorMessage(
            "No meds yet. Once you add or import, they will appear here.",
          );
          setStatus("error");
        }
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
        <p className="mt-6 text-sm text-[var(--muted)]">
          {errorMessage ?? "No meds yet."}
        </p>
      )}

      {status === "ready" && data && data.meds.length === 0 && (
        <p className="mt-6 text-sm text-[var(--muted)]">
          No active meds for today. Add a med or import a CSV to get started.
        </p>
      )}

      {status === "ready" && data && data.meds.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--line)] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--background)] text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3">Med</th>
                <th className="px-4 py-3">Total Daily</th>
                <th className="px-4 py-3">Per Dose</th>
                <th className="px-4 py-3">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {data.meds.map((med) => (
                <tr key={med.med_id} className="border-t border-[var(--line)]">
                  <td className="px-4 py-3">
                    <Link
                      href={`/meds/${med.med_id}`}
                      className="font-semibold text-[var(--ink)] hover:text-[var(--accent)]"
                    >
                      {med.med_name}
                    </Link>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {status === "ready" && data && data.meds.length > 0 && (
        <div className="fixed bottom-6 right-6 z-20 flex gap-2">
          <button
            type="button"
            onClick={() => {
              const csv = buildCsv(data.date, data.meds);
              const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `meds-${data.date}.csv`;
              link.click();
              URL.revokeObjectURL(url);
            }}
            className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-xs font-semibold text-[var(--ink)]"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={() => {
              const win = window.open("", "_blank", "width=900,height=700");
              if (!win) return;
              win.document.write(buildPrintHtml(data.date, data.meds));
              win.document.close();
              win.focus();
              win.print();
            }}
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white"
          >
            Export PDF
          </button>
        </div>
      )}
    </section>
  );
}
