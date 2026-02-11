import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export async function GET() {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const rows = await dbQuery<{
    last_full_response: unknown;
    med_fingerprints: unknown;
  }>(
    "select last_full_response, med_fingerprints from med_interaction_state where user_id = $1",
    [user.id],
  );
  return NextResponse.json({
    last_full_response: rows[0]?.last_full_response ?? null,
    med_fingerprints: rows[0]?.med_fingerprints ?? [],
  });
}
