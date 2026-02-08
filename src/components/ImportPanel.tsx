"use client";

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
  error?: string;
};

export default function ImportPanel() {
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">(
    "idle",
  );
  const [response, setResponse] = useState<ImportResponse | null>(null);
  const [commit, setCommit] = useState(false);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setResponse(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const url = commit
        ? "/api/imports/mito-sheet?commit=true"
        : "/api/imports/mito-sheet";
      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as ImportResponse;
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setResponse(data);
      setStatus("done");
    } catch (err) {
      setResponse({ event_count: 0, med_count: 0, meds: [], preview: [] });
      setStatus("error");
    }
  }

  return (
    <div className="rounded-3xl border border-[var(--line)] bg-white/70 p-6 backdrop-blur">
      <p className="text-sm font-semibold text-[var(--ink)]">Upload & Review</p>
      <p className="mt-3 text-sm text-[var(--muted)]">
        Import the change-log CSV and preview the parsed dose events before
        saving.
      </p>
      <div className="mt-5 rounded-2xl border border-dashed border-[var(--line)] bg-white px-4 py-6 text-center text-sm text-[var(--muted)]">
        <input
          type="file"
          accept=".csv"
          onChange={handleUpload}
          className="w-full text-sm"
        />
      </div>
      <label className="mt-3 flex items-center gap-2 text-xs text-[var(--muted)]">
        <input
          type="checkbox"
          checked={commit}
          onChange={(event) => setCommit(event.target.checked)}
        />
        Save to database after preview
      </label>
      {status === "uploading" && (
        <p className="mt-4 text-xs text-[var(--muted)]">Parsing file…</p>
      )}
      {status === "done" && response && (
        <div className="mt-4 space-y-2 text-xs text-[var(--muted)]">
          <div>Events: {response.event_count}</div>
          <div>Meds: {response.med_count}</div>
          <div className="rounded-xl border border-[var(--line)] bg-white px-3 py-2">
            <div className="text-[var(--ink)]">Preview (first 5)</div>
            {response.preview.slice(0, 5).map((row) => (
              <div key={`${row.med}-${row.date}`}>
                {row.date} · {row.med} · {row.amount ?? "inactive"} {row.unit}
              </div>
            ))}
          </div>
        </div>
      )}
      {status === "error" && (
        <p className="mt-4 text-xs text-red-600">
          Upload failed. Please try again.
        </p>
      )}
    </div>
  );
}
