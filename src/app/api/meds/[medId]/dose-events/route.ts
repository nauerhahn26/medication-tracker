import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { requireUser } from "@/lib/auth";

type Params = {
  params: Promise<{ medId: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const { medId } = await params;
  const events = await dbQuery<{
    id: string;
    med_id: string;
    med_product_id: string | null;
    effective_date: string;
    total_daily_amount: number | null;
    unit: string;
    per_dose_amount: number | null;
    frequency_code: string | null;
    notes: string | null;
  }>(
    `select *
     from dose_event
     where med_id = $1 and user_id = $2
     order by effective_date asc`,
    [medId, user.id],
  );

  return NextResponse.json({ events });
}
