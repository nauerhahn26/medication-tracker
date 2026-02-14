import { z } from "zod";

export const medSchema = z.object({
  name: z.string().min(1),
  standard_code_system: z.string().nullable().optional(),
  standard_code: z.string().nullable().optional(),
  is_supplement: z.boolean().optional(),
  notes: z.string().nullable().optional(),
});

export const medInventorySchema = z.object({
  track_inventory: z.boolean().optional(),
  current_volume: z
    .preprocess(
      (value) => {
        if (value === null || value === undefined || value === "") return null;
        if (typeof value === "number") return value;
        if (typeof value === "string") {
          const trimmed = value.trim();
          if (trimmed === "") return null;
          return Number(trimmed);
        }
        return value;
      },
      z.number().nonnegative().nullable(),
    )
    .optional(),
  volume_unit: z.string().nullable().optional(),
  alert_days_before_reorder: z
    .preprocess(
      (value) => {
        if (value === null || value === undefined || value === "") return null;
        if (typeof value === "number") return value;
        if (typeof value === "string") {
          const trimmed = value.trim();
          if (trimmed === "") return null;
          return Number(trimmed);
        }
        return value;
      },
      z.number().int().positive().nullable(),
    )
    .optional(),
  reorder_location: z.string().nullable().optional(),
  amount_per_bottle: z
    .preprocess(
      (value) => {
        if (value === null || value === undefined || value === "") return null;
        if (typeof value === "number") return value;
        if (typeof value === "string") {
          const trimmed = value.trim();
          if (trimmed === "") return null;
          return Number(trimmed);
        }
        return value;
      },
      z.number().nonnegative().nullable(),
    )
    .optional(),
});

export const medUpdateSchema = medSchema.partial().extend(medInventorySchema.shape);

export const medProductSchema = z.object({
  brand_name: z.string().nullable().optional(),
  product_url: z.string().url().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const doseEventSchema = z.object({
  med_id: z.string().uuid(),
  med_product_id: z.string().uuid().nullable().optional(),
  effective_date: z.string().min(1),
  total_daily_amount: z.number().nullable().optional(),
  unit: z.string().min(1),
  per_dose_amount: z.number().nullable().optional(),
  frequency_code: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const dailyQuerySchema = z.object({
  date: z.string().min(1),
});
