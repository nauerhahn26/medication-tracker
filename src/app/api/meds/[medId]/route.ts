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
  const rows = await dbQuery<{
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
  }>("select * from med where id = $1 and user_id = $2", [medId, user.id]);

  if (!rows[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ med: rows[0] });
}
