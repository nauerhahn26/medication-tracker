alter table med
  add column if not exists med_type text,
  add column if not exists target text,
  add column if not exists delivery_mechanism text,
  add column if not exists result text,
  add column if not exists source text,
  add column if not exists dose_at_13kg text,
  add column if not exists brand text,
  add column if not exists supporting_research text;
