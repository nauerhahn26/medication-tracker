import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { dailyQuerySchema } from "@/lib/validators";
import { requireUser } from "@/lib/auth";

export async function GET(request: Request) {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const url = new URL(request.url);
  const parsed = dailyQuerySchema.safeParse({
    date: url.searchParams.get("date"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid date", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const date = parsed.data.date;
  const rows = await dbQuery<{
    med_id: string;
    med_name: string;
    med_product_id: string | null;
    brand_name: string | null;
    total_daily_amount: number | null;
    unit: string;
    per_dose_amount: number | null;
    frequency_code: string | null;
    notes: string | null;
  }>(
    `select
        m.id as med_id,
        m.name as med_name,
        de.med_product_id,
        mp.brand_name,
        de.total_daily_amount,
        de.unit,
        de.per_dose_amount,
        de.frequency_code,
        de.notes
     from med m
     join lateral (
       select *
       from dose_event de
       where de.med_id = m.id and de.effective_date <= $1 and de.user_id = $2
       order by de.effective_date desc
       limit 1
     ) de on true
     left join med_product mp on mp.id = de.med_product_id
     where m.user_id = $2
       and de.total_daily_amount is not null
       and de.total_daily_amount <> 0
     order by m.name`,
    [date, user.id],
  );

  return NextResponse.json({ date, meds: rows });
}
