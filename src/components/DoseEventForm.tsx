"use client";

import { useState } from "react";

type Props = {
  medId: string;
  onCreated: () => void;
};

export default function DoseEventForm({ medId, onCreated }: Props) {
  const [effectiveDate, setEffectiveDate] = useState("");
  const [totalDailyAmount, setTotalDailyAmount] = useState("");
  const [unit, setUnit] = useState("mg");
  const [frequencyCode, setFrequencyCode] = useState("");
  const [perDoseAmount, setPerDoseAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("saving");

    const payload = {
      med_id: medId,
      effective_date: effectiveDate,
      total_daily_amount:
        totalDailyAmount.trim() === "" ? null : Number(totalDailyAmount),
      unit,
      frequency_code: frequencyCode.trim() || null,
      per_dose_amount: perDoseAmount.trim() === "" ? null : Number(perDoseAmount),
      notes: notes.trim() || null,
    };

    try {
      const res = await fetch("/api/dose-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed");

      setEffectiveDate("");
      setTotalDailyAmount("");
      setFrequencyCode("");
      setPerDoseAmount("");
      setNotes("");
      setStatus("idle");
      onCreated();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-[var(--line)] bg-white p-4 text-sm"
    >
      <div className="grid gap-3 md:grid-cols-2">
        <input
          type="date"
          required
          value={effectiveDate}
          onChange={(e) => setEffectiveDate(e.target.value)}
          className="rounded-xl border border-[var(--line)] px-3 py-2"
        />
        <div className="flex gap-2">
          <input
            type="number"
            step="0.01"
            placeholder="Total daily"
            value={totalDailyAmount}
            onChange={(e) => setTotalDailyAmount(e.target.value)}
            className="w-full rounded-xl border border-[var(--line)] px-3 py-2"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="rounded-xl border border-[var(--line)] px-2"
          >
            <option value="mg">mg</option>
            <option value="IU">IU</option>
            <option value="mL">mL</option>
            <option value="packet">packet</option>
            <option value="drops">drops</option>
          </select>
        </div>
        <input
          type="number"
          step="0.01"
          placeholder="Per dose (optional)"
          value={perDoseAmount}
          onChange={(e) => setPerDoseAmount(e.target.value)}
          className="rounded-xl border border-[var(--line)] px-3 py-2"
        />
        <input
          type="text"
          placeholder="Frequency (QD/BID/TID)"
          value={frequencyCode}
          onChange={(e) => setFrequencyCode(e.target.value)}
          className="rounded-xl border border-[var(--line)] px-3 py-2"
        />
        <input
          type="text"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="md:col-span-2 rounded-xl border border-[var(--line)] px-3 py-2"
        />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button
          type="submit"
          className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white"
        >
          Save Dose Change
        </button>
        {status === "saving" && (
          <span className="text-xs text-[var(--muted)]">Saving...</span>
        )}
        {status === "error" && (
          <span className="text-xs text-red-600">Failed to save.</span>
        )}
      </div>
    </form>
  );
}
