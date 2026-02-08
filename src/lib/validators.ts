import { z } from "zod";

export const medSchema = z.object({
  name: z.string().min(1),
  standard_code_system: z.string().nullable().optional(),
  standard_code: z.string().nullable().optional(),
  is_supplement: z.boolean().optional(),
  notes: z.string().nullable().optional(),
});

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
