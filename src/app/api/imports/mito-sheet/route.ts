import { NextResponse } from "next/server";
import { parseMitoSheet } from "@/lib/importers/mitoSheet";
import { withClient } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export async function POST(request: Request) {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const url = new URL(request.url);
  const commit = url.searchParams.get("commit") === "true";
  const previewSizeRaw = url.searchParams.get("preview");
  const previewSize = previewSizeRaw ? Number(previewSizeRaw) : 50;
  const previewLimit = Number.isFinite(previewSize) ? Math.max(1, Math.min(500, previewSize)) : 50;
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "CSV file is required." }, { status: 400 });
  }

  const text = await file.text();
  const { events, summary } = parseMitoSheet(text);

  if (!commit) {
    return NextResponse.json({
      event_count: events.length,
      med_count: summary.length,
      meds: summary,
      preview: events.slice(0, previewLimit),
    });
  }

  const inserted = await withClient(async (client) => {
    await client.query("begin");
    try {
      const medIdByName = new Map<string, string>();
      for (const med of summary) {
        const result = await client.query<{ id: string }>(
          `insert into med (user_id, name)
           values ($1, $2)
           on conflict (user_id, name) do update set name = excluded.name
           returning id`,
          [user.id, med],
        );
        const id = result.rows[0]?.id;
        if (id) medIdByName.set(med, id);
      }

      for (const event of events) {
        const medId = medIdByName.get(event.med);
        if (!medId) continue;
        const exists = await client.query<{ id: string }>(
          `select id from dose_event
           where med_id = $1
             and user_id = $2
             and effective_date = $3
             and unit = $4
             and total_daily_amount is not distinct from $5
           limit 1`,
          [medId, user.id, event.date, event.unit, event.amount ?? null],
        );
        if (exists.rows.length > 0) continue;

        await client.query(
          `insert into dose_event (
            user_id,
            med_id,
            med_product_id,
            effective_date,
            total_daily_amount,
            unit,
            per_dose_amount,
            frequency_code,
            notes
          ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            user.id,
            medId,
            null,
            event.date,
            event.amount ?? null,
            event.unit,
            null,
            null,
            "imported from mito sheet",
          ],
        );
      }

      await client.query("commit");
      return { meds: medIdByName.size, events: events.length };
    } catch (error) {
      await client.query("rollback");
      throw error;
    }
  });

  return NextResponse.json({
    event_count: events.length,
    med_count: summary.length,
    meds: summary,
    preview: events.slice(0, previewLimit),
    inserted,
  });
}
