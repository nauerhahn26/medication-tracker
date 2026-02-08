import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const rows = await dbQuery<{
    id: string;
    med_id: string;
    effective_date: string;
    total_daily_amount: number | null;
    unit: string;
  }>(
    `select id, med_id, effective_date, total_daily_amount, unit
     from dose_event
     where user_id = $1
     order by effective_date asc`,
    [user.id],
  );

  return NextResponse.json({ events: rows });
}
