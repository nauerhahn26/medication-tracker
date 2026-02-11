import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getOpenAIClient } from "@/llm/openaiClient";
import { buildDeltaPrompt, loadSystemPrompt } from "@/llm/promptBuilder";
import { medcheckDeltaSchema } from "@/lib/medcheckSchema";

type DeltaRequest = {
  existing_med_fingerprints?: Array<Record<string, unknown>>;
  new_item: Record<string, unknown>;
  model: string;
};

const allowedModels = new Set(["gpt-5.2", "gpt-5.2-pro"]);

async function callModel(model: string, systemPrompt: string, userPrompt: string) {
  const client = getOpenAIClient();
  const response = await client.responses.create({
    model,
    instructions: systemPrompt,
    input: userPrompt,
  });
  return response.output_text;
}

export async function POST(request: Request) {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const body = (await request.json()) as DeltaRequest;
  if (!allowedModels.has(body.model)) {
    return NextResponse.json({ error: "Unsupported model." }, { status: 400 });
  }

  let fingerprints = body.existing_med_fingerprints;
  if (!fingerprints) {
    const rows = await dbQuery<{ med_fingerprints: unknown }>(
      "select med_fingerprints from med_interaction_state where user_id = $1",
      [user.id],
    );
    fingerprints = (rows[0]?.med_fingerprints as Array<Record<string, unknown>>) ?? [];
  }
  if (!fingerprints || fingerprints.length === 0) {
    return NextResponse.json(
      { error: "No cached fingerprints found. Run a FULL screen first." },
      { status: 400 },
    );
  }

  const systemPrompt = loadSystemPrompt();
  const userPrompt = buildDeltaPrompt(fingerprints ?? [], body.new_item);

  let raw = await callModel(body.model, systemPrompt, userPrompt);
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const repair = `${userPrompt}\n\nReturn valid JSON only.`;
    raw = await callModel(body.model, systemPrompt, repair);
    parsed = JSON.parse(raw);
  }

  const validated = medcheckDeltaSchema.safeParse(parsed);
  if (!validated.success) {
    return NextResponse.json(
      { error: "Model returned invalid JSON.", details: validated.error.flatten() },
      { status: 422 },
    );
  }

  const responseJson = validated.data;
  const nextFingerprints = [...(fingerprints ?? []), responseJson.new_item_fingerprint];

  await dbQuery(
    `insert into med_interaction_state (user_id, regimen, coverage, med_fingerprints, last_full_response)
     values ($1, $2, $3, $4, $5)
     on conflict (user_id)
     do update set med_fingerprints = excluded.med_fingerprints,
                   updated_at = now()`,
    [
      user.id,
      JSON.stringify([]),
      JSON.stringify([]),
      JSON.stringify(nextFingerprints),
      JSON.stringify({}),
    ],
  );

  await dbQuery(
    `insert into med_interaction_screen (user_id, mode, model, new_item, response)
     values ($1, 'delta', $2, $3, $4)`,
    [user.id, body.model, JSON.stringify(body.new_item), JSON.stringify(responseJson)],
  );

  return NextResponse.json(responseJson);
}
