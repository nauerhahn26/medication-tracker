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
  let events: Array<{
    id: string;
    med_id: string;
    med_product_id: string | null;
    effective_date: string;
    total_daily_amount: number | null;
    unit: string;
    per_dose_amount: number | null;
    frequency_code: string | null;
    notes: string | null;
  }>;
  try {
    events = await dbQuery(
      `select *
       from dose_event
       where med_id = $1 and user_id = $2
       order by effective_date asc`,
      [medId, user.id],
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const code =
      typeof error === "object" && error !== null && "code" in error
        ? String((error as { code?: unknown }).code)
        : "";
    const missingUserIdColumn =
      code === "42703" || message.includes('column "user_id" does not exist');
    if (!missingUserIdColumn) throw error;

    events = await dbQuery(
      `select de.*
       from dose_event de
       join med m on m.id = de.med_id
       where de.med_id = $1 and m.user_id = $2
       order by de.effective_date asc`,
      [medId, user.id],
    );
  }

  return NextResponse.json({ events });
}
