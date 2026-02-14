import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { medSchema } from "@/lib/validators";

export async function GET() {
  const { user, response } = await requireUser();
  if (!user) return response!;
  let meds: Array<{
    id: string;
    name: string;
    standard_code_system: string | null;
    standard_code: string | null;
    is_supplement: boolean;
    notes: string | null;
    track_inventory: boolean;
    current_volume: number | null;
    volume_unit: string | null;
    alert_days_before_reorder: number | null;
    reorder_location: string | null;
    amount_per_bottle: number | null;
  }>;

  try {
    meds = await dbQuery(
      `select
         m.id,
         m.name,
         m.standard_code_system,
         m.standard_code,
         m.is_supplement,
         m.notes,
         coalesce(mi.track_inventory, false) as track_inventory,
         mi.current_volume,
         mi.volume_unit,
         coalesce(mi.alert_days_before_reorder, 7) as alert_days_before_reorder,
         mi.reorder_location,
         mi.amount_per_bottle
       from med m
       left join med_inventory mi on mi.med_id = m.id
       where m.user_id = $1
       order by m.name`,
      [user.id],
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const code =
      typeof error === "object" && error !== null && "code" in error
        ? String((error as { code?: unknown }).code)
        : "";
    const inventorySchemaMismatch =
      code === "42P01" ||
      (code === "42703" && message.includes('column "amount_per_bottle" does not exist')) ||
      message.includes('relation "med_inventory" does not exist');
    if (!inventorySchemaMismatch) throw error;

    meds = await dbQuery(
      `select
         m.id,
         m.name,
         m.standard_code_system,
         m.standard_code,
         m.is_supplement,
         m.notes,
         false as track_inventory,
         null::numeric as current_volume,
         null::text as volume_unit,
         7 as alert_days_before_reorder,
         null::text as reorder_location,
         null::numeric as amount_per_bottle
       from med m
       where m.user_id = $1
       order by m.name`,
      [user.id],
    );
  }

  return NextResponse.json({ meds });
}

export async function POST(request: Request) {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const body = await request.json();
  const parsed = medSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const med = parsed.data;
  const rows = await dbQuery<{ id: string }>(
    `insert into med (user_id, name, standard_code_system, standard_code, is_supplement, notes)
     values ($1, $2, $3, $4, $5, $6)
     on conflict (user_id, name)
     do update set standard_code_system = excluded.standard_code_system,
                   standard_code = excluded.standard_code,
                   is_supplement = excluded.is_supplement,
                   notes = excluded.notes
     returning id`,
    [
      user.id,
      med.name,
      med.standard_code_system ?? null,
      med.standard_code ?? null,
      med.is_supplement ?? true,
      med.notes ?? null,
    ],
  );

  return NextResponse.json({ id: rows[0]?.id }, { status: 201 });
}
