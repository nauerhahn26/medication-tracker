import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { medUpdateSchema } from "@/lib/validators";

type Params = {
  params: Promise<{ medId: string }>;
};

type MedRecord = {
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
};

async function getMed(userId: string, medId: string) {
  const rows = await dbQuery<MedRecord>(
    `select
       m.id,
       m.name,
       m.standard_code_system,
       m.standard_code,
       m.is_supplement,
       m.notes,
       m.med_type,
       m.target,
       m.delivery_mechanism,
       m.result,
       m.source,
       m.dose_at_13kg,
       m.brand,
       m.supporting_research,
       coalesce(mi.track_inventory, false) as track_inventory,
       mi.current_volume,
       mi.volume_unit,
       coalesce(mi.alert_days_before_reorder, 7) as alert_days_before_reorder,
       mi.reorder_location
     from med m
     left join med_inventory mi on mi.med_id = m.id
     where m.id = $1 and m.user_id = $2`,
    [medId, userId],
  );
  return rows[0];
}

export async function GET(_request: Request, { params }: Params) {
  const { user, response } = await requireUser();
  if (!user) return response!;

  const { medId } = await params;
  const med = await getMed(user.id, medId);
  if (!med) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ med });
}

export async function PATCH(request: Request, { params }: Params) {
  const { user, response } = await requireUser();
  if (!user) return response!;

  const { medId } = await params;
  const body = (await request.json()) as unknown;
  const parsed = medUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const payload = parsed.data;
  const hasAnyUpdate =
    payload.name !== undefined ||
    payload.standard_code_system !== undefined ||
    payload.standard_code !== undefined ||
    payload.is_supplement !== undefined ||
    payload.notes !== undefined ||
    payload.track_inventory !== undefined ||
    payload.current_volume !== undefined ||
    payload.volume_unit !== undefined ||
    payload.alert_days_before_reorder !== undefined ||
    payload.reorder_location !== undefined;

  if (!hasAnyUpdate) {
    return NextResponse.json({ error: "No update fields provided." }, { status: 400 });
  }

  const med = await getMed(user.id, medId);
  if (!med) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (payload.name !== undefined) {
    await dbQuery(
      `update med
       set name = $1
       where id = $2 and user_id = $3`,
      [payload.name, medId, user.id],
    );
  }

  if (payload.standard_code_system !== undefined) {
    await dbQuery(
      `update med
       set standard_code_system = $1
       where id = $2 and user_id = $3`,
      [payload.standard_code_system, medId, user.id],
    );
  }

  if (payload.standard_code !== undefined) {
    await dbQuery(
      `update med
       set standard_code = $1
       where id = $2 and user_id = $3`,
      [payload.standard_code, medId, user.id],
    );
  }

  if (payload.is_supplement !== undefined) {
    await dbQuery(
      `update med
       set is_supplement = $1
       where id = $2 and user_id = $3`,
      [payload.is_supplement, medId, user.id],
    );
  }

  if (payload.notes !== undefined) {
    await dbQuery(
      `update med
       set notes = $1
       where id = $2 and user_id = $3`,
      [payload.notes, medId, user.id],
    );
  }

  if (
    payload.track_inventory !== undefined ||
    payload.current_volume !== undefined ||
    payload.volume_unit !== undefined ||
    payload.alert_days_before_reorder !== undefined ||
    payload.reorder_location !== undefined
  ) {
    const nextTrackInventory =
      payload.track_inventory === undefined
        ? med.track_inventory
        : payload.track_inventory;
    const nextCurrentVolume =
      payload.current_volume === undefined ? med.current_volume : payload.current_volume;
    const nextVolumeUnit =
      payload.volume_unit === undefined ? med.volume_unit : payload.volume_unit;
    const nextAlertDays =
      payload.alert_days_before_reorder === undefined
        ? med.alert_days_before_reorder ?? 7
        : payload.alert_days_before_reorder;
    const nextReorderLocation =
      payload.reorder_location === undefined
        ? med.reorder_location
        : payload.reorder_location;
    await dbQuery(
      `insert into med_inventory (
         med_id,
         user_id,
         track_inventory,
         current_volume,
         volume_unit,
         alert_days_before_reorder,
         reorder_location
       ) values ($1, $2, $3, $4, $5, $6, $7)
       on conflict (med_id) do update set
         track_inventory = $3,
         current_volume = $4,
         volume_unit = $5,
         alert_days_before_reorder = $6,
         reorder_location = $7,
         updated_at = now()`,
      [
        medId,
        user.id,
        nextTrackInventory,
        nextCurrentVolume,
        nextVolumeUnit,
        nextAlertDays,
        nextReorderLocation,
      ],
    );
  }

  const updated = await getMed(user.id, medId);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ med: updated });
}
