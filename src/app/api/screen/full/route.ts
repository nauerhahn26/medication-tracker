import { NextResponse } from "next/server";
import { dbQuery } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getOpenAIClient } from "@/llm/openaiClient";
import { buildFullPrompt, loadSystemPrompt } from "@/llm/promptBuilder";
import { medcheckFullSchema } from "@/lib/medcheckSchema";

type FullRequest = {
  patient_context: Record<string, unknown>;
  regimen: Array<Record<string, unknown>>;
  model: string;
};

const allowedModels = new Set(["gpt-5.2", "gpt-5.2-pro"]);

async function callModel(model: string, systemPrompt: string, userPrompt: string) {
  const client = getOpenAIClient();
  const response = await client.responses.create({
    model,
    instructions: systemPrompt,
    input: userPrompt,
    response_format: { type: "json_object" },
  });
  return response.output_text;
}

export async function POST(request: Request) {
  const { user, response } = await requireUser();
  if (!user) return response!;
  const body = (await request.json()) as FullRequest;
  if (!allowedModels.has(body.model)) {
    return NextResponse.json({ error: "Unsupported model." }, { status: 400 });
  }

  const systemPrompt = loadSystemPrompt();
  const userPrompt = buildFullPrompt(body.patient_context, body.regimen);

  let raw = await callModel(body.model, systemPrompt, userPrompt);
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const repair = `${userPrompt}\n\nReturn valid JSON only.`;
    raw = await callModel(body.model, systemPrompt, repair);
    parsed = JSON.parse(raw);
  }

  const validated = medcheckFullSchema.safeParse(parsed);
  if (!validated.success) {
    return NextResponse.json(
      { error: "Model returned invalid JSON.", details: validated.error.flatten() },
      { status: 422 },
    );
  }

  const responseJson = validated.data;

  await dbQuery(
    `insert into med_interaction_state (user_id, regimen, coverage, med_fingerprints, last_full_response)
     values ($1, $2, $3, $4, $5)
     on conflict (user_id)
     do update set regimen = excluded.regimen,
                   coverage = excluded.coverage,
                   med_fingerprints = excluded.med_fingerprints,
                   last_full_response = excluded.last_full_response,
                   updated_at = now()`,
    [
      user.id,
      JSON.stringify(body.regimen),
      JSON.stringify(responseJson.coverage),
      JSON.stringify(responseJson.med_fingerprints),
      JSON.stringify(responseJson),
    ],
  );

  await dbQuery(
    `insert into med_interaction_screen (user_id, mode, model, patient_context, regimen, response)
     values ($1, 'full', $2, $3, $4, $5)`,
    [
      user.id,
      body.model,
      JSON.stringify(body.patient_context),
      JSON.stringify(body.regimen),
      JSON.stringify(responseJson),
    ],
  );

  return NextResponse.json(responseJson);
}
