# FE-06 — Streaming AI chat interface

## What was built

| Piece | Path |
|-------|------|
| Model + system prompt module | `src/lib/ai/config.ts` |
| Streaming route handler | `src/app/api/chat/route.ts` |
| Chat UI (`useChat`) | `src/components/chat/ChatInterface.tsx` |
| Page | `src/app/chat/page.tsx` → `/chat` |

## Behaviour checklist

- [x] Token-by-token streaming via AI SDK `streamText` + Google Gemini
- [x] Thinking indicator before the first assistant token
- [x] Stop button aborts mid-stream; partial message remains; input stays usable
- [x] Multi-turn conversation state (`useChat` messages)
- [x] API key only on the server (`GOOGLE_GENERATIVE_AI_API_KEY`)
- [x] Auto-scroll only while the user is near the bottom; “Jump to latest” when not
- [x] Distinct user / assistant bubbles; mobile-friendly composer

## Local setup

```bash
cp .env.example .env.local
# Put your Google AI Studio key in .env.local:
# GOOGLE_GENERATIVE_AI_API_KEY=...

npm install
npm run dev
```

Open http://localhost:3000/chat

## Vercel

Project → Settings → Environment Variables:

- `GOOGLE_GENERATIVE_AI_API_KEY` = your key (Production + Preview)

Redeploy after adding the variable.

## Reviewer links

- Preview: `https://<your-deployment>/chat`
- Route handler: `src/app/api/chat/route.ts`
- Chat component: `src/components/chat/ChatInterface.tsx`
- Config module: `src/lib/ai/config.ts`
