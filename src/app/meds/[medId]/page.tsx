"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import DoseEventForm from "@/components/DoseEventForm";

const UNIT_OPTIONS = ["mg", "IU", "mL", "packet", "drops"] as const;

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
  track_inventory: boolean;
  current_volume: number | null;
  volume_unit: string | null;
  alert_days_before_reorder: number | null;
  reorder_location: string | null;
  amount_per_bottle: number | null;
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

type InventoryStatus = {
  med_id: string;
  med_name: string;
  track_inventory: boolean;
  status:
    | "not_tracked"
    | "inactive"
    | "missing_stock"
    | "unit_mismatch"
    | "unknown"
    | "ok"
    | "low";
  latest_effective_date: string | null;
  latest_total_daily_amount: number | null;
  latest_dose_unit: string | null;
  current_volume: number | null;
  volume_unit: string | null;
  reorder_threshold_days: number;
  days_remaining: number | null;
  estimated_depletion_date: string | null;
  is_reorder_needed: boolean;
  reorder_location: string | null;
};

function formatDate(value: string) {
  return value ? value.slice(0, 10) : value;
}

function formatInventoryStock(status: InventoryStatus | null, med: Med | null) {
  if (!med) return "Inventory not configured.";
  if (!med.track_inventory) return "Inventory tracking is off for this med.";
  if (!status) return "No current usage or stock data yet.";

  if (status.status === "missing_stock") {
    return "No stock remaining on record.";
  }

  if (status.status === "inactive") {
    return "No active dose found right now, so reorder math is paused.";
  }

  if (status.status === "unit_mismatch") {
    return "Unit mismatch between dose unit and stock unit; I need same units to estimate days.";
  }

  if (status.status === "unknown") {
    return "I could not compute remaining days from current dose data.";
  }

  if (status.status === "not_tracked") {
    return "Not tracking this med.";
  }

  const usage = `${status.latest_total_daily_amount ?? "?"} ${status.latest_dose_unit ?? ""} / day`;
  const stock = `${status.current_volume ?? "?"} ${status.volume_unit ?? ""}`;
  const days = status.days_remaining === null ? "—" : `${status.days_remaining} days`;
  return `${stock} on hand, using ${usage}, estimated ${days} remaining.`;
}

