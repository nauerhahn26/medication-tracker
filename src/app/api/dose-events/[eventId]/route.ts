import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { requireUser } from "@/lib/auth";

type Params = {
  params: Promise<{ eventId: string }>;
};

export async function DELETE(_request: Request, { params }: Params) {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const { eventId } = await params;

  await dbQuery("delete from dose_event where id = $1 and user_id = $2", [
    eventId,
    user.id,
  ]);

  return NextResponse.json({ ok: true });
}
