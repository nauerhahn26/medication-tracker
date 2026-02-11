import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const rows = await dbQuery<{ context: unknown }>(
    "select context from patient_context where user_id = $1",
    [user.id],
  );
  return NextResponse.json({ context: rows[0]?.context ?? null });
}

export async function PUT(request: Request) {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const body = (await request.json()) as { context: unknown };
  if (!body || typeof body.context !== "object") {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }
  await dbQuery(
    `insert into patient_context (user_id, context)
     values ($1, $2)
     on conflict (user_id)
     do update set context = excluded.context,
                   updated_at = now()`,
    [user.id, JSON.stringify(body.context)],
  );
  return NextResponse.json({ ok: true });
}
