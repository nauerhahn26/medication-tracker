"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type DailyMed = {
  med_id: string;
  med_name: string;
  total_daily_amount: number | null;
  unit: string;
  frequency_code: string | null;
};

type DailyResponse = {
  date: string;
  meds: DailyMed[];
  error?: string;
};

type PatientContext = {
  age_years: number | null;
  weight_kg: number | null;
  sex_at_birth: "female" | "male" | "unknown" | null;
  renal_impairment: "none" | "unknown" | "mild" | "moderate" | "severe" | null;
  hepatic_impairment: "none" | "unknown" | "mild" | "moderate" | "severe" | null;
  baseline_qtc_ms: number | null;
  cardiac_history: string[];
  notable_conditions: string[];
  allergies: string[];
};

type RegimenItem = {
  id: string;
  name: string;
  active_ingredients_if_known: string[];
  dose: string;
  route: string;
  frequency: string;
  indication_optional?: string;
  notes_optional?: string;
};

type FullResponse = {
  disclaimer_short: string;
  interactions: {
    contraindicated_or_urgent_review: unknown[];
    major: unknown[];
    moderate: unknown[];
    minor_or_theoretical: unknown[];
  };
  unknowns_missing_info: unknown[];
  questions_for_clinician: string[];
};

type DeltaResponse = {
  disclaimer_short: string;
  delta_interactions: {
    contraindicated_or_urgent_review: unknown[];
    major: unknown[];
    moderate: unknown[];
    minor_or_theoretical: unknown[];
  };
  unknowns_missing_info: unknown[];
  questions_for_clinician: string[];
};

