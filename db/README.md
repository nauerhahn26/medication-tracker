# Database

This project uses PostgreSQL. The schema is defined in:

- `db/migrations/001_init.sql`

## Quick Start

1. Create a database.
2. Set `DATABASE_URL` in `.env.local` (see `.env.example`).
3. Run the migration with your preferred tool, for example:

```bash
psql "$DATABASE_URL" -f db/migrations/001_init.sql
```

## Core Rule

- A med is active on a date if the latest `dose_event` on or before that date has a non-null `total_daily_amount`.
