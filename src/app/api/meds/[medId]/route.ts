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
  pills_per_bottle: number | null;
  amount_per_pill: number | null;
  amount_per_bottle: number | null;
};

function parsePgError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code?: unknown }).code)
      : "";
  return { code, message };
}

async function ensureInventorySchemaColumns() {
  await dbQuery(`alter table med_inventory add column if not exists user_id uuid`);
  await dbQuery(
    `alter table med_inventory add column if not exists track_inventory boolean not null default false`,
  );
  await dbQuery(`alter table med_inventory add column if not exists current_volume numeric`);
  await dbQuery(`alter table med_inventory add column if not exists volume_unit text`);
  await dbQuery(
    `alter table med_inventory add column if not exists alert_days_before_reorder integer not null default 10`,
  );
  await dbQuery(`alter table med_inventory add column if not exists reorder_location text`);
  await dbQuery(`alter table med_inventory add column if not exists pills_per_bottle numeric`);
  await dbQuery(`alter table med_inventory add column if not exists amount_per_pill numeric`);
  await dbQuery(`alter table med_inventory add column if not exists amount_per_bottle numeric`);
  await dbQuery(`alter table med_inventory add column if not exists updated_at timestamptz default now()`);
}

function isMissingInventoryColumn(error: { code: string; message: string }) {
  return error.code === "42703" && error.message.includes('relation "med_inventory"');
}

function isConflictTargetMissing(error: { code: string; message: string }) {
  return (
    error.code === "42P10" ||
    error.message.includes("there is no unique or exclusion constraint matching the ON CONFLICT specification")
  );
}