const defaultContext: PatientContext = {
  age_years: null,
  weight_kg: null,
  sex_at_birth: "unknown",
  renal_impairment: "unknown",
  hepatic_impairment: "unknown",
  baseline_qtc_ms: null,
  cardiac_history: [],
  notable_conditions: [],
  allergies: [],
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function buildItemFromDaily(med: DailyMed): RegimenItem {
  const dose =
    med.total_daily_amount === null ? "" : `${med.total_daily_amount} ${med.unit}`;
  return {
    id: med.med_id,
    name: med.med_name,
    active_ingredients_if_known: [],
    dose,
    route: "",
    frequency: med.frequency_code ?? "",
  };
}

export default function AiScreenPage() {
  const [model, setModel] = useState("gpt-5.2");
  const [context, setContext] = useState<PatientContext>(defaultContext);
  const [date, setDate] = useState(todayIso());
  const [daily, setDaily] = useState<DailyResponse | null>(null);
  const [demoItems, setDemoItems] = useState<RegimenItem[]>([]);
  const [newDemo, setNewDemo] = useState({ name: "", dose: "", route: "", frequency: "" });
  const [fullResult, setFullResult] = useState<FullResponse | null>(null);
  const [deltaResult, setDeltaResult] = useState<DeltaResponse | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [deltaStatus, setDeltaStatus] = useState<"idle" | "saving" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function loadContext() {
      const res = await fetch("/api/patient-context");
      const json = (await res.json()) as { context: PatientContext | null };
      if (active && json.context) setContext(json.context);
    }
    loadContext();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    async function loadDaily() {
      const res = await fetch(`/api/daily?date=${date}`, { cache: "no-store" });
      const json = (await res.json()) as DailyResponse;
      if (active) setDaily(json);
    }
    loadDaily();
    return () => {
      active = false;
    };
  }, [date]);

  const regimen = useMemo(() => {
    const fromDaily = (daily?.meds ?? []).map(buildItemFromDaily);
    return [...fromDaily, ...demoItems];
  }, [daily, demoItems]);

  async function saveContext() {
    await fetch("/api/patient-context", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context }),
    });
  }

  async function runFull() {
    setStatus("saving");
    setMessage(null);
    try {
      await saveContext();
      const res = await fetch("/api/screen/full", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_context: context,
          regimen,
          model,
        }),
      });
      const json = (await res.json()) as FullResponse & { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Failed to run screen.");
      setFullResult(json);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to run screen.");
    }
  }

  async function runDelta(item: RegimenItem) {
    setDeltaStatus("saving");
    setMessage(null);
    try {
      await saveContext();
      const res = await fetch("/api/screen/delta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          new_item: item,
          model,
        }),
      });
      const json = (await res.json()) as DeltaResponse & { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Failed to run delta.");
      setDeltaResult(json);
      setDeltaStatus("idle");
    } catch (err) {
      setDeltaStatus("error");
      setMessage(err instanceof Error ? err.message : "Failed to run delta.");
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff8e8,transparent_50%),radial-gradient(circle_at_20%_40%,#ffe1d4,transparent_45%),radial-gradient(circle_at_80%_20%,#d6efe6,transparent_45%)]">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12">
        <header className="flex flex-col gap-3">
          <Link href="/" className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-semibold text-[var(--ink)]">
            AI Drug-to-Drug Analysis
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Educational screen only. Always review with a clinician or pharmacist.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-[var(--line)] bg-white/80 p-6">
            <h2 className="text-base font-semibold text-[var(--ink)]">Patient context</h2>
            <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
              <input
                type="number"
                placeholder="Age (years)"
                value={context.age_years ?? ""}
                onChange={(e) => setContext({ ...context, age_years: e.target.value ? Number(e.target.value) : null })}
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={context.weight_kg ?? ""}
                onChange={(e) => setContext({ ...context, weight_kg: e.target.value ? Number(e.target.value) : null })}
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              />
              <select
                value={context.sex_at_birth ?? "unknown"}
                onChange={(e) =>
                  setContext({ ...context, sex_at_birth: e.target.value as PatientContext["sex_at_birth"] })
                }
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              >
                <option value="unknown">Sex at birth (unknown)</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
              <input
                type="number"
                placeholder="Baseline QTc (ms)"
                value={context.baseline_qtc_ms ?? ""}
                onChange={(e) =>
                  setContext({ ...context, baseline_qtc_ms: e.target.value ? Number(e.target.value) : null })
                }
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              />
              <select
                value={context.renal_impairment ?? "unknown"}
                onChange={(e) =>
                  setContext({
                    ...context,
                    renal_impairment: e.target.value as PatientContext["renal_impairment"],
                  })
                }
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              >
                <option value="unknown">Renal impairment (unknown)</option>
                <option value="none">None</option>
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
              <select
                value={context.hepatic_impairment ?? "unknown"}
                onChange={(e) =>
                  setContext({
                    ...context,
                    hepatic_impairment: e.target.value as PatientContext["hepatic_impairment"],
                  })
                }
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              >
                <option value="unknown">Hepatic impairment (unknown)</option>
                <option value="none">None</option>
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
            </div>
            <div className="mt-4 grid gap-3 text-sm">
              <input
                type="text"
                placeholder="Cardiac history (comma separated)"
                value={context.cardiac_history.join(", ")}
                onChange={(e) =>
                  setContext({ ...context, cardiac_history: e.target.value.split(",").map((v) => v.trim()).filter(Boolean) })
                }
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              />
              <input
                type="text"
                placeholder="Notable conditions (comma separated)"
                value={context.notable_conditions.join(", ")}
                onChange={(e) =>
                  setContext({
                    ...context,
                    notable_conditions: e.target.value.split(",").map((v) => v.trim()).filter(Boolean),
                  })
                }
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              />
              <input
                type="text"
                placeholder="Allergies (comma separated)"
                value={context.allergies.join(", ")}
                onChange={(e) =>
                  setContext({
                    ...context,
                    allergies: e.target.value.split(",").map((v) => v.trim()).filter(Boolean),
                  })
                }
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--line)] bg-white/80 p-6">
            <h2 className="text-base font-semibold text-[var(--ink)]">Run screen</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <label className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Model
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              >
                <option value="gpt-5.2">gpt-5.2 (basic)</option>
                <option value="gpt-5.2-pro">gpt-5.2-pro (premium)</option>
              </select>
              <label className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Active meds date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              />
              <div className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-xs text-[var(--muted)]">
                {daily?.meds.length ?? 0} active meds will be included.
              </div>
              <button
                type="button"
                onClick={runFull}
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white"
              >
                Run AI Drug-to-Drug Analysis
              </button>
              {status === "saving" && <span className="text-xs text-[var(--muted)]">Running...</span>}
              {status === "error" && <span className="text-xs text-red-600">{message}</span>}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-[var(--line)] bg-white/80 p-6">
            <h2 className="text-base font-semibold text-[var(--ink)]">Add demo meds</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <input
                type="text"
                placeholder="Name"
                value={newDemo.name}
                onChange={(e) => setNewDemo({ ...newDemo, name: e.target.value })}
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              />
              <input
                type="text"
                placeholder="Dose (e.g., 10 mg)"
                value={newDemo.dose}
                onChange={(e) => setNewDemo({ ...newDemo, dose: e.target.value })}
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              />
              <input
                type="text"
                placeholder="Route (e.g., PO)"
                value={newDemo.route}
                onChange={(e) => setNewDemo({ ...newDemo, route: e.target.value })}
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              />
              <input
                type="text"
                placeholder="Frequency (e.g., BID)"
                value={newDemo.frequency}
                onChange={(e) => setNewDemo({ ...newDemo, frequency: e.target.value })}
                className="rounded-2xl border border-[var(--line)] bg-white px-4 py-2"
              />
              <button
                type="button"
                onClick={() => {
                  if (!newDemo.name.trim()) return;
                  setDemoItems([
                    ...demoItems,
                    {
                      id: `demo-${Date.now()}`,
                      name: newDemo.name,
                      dose: newDemo.dose,
                      route: newDemo.route,
                      frequency: newDemo.frequency,
                      active_ingredients_if_known: [],
                    },
                  ]);
                  setNewDemo({ name: "", dose: "", route: "", frequency: "" });
                }}
                className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold text-[var(--ink)]"
              >
                Add demo med
              </button>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              {demoItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <span>{item.name}</span>
                  <button
                    type="button"
                    onClick={() => setDemoItems(demoItems.filter((d) => d.id !== item.id))}
                    className="text-xs text-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--line)] bg-white/80 p-6">
            <h2 className="text-base font-semibold text-[var(--ink)]">Delta check</h2>
            <p className="mt-2 text-xs text-[var(--muted)]">
              Run a quick delta screen against your cached fingerprints.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              {demoItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <span>{item.name}</span>
                  <button
                    type="button"
                    onClick={() => runDelta(item)}
                    className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold text-[var(--ink)]"
                  >
                    Check delta
                  </button>
                </div>
              ))}
              {demoItems.length === 0 && (
                <p className="text-xs text-[var(--muted)]">Add a demo med to run DELTA.</p>
              )}
              {deltaStatus === "saving" && (
                <span className="text-xs text-[var(--muted)]">Running delta...</span>
              )}
              {deltaStatus === "error" && (
                <span className="text-xs text-red-600">{message}</span>
              )}
            </div>
          </div>
        </section>

        {(fullResult || deltaResult) && (
          <section className="rounded-3xl border border-[var(--line)] bg-white/80 p-6 text-sm">
            <h2 className="text-base font-semibold text-[var(--ink)]">Latest results</h2>
            <p className="mt-2 text-xs text-[var(--muted)]">
              {fullResult?.disclaimer_short ?? deltaResult?.disclaimer_short}
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {fullResult && (
                <>
                  <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      Contraindicated/Urgent
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[var(--ink)]">
                      {fullResult.interactions.contraindicated_or_urgent_review.length}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      Major
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[var(--ink)]">
                      {fullResult.interactions.major.length}
                    </p>
                  </div>
                </>
              )}
              {deltaResult && (
                <>
                  <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      Delta Major
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[var(--ink)]">
                      {deltaResult.delta_interactions.major.length}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      Delta Moderate
                    </p>
                    <p className="mt-2 text-lg font-semibold text-[var(--ink)]">
                      {deltaResult.delta_interactions.moderate.length}
                    </p>
                  </div>
                </>
              )}
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-xs font-semibold text-[var(--accent)]">
                View JSON
              </summary>
              <pre className="mt-3 max-h-80 overflow-auto rounded-2xl bg-[var(--background)] p-4 text-xs">
                {JSON.stringify(fullResult ?? deltaResult, null, 2)}
              </pre>
            </details>
          </section>
        )}
      </main>
    </div>
  );
}
