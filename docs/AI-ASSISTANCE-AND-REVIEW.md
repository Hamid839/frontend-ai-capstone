# AI Assistance and Code Review — FocusBoard

## Project summary
FocusBoard is a responsive, browser-based task planner. It demonstrates an AI-assisted frontend workflow: scoping, implementation, persistence, quality review, and documentation. It uses React + TypeScript + Vite and does not require an API key.

## Where AI assisted
- **Planning:** helped choose a manageable application scope and define acceptance criteria.
- **Implementation:** generated the initial component structure, task interactions, responsive styling, and local persistence.
- **Reliability review:** proposed defensive handling for malformed local storage and unavailable storage.
- **Accessibility review:** prompted checks for labelled inputs, keyboard focus, semantic buttons, empty states, and reduced-motion preferences.
- **Documentation:** drafted setup instructions, feature notes, limitations, and a test checklist.

AI-generated code is a starting point, not proof of correctness. The developer must run it, inspect it, and revise it.

## Manual review examples included in the implementation
These are concrete review-oriented decisions visible in the code. Please inspect them and make at least one additional change yourself before submitting.

1. **Storage is defensive rather than blindly trusted.** `src/storage.ts` wraps JSON parsing and storage access in `try/catch`, checks the basic task shape, and falls back to starter tasks when data is missing or invalid. This avoids crashing when browser data is malformed. Limitation: this is basic shape validation, not a complete schema-validation library.
2. **Form submission trims input.** `handleSubmit` in `src/App.tsx` trims the task title and returns if it is empty, so whitespace-only titles are not added.
3. **State updates are immutable.** Completion toggles map to a new task array and deletion filters into a new array instead of mutating existing React state.
4. **Accessible controls have names.** Search and category controls have visually hidden labels; task completion and deletion buttons have task-specific `aria-label`s; the add-task form uses explicit labels and a labelled dialog.
5. **Responsive and motion behavior are considered.** `src/styles.css` contains breakpoints for narrower screens and a `prefers-reduced-motion` override.

These examples show decisions in the delivered source. They are not a claim that the intern personally hand-edited each line. For the assignment, make and document your own follow-up change after reviewing the code.

## Follow-up improvement to perform yourself
Choose at least one, implement it, and update this document with the actual file and result:
- Replace the starter-task fallback behavior with a more explicit first-run experience.
- Add a confirmation step before clearing completed tasks.
- Add a visible success message when a task is created.
- Improve the storage validation with a dedicated type guard.
- Add unit tests for task filtering or storage parsing.

## AI-assisted setup review — 2026-10-24

This review records setup fixes made with AI assistance; it is not a claim that the developer completed the assignment's personal follow-up review.

- **Files changed:** `package.json`, `package-lock.json`, and `src/vite-env.d.ts`.
- **Problem noticed:** Vite, its React plugin, and TypeScript were listed as runtime dependencies. TypeScript also reported missing declarations for the CSS side-effect import, and the installed dependencies did not include the declared `lucide-react` package.
- **Change made:** Moved the Vite build tools to `devDependencies`, retained React, React DOM, and Lucide in `dependencies`, refreshed the lockfile, and added Vite's standard client type reference.
- **Why:** Keep application runtime dependencies separate from build tools and make the existing source type-check cleanly without changing app behavior or design.
- **Verification run in this workspace:** `npm install` completed; `npm run build` completed; `npm run dev -- --host 127.0.0.1` started and `curl.exe` received HTTP 200 from the Vite page.
- **Result / remaining limitation:** Install, TypeScript build, production bundle, and dev-server HTTP response were verified. The integrated browser did not render the page during this check, and the app's interactive flows have not been verified here. The developer should still perform and record a personal follow-up change after reviewing the app.

**My personal follow-up review (complete this yourself after reviewing the code):**
- Date:
- File(s) changed:
- Problem I noticed:
- My change:
- Why I chose it:
- Verification I actually ran:
- Result / remaining limitation:

## Verification checklist
Run these checks locally and mark them only after testing.

- [x] `npm install` completes successfully (verified in this workspace on 2026-10-24).
- [x] `npm run build` completes successfully (verified in this workspace on 2026-10-24).
- [x] App starts with `npm run dev` and responds with HTTP 200 (verified in this workspace on 2026-10-24; browser rendering not verified).
- [ ] Add a task with title, category, priority, and due date.
- [ ] Empty/whitespace-only title cannot be submitted.
- [ ] Mark a task complete, then mark it active again.
- [ ] Delete a task.
- [ ] Clear completed tasks.
- [ ] Search by part of a title.
- [ ] Filter by status and category; verify combined filters behave as expected.
- [ ] Sort by priority.
- [ ] Refresh the page and verify tasks persist.
- [ ] Check the layout at desktop and mobile widths.
- [ ] Navigate controls with the keyboard and verify visible focus.
- [ ] Check the empty-state message.
- [ ] Check behavior when browser local storage is unavailable or contains invalid JSON, if practical.

## Honest limitations
- Tasks are stored only in the current browser; there is no user account, cross-device sync, or backend.
- No AI model is integrated into the application. AI was used as a development assistant to build the app, which is the assignment's stated focus.
- The setup/build results above were run in this workspace; repeat them on your own machine before submitting. Do not mark the remaining interaction checks complete until you perform them.
- The Google Fonts import requires an internet connection; system fallback fonts are available.
