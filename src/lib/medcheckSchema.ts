import { z } from "zod";

const confidence = z.enum(["high", "medium", "low"]);
const recognized = z.enum(["yes", "ambiguous", "no"]);
const qtCategory = z.enum(["KNOWN", "POSSIBLE", "CONDITIONAL", "NONE", "UNKNOWN"]);
const yesNoUnknown = z.enum(["yes", "no", "unknown", "possible"]);
const qtComboRisk = z.enum(["HIGH", "MODERATE", "LOW", "UNCLEAR"]);
const evidenceSignal = z.enum([
  "WELL_ESTABLISHED",
  "MODERATE",
  "LIMITED_CASE_REPORTS",
  "THEORETICAL",
]);
const mechanism = z.enum([
  "PK_CYP",
  "PK_UGT",
  "PK_TRANSPORT",
  "PK_ABSORB",
  "PD",
  "QT_CLUSTER",
  "DUPLICATE_INGREDIENT",
  "FOOD_HERB",
  "LAB_INTERFERENCE",
  "THERAPEUTIC_ANTAGONISM",
  "OTHER",
]);

const interaction = z.object({
  mechanism,
  items: z.array(z.string()),
  what_might_happen: z.string(),
  why: z.string(),
  risk_tags: z.array(z.string()),
  qt_combo_risk: qtComboRisk.nullable(),
  evidence_signal: evidenceSignal,
  discuss_with_clinician: z.string(),
  confidence,
});

const deltaInteractionAlt = z.object({
  type: z.string().optional(),
  new_item_id: z.string().optional(),
  existing_item_ids: z.array(z.string()).optional(),
  summary: z.string().optional(),
  mechanisms: z.array(z.string()).optional(),
  mechanism: z.any().optional(),
  clinical_concern: z.string().optional(),
  why_it_matters: z.string().optional(),
  evidence_signal: evidenceSignal.optional(),
  severity: z.string().optional(),
  qt_combo_risk: qtComboRisk.optional(),
  monitoring: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

const fingerprint = z.object({
  id: z.string(),
  name: z.string(),
  dose_route_freq: z.string(),
  pk: z.object({
    cyp_substrates: z.array(z.string()),
    cyp_inhibitors: z.array(z.string()),
    cyp_inducers: z.array(z.string()),
    ugt: z.array(z.string()),
    transporters: z.array(z.string()),
    absorption_flags: z.array(z.string()),
    renal_flags: z.array(z.string()),
    hepatic_flags: z.array(z.string()),
  }),
  pd_flags: z.array(z.string()),
  cardiac_flags: z.object({
    qt_tdp_category: qtCategory,
    bradycardia_risk: yesNoUnknown,
    electrolyte_effects: z.array(z.string()),
    notes: z.string(),
  }),
  high_risk_populations_notes: z.array(z.string()),
  confidence,
});

const coverageItem = z.object({
  id: z.string(),
  input_name: z.string(),
  normalized_name: z.string().nullable(),
  recognized,
  notes: z.string(),
});

const monitoringTopic = z.object({
  topic: z.string(),
  items: z.array(z.string()),
  why: z.string(),
});

const deltaMonitoringTopicAlt = z.object({
  topic: z.string(),
  rationale: z.string().optional(),
  why: z.string().optional(),
  what_to_monitor: z.array(z.string()).optional(),
  what_to_watch: z.array(z.string()).optional(),
  who_to_discuss_with: z.string().optional(),
});

const unknownItem = z.object({
  id: z.string(),
  issue: z.string(),
  what_to_provide: z.string(),
});

const deltaUnknownAlt = z.object({
  item_ids: z.array(z.string()).optional(),
  item_id: z.string().optional(),
  unknown: z.string().optional(),
  issue: z.string().optional(),
  why_it_matters: z.string().optional(),
});

export const medcheckFullSchema = z.object({
  disclaimer_short: z.string(),
  coverage: z.array(coverageItem),
  med_fingerprints: z.array(fingerprint),
  interactions: z.object({
    contraindicated_or_urgent_review: z.array(interaction),
    major: z.array(interaction),
    moderate: z.array(interaction),
    minor_or_theoretical: z.array(interaction),
  }),
  monitoring_topics: z.array(monitoringTopic),
  unknowns_missing_info: z.array(unknownItem),
  questions_for_clinician: z.array(z.string()),
});

export const medcheckDeltaSchema = z.object({
  disclaimer_short: z.string(),
  new_item_fingerprint: fingerprint,
  delta_interactions: z.object({
    contraindicated_or_urgent_review: z.array(
      z.union([interaction, deltaInteractionAlt]),
    ),
    major: z.array(z.union([interaction, deltaInteractionAlt])),
    moderate: z.array(z.union([interaction, deltaInteractionAlt])),
    minor_or_theoretical: z.array(z.union([interaction, deltaInteractionAlt])),
  }),
  monitoring_topics_added: z.array(
    z.union([monitoringTopic, deltaMonitoringTopicAlt]),
  ),
  unknowns_missing_info: z.array(z.union([unknownItem, deltaUnknownAlt])),
  questions_for_clinician: z.array(z.string()),
});
