import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export async function GET(request: Request) {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const url = new URL(request.url);
  const query = url.searchParams.get("query")?.trim() ?? "";
  if (!query) {
    return NextResponse.json({ meds: [] });
  }

  const rows = await dbQuery<{ id: string; name: string }>(
    `select id, name
     from med
     where user_id = $2 and name ilike $1
     order by name
     limit 20`,
    [`%${query}%`, user.id],
  );

  return NextResponse.json({ meds: rows });
}
