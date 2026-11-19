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

## FE-07 — Portfolio project search

The chat API exposes the `searchPortfolioProjects` tool to find relevant entries
in a curated portfolio dataset. It runs on the server through the AI SDK v4
`streamText` call in `src/app/api/chat/route.ts`; the configured Gemini model
can call it before generating its follow-up response.

The Zod input schema is:

```ts
{
  query: string; // trimmed, 2–100 characters
  limit?: number; // optional integer from 1 to 5; defaults to 3
}
```

The tool searches project names, descriptions, technologies, contributions,
and features. Matching projects are ranked by the fraction of distinct,
normalized query terms found in a project's searchable text. `total` is the
number of matches before applying `limit`; `projects` contains up to that many
ranked results.

The result shape is:

```ts
{
  query: string;
  total: number;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    contribution: string;
    features: string[];
    href: string;
    relevance: number;
  }>;
}
```

When nothing matches, the tool returns `total: 0` and an empty `projects`
array.

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
