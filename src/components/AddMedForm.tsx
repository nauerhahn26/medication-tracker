"use client";

import { useEffect, useState } from "react";

type MedOption = {
  id: string;
  name: string;
};

type RxOption = {
  name: string;
  rxcui: string | null;
};

export default function AddMedForm() {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<MedOption[]>([]);
  const [rxOptions, setRxOptions] = useState<RxOption[]>([]);
  const [selectedRx, setSelectedRx] = useState<RxOption | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("mg");
  const [frequency, setFrequency] = useState("");
  const [perDose, setPerDose] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "error" | "done">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!query.trim()) {
        setOptions([]);
        setRxOptions([]);
        return;
      }
      const res = await fetch(`/api/meds/search?query=${encodeURIComponent(query)}`);
      const json = (await res.json()) as { meds: MedOption[] };
      if (active) setOptions(json.meds ?? []);
      const rxRes = await fetch(
        `/api/meds/rxnorm-search?query=${encodeURIComponent(query)}`,
      );
      const rxJson = (await rxRes.json()) as { meds: RxOption[] };
      if (active) setRxOptions(rxJson.meds ?? []);
    }
    load();
    return () => {
      active = false;
    };
  }, [query]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("saving");
    setErrorMessage(null);

    try {
      let medId = selectedId;
      if (!medId) {
        const res = await fetch("/api/meds", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim() || query.trim(),
            standard_code_system: selectedRx?.rxcui ? "RxNorm" : null,
            standard_code: selectedRx?.rxcui ?? null,
            is_supplement: true,
          }),
        });
        const json = (await res.json()) as { id?: string; error?: string };
        if (!res.ok || !json.id) {
          throw new Error(json.error ?? "Failed to create med");
        }
        medId = json.id;
      }

      const doseRes = await fetch("/api/dose-events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          med_id: medId,
          effective_date: startDate,
          total_daily_amount: amount.trim() ? Number(amount) : null,
          unit,
          frequency_code: frequency.trim() || null,
          per_dose_amount: perDose.trim() ? Number(perDose) : null,
          notes: notes.trim() || null,
        }),
      });
      if (!doseRes.ok) {
        const json = (await doseRes.json()) as { error?: string };
        throw new Error(json.error ?? "Failed to create dose event");
      }

      setStatus("done");
      setQuery("");
      setSelectedId(null);
      setName("");
      setStartDate("");
      setAmount("");
      setFrequency("");
      setPerDose("");
      setNotes("");
    } catch (err) {
      setStatus("error");
      const message =
        err instanceof Error
          ? err.message
          : "Unable to save. Please check the fields and try again.";
      setErrorMessage(message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[var(--line)] bg-white/80 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[var(--ink)]">Add New Med</h3>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Pick a start date and initial dose. Autocomplete is optional.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Med name (search or enter new)"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedId(null);
              setSelectedRx(null);
            }}
            className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
          />
          {query.trim() && options.length === 0 && (
            <div className="mt-2 text-xs text-[var(--muted)]">
              No matches in your database. This will be added as a new med.
            </div>
          )}
          {options.length > 0 && (
            <div className="absolute z-10 mt-2 w-full rounded-2xl border border-[var(--line)] bg-white p-2 shadow">
              {options.slice(0, 6).map((option) => (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => {
                    setSelectedId(option.id);
                    setQuery(option.name);
                    setName(option.name);
                    setOptions([]);
                  }}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-[var(--background)]"
                >
                  {option.name}
                </button>
              ))}
            </div>
          )}
          {rxOptions.length > 0 && (
            <div className="mt-3 rounded-2xl border border-[var(--line)] bg-white p-3">
              <div className="text-xs font-semibold text-[var(--muted)]">
                RxNorm suggestions
              </div>
              <div className="mt-2 grid gap-1">
                {rxOptions.slice(0, 6).map((option) => (
                  <button
                    type="button"
                    key={`${option.name}-${option.rxcui ?? "na"}`}
                    onClick={() => {
                      setSelectedRx(option);
                      setQuery(option.name);
                      setName(option.name);
                      setOptions([]);
                    }}
                    className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-[var(--background)]"
                  >
                    {option.name}
                    {option.rxcui ? (
                      <span className="ml-2 text-xs text-[var(--muted)]">
                        RxCUI {option.rxcui}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <input
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
          required
        />
        <div className="flex gap-2">
          <input
            type="number"
            step="0.01"
            placeholder="Total daily amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="w-full rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
          />
          <select
            value={unit}
            onChange={(event) => setUnit(event.target.value)}
            className="rounded-2xl border border-[var(--line)] bg-white px-3"
          >
            <option value="mg">mg</option>
            <option value="IU">IU</option>
            <option value="mL">mL</option>
            <option value="packet">packet</option>
            <option value="drops">drops</option>
          </select>
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          <input
            type="number"
            step="0.01"
            placeholder="Per dose (optional)"
            value={perDose}
            onChange={(event) => setPerDose(event.target.value)}
            className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
          />
          <input
            type="text"
            placeholder="Frequency (QD/BID/TID)"
            value={frequency}
            onChange={(event) => setFrequency(event.target.value)}
            className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
          />
        </div>
        <input
          type="text"
          placeholder="Notes (optional)"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3"
        />
      </div>

      <div className="mt-4 flex items-center gap-3 text-xs">
        <button
          type="submit"
          className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white"
        >
          Add Med
        </button>
        {status === "saving" && <span className="text-[var(--muted)]">Saving...</span>}
        {status === "done" && <span className="text-[var(--accent)]">Saved</span>}
        {status === "error" && (
          <span className="text-red-600">{errorMessage ?? "Failed"}</span>
        )}
      </div>
    </form>
  );
}
