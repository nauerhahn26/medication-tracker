"use client";

import Link from "next/link";
import { useState } from "react";

type PreviewEvent = {
  med: string;
  date: string;
  amount: number | null;
  unit: string;
};

type ImportResponse = {
  event_count: number;
  med_count: number;
  meds: string[];
  preview: PreviewEvent[];
  inserted?: { meds: number; events: number };
  error?: string;
};

export default function MitoReviewPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">(
    "idle",
  );
  const [response, setResponse] = useState<ImportResponse | null>(null);
  const [previewSize, setPreviewSize] = useState(200);

  async function runImport(commit: boolean) {
    if (!file) return;
    setStatus("loading");
    setResponse(null);

    const formData = new FormData();
    formData.append("file", file);
    const urlBase = commit
      ? "/api/imports/mito-sheet?commit=true"
      : "/api/imports/mito-sheet";
    const url = `${urlBase}&preview=${previewSize}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as ImportResponse;
      if (!res.ok) throw new Error(data.error ?? "Import failed");
      setResponse(data);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff8e8,transparent_50%),radial-gradient(circle_at_20%_40%,#ffe1d4,transparent_45%),radial-gradient(circle_at_80%_20%,#d6efe6,transparent_45%)]">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
        <header className="flex flex-col gap-3">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]"
          >
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-semibold text-[var(--ink)]">
            CSV Import Review
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Upload the Mito Mix change-log CSV, review parsed events, then commit.
          </p>
        </header>

        <section className="rounded-3xl border border-[var(--line)] bg-white/80 p-6">
          <div className="flex flex-col gap-4">
            <input
              type="file"
              accept=".csv"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="text-sm"
            />
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => runImport(false)}
                disabled={!file || status === "loading"}
                className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold text-[var(--ink)]"
              >
                Preview Import
              </button>
              <button
                onClick={() => runImport(true)}
                disabled={!file || status === "loading"}
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white"
              >
                Commit to Database
              </button>
              <select
                value={previewSize}
                onChange={(event) => setPreviewSize(Number(event.target.value))}
                className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-xs text-[var(--muted)]"
              >
                <option value={50}>Preview 50</option>
                <option value={100}>Preview 100</option>
                <option value={200}>Preview 200</option>
                <option value={500}>Preview 500</option>
              </select>
            </div>
            {status === "loading" && (
              <p className="text-xs text-[var(--muted)]">Parsing file...</p>
            )}
            {status === "error" && (
              <p className="text-xs text-red-600">Import failed.</p>
            )}
          </div>
        </section>

        {response && (
          <section className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--muted)]">
              <span>
                Meds detected:{" "}
                <strong className="text-[var(--ink)]">
                  {response.med_count}
                </strong>
              </span>
              <span>
                Events detected:{" "}
                <strong className="text-[var(--ink)]">
                  {response.event_count}
                </strong>
              </span>
              {response.inserted && (
                <span>
                  Inserted:{" "}
                  <strong className="text-[var(--ink)]">
                    {response.inserted.meds} meds / {response.inserted.events}{" "}
                    events
                  </strong>
                </span>
              )}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
                <p className="text-xs font-semibold text-[var(--ink)]">
                  Preview Events (first {Math.min(20, response.preview.length)})
                </p>
                <div className="mt-3 space-y-2 text-xs text-[var(--muted)]">
                  {response.preview.slice(0, 20).map((row) => (
                    <div
                      key={`${row.med}-${row.date}`}
                      className="flex justify-between"
                    >
                      <span>{row.date}</span>
                      <span>{row.med}</span>
                      <span>
                        {row.amount ?? "inactive"} {row.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
                <p className="text-xs font-semibold text-[var(--ink)]">Meds</p>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-[var(--muted)]">
                  {response.meds.slice(0, 40).map((med) => (
                    <span key={med}>{med}</span>
                  ))}
                </div>
                {response.meds.length > 40 && (
                  <p className="mt-3 text-xs text-[var(--muted)]">
                    +{response.meds.length - 40} more
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
