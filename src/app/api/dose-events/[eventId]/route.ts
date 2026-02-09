import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { requireUser } from "@/lib/auth";

type Params = {
  params: Promise<{ eventId: string }>;
};

export async function DELETE(_request: Request, { params }: Params) {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const { eventId } = await params;

  await dbQuery("delete from dose_event where id = $1 and user_id = $2", [
    eventId,
    user.id,
  ]);

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request, { params }: Params) {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const { eventId } = await params;
  const body = (await request.json()) as {
    effective_date?: string;
    total_daily_amount?: number | null;
    unit?: string;
    per_dose_amount?: number | null;
    frequency_code?: string | null;
    notes?: string | null;
  };

  if (!body.effective_date || !body.unit) {
    return NextResponse.json(
      { error: "effective_date and unit are required." },
      { status: 400 },
    );
  }

  const totalDaily = body.total_daily_amount === 0 ? null : body.total_daily_amount ?? null;

  await dbQuery(
    `update dose_event
     set effective_date = $1,
         total_daily_amount = $2,
         unit = $3,
         per_dose_amount = $4,
         frequency_code = $5,
         notes = $6
     where id = $7 and user_id = $8`,
    [
      body.effective_date,
      totalDaily,
      body.unit,
      body.per_dose_amount ?? null,
      body.frequency_code ?? null,
      body.notes ?? null,
      eventId,
      user.id,
    ],
  );

  return NextResponse.json({ ok: true });
}
