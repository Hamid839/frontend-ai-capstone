# Hamid Shoukat — Frontend Developer Portfolio

A personal portfolio presenting Hamid Shoukat's frontend work, project case
studies, learning notes, and AI-assisted portfolio chat. The site focuses on
responsive React interfaces connected to real application data, with project
contributions described accurately.

## Technology stack

- Next.js App Router and React
- TypeScript
- Tailwind CSS
- Vercel for deployment
- Google AI through a server-side API route for the optional portfolio chat

## Local setup

Requirements: Node.js LTS and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The portfolio pages work without AI credentials. To use the chat locally,
configure `GOOGLE_GENERATIVE_AI_API_KEY` in `.env.local`; keep this server-side
secret out of client code and version control. To enable a booking action, set
`NEXT_PUBLIC_BOOKING_URL` to a real public booking URL in `.env.local`. This is
a public link, not a secret. With no booking URL, the action is omitted outside
development and a setup hint is shown during development.

## Main routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage and frontend developer positioning |
| `/work` | Project summaries and case studies |
| `/about` | Background, learning, interests, and technologies |
| `/contact` | Email, GitHub, LinkedIn, optional CV, and booking link |
| `/notes` | Notes and learning section for future posts |
| `/chat` | AI chat about portfolio projects |
| `/playground` | Accessible interactive component examples |
| `/health` | Server-rendered health check |

The chat endpoint is `/api/chat`. Its model credentials are read server-side;
do not expose them through `NEXT_PUBLIC_*` variables or commit them.

## CV asset

No CV PDF is currently included. Add the verified file at
`public/Hamid-Shoukat-CV.pdf`; the Contact page will then show a downloadable
link to `/Hamid-Shoukat-CV.pdf`. Do not add an unverified or placeholder CV.

## Updating the portfolio

- Edit the homepage positioning in `src/app/page.tsx`.
- Update background and experience in `src/app/about/page.tsx` using verified
  details only.
- Update project summaries and case studies in `src/app/work/page.tsx`.
- Update contact information, booking configuration, or social URLs in
  `src/app/contact/page.tsx`.
- Add learning posts or topics in `src/app/notes/page.tsx`.
- Put the real CV PDF in `public/` with the filename above; no link is shown
  until the file exists.
- Shared navigation and footer links are in `src/components/Header.tsx` and
  `src/components/Footer.tsx`.

## Quality checks

```bash
npm run build
npx tsc --noEmit
```

## Deploy to Vercel

1. Import the repository in Vercel and keep the detected Next.js framework
   settings.
2. Add server-only environment variables in the Vercel project settings if the
   AI chat is enabled. Never put API credentials in source code or public
   environment variables.
3. Optionally set `NEXT_PUBLIC_BOOKING_URL` to a verified public booking page.
   Leave it unset to omit the booking action.
4. Deploy the project. Vercel can create preview deployments for pull requests
   and production deployments from the configured branch.
