create extension if not exists "uuid-ossp";

create table if not exists med (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  standard_code_system text,
  standard_code text,
  is_supplement boolean not null default true,
  notes text
);

create table if not exists med_product (
  id uuid primary key default uuid_generate_v4(),
  med_id uuid not null references med(id) on delete cascade,
  brand_name text,
  product_url text,
  notes text
);

create table if not exists dose_event (
  id uuid primary key default uuid_generate_v4(),
  med_id uuid not null references med(id) on delete cascade,
  med_product_id uuid references med_product(id) on delete set null,
  effective_date date not null,
  total_daily_amount numeric,
  unit text not null,
  per_dose_amount numeric,
  frequency_code text,
  notes text
);

create index if not exists idx_dose_event_med_date on dose_event(med_id, effective_date);
create index if not exists idx_dose_event_date on dose_event(effective_date);
