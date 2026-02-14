alter table med_inventory
  alter column alert_days_before_reorder set default 10;

alter table med_inventory
  add column if not exists pills_per_bottle numeric,
  add column if not exists amount_per_pill numeric;
