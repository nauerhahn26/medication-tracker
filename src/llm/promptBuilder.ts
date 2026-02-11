import fs from "node:fs";
import path from "node:path";

const PROMPT_DIR = path.join(process.cwd(), "prompts");

function readPrompt(filename: string) {
  return fs.readFileSync(path.join(PROMPT_DIR, filename), "utf8");
}

export function buildFullPrompt(patientContext: unknown, regimen: unknown) {
  const template = readPrompt("medcheck_full.txt");
  return template
    .replace("<<PASTE patient_context JSON HERE>>", JSON.stringify(patientContext, null, 2))
    .replace("<<PASTE regimen JSON HERE>>", JSON.stringify(regimen, null, 2));
}

export function buildDeltaPrompt(existingFingerprints: unknown, newItem: unknown) {
  const template = readPrompt("medcheck_delta.txt");
  return template
    .replace(
      "<<PASTE prior med_fingerprints ARRAY HERE>>",
      JSON.stringify(existingFingerprints, null, 2),
    )
    .replace("<<PASTE single regimen item HERE>>", JSON.stringify(newItem, null, 2));
}

export function loadSystemPrompt() {
  return readPrompt("medcheck_system.txt");
}
