"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type InventoryItem = {
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

type InventoryResponse = {
  items: InventoryItem[];
};

function formatUsage(item: InventoryItem) {
  if (item.current_volume === null || item.latest_total_daily_amount === null) {
    return "No usage data yet";
  }
  return `${item.current_volume} ${item.volume_unit ?? ""} at ${item.latest_total_daily_amount} ${
    item.latest_dose_unit ?? ""
  }/day`;
}

export default function InventoryAlertsPanel() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch("/api/med-inventory", { cache: "no-store" });
        const json = (await res.json()) as InventoryResponse;
        if (!res.ok) {
          throw new Error("Unable to load inventory status.");
        }
        if (active) {
          setItems(json.items);
          setStatus("ready");
        }
      } catch {
        if (active) {
          setStatus("error");
          setErrorMessage("Unable to load inventory alerts.");
        }
      }
    }
    load();
    function refresh() {
      load();
    }
    window.addEventListener("meds:updated", refresh);
    return () => {
      active = false;
      window.removeEventListener("meds:updated", refresh);
    };
  }, []);

  const notifications = useMemo(() => {
    return items
      .filter(
        (item) =>
          item.track_inventory &&
          (item.is_reorder_needed ||
            item.status === "unit_mismatch" ||
            item.status === "missing_stock"),
      )
      .sort((a, b) => {
        const aDays = a.days_remaining ?? Number.POSITIVE_INFINITY;
        const bDays = b.days_remaining ?? Number.POSITIVE_INFINITY;
        return aDays - bDays;
      });
  }, [items]);

  return (
    <section className="rounded-[32px] border border-[var(--line)] bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--ink)]">
            Reorder Alerts
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Meds near refill date based on current dose and remaining volume.
          </p>
        </div>
        {notifications.length > 0 ? (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            {notifications.length} alert
          </span>
        ) : null}
      </div>

      {status === "loading" && (
        <p className="mt-4 text-sm text-[var(--muted)]">Loading status…</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">{errorMessage ?? "Load error."}</p>
      )}

      {status === "ready" && notifications.length === 0 && (
        <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
          Great — no tracked meds are currently close to reorder.
        </p>
      )}

      {status === "ready" && notifications.length > 0 && (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {notifications.map((item) => (
            <div
              key={item.med_id}
              className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <Link
                  href={`/meds/${item.med_id}`}
                  className="text-base font-semibold text-[var(--ink)]"
                >
                  {item.med_name}
                </Link>
                <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-red-700">
                  {item.status === "missing_stock" ? "No stock" : "Low stock"}
                </span>
              </div>
              <p className="mt-2 text-[var(--muted)]">
                {formatUsage(item)}
              </p>
              <p className="mt-2 text-[var(--muted)]">
                Est. days remaining: {item.days_remaining ?? "—"}
                {item.estimated_depletion_date
                  ? ` · likely runs out around ${item.estimated_depletion_date}`
                  : ""}
              </p>
              {item.reorder_location ? (
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Reorder from: {item.reorder_location}
                </p>
              ) : null}
              <div className="mt-3">
                <Link
                  href={`/meds/${item.med_id}`}
                  className="inline-flex rounded-full bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Update in med page
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
