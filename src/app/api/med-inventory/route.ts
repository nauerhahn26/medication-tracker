import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { requireUser } from "@/lib/auth";

type InventoryQueryRow = {
  med_id: string;
  med_name: string;
  track_inventory: boolean;
  current_volume: number | null;
  volume_unit: string | null;
  alert_days_before_reorder: number | null;
  reorder_location: string | null;
  total_daily_amount: number | null;
  dose_unit: string | null;
  effective_date: string | null;
};

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

function normalize(value: string | null | undefined): string | null {
  if (!value) return null;
  return value.trim().toLowerCase();
};

function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function toDate(days: number): string {
  const base = new Date();
  const target = new Date(base);
  target.setDate(target.getDate() + Math.max(0, Math.floor(days)));
  return target.toISOString().slice(0, 10);
}

export async function GET(request: Request) {
  const { user, response } = await requireUser();
  if (!user) return response!;

  const url = new URL(request.url);
  const medId = url.searchParams.get("medId")?.trim() || null;

  const baseQuery = `select
    m.id as med_id,
    m.name as med_name,
    coalesce(mi.track_inventory, false) as track_inventory,
    mi.current_volume,
    mi.volume_unit,
    coalesce(mi.alert_days_before_reorder, 7) as alert_days_before_reorder,
    mi.reorder_location,
    de.total_daily_amount,
    de.unit as dose_unit,
    de.effective_date
  from med m
  left join med_inventory mi on mi.med_id = m.id
  left join lateral (
    select total_daily_amount, unit, effective_date
    from dose_event
    where med_id = m.id
      and user_id = $1
      and effective_date <= current_date
    order by effective_date desc
    limit 1
  ) de on true
  where m.user_id = $1`;

  const params: Array<string> = [user.id];
  const query = medId ? `${baseQuery} and m.id = $2` : baseQuery;
  if (medId) params.push(medId);

  let rows: InventoryQueryRow[];
  try {
    rows = await dbQuery<InventoryQueryRow>(query, params);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const code =
      typeof error === "object" && error !== null && "code" in error
        ? String((error as { code?: unknown }).code)
        : "";
    const inventorySchemaMismatch =
      code === "42P01" ||
      code === "42703" ||
      message.includes('relation "med_inventory" does not exist') ||
      message.includes('column "user_id" does not exist');
    if (!inventorySchemaMismatch) throw error;

    const fallbackBaseQuery = `select
      m.id as med_id,
      m.name as med_name,
      false as track_inventory,
      null::numeric as current_volume,
      null::text as volume_unit,
      7 as alert_days_before_reorder,
      null::text as reorder_location,
      de.total_daily_amount,
      de.unit as dose_unit,
      de.effective_date
    from med m
    left join lateral (
      select total_daily_amount, unit, effective_date
      from dose_event
      where med_id = m.id
        and effective_date <= current_date
      order by effective_date desc
      limit 1
    ) de on true
    where m.user_id = $1`;
    const fallbackQuery = medId ? `${fallbackBaseQuery} and m.id = $2` : fallbackBaseQuery;
    rows = await dbQuery<InventoryQueryRow>(fallbackQuery, params);
  }

  const items: InventoryItem[] = rows.map((row) => {
    const trackInventory = row.track_inventory;
    const threshold = toNumber(row.alert_days_before_reorder) ?? 7;
    const stock = toNumber(row.current_volume);
    const dailyAmount = toNumber(row.total_daily_amount);
    const stockUnit = normalize(row.volume_unit);
    const dailyUnit = normalize(row.dose_unit);

    if (!trackInventory) {
      return {
        med_id: row.med_id,
        med_name: row.med_name,
        status: "not_tracked",
        latest_effective_date: row.effective_date,
        latest_total_daily_amount: row.total_daily_amount,
        latest_dose_unit: row.dose_unit,
        current_volume: stock,
        volume_unit: row.volume_unit,
        reorder_threshold_days: threshold,
        days_remaining: null,
        estimated_depletion_date: null,
        is_reorder_needed: false,
        reorder_location: row.reorder_location,
        track_inventory: false,
      };
    }

    if (stock === null || stock <= 0) {
      return {
        med_id: row.med_id,
        med_name: row.med_name,
        status: "missing_stock",
        latest_effective_date: row.effective_date,
        latest_total_daily_amount: row.total_daily_amount,
        latest_dose_unit: row.dose_unit,
        current_volume: stock,
        volume_unit: row.volume_unit,
        reorder_threshold_days: threshold,
        days_remaining: null,
        estimated_depletion_date: null,
        is_reorder_needed: true,
        reorder_location: row.reorder_location,
        track_inventory: true,
      };
    }

    if (dailyAmount === null || dailyAmount <= 0) {
      return {
        med_id: row.med_id,
        med_name: row.med_name,
        status: "inactive",
        latest_effective_date: row.effective_date,
        latest_total_daily_amount: row.total_daily_amount,
        latest_dose_unit: row.dose_unit,
        current_volume: stock,
        volume_unit: row.volume_unit,
        reorder_threshold_days: threshold,
        days_remaining: null,
        estimated_depletion_date: null,
        is_reorder_needed: false,
        reorder_location: row.reorder_location,
        track_inventory: true,
      };
    }

    if (!stockUnit || !dailyUnit || stockUnit !== dailyUnit) {
      return {
        med_id: row.med_id,
        med_name: row.med_name,
        status: "unit_mismatch",
        latest_effective_date: row.effective_date,
        latest_total_daily_amount: row.total_daily_amount,
        latest_dose_unit: row.dose_unit,
        current_volume: stock,
        volume_unit: row.volume_unit,
        reorder_threshold_days: threshold,
        days_remaining: null,
        estimated_depletion_date: null,
        is_reorder_needed: true,
        reorder_location: row.reorder_location,
        track_inventory: true,
      };
    }

    const daysRemaining = dailyAmount > 0 ? stock / dailyAmount : null;
    if (daysRemaining === null || !Number.isFinite(daysRemaining) || daysRemaining <= 0) {
      return {
        med_id: row.med_id,
        med_name: row.med_name,
        status: "unknown",
        latest_effective_date: row.effective_date,
        latest_total_daily_amount: row.total_daily_amount,
        latest_dose_unit: row.dose_unit,
        current_volume: stock,
        volume_unit: row.volume_unit,
        reorder_threshold_days: threshold,
        days_remaining: null,
        estimated_depletion_date: null,
        is_reorder_needed: false,
        reorder_location: row.reorder_location,
        track_inventory: true,
      };
    }

    const roundedDays = Number(daysRemaining.toFixed(1));
    const status = roundedDays <= threshold ? "low" : "ok";
    return {
      med_id: row.med_id,
      med_name: row.med_name,
      status,
      latest_effective_date: row.effective_date,
      latest_total_daily_amount: row.total_daily_amount,
      latest_dose_unit: row.dose_unit,
      current_volume: stock,
      volume_unit: row.volume_unit,
      reorder_threshold_days: threshold,
      days_remaining: roundedDays,
      estimated_depletion_date: toDate(roundedDays),
      is_reorder_needed: roundedDays <= threshold,
      reorder_location: row.reorder_location,
      track_inventory: true,
    };
  });

  return NextResponse.json({ items });
}
