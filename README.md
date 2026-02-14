This is a [Next.js](https://nextjs.org) project for a medication timeline tracker.

## Project Summary

Goal: Build a caregiver-friendly medication tracker for a child with Rett syndrome that keeps a precise, day-by-day history of all meds and supplements, supports starts/stops/dose changes, and makes it easy to review past regimens, share current lists, and run AI interaction screens safely.

What we’ve built and are building toward:
1. Web app (Next.js) with Supabase auth and Postgres storage.
2. Medication model that tracks dose changes over time rather than re-adding meds.
3. CSV change-log import with review before saving.
4. Accurate “active on date” computation with day-level history.
5. Medication list and detail views with timelines.
6. Ability to add, update, and delete dose events.
7. Ability to rename meds and capture metadata (brand, notes, research, etc.).
8. RxNorm autocomplete for meds with free-text fallback for supplements.
9. Unit support for mg, IU, mL, packet, drops (more as needed).
10. Active meds table with date selector for any day.
11. Export current meds list as CSV and PDF.
12. Timeline explorer with expandable year bands and date navigation.
13. AI Drug-to-Drug Analysis (FULL + DELTA) with prompts stored verbatim.
14. Patient context storage for AI screens.
15. Saved AI runs with history browsing and latest-result persistence.
16. Guardrails and disclaimers for AI output (educational only).
17. Ongoing work to normalize AI outputs and render readable summaries.
18. Future AI modules planned (e.g., dose sanity check vs standards).
19. Product-friendly UX direction (shareable, caregiver-first, low friction).
20. Eventual multi-user, paid subscription-ready architecture.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Database

PostgreSQL is used for meds, products, and dose events.

1. Copy `.env.example` to `.env.local` and set `DATABASE_URL`.
2. Run the migration in `db/migrations/001_init.sql` using `psql` or your preferred tool.
3. Run `db/migrations/003_add_user_id.sql` for local dev.
4. Run `db/migrations/005_ai_interactions.sql` for AI interaction storage.

## Supabase Auth (Production)

1. Set these env vars in `.env.local` and in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`
2. In Supabase SQL editor, run `db/supabase/003_auth_rls.sql` to add user ownership and RLS.
3. Run `db/migrations/005_ai_interactions.sql` in Supabase to enable AI interaction storage.

## API Endpoints

`GET /api/meds`  
`POST /api/meds`  
`POST /api/meds/:medId/products`  
`GET /api/meds/:medId/dose-events`  
`PATCH /api/meds/:medId`  
`POST /api/dose-events`  
`PATCH /api/dose-events/:eventId`  
`DELETE /api/dose-events/:eventId`  
`GET /api/daily?date=YYYY-MM-DD`
`POST /api/imports/mito-sheet`
`POST /api/imports/mito-sheet?commit=true`
`GET /api/timeline/events`
`GET /api/patient-context`
`PUT /api/patient-context`
`GET /api/screen/latest`
`POST /api/screen/full`
`POST /api/screen/delta`

## AI Drug-to-Drug Analysis

- Prompts live in `prompts/medcheck_system.txt`, `prompts/medcheck_full.txt`, and `prompts/medcheck_delta.txt`.
- The UI is at `/ai-screen` and supports FULL + DELTA screening.
- Model selection is exposed in the UI (default: `gpt-5.2`).
- Responses are stored in `med_interaction_state` and `med_interaction_screen`.

Disclaimer: The AI screen is educational only and should be reviewed with a clinician or pharmacist.

This project uses Tailwind CSS and a custom Google Font pairing for the UI.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Auto-deploy (new Codex aware)

This repo now includes `.github/workflows/vercel-deploy.yml` so feature work can be deployed automatically:

- Every branch push gets a Vercel preview deployment URL.
- Pushes to `main` get a production deployment.
- `npm run build` is run in CI before deployment to fail fast.

Set these GitHub repository secrets to enable deployments:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Get IDs from your Vercel project settings, then add each secret in GitHub under:
`Settings -> Secrets and variables -> Actions`.

After this is in place, any new Codex session opening the repo can rely on the same workflow for auto-deploy.

### Preview DB access

To make branch previews read/write real data, set Vercel **Preview** environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`

Recommended setup:

- Use a staging Supabase project for **Preview**.
- Use your production Supabase project for **Production**.
- Run migrations (including `db/migrations/007_add_amount_per_bottle.sql`) in both environments.
