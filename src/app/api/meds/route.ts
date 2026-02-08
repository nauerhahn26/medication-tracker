import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { medSchema } from "@/lib/validators";

export async function GET() {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const meds = await dbQuery<{
    id: string;
    name: string;
    standard_code_system: string | null;
    standard_code: string | null;
    is_supplement: boolean;
    notes: string | null;
  }>("select * from med where user_id = $1 order by name", [user.id]);

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
