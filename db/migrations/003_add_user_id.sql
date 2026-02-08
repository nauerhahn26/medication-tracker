alter table med
  add column if not exists user_id uuid;

alter table med
  drop constraint if exists med_name_key;

create unique index if not exists med_user_name_unique on med(user_id, name);

alter table med_product
  add column if not exists user_id uuid;

alter table dose_event
  add column if not exists user_id uuid;
