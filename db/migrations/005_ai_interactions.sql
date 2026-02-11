create table if not exists patient_context (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null,
  context jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index if not exists patient_context_user_unique on patient_context(user_id);

create table if not exists med_interaction_state (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null,
  regimen jsonb not null,
  coverage jsonb not null,
  med_fingerprints jsonb not null,
  last_full_response jsonb not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index if not exists med_interaction_state_user_unique on med_interaction_state(user_id);

create table if not exists med_interaction_screen (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) not null,
  mode text not null check (mode in ('full','delta')),
  model text not null,
  patient_context jsonb,
  regimen jsonb,
  new_item jsonb,
  response jsonb not null,
  created_at timestamptz default now()
);

alter table patient_context enable row level security;
alter table med_interaction_state enable row level security;
alter table med_interaction_screen enable row level security;

drop policy if exists "patient_context: owner only" on patient_context;
create policy "patient_context: owner only"
  on patient_context for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "med_interaction_state: owner only" on med_interaction_state;
create policy "med_interaction_state: owner only"
  on med_interaction_state for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "med_interaction_screen: owner only" on med_interaction_screen;
create policy "med_interaction_screen: owner only"
  on med_interaction_screen for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());
