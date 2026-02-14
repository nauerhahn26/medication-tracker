create table if not exists med_inventory (
  med_id uuid primary key references med(id) on delete cascade,
  user_id uuid not null references auth.users(id),
  track_inventory boolean not null default false,
  current_volume numeric,
  volume_unit text,
  alert_days_before_reorder integer not null default 7,
  reorder_location text,
  amount_per_bottle numeric,
  updated_at timestamptz default now(),
  check (alert_days_before_reorder > 0)
);
