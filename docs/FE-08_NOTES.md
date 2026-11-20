# FE-08 — Error states, empty states, edge cases

## Failure inventory (primary flow: `/chat`)

| Case | How it shows | User next action |
|------|----------------|------------------|
| First-run empty | `ChatEmptyState` with 3 click-to-fill examples | Tap example → Send |
| Empty input | Send disabled | Type or pick example |
| Slow / pending | `ChatSkeleton` (matches bubble layout) | Wait or Stop |
| Tool: preparing | Neutral “Preparing project search…” | — |
| Tool: running | Indigo “Searching…” + query | — |
| Tool: no matches | Designed empty result + suggestions | Ask with clearer terms |
| Tool: malformed result | Amber alert (not a crash) | Retry or rephrase |
| Network / API / mid-stream fail | `ChatErrorBanner` + **Retry last message** | Retry (reloads last user turn) |
| Double-click retry | `retrying` lock until `isLoading` settles | — |
| Route render crash | `src/app/chat/error.tsx` | Try again / Go to Work |
| Missing API key | 503 JSON from route → chat error banner | Fix env, then Retry |

## Files added / updated

| Path | Role |
|------|------|
| `src/app/chat/error.tsx` | Route error boundary |
| `src/components/chat/ChatEmptyState.tsx` | Onboarding empty state |
| `src/components/chat/ChatSkeleton.tsx` | Pending skeleton |
| `src/components/chat/ChatErrorBanner.tsx` | Designed error + retry |
| `src/components/chat/ChatInterface.tsx` | Wires all states; `dvh` height; safe-area padding |
| `src/app/chat/page.tsx` | Copy updated for FE-08 |

## Sabotage checklist (do in this order)

1. **Empty first run** — open `/chat`, confirm examples, click one, send.
2. **Kill network before send** — DevTools → Offline → Send → error banner + Retry.
3. **Kill mid-stream** — Start a reply → Offline or block `/api/chat` → error + Retry.
4. **Throttle** — Slow 3G → skeleton then content; check layout shift.
5. **Stop mid-stream** — Stop button; composer usable; no crash.
6. **No tool matches** — Ask for something outside portfolio (e.g. “blockchain game”) → empty results UI.
7. **Mobile Safari** — real device: keyboard + pinned input, no 100vh blowout, scroll doesn’t fight auto-scroll.
8. **Happy path console** — no errors in console on a normal project question.

### Optional route sabotage (local only)

Temporarily at the top of `POST` in `route.ts`:

```ts
// if (process.env.NODE_ENV === "development" && req.headers.get("x-force-chat-error") === "1") {
//   return Response.json({ error: "Forced test error" }, { status: 500 });
// }
```

Then from DevTools: replay request with that header, or use a temporary `throw new Error("sabotage")` after `streamText` starts.

## Checkpoint 1 evidence to capture

1. **Happy path** — ask about FocusBoard or MedNoviAI; stream + optional project card.
2. **Failure A** — offline or blocked request → error banner + working Retry.
3. **Failure B** — empty tool results **or** mid-stream stop/offline.
4. **Empty state** — first load with clickable examples.

## Mobile notes

- Height uses `70dvh` to reduce mobile Safari `100vh` + keyboard issues.
- Composer uses `env(safe-area-inset-bottom)`.
- Message list uses `overscroll-contain` to limit rubber-band fighting auto-scroll.
