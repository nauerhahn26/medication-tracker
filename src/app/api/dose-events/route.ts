import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { doseEventSchema } from "@/lib/validators";
import { requireUser } from "@/lib/auth";

export async function POST(request: Request) {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const body = await request.json();
  const parsed = doseEventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const event = parsed.data;
  const totalDaily =
    event.total_daily_amount === 0 ? null : event.total_daily_amount ?? null;
  const rows = await dbQuery<{ id: string }>(
    `insert into dose_event (
      user_id,
      med_id,
      med_product_id,
      effective_date,
      total_daily_amount,
      unit,
      per_dose_amount,
      frequency_code,
      notes
    )
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    returning id`,
    [
      user.id,
      event.med_id,
      event.med_product_id ?? null,
      event.effective_date,
      totalDaily,
      event.unit,
      event.per_dose_amount ?? null,
      event.frequency_code ?? null,
      event.notes ?? null,
    ],
  );

  return NextResponse.json({ id: rows[0]?.id }, { status: 201 });
}
