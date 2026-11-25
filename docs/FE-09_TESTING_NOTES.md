# FE-09 — Testing pass

## Why this assignment exists

Tests are the unlock for AI-assisted development: an assistant that can run your suite can verify its own changes. This pass adds unit/component coverage on the highest-risk UI, one Playwright primary-flow test, and CI that blocks merges on failure.

## What was added

### Tooling
| Tool | Role |
|------|------|
| Vitest + jsdom | Unit / component runner |
| React Testing Library | Query by role & label (not test IDs) |
| Playwright | One e2e primary flow |
| GitHub Actions | `npm run test -- --run` + Playwright on push/PR |

### Component tests (query by role/label)

| File | Coverage |
|------|----------|
| `ChatErrorBanner.test.tsx` | alert role, message, retry / retrying / no-retry |
| `ChatEmptyState.test.tsx` | examples, onPick, disabled |
| `PortfolioProjectCard.test.tsx` | tool-result card: heading, tech list, link name |
| `ChatInterface.test.tsx` | empty, pending skeleton, streaming + Stop, error + retry, tool cards, example fill |
| `Modal.test.tsx` | closed/open, accessible name, Close, Escape |

`useChat` is mocked — **never** hits `/api/chat` or Gemini in unit tests.

### E2E
- `e2e/chat-primary-flow.spec.ts`
- Visits `/chat`, asserts empty state, types, sends
- **Mocks** `**/api/chat` so CI never needs a real API key for the assertion path

### CI
- `.github/workflows/ci.yml`
- Jobs: unit tests → e2e → lint
- Failures block merging on PRs to `main`

## Local commands

```bash
# Install new deps (once)
npm install -D vitest @vitejs/plugin-react jsdom \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event \
  @playwright/test

npx playwright install chromium

# Unit / component
npm run test          # watch
npm run test:run      # single run (CI)

# E2E (starts build + server via playwright.config)
npm run test:e2e
```

## Files to add

```
vitest.config.ts
playwright.config.ts
src/test/setup.ts
src/components/chat/__tests__/ChatErrorBanner.test.tsx
src/components/chat/__tests__/ChatEmptyState.test.tsx
src/components/chat/__tests__/PortfolioProjectCard.test.tsx
src/components/chat/__tests__/ChatInterface.test.tsx
src/playground/components/__tests__/Modal.test.tsx
e2e/chat-primary-flow.spec.ts
.github/workflows/ci.yml
```

Update `package.json` scripts as in `package.json.snippet.md`.

## Deliverable for the portal

1. Test files in the repo (on a PR or main)
2. Screenshot of the suite **passing in CI** (GitHub Actions green check on the workflow run)

## Branch suggestion

```bash
git switch -c feat/fe-09-testing-pass
# copy files, install deps, run tests locally
git add ...
git commit -m "test(fe-09): Vitest + RTL component suite, Playwright primary flow, CI"
git push -u origin feat/fe-09-testing-pass
```

Then open a PR into `main`.
