"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import DoseEventForm from "@/components/DoseEventForm";

type Med = {
  id: string;
  name: string;
  standard_code_system: string | null;
  standard_code: string | null;
  is_supplement: boolean;
  notes: string | null;
  med_type: string | null;
  target: string | null;
  delivery_mechanism: string | null;
  result: string | null;
  source: string | null;
  dose_at_13kg: string | null;
  brand: string | null;
  supporting_research: string | null;
};

type DoseEvent = {
  id: string;
  med_id: string;
  med_product_id: string | null;
  effective_date: string;
  total_daily_amount: number | null;
  unit: string;
  per_dose_amount: number | null;
  frequency_code: string | null;
  notes: string | null;
};

function formatDate(value: string) {
  return value ? value.slice(0, 10) : value;
}

export default function MedDetailPage() {
  const params = useParams<{ medId: string }>();
  const medId = params?.medId;
  const [med, setMed] = useState<Med | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [events, setEvents] = useState<DoseEvent[]>([]);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventDraft, setEventDraft] = useState<{
    effective_date: string;
    total_daily_amount: string;
    unit: string;
    per_dose_amount: string;
    frequency_code: string;
    notes: string;
  } | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  function trimLeadingInactive(list: DoseEvent[]) {
    const firstActiveIndex = list.findIndex(
      (event) => event.total_daily_amount !== null,
    );
    if (firstActiveIndex <= 0) return list;
    return list.slice(firstActiveIndex);
  }

  async function refreshEvents() {
    if (!medId) return;
    const eventsRes = await fetch(`/api/meds/${medId}/dose-events`, {
      cache: "no-store",
    });
    const eventsJson = (await eventsRes.json()) as { events: DoseEvent[] };
    setEvents(trimLeadingInactive(eventsJson.events));
  }

  async function handleDelete(eventId: string) {
    if (!medId) return;
    const confirmed = window.confirm("Delete this dose change?");
    if (!confirmed) return;
    const res = await fetch(`/api/dose-events/${eventId}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Unable to delete dose change. Try again.");
      setStatus("error");
      return;
    }
    await refreshEvents();
  }

  function startEditEvent(event: DoseEvent) {
    setEditingEventId(event.id);
    setEventDraft({
      effective_date: formatDate(event.effective_date),
      total_daily_amount:
        event.total_daily_amount === null ? "" : String(event.total_daily_amount),
      unit: event.unit,
      per_dose_amount: event.per_dose_amount === null ? "" : String(event.per_dose_amount),
      frequency_code: event.frequency_code ?? "",
      notes: event.notes ?? "",
    });
  }

  async function handleEventSave() {
    if (!editingEventId || !eventDraft) return;
    try {
      const res = await fetch(`/api/dose-events/${editingEventId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          effective_date: eventDraft.effective_date,
          total_daily_amount:
            eventDraft.total_daily_amount.trim() === ""
              ? null
              : Number(eventDraft.total_daily_amount),
          unit: eventDraft.unit,
          per_dose_amount:
            eventDraft.per_dose_amount.trim() === ""
              ? null
              : Number(eventDraft.per_dose_amount),
          frequency_code: eventDraft.frequency_code.trim() || null,
          notes: eventDraft.notes.trim() || null,
        }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? "Failed to update dose event");
      setEditingEventId(null);
      setEventDraft(null);
      await refreshEvents();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update dose event.");
      setStatus("error");
    }
  }

  function cancelEditEvent() {
    setEditingEventId(null);
    setEventDraft(null);
  }

  async function handleNameSave() {
    if (!medId || !med) return;
    const nextName = nameDraft.trim();
    if (!nextName) return;
    try {
      const res = await fetch(`/api/meds/${medId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nextName }),
      });
      const json = (await res.json()) as { med?: Med; error?: string };
      if (!res.ok || !json.med) {
        throw new Error(json.error ?? "Failed to update name");
      }
      setMed(json.med);
      setEditingName(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update name.");
      setStatus("error");
    }
  }

  useEffect(() => {
    if (!medId) return;
    let active = true;
    async function load() {
      try {
        const [medRes, eventsRes] = await Promise.all([
          fetch(`/api/meds/${medId}`, { cache: "no-store" }),
          fetch(`/api/meds/${medId}/dose-events`, { cache: "no-store" }),
        ]);
        const medJson = (await medRes.json()) as { med: Med; error?: string };
        const eventsJson = (await eventsRes.json()) as { events: DoseEvent[] };
        if (!medRes.ok) throw new Error(medJson.error ?? "Failed");
        if (active) {
          setMed(medJson.med);
          setEvents(trimLeadingInactive(eventsJson.events));
          setStatus("ready");
        }
      } catch {
        if (active) {
          setError("Unable to load med timeline. Check database connection.");
          setStatus("error");
        }
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [medId]);

  const timeline = useMemo(() => {
    if (!events.length) return null;
    const dates = events.map((event) => new Date(event.effective_date));
    const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));
    const span = Math.max(1, maxDate.getTime() - minDate.getTime());
    const width = Math.max(700, events.length * 140);
    const padding = 48;

    const points = events.map((event) => {
      const time = new Date(event.effective_date).getTime();
      const ratio = (time - minDate.getTime()) / span;
      const x = padding + ratio * (width - padding * 2);
      return { event, x };
    });

    return { minDate, maxDate, width, padding, points };
  }, [events]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff8e8,transparent_50%),radial-gradient(circle_at_20%_40%,#ffe1d4,transparent_45%),radial-gradient(circle_at_80%_20%,#d6efe6,transparent_45%)]">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
        <header className="flex flex-col gap-3">
          <Link href="/meds" className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
            Back to Meds
          </Link>
          {med && (
            <>
              <div className="flex flex-wrap items-center gap-3">
                {editingName ? (
                  <>
                    <input
                      value={nameDraft}
                      onChange={(event) => setNameDraft(event.target.value)}
                      className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-2xl font-semibold text-[var(--ink)]"
                    />
                    <button
                      type="button"
                      onClick={handleNameSave}
                      className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingName(false);
                        setNameDraft(med.name);
                      }}
                      className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold text-[var(--ink)]"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h1 className="text-3xl font-semibold text-[var(--ink)]">
                      {med.name}
                    </h1>
                    <button
                      type="button"
                      onClick={() => {
                        setNameDraft(med.name);
                        setEditingName(true);
                      }}
                      className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold text-[var(--ink)]"
                      aria-label="Edit med name"
                    >
                      ✎
                    </button>
                  </>
                )}
              </div>
              <p className="text-sm text-[var(--muted)]">
                {med.is_supplement ? "Supplement" : "Medication"} · Change log
              </p>
            </>
          )}
        </header>

        {status === "loading" && (
          <div className="rounded-3xl border border-[var(--line)] bg-white/70 p-6 text-sm text-[var(--muted)]">
            Loading timeline...
          </div>
        )}
        {status === "error" && (
          <div className="rounded-3xl border border-[var(--line)] bg-white/70 p-6 text-sm text-red-600">
            {error ?? "Failed to load med timeline."}
          </div>
        )}

        {status === "ready" && (
          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--ink)]">
                Dose Change Timeline
              </h2>
            </div>
            {med && (
              <div className="mt-4 grid gap-3 rounded-2xl border border-[var(--line)] bg-white p-4 text-sm text-[var(--muted)]">
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em]">Type</div>
                    <div className="text-[var(--ink)]">{med.med_type ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em]">Brand</div>
                    <div className="text-[var(--ink)]">{med.brand ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em]">Target</div>
                    <div className="text-[var(--ink)]">{med.target ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em]">Dose @ 13kg</div>
                    <div className="text-[var(--ink)]">{med.dose_at_13kg ?? "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em]">Delivery</div>
                    <div className="text-[var(--ink)]">
                      {med.delivery_mechanism ?? "—"}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em]">Source</div>
                    <div className="text-[var(--ink)]">{med.source ?? "—"}</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em]">Result</div>
                  <div className="text-[var(--ink)] whitespace-pre-wrap">
                    {med.result ?? "—"}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em]">
                    Supporting Research
                  </div>
                  <div className="text-[var(--ink)] whitespace-pre-wrap">
                    {med.supporting_research ?? "—"}
                  </div>
                </div>
              </div>
            )}
            <div className="mt-4">
              {medId && <DoseEventForm medId={medId} onCreated={refreshEvents} />}
            </div>
            {timeline && (
              <div className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-4">
                <div className="text-xs font-semibold text-[var(--muted)]">
                  Timeline (drag to scroll)
                </div>
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
                        <circle cx={x} cy={60} r={8} fill="#0f6b5f" />
                        <text
                          x={x}
                          y={30}
                          textAnchor="middle"
                          fontSize="10"
                          fill="#5c574f"
                        >
                          {formatDate(event.effective_date)}
                        </text>
                        <text
                          x={x}
                          y={90}
                          textAnchor="middle"
                          fontSize="10"
                          fill="#1b1916"
                        >
                          {event.total_daily_amount ?? "inactive"} {event.unit}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            )}
            <div className="mt-6 space-y-3">
              {events.length === 0 && (
                <div className="text-sm text-[var(--muted)]">
                  No dose events yet.
                </div>
              )}
              {events.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-[var(--line)] bg-white p-4 text-sm"
                >
                  {editingEventId === event.id && eventDraft ? (
                    <div className="space-y-3">
                      <div className="grid gap-2 md:grid-cols-2">
                        <input
                          type="date"
                          value={eventDraft.effective_date}
                          onChange={(e) =>
                            setEventDraft({ ...eventDraft, effective_date: e.target.value })
                          }
                          className="rounded-xl border border-[var(--line)] px-3 py-2"
                        />
                        <div className="flex gap-2">
                          <input
                            type="number"
                            step="0.01"
                            placeholder="Total daily"
                            value={eventDraft.total_daily_amount}
                            onChange={(e) =>
                              setEventDraft({
                                ...eventDraft,
                                total_daily_amount: e.target.value,
                              })
                            }
                            className="w-full rounded-xl border border-[var(--line)] px-3 py-2"
                          />
                          <select
                            value={eventDraft.unit}
                            onChange={(e) =>
                              setEventDraft({ ...eventDraft, unit: e.target.value })
                            }
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
                          value={eventDraft.per_dose_amount}
                          onChange={(e) =>
                            setEventDraft({
                              ...eventDraft,
                              per_dose_amount: e.target.value,
                            })
                          }
                          className="rounded-xl border border-[var(--line)] px-3 py-2"
                        />
                        <input
                          type="text"
                          placeholder="Frequency (QD/BID/TID)"
                          value={eventDraft.frequency_code}
                          onChange={(e) =>
                            setEventDraft({
                              ...eventDraft,
                              frequency_code: e.target.value,
                            })
                          }
                          className="rounded-xl border border-[var(--line)] px-3 py-2"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Notes (optional)"
                        value={eventDraft.notes}
                        onChange={(e) =>
                          setEventDraft({ ...eventDraft, notes: e.target.value })
                        }
                        className="w-full rounded-xl border border-[var(--line)] px-3 py-2"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleEventSave}
                          className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditEvent}
                          className="rounded-full border border-[var(--line)] px-4 py-2 text-xs font-semibold text-[var(--ink)]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-[var(--ink)]">
                            {formatDate(event.effective_date)}
                          </div>
                          <div className="text-xs text-[var(--muted)]">
                            {event.notes ?? "Dose updated"}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-sm font-semibold text-[var(--ink)]">
                            {event.total_daily_amount ?? "inactive"} {event.unit}
                          </div>
                          <button
                            type="button"
                            onClick={() => startEditEvent(event)}
                            className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold text-[var(--ink)]"
                            aria-label="Edit dose event"
                          >
                            ✎
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(event.id)}
                            className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
                            aria-label="Delete dose event"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      {event.frequency_code && (
                        <div className="mt-2 text-xs text-[var(--muted)]">
                          {event.per_dose_amount ?? ""} {event.unit} ·{" "}
                          {event.frequency_code}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