export default function MedDetailPage() {
  const params = useParams<{ medId: string }>();
  const medId = params?.medId;
  const [med, setMed] = useState<Med | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [events, setEvents] = useState<DoseEvent[]>([]);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [inventoryStatus, setInventoryStatus] = useState<InventoryStatus | null>(null);
  const [inventorySavingStatus, setInventorySavingStatus] = useState<
    "idle" | "saving" | "error"
  >("idle");
  const [eventDraft, setEventDraft] = useState<{
    effective_date: string;
    total_daily_amount: string;
    unit: string;
    per_dose_amount: string;
    frequency_code: string;
    notes: string;
  } | null>(null);
  const [inventoryDraft, setInventoryDraft] = useState<{
    track_inventory: boolean;
    current_volume: string;
    volume_unit: string;
    amount_per_bottle: string;
    alert_days_before_reorder: string;
    reorder_location: string;
  }>({
    track_inventory: false,
    current_volume: "",
    volume_unit: "mg",
    amount_per_bottle: "",
    alert_days_before_reorder: "7",
    reorder_location: "",
  });
  const [inventoryInputMode, setInventoryInputMode] = useState<
    "manual" | "pill_pack" | "liquid_pack"
  >("manual");
  const [pillCalcDraft, setPillCalcDraft] = useState({
    full_bottles: "",
    loose_amount: "",
  });
  const [liquidCalcDraft, setLiquidCalcDraft] = useState({
    full_bottles: "",
    partial_bottle_volume: "",
  });
  const [showReorderForm, setShowReorderForm] = useState(false);
  const [reorderInputMode, setReorderInputMode] = useState<"bottles" | "amount">("bottles");
  const [reorderBottleDraft, setReorderBottleDraft] = useState({
    full_bottles: "1",
    extra_amount: "",
  });
  const [reorderDraft, setReorderDraft] = useState({ volume: "", unit: "mg" });
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  function trimLeadingInactive(list: DoseEvent[]) {
    const firstActiveIndex = list.findIndex(
      (event) => event.total_daily_amount !== null,
    );
    if (firstActiveIndex <= 0) return list;
    return list.slice(firstActiveIndex);
  }

  function loadInventoryDraft(nextMed: Med) {
    setInventoryDraft({
      track_inventory: nextMed.track_inventory ?? false,
      current_volume:
        nextMed.current_volume === null ? "" : String(nextMed.current_volume),
      volume_unit: nextMed.volume_unit ?? "mg",
      amount_per_bottle:
        nextMed.amount_per_bottle === null ? "" : String(nextMed.amount_per_bottle),
      alert_days_before_reorder: String(nextMed.alert_days_before_reorder ?? 7),
      reorder_location: nextMed.reorder_location ?? "",
    });
    setPillCalcDraft({
      full_bottles: "",
      loose_amount: "",
    });
    setLiquidCalcDraft({
      full_bottles: "",
      partial_bottle_volume: "",
    });
    setReorderBottleDraft({
      full_bottles: "1",
      extra_amount: "",
    });
    setReorderInputMode("bottles");
    setReorderDraft({
      volume: "",
      unit: nextMed.volume_unit ?? "mg",
    });
    setInventoryInputMode("manual");
  }

  function parseNonNegative(value: string): number | null {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const next = Number(trimmed);
    if (!Number.isFinite(next) || next < 0) return null;
    return next;
  }

  const inventoryCalculatedStock = useMemo(() => {
    if (inventoryInputMode === "manual") {
      return { value: null, error: null as string | null };
    }

    if (inventoryInputMode === "pill_pack") {
      const fullBottles = parseNonNegative(pillCalcDraft.full_bottles) ?? 0;
      const amountPerBottle = parseNonNegative(inventoryDraft.amount_per_bottle);
      const looseAmount = parseNonNegative(pillCalcDraft.loose_amount) ?? 0;

      if (amountPerBottle === null) {
        return {
          value: null,
          error: "Enter how much one full bottle contains.",
        };
      }

      return {
        value: Number((fullBottles * amountPerBottle + looseAmount).toFixed(2)),
        error: null,
      };
    }

    const fullBottles = parseNonNegative(liquidCalcDraft.full_bottles) ?? 0;
    const volumePerBottle = parseNonNegative(inventoryDraft.amount_per_bottle);
    const partialBottle = parseNonNegative(liquidCalcDraft.partial_bottle_volume) ?? 0;
    if (volumePerBottle === null) {
      return { value: null, error: "Enter how much one full bottle contains." };
    }

    return {
      value: Number((fullBottles * volumePerBottle + partialBottle).toFixed(2)),
      error: null,
    };
  }, [inventoryDraft.amount_per_bottle, inventoryInputMode, liquidCalcDraft, pillCalcDraft]);

  async function refreshEvents() {
    if (!medId) return;
    const eventsRes = await fetch(`/api/meds/${medId}/dose-events`, {
      cache: "no-store",
    });
    if (!eventsRes.ok) {
      setEvents([]);
      return;
    }
    const eventsJson = (await eventsRes
      .json()
      .catch(() => ({ events: [] }))) as { events?: DoseEvent[] };
    setEvents(trimLeadingInactive(eventsJson.events ?? []));
  }

  async function refreshInventoryStatus() {
    if (!medId) return;
    const statusRes = await fetch(
      `/api/med-inventory?medId=${encodeURIComponent(medId)}`,
      { cache: "no-store" },
    );
    if (!statusRes.ok) {
      setInventoryStatus(null);
      return;
    }
    const statusJson = (await statusRes
      .json()
      .catch(() => ({ items: [] }))) as { items?: InventoryStatus[] };
    const next = (statusJson.items ?? []).find((item) => item.med_id === medId) ?? null;
    setInventoryStatus(next);
  }

  async function refreshPageData() {
    await Promise.all([refreshEvents(), refreshInventoryStatus()]);
    window.dispatchEvent(new Event("meds:updated"));
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
    await refreshPageData();
  }

  function startEditEvent(event: DoseEvent) {
    setEditingEventId(event.id);
    setEventDraft({
      effective_date: formatDate(event.effective_date),
      total_daily_amount:
        event.total_daily_amount === null ? "" : String(event.total_daily_amount),
      unit: event.unit,
      per_dose_amount:
        event.per_dose_amount === null ? "" : String(event.per_dose_amount),
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
      await refreshPageData();
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

  async function handleInventorySave() {
    if (!medId) return;
    setInventorySavingStatus("saving");

    const alertDays = Number(inventoryDraft.alert_days_before_reorder);
    const stock = Number(inventoryDraft.current_volume);
    const amountPerBottle = Number(inventoryDraft.amount_per_bottle);
    const hasStock = inventoryDraft.current_volume.trim() !== "";
    const hasAmountPerBottle = inventoryDraft.amount_per_bottle.trim() !== "";

    if (Number.isNaN(alertDays) || alertDays <= 0) {
      setInventorySavingStatus("error");
      setError("Reorder threshold must be a positive number.");
      return;
    }

    if (hasStock && Number.isNaN(stock)) {
      setInventorySavingStatus("error");
      setError("Current volume must be a number.");
      return;
    }

    if (hasAmountPerBottle && (Number.isNaN(amountPerBottle) || amountPerBottle < 0)) {
      setInventorySavingStatus("error");
      setError("Amount per bottle must be 0 or a positive number.");
      return;
    }

    try {
      const payload = {
        track_inventory: inventoryDraft.track_inventory,
        current_volume: hasStock ? stock : null,
        volume_unit: inventoryDraft.volume_unit,
        amount_per_bottle: hasAmountPerBottle ? amountPerBottle : null,
        alert_days_before_reorder: alertDays,
        reorder_location: inventoryDraft.reorder_location.trim() || null,
      };

      const res = await fetch(`/api/meds/${medId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { med?: Med; error?: string };
      if (!res.ok || !json.med) {
        throw new Error(json.error ?? "Failed to save inventory settings");
      }

      setMed(json.med);
      loadInventoryDraft(json.med);
      await refreshInventoryStatus();
      setInventorySavingStatus("idle");
      setError(null);
    } catch (err) {
      setInventorySavingStatus("error");
      setError(
        err instanceof Error ? err.message : "Failed to save inventory settings.",
      );
    }
  }

  async function handleReorderSubmit() {
    if (!medId) return;
    let nextVolume: number;
    if (reorderInputMode === "bottles") {
      const amountPerBottle = parseNonNegative(inventoryDraft.amount_per_bottle);
      const fullBottles = parseNonNegative(reorderBottleDraft.full_bottles) ?? 0;
      const extraAmount = parseNonNegative(reorderBottleDraft.extra_amount) ?? 0;
      if (amountPerBottle === null) {
        setError("Set amount per bottle first, or switch to manual amount.");
        return;
      }
      nextVolume = Number((fullBottles * amountPerBottle + extraAmount).toFixed(2));
    } else {
      const parsedVolume = Number(reorderDraft.volume);
      if (Number.isNaN(parsedVolume) || parsedVolume < 0) {
        setError("Reorder volume must be 0 or a positive number.");
        return;
      }
      nextVolume = parsedVolume;
    }

    try {
      const res = await fetch(`/api/meds/${medId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track_inventory: true,
          current_volume: nextVolume,
          volume_unit: reorderDraft.unit,
          alert_days_before_reorder: Number(inventoryDraft.alert_days_before_reorder || 7),
          reorder_location: inventoryDraft.reorder_location || null,
        }),
      });
      const json = (await res.json()) as { med?: Med; error?: string };
      if (!res.ok || !json.med) {
        throw new Error(json.error ?? "Failed to log reorder");
      }
      setMed(json.med);
      loadInventoryDraft(json.med);
      setShowReorderForm(false);
      await refreshInventoryStatus();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to log reorder.");
      setStatus("error");
    }
  }

  useEffect(() => {
    if (!medId) return;
    let active = true;
    async function load() {
      try {
        const [medRes, eventsRes, inventoryRes] = await Promise.all([
          fetch(`/api/meds/${medId}`, { cache: "no-store" }),
          fetch(`/api/meds/${medId}/dose-events`, { cache: "no-store" }),
          fetch(`/api/med-inventory?medId=${encodeURIComponent(medId)}`, {
            cache: "no-store",
          }),
        ]);
        const medJson = (await medRes
          .json()
          .catch(() => ({ error: "Failed to load medication." }))) as {
          med?: Med;
          error?: string;
        };
        const eventsJson = eventsRes.ok
          ? ((await eventsRes.json().catch(() => ({ events: [] }))) as {
              events?: DoseEvent[];
            })
          : { events: [] };
        const inventoryJson = inventoryRes.ok
          ? ((await inventoryRes.json().catch(() => ({ items: [] }))) as {
              items?: InventoryStatus[];
            })
          : { items: [] };
        if (!medRes.ok) throw new Error(medJson.error ?? "Failed");

        if (active) {
          const nextMed = medJson.med;
          if (!nextMed) throw new Error("Unable to load medication.");
          setMed(nextMed);
          setEvents(trimLeadingInactive(eventsJson.events ?? []));
          loadInventoryDraft(nextMed);
          setInventoryStatus(
            (inventoryJson.items ?? []).find((item) => item.med_id === medId) ?? null,
          );
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

        {status === "ready" && med && (
          <>
            <section className="rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-6">
              <h2 className="text-lg font-semibold text-[var(--ink)]">
                Medication Notes
              </h2>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
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
            </section>

            <section className="rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--ink)]">
                    Inventory & Reorder
                  </h2>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Track remaining stock, set your reorder notification threshold, and log
                    replenishment quickly.
                  </p>
                </div>
                {inventoryStatus?.is_reorder_needed && (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                    Reorder soon
                  </span>
                )}
              </div>

              <p className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-3 text-sm text-[var(--muted)]">
                {formatInventoryStock(inventoryStatus, med)}
              </p>

              <div className="mt-4 grid gap-3">
                <label className="flex items-center gap-2 text-sm text-[var(--ink)]">
                  <input
                    type="checkbox"
                    checked={inventoryDraft.track_inventory}
                    onChange={(event) =>
                      setInventoryDraft({
                        ...inventoryDraft,
                        track_inventory: event.target.checked,
                      })
                    }
                  />
                  Enable reorder tracking for this med
                </label>
                <div className="grid gap-3 rounded-2xl border border-[var(--line)] bg-white p-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    Stock Input Mode
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setInventoryInputMode("manual")}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        inventoryInputMode === "manual"
                          ? "bg-[var(--accent)] text-white"
                          : "border border-[var(--line)] text-[var(--ink)]"
                      }`}
                    >
                      Manual stock
                    </button>
                    <button
                      type="button"
                      onClick={() => setInventoryInputMode("pill_pack")}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        inventoryInputMode === "pill_pack"
                          ? "bg-[var(--accent)] text-white"
                          : "border border-[var(--line)] text-[var(--ink)]"
                      }`}
                    >
                      Bottles + loose
                    </button>
                    <button
                      type="button"
                      onClick={() => setInventoryInputMode("liquid_pack")}
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        inventoryInputMode === "liquid_pack"
                          ? "bg-[var(--accent)] text-white"
                          : "border border-[var(--line)] text-[var(--ink)]"
                      }`}
                    >
                      Multi-bottle liquid
                    </button>
                  </div>
                  <p className="text-xs text-[var(--muted)]">
                    Bottle modes use your saved “amount per bottle” so entering bottle counts is
                    fast and unambiguous.
                  </p>
                  {inventoryInputMode !== "manual" && (
                    <label className="grid gap-1 text-sm text-[var(--ink)]">
                      <span className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                        Amount in one full bottle ({inventoryDraft.volume_unit})
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={inventoryDraft.amount_per_bottle}
                        onChange={(event) =>
                          setInventoryDraft({
                            ...inventoryDraft,
                            amount_per_bottle: event.target.value,
                          })
                        }
                        className="rounded-xl border border-[var(--line)] bg-white px-3 py-2"
                      />
                      <span className="text-xs text-[var(--muted)]">
                        Saved per medication and reused for future reorders.
                      </span>
                    </label>
                  )}
                  {inventoryInputMode === "pill_pack" && (
                    <div className="grid gap-2 md:grid-cols-2">
                      <label className="grid gap-1 text-sm text-[var(--ink)]">
                        <span className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                          Full bottles on hand
                        </span>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={pillCalcDraft.full_bottles}
                          onChange={(event) =>
                            setPillCalcDraft({
                              ...pillCalcDraft,
                              full_bottles: event.target.value,
                            })
                          }
                          className="rounded-xl border border-[var(--line)] bg-white px-3 py-2"
                        />
                      </label>
                      <label className="grid gap-1 text-sm text-[var(--ink)]">
                        <span className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                          Loose amount ({inventoryDraft.volume_unit})
                        </span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={pillCalcDraft.loose_amount}
                          onChange={(event) =>
                            setPillCalcDraft({
                              ...pillCalcDraft,
                              loose_amount: event.target.value,
                            })
                          }
                          className="rounded-xl border border-[var(--line)] bg-white px-3 py-2"
                        />
                      </label>
                    </div>
                  )}
                  {inventoryInputMode === "liquid_pack" && (
                    <div className="grid gap-2 md:grid-cols-2">
                      <label className="grid gap-1 text-sm text-[var(--ink)]">
                        <span className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                          Full bottles on hand
                        </span>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={liquidCalcDraft.full_bottles}
                          onChange={(event) =>
                            setLiquidCalcDraft({
                              ...liquidCalcDraft,
                              full_bottles: event.target.value,
                            })
                          }
                          className="rounded-xl border border-[var(--line)] bg-white px-3 py-2"
                        />
                      </label>
                      <label className="grid gap-1 text-sm text-[var(--ink)]">
                        <span className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                          Partial bottle amount ({inventoryDraft.volume_unit})
                        </span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={liquidCalcDraft.partial_bottle_volume}
                          onChange={(event) =>
                            setLiquidCalcDraft({
                              ...liquidCalcDraft,
                              partial_bottle_volume: event.target.value,
                            })
                          }
                          className="rounded-xl border border-[var(--line)] bg-white px-3 py-2"
                        />
                      </label>
                    </div>
                  )}
                  {inventoryInputMode !== "manual" && (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (inventoryCalculatedStock.value === null) return;
                          setInventoryDraft({
                            ...inventoryDraft,
                            current_volume: String(inventoryCalculatedStock.value),
                          });
                          setError(null);
                        }}
                        className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold text-[var(--ink)]"
                      >
                        Use calculated stock
                      </button>
                      <span className="text-xs text-[var(--muted)]">
                        {inventoryCalculatedStock.error
                          ? inventoryCalculatedStock.error
                          : `Calculated stock: ${
                              inventoryCalculatedStock.value ?? "—"
                            } ${inventoryDraft.volume_unit}`}
                      </span>
                      {!inventoryCalculatedStock.error && (
                        <span className="text-xs text-[var(--muted)]">
                          Formula: bottles × amount-per-bottle + partial/loose amount
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="grid gap-1 text-sm text-[var(--ink)]">
                    <span className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                      Current stock on hand
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={inventoryDraft.current_volume}
                      onChange={(event) =>
                        setInventoryDraft({
                          ...inventoryDraft,
                          current_volume: event.target.value,
                        })
                      }
                      className="rounded-xl border border-[var(--line)] bg-white px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm text-[var(--ink)]">
                    <span className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                      Stock unit
                    </span>
                    <select
                      value={inventoryDraft.volume_unit}
                      onChange={(event) =>
                        setInventoryDraft({
                          ...inventoryDraft,
                          volume_unit: event.target.value,
                        })
                      }
                      className="rounded-xl border border-[var(--line)] bg-white px-3 py-2"
                    >
                      {UNIT_OPTIONS.map((unit) => (
                        <option key={unit} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="grid gap-1 text-sm text-[var(--ink)]">
                    <span className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                      Reorder threshold (days left)
                    </span>
                    <input
                      type="number"
                      min="1"
                      value={inventoryDraft.alert_days_before_reorder}
                      onChange={(event) =>
                        setInventoryDraft({
                          ...inventoryDraft,
                          alert_days_before_reorder: event.target.value,
                        })
                      }
                      className="rounded-xl border border-[var(--line)] bg-white px-3 py-2"
                    />
                  </label>
                  <label className="grid gap-1 text-sm text-[var(--ink)]">
                    <span className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                      Reorder location (optional)
                    </span>
                    <input
                      type="text"
                      value={inventoryDraft.reorder_location}
                      onChange={(event) =>
                        setInventoryDraft({
                          ...inventoryDraft,
                          reorder_location: event.target.value,
                        })
                      }
                      className="rounded-xl border border-[var(--line)] bg-white px-3 py-2"
                    />
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleInventorySave}
                    className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white"
                  >
                    Save inventory settings
                  </button>
                  {inventorySavingStatus === "saving" && (
                    <span className="text-xs text-[var(--muted)]">Saving...</span>
                  )}
                  {inventorySavingStatus === "error" && (
                    <span className="text-xs text-red-600">Unable to save.</span>
                  )}
                </div>
              </div>

              {inventoryStatus?.is_reorder_needed && (
                <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                  <div className="font-semibold">Reorder recommended now</div>
                  <p className="mt-1 text-xs">
                    This med is at or below your reorder threshold.
                  </p>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => setShowReorderForm((prev) => !prev)}
                      className="rounded-full border border-amber-300 px-3 py-1.5 text-xs font-semibold text-amber-800"
                    >
                      I reordered
                    </button>
                  </div>
                  {showReorderForm && (
                    <div className="mt-3 grid gap-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setReorderInputMode("bottles")}
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            reorderInputMode === "bottles"
                              ? "bg-amber-600 text-white"
                              : "border border-amber-300 text-amber-800"
                          }`}
                        >
                          By bottles
                        </button>
                        <button
                          type="button"
                          onClick={() => setReorderInputMode("amount")}
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            reorderInputMode === "amount"
                              ? "bg-amber-600 text-white"
                              : "border border-amber-300 text-amber-800"
                          }`}
                        >
                          Manual amount
                        </button>
                      </div>
                      {reorderInputMode === "bottles" ? (
                        <div className="grid gap-2 md:grid-cols-2">
                          <label className="grid gap-1 text-xs text-amber-900">
                            <span className="font-semibold uppercase tracking-[0.12em]">
                              Full bottles received
                            </span>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={reorderBottleDraft.full_bottles}
                              onChange={(event) =>
                                setReorderBottleDraft((draft) => ({
                                  ...draft,
                                  full_bottles: event.target.value,
                                }))
                              }
                              className="rounded-xl border border-amber-300 bg-white px-3 py-2"
                            />
                          </label>
                          <label className="grid gap-1 text-xs text-amber-900">
                            <span className="font-semibold uppercase tracking-[0.12em]">
                              Extra amount ({inventoryDraft.volume_unit})
                            </span>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={reorderBottleDraft.extra_amount}
                              onChange={(event) =>
                                setReorderBottleDraft((draft) => ({
                                  ...draft,
                                  extra_amount: event.target.value,
                                }))
                              }
                              className="rounded-xl border border-amber-300 bg-white px-3 py-2"
                            />
                          </label>
                          <div className="text-xs text-amber-900 md:col-span-2">
                            Uses saved amount per bottle:{" "}
                            {inventoryDraft.amount_per_bottle || "not set"}{" "}
                            {inventoryDraft.volume_unit}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="New stock amount"
                            value={reorderDraft.volume}
                            onChange={(event) =>
                              setReorderDraft((draft) => ({
                                ...draft,
                                volume: event.target.value,
                              }))
                            }
                            className="rounded-xl border border-amber-300 bg-white px-3 py-2"
                          />
                          <select
                            value={reorderDraft.unit}
                            onChange={(event) =>
                              setReorderDraft((draft) => ({
                                ...draft,
                                unit: event.target.value,
                              }))
                            }
                            className="rounded-xl border border-amber-300 bg-white px-3 py-2"
                          >
                            {UNIT_OPTIONS.map((unit) => (
                              <option key={unit} value={unit}>
                                {unit}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}
                      <div>
                        <button
                          type="button"
                          onClick={handleReorderSubmit}
                          className="rounded-full bg-amber-600 px-3 py-2 text-xs font-semibold text-white"
                        >
                          Reset stock
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            <section className="rounded-[28px] border border-[var(--line)] bg-[var(--card)] p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--ink)]">
                  Dose Change Timeline
                </h2>
              </div>
              <div className="mt-4">
                {medId && <DoseEventForm medId={medId} onCreated={refreshPageData} />}
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
                              setEventDraft({
                                ...eventDraft,
                                effective_date: e.target.value,
                              })
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
                              {UNIT_OPTIONS.map((unit) => (
                                <option key={unit} value={unit}>
                                  {unit}
                                </option>
                              ))}
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
            </section>
          </>
        )}
      </main>
    </div>
  );
}
