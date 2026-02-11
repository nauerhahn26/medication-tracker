This is a [Next.js](https://nextjs.org) project for a medication timeline tracker.

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
