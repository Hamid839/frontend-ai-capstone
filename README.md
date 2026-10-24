# Frontend AI Capstone

Portfolio site for the FlyRank Frontend AI Engineering internship.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Vercel

## Screens (routes)

| Route       | Purpose                                      |
|-------------|----------------------------------------------|
| `/`         | Home — proof statement + overview            |
| `/work`     | Project placeholders / case study index      |
| `/about`    | About + voice card                           |
| `/contact`  | Contact links                                |
| `/health`   | Server Component health check (fetches data) |

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve production build
```

## Environment variables

Copy the example file:

```bash
cp .env.example .env.local
```

Never commit real secrets. Configure production values in the Vercel project settings.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add any env vars from `.env.example` in the Vercel dashboard.
5. Deploy. Every push to `main` (and every PR) gets a preview URL.

## Assignment notes (FE-04)

- Server Components by default; Client Components only where interactivity is required (none needed for these placeholders).
- Tailwind + design tokens configured in `tailwind.config.ts` and `globals.css`.
- Health page at `/health` performs a server-side fetch and renders the result.
- No secrets in the repository.
