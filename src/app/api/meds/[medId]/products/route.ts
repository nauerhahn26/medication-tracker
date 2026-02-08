import { NextRequest, NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { medProductSchema } from "@/lib/validators";
import { requireUser } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ medId: string }> },
) {
  const { medId } = await context.params;
  const { user, response } = await requireUser();
  if (!user) return response!;
  const body = await request.json();
  const parsed = medProductSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const product = parsed.data;
  const rows = await dbQuery<{ id: string }>(
    `insert into med_product (user_id, med_id, brand_name, product_url, notes)
     values ($1, $2, $3, $4, $5)
     returning id`,
    [
      user.id,
      medId,
      product.brand_name ?? null,
      product.product_url ?? null,
      product.notes ?? null,
    ],
  );

  return NextResponse.json({ id: rows[0]?.id }, { status: 201 });
}