async function getMed(userId: string, medId: string) {
  let rows: MedRecord[];
  try {
    rows = await dbQuery<MedRecord>(
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
         coalesce(mi.alert_days_before_reorder, 10) as alert_days_before_reorder,
         mi.reorder_location,
         mi.pills_per_bottle,
         mi.amount_per_pill,
         mi.amount_per_bottle
       from med m
       left join med_inventory mi on mi.med_id = m.id
       where m.id = $1 and m.user_id = $2`,
      [medId, userId],
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const code =
      typeof error === "object" && error !== null && "code" in error
        ? String((error as { code?: unknown }).code)
        : "";
    const inventorySchemaMismatch =
      code === "42P01" ||
      (code === "42703" && message.includes('relation "med_inventory"')) ||
      message.includes('relation "med_inventory" does not exist');
    if (!inventorySchemaMismatch) throw error;

    rows = await dbQuery<MedRecord>(
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
         false as track_inventory,
         null::numeric as current_volume,
         null::text as volume_unit,
         10 as alert_days_before_reorder,
         null::text as reorder_location,
         null::numeric as pills_per_bottle,
         null::numeric as amount_per_pill,
         null::numeric as amount_per_bottle
       from med m
       where m.id = $1 and m.user_id = $2`,
      [medId, userId],
    );
  }
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
    payload.reorder_location !== undefined ||
    payload.pills_per_bottle !== undefined ||
    payload.amount_per_pill !== undefined ||
    payload.amount_per_bottle !== undefined;

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
    payload.reorder_location !== undefined ||
    payload.pills_per_bottle !== undefined ||
    payload.amount_per_pill !== undefined ||
    payload.amount_per_bottle !== undefined
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
        ? med.alert_days_before_reorder ?? 10
        : payload.alert_days_before_reorder;
    const nextReorderLocation =
      payload.reorder_location === undefined
        ? med.reorder_location
        : payload.reorder_location;
    const nextAmountPerBottle =
      payload.amount_per_bottle === undefined
        ? med.amount_per_bottle
        : payload.amount_per_bottle;
    const nextPillsPerBottle =
      payload.pills_per_bottle === undefined
        ? med.pills_per_bottle
        : payload.pills_per_bottle;
    const nextAmountPerPill =
      payload.amount_per_pill === undefined
        ? med.amount_per_pill
        : payload.amount_per_pill;
    const upsertWithUserId = () =>
      dbQuery(
        `insert into med_inventory (
           med_id,
           user_id,
           track_inventory,
           current_volume,
           volume_unit,
           alert_days_before_reorder,
           reorder_location,
           pills_per_bottle,
           amount_per_pill,
           amount_per_bottle
         ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         on conflict (med_id) do update set
           user_id = excluded.user_id,
           track_inventory = excluded.track_inventory,
           current_volume = excluded.current_volume,
           volume_unit = excluded.volume_unit,
           alert_days_before_reorder = excluded.alert_days_before_reorder,
           reorder_location = excluded.reorder_location,
           pills_per_bottle = excluded.pills_per_bottle,
           amount_per_pill = excluded.amount_per_pill,
           amount_per_bottle = excluded.amount_per_bottle,
           updated_at = now()`,
        [
          medId,
          user.id,
          nextTrackInventory,
          nextCurrentVolume,
          nextVolumeUnit,
          nextAlertDays,
          nextReorderLocation,
          nextPillsPerBottle,
          nextAmountPerPill,
          nextAmountPerBottle,
        ],
      );

    const upsertWithoutUserId = () =>
      dbQuery(
        `insert into med_inventory (
           med_id,
           track_inventory,
           current_volume,
           volume_unit,
           alert_days_before_reorder,
           reorder_location,
           pills_per_bottle,
           amount_per_pill,
           amount_per_bottle
         ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         on conflict (med_id) do update set
           track_inventory = excluded.track_inventory,
           current_volume = excluded.current_volume,
           volume_unit = excluded.volume_unit,
           alert_days_before_reorder = excluded.alert_days_before_reorder,
           reorder_location = excluded.reorder_location,
           pills_per_bottle = excluded.pills_per_bottle,
           amount_per_pill = excluded.amount_per_pill,
           amount_per_bottle = excluded.amount_per_bottle,
           updated_at = now()`,
        [
          medId,
          nextTrackInventory,
          nextCurrentVolume,
          nextVolumeUnit,
          nextAlertDays,
          nextReorderLocation,
          nextPillsPerBottle,
          nextAmountPerPill,
          nextAmountPerBottle,
        ],
      );

    const manualUpsertWithUserId = () =>
      dbQuery(
        `with updated as (
           update med_inventory
              set user_id = $2,
                  track_inventory = $3,
                  current_volume = $4,
                  volume_unit = $5,
                  alert_days_before_reorder = $6,
                  reorder_location = $7,
                  pills_per_bottle = $8,
                  amount_per_pill = $9,
                  amount_per_bottle = $10,
                  updated_at = now()
            where med_id = $1
            returning med_id
         )
         insert into med_inventory (
           med_id,
           user_id,
           track_inventory,
           current_volume,
           volume_unit,
           alert_days_before_reorder,
           reorder_location,
           pills_per_bottle,
           amount_per_pill,
           amount_per_bottle
         )
         select $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
         where not exists (select 1 from updated)`,
        [
          medId,
          user.id,
          nextTrackInventory,
          nextCurrentVolume,
          nextVolumeUnit,
          nextAlertDays,
          nextReorderLocation,
          nextPillsPerBottle,
          nextAmountPerPill,
          nextAmountPerBottle,
        ],
      );

    const manualUpsertWithoutUserId = () =>
      dbQuery(
        `with updated as (
           update med_inventory
              set track_inventory = $2,
                  current_volume = $3,
                  volume_unit = $4,
                  alert_days_before_reorder = $5,
                  reorder_location = $6,
                  pills_per_bottle = $7,
                  amount_per_pill = $8,
                  amount_per_bottle = $9,
                  updated_at = now()
            where med_id = $1
            returning med_id
         )
         insert into med_inventory (
           med_id,
           track_inventory,
           current_volume,
           volume_unit,
           alert_days_before_reorder,
           reorder_location,
           pills_per_bottle,
           amount_per_pill,
           amount_per_bottle
         )
         select $1, $2, $3, $4, $5, $6, $7, $8, $9
         where not exists (select 1 from updated)`,
        [
          medId,
          nextTrackInventory,
          nextCurrentVolume,
          nextVolumeUnit,
          nextAlertDays,
          nextReorderLocation,
          nextPillsPerBottle,
          nextAmountPerPill,
          nextAmountPerBottle,
        ],
      );

    try {
      await upsertWithUserId();
    } catch (error) {
      const first = parsePgError(error);
      const missingInventoryTable =
        first.code === "42P01" ||
        first.message.includes('relation "med_inventory" does not exist');
      const missingInventoryUserId =
        first.code === "42703" ||
        first.message.includes('column "user_id" of relation "med_inventory" does not exist');

      if (missingInventoryTable) {
        await dbQuery(
          `create table if not exists med_inventory (
             med_id uuid primary key references med(id) on delete cascade,
             user_id uuid,
             track_inventory boolean not null default false,
             current_volume numeric,
             volume_unit text,
             alert_days_before_reorder integer not null default 10,
             reorder_location text,
             pills_per_bottle numeric,
             amount_per_pill numeric,
             amount_per_bottle numeric,
             updated_at timestamptz default now(),
             check (alert_days_before_reorder > 0)
           )`,
        );
        await upsertWithUserId();
      } else if (missingInventoryUserId) {
        await ensureInventorySchemaColumns();
        await upsertWithoutUserId();
      } else if (isMissingInventoryColumn(first)) {
        await ensureInventorySchemaColumns();
        await upsertWithUserId();
      } else if (isConflictTargetMissing(first)) {
        try {
          await manualUpsertWithUserId();
        } catch (secondError) {
          const second = parsePgError(secondError);
          if (
            second.code === "42703" &&
            second.message.includes('column "user_id" of relation "med_inventory" does not exist')
          ) {
            await manualUpsertWithoutUserId();
          } else {
            throw secondError;
          }
        }
      } else {
        throw error;
      }
    }
  }

  const updated = await getMed(user.id, medId);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ med: updated });
}
