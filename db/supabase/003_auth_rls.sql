alter table med
  add column if not exists user_id uuid references auth.users(id);

alter table med_product
  add column if not exists user_id uuid references auth.users(id);

alter table dose_event
  add column if not exists user_id uuid references auth.users(id);

alter table med
  drop constraint if exists med_name_key;

create unique index if not exists med_user_name_unique on med(user_id, name);

alter table med enable row level security;
alter table med_product enable row level security;
alter table dose_event enable row level security;
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

alter table med_inventory enable row level security;

drop policy if exists "meds: owner only" on med;
create policy "meds: owner only"
  on med for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "med_products: owner only" on med_product;
create policy "med_products: owner only"
  on med_product for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "dose_events: owner only" on dose_event;
create policy "dose_events: owner only"
  on dose_event for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "med_inventory: owner only" on med_inventory;
create policy "med_inventory: owner only"
  on med_inventory for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
