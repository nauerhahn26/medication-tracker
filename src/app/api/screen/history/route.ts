import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const rows = await dbQuery<{
    id: string;
    mode: "full" | "delta";
    model: string;
    created_at: string;
    response: unknown;
  }>(
    `select id, mode, model, created_at, response
     from med_interaction_screen
     where user_id = $1
     order by created_at desc
     limit 10`,
    [user.id],
  );
  return NextResponse.json({ runs: rows });
}
