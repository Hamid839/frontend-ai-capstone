# Ship an Automation Workflow v2

**Hamid Shoukat · General AI Fluency · Week 4 (FL-04)**  
**Date:** 16 November 2026  
**Pipeline name:** Internship Progress Report Pipeline (Draft → Critique → Revise)

> **Before submitting:** search this file for `[TO FILL]` and `[CONFIRM]`. Each marks something only I can supply or verify (evidence, a measurement, or a label). Delete this note once they are resolved.

---

## 1. What this workflow is for

From my FL-01 AI Workflow Audit, Target Task #1:

> **Writing weekly internship progress reports**  
> Done well = clear, structured, under ~400 words, includes real progress + reflection, ready to submit with minimal edits.

This is a **writing pipeline** of the "draft, critique, revise" type.  
It turns messy weekly notes into a submission-ready progress report in a repeatable sequence of steps.

**Why this pipeline (not industry brief or study notes):**  
It is the highest-frequency writing task in my internship, already classified as *Collaborate with AI*, and has a clear definition of done. Running it five times on real weeks produces evidence that matches the evaluation criteria.

---

## 2. Step diagram (flow before build)

```
┌─────────────────┐
│  0. INPUT       │  User pastes raw weekly notes
│  (human)        │  (bullets, dates, links, blockers)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  1. GATHER      │  Structure the raw notes into a
│  (Claude)       │  fact sheet: Done / In progress /
│                 │  Blockers / Evidence / Reflection seeds
└────────┬────────┘
         │  handoff: structured fact sheet
         ▼
┌─────────────────┐
│  2. DRAFT       │  First full report draft from
│  (Claude)       │  the fact sheet + report template
└────────┬────────┘
         │  handoff: draft text
         ▼
┌─────────────────┐
│  3. CRITIQUE    │  Score against rubric; list
│  (Claude)       │  concrete fixes (no rewrite yet)
└────────┬────────┘
         │  handoff: critique notes + scores
         ▼
┌─────────────────┐
│  4. REVISE      │  Produce final report that
│  (Claude)       │  applies every critique item
└────────┬────────┘
         │  handoff: final report
         ▼
┌─────────────────┐
│  5. HUMAN CHECK │  Verify facts, tone, length;
│  (me)           │  paste real numbers/links;
│                 │  submit or commit
└─────────────────┘
```

**Four distinct AI steps with defined handoffs:** Gather → Draft → Critique → Revise, plus a mandatory human check.

**How handoffs work in practice:** all four steps run inside one Claude Project thread. Each step's prompt names the step and tells Claude to use the output of the previous step ("the fact sheet above", "the draft above"). The handoff is therefore the previous step's output, not a separate file.

---

## 3. Tool choice and configuration

| Choice | Decision |
|--------|----------|
| Primary tool | **Claude Project** (free plan) — already exists from FL-01 as "Hamid – Frontend AI Intern" `[CONFIRM: plan shown in account settings; add a screenshot of the Project page]` |
| Why not only ChatGPT | Project instructions persist; sequential steps stay in one thread with shared context |
| Why not n8n for v1 | No-code button-press automation is optional; the assignment allows a Claude Project. I can look at n8n later if volume grows (see section 9) |
| Optional helper | **NotebookLM** only when I need source-grounded synthesis from long docs (repo README, NOTES.md, assignment briefs). For weekly reports, raw notes are enough. Not used in these runs |
| Custom GPT | Skipped — the assignment brief says building one requires a paid ChatGPT plan |

### 3.1 Claude Project system / custom instructions (as used in Runs 1–5)

```text
You are my collaborator for the FlyRank Frontend AI Engineering + General AI Fluency internship.

Who I am: Hamid Shoukat, Lahore. Building a Next.js + TypeScript + Tailwind portfolio (frontend-ai-capstone). Evidence: MedNoviAI, FocusBoard, accessible components, streaming chat. Voice: clear, honest, practical, specific, curious, human.

When I run the Progress Report Pipeline, follow the step I name exactly (GATHER / DRAFT / CRITIQUE / REVISE). Do not jump ahead. Do not invent progress, metrics, or screenshots I did not provide. Prefer short paragraphs and bullets. Flag anything that still needs my real numbers or links.
```

**Known issue with this configuration (found in review):** the "Evidence" line lists *streaming chat* as finished evidence, but my own Run 5 notes say it still needs end-to-end verification. Standing instructions like this can push the model to overstate progress.

### 3.1b Recommended update (v2.1 — not used in Runs 1–5)

Change the evidence line to:

```text
Evidence: MedNoviAI, FocusBoard, accessible components. In progress (not yet verified end to end): streaming chat.
```

Also add one section to the GATHER prompt's required list (see 3.2) so the fact sheet collects what the DRAFT template needs. `[TO FILL: state whether the brand-new-input run in section 7 used v1 or v2.1]`

### 3.2 Step prompts (as used in Runs 1–5)

**Step 1 — GATHER**

```text
STEP: GATHER

Here are my raw weekly notes. Turn them into a structured fact sheet only.
Do not write the report yet.

Sections required:
- Week / dates
- Done (bullet list, only what I stated)
- In progress
- Blockers / risks
- Evidence available (links, screenshots, commits, live URL if I gave them)
- Reflection seeds (1–3 honest observations I can expand later)
- Missing info I still need to supply

Raw notes:
<<<PASTE NOTES HERE>>>
```

**v2.1 change (optional, not used in Runs 1–5):** add this line to the required sections:

```text
- Next week priority (only if I stated it; otherwise write "not stated")
```

**Step 2 — DRAFT**

```text
STEP: DRAFT

Using only the fact sheet above, write a first-draft weekly internship progress report.

Constraints:
- Under 400 words
- Structure: (1) Week focus (2) What shipped (3) What is in progress (4) Blockers (5) Reflection / lesson (6) Next week priority
- Voice: clear, honest, practical — no hype
- Do not invent work, metrics, or links
- Mark any placeholder with [NEEDS MY INPUT]
```

**Step 3 — CRITIQUE**

```text
STEP: CRITIQUE

Critique the draft above against this rubric. Do not rewrite the full report yet.

Rubric (score 1–5 each):
1. Factual accuracy (only claimed what was in the fact sheet)
2. Specificity (names real features, routes, tools, or commits)
3. Reflection quality (honest lesson, not generic)
4. Structure & length (fits the template, under 400 words)
5. Voice match (clear, honest, practical, human)

For each score under 5, give a concrete fix (what to add, cut, or rephrase).
End with a prioritized fix list (max 5 items).
```

**Step 4 — REVISE**

```text
STEP: REVISE

Produce the final progress report.
Apply every item in the prioritized fix list.
Keep under 400 words.
Leave [NEEDS MY INPUT] only where I still must insert a real link or number.
Output the report only — no preamble.
```

**Step 5 — HUMAN CHECK (checklist, not a prompt)**

- [ ] Every claim matches real work this week  
- [ ] All [NEEDS MY INPUT] filled or removed  
- [ ] Live URL / commit hashes correct  
- [ ] Tone still sounds like me  
- [ ] Length acceptable for the portal  
- [ ] Save final text + commit to repo if required  

---

## 4. Five runs

**How the inputs were prepared (disclosure):** each run uses notes grounded in actual internship work for Weeks 1–4, written from my progress summary and repo rather than captured as raw notes at the time. Week 4 is split into two runs (4a and 4b). Outputs are shortened here; full versions are in the Claude Project thread. `[CONFIRM: this description is accurate]`

Each run below shows the input, a final-report excerpt, and a **post-run audit**: a sentence-by-sentence check of the excerpt against the input notes shown. Anything flagged was *not in the notes provided* and must be confirmed or removed before the report is used.

### Run 1 — Week 1 (Environment + audit)

**Input (raw notes):**  
FE-01 done: Node LTS, public repo, README, LICENSE, gitignore, CLAUDE.md, Conventional Commits. FL-01 AI Workflow Audit written and submitted. Claude Project created. Still figuring out best daily schedule.

**Gather extract:** Done = FE-01 + FL-01; Evidence = repo + audit doc; Reflection seed = "setup work is slow but prevents later chaos."

**Draft → Critique → Revise (final excerpt):**  
Week focused on environment and workflow hygiene. Shipped public GitHub repo with README, MIT license, CLAUDE.md, and Conventional Commits practice. Completed FL-01 AI Workflow Audit and created Claude Project. Lesson: treating setup as a real deliverable makes later AI collaboration less noisy. Next: FE-03 settings form drill and prompt ladder.

**Human check:** Filled real repo URL. No invented metrics.

**Post-run audit:**
- "MIT license": the notes say only "LICENSE". `[CONFIRM the license type]`
- "Next: FE-03 settings form drill and prompt ladder": the notes contain no next-step. `[CONFIRM or remove]`
- The lesson extends the reflection seed ("prevents later chaos") to "AI collaboration". `[CONFIRM it is your own conclusion]`
- Repo check: the capstone repo's root listing I could see did not show LICENSE or CLAUDE.md (the listing may have been truncated, or these may live in another repo). `[CONFIRM where they are]`

**Time:** ~11 min pipeline vs ~28 min fully manual. `[CONFIRM: measured or estimated — see section 5]`

---

### Run 2 — Week 2 (Prompting + settings form)

**Input:**  
FE-03: vague vs precise settings form branches. react-hook-form + zod rules added to WORKFLOW.md / CLAUDE.md. FL-02 Prompt Ladder and cross-model notes. Voice card locked: clear, honest, practical, specific, curious, human. Case studies draft started (MedNoviAI + Settings Form).

**Final excerpt:**  
Shipped the settings-form drill on two branches and documented form conventions (react-hook-form + zod, field errors, disable submit while submitting). Completed FL-02 Prompt Ladder with reusable template. Locked voice card. Lesson: precise prompts reduce review time more than longer prompts. Next: nest FocusBoard work and start content map.

**Post-run audit:**
- "field errors, disable submit while submitting": not in the notes. `[CONFIRM or remove]`
- "with reusable template": not in the notes (they mention "cross-model notes"). `[CONFIRM or remove]`
- The lesson ("precise prompts reduce review time…"): no conclusion is stated in the notes. `[CONFIRM it is your own]`
- "Next: nest FocusBoard work and start content map": no next-step in the notes. `[CONFIRM or remove]`

**Time:** ~12 min vs ~30 min manual. `[CONFIRM: measured or estimated]`

---

### Run 3 — Week 3 (FocusBoard + Through-Line)

**Input:**  
FocusBoard (Vite React task planner) feature-complete: create/complete/delete, filters, search, sort, localStorage, responsive. Moved into FocusBoard/ subfolder. FL-03 full set: Through-Line content map, Identity kit (Inter + #1E6848 palette), Curate Images with real MedNoviAI + FocusBoard screenshots. Empty-but-live later satisfied by Vercel URL.

**Final excerpt:**  
Shipped FocusBoard as a local-first task planner and nested it under the capstone repo. Finished FL-03 identity and content map (Home → Work → Case → Contact) with locked palette and honest gather-list for screenshots. Lesson: identity decisions early prevent redesign loops. Next: Next.js skeleton deploy and accessible components.

**Post-run audit:**
- The `FocusBoard/` folder exists in the capstone repo (checked). The notes' phrase "Empty-but-live later satisfied by Vercel URL" is unclear. `[CONFIRM and rewrite the input]`
- "(Home → Work → Case → Contact)": the sequence is not in the notes. `[CONFIRM]`
- "local-first": an interpretation of "localStorage". `[CONFIRM wording]`
- The lesson and the "Next:" line are not in the notes. `[CONFIRM or remove]`
- The repo root contains `FL-03_Consistency_Not_Talent.md`. `[CONFIRM that this file is the FL-03 work described here]`

**Time:** ~13 min vs ~32 min manual. `[CONFIRM: measured or estimated]`

---

### Run 4 — Week 4a (Capstone skeleton + a11y playground)

**Input:**  
FE-04: Next.js App Router skeleton on Vercel — routes /, /work, /about, /contact, /health. FE-05: hand-built Modal, Tabs, Disclosure with WAI-ARIA patterns; demo at /playground; NOTES comparing to shadcn/Radix. Live URL active. Identity kit not fully applied to live UI yet.

**Final excerpt:**  
Deployed Next.js capstone skeleton to Vercel with core portfolio routes and a server health check. Built accessible Modal, Tabs, and Disclosure without a UI library and documented focus/keyboard behavior. Lesson: hand-rolling a11y components teaches the patterns that libraries hide. Next: streaming chat route and content fill from the Through-Line map.

**Post-run audit:**
- Matches the repo README: the five routes (/, /work, /about, /contact, /health) and the server-side health page are described there (checked).
- `/playground` and the Modal/Tabs/Disclosure components are not mentioned in the README I read. `[CONFIRM they exist in src/ and link the commit]`
- "documented focus/keyboard behavior": the notes say only "NOTES comparing to shadcn/Radix". `[CONFIRM or remove]`
- The lesson and the "Next:" line are not in the notes. `[CONFIRM or remove]`

**Time:** ~12 min vs ~30 min manual. `[CONFIRM: measured or estimated]`

---

### Run 5 — Week 4b (Streaming chat + stack decision)

**Input:**  
FE-06: ChatInterface + /api/chat + lib/ai/config; switched toward Gemini free key; still need messages-shape / SDK version alignment and Vercel env. FL-04 Three Roads: chose Next.js + TS + Tailwind on Vercel free; rejected static and pure Vite SPA for the portfolio shell. Rationale written.

**Final excerpt:**  
Built streaming chat UI and route; remaining work is end-to-end verification with Gemini (payload shape, SDK versions, Vercel env). Completed Three Roads stack choice — Next.js remains the portfolio stack because it fits free hosting, demos, and long-form cases. Lesson: choosing the stack with constraints written down prevents "shiny tool" switches mid-build. Next: stabilize /chat, then fill Home/Work content.

**Post-run audit:**
- The first sentence correctly keeps streaming chat as *unverified*. This conflicts with the Project instructions in 3.1, which list streaming chat as evidence (see 3.1b).
- "fits free hosting, demos, and long-form cases": the notes mention only Vercel free and rejecting static/Vite. `[CONFIRM the rationale is yours]`
- The lesson and the "Next:" line are not in the notes. `[CONFIRM or remove]`
- **Label conflict:** the notes call the stack decision "FL-04 Three Roads", but FL-04 is this assignment (Ship an Automation Workflow v2). `[CONFIRM the correct code for Three Roads and fix the input]`

**Time:** ~14 min vs ~35 min manual (more technical detail to check). `[CONFIRM: measured or estimated]`

---

### 4.6 Evidence per run (the assignment asks for five documented runs with outputs)

The excerpts above are not enough on their own: the Gather, Draft and Critique outputs are the evidence that the handoffs worked.

| Run | Critique scores (5 rubric items) | Prioritized fix list | Changes made in human check | Link or screenshot of thread |
|-----|----------------------------------|----------------------|-----------------------------|------------------------------|
| 1 | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` |
| 2 | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` |
| 3 | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` |
| 4 | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` |
| 5 | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` | `[TO FILL]` |

---

## 5. Time accounting (honest)

The numbers below come from my run times in section 4. **Measurement note:** `[CONFIRM: were these times taken with a timer, or estimated from memory? The brief asks for one manual run timed against the pipeline. State which of the five manual baselines were actually timed and which were estimates.]`

**Inputs (from section 4):**
- Pipeline time: 11 + 12 + 13 + 12 + 14 = **62 min** (average ~12.4)
- Manual baseline: 28 + 30 + 32 + 30 + 35 = **155 min** (average 31)
- Human check: ~3–5 min per report, so **~15–25 min** across five
- One-time setup: **~25–35 min**

| Item | Time |
|------|------|
| One-time setup (update Project instructions + save step prompts) | ~25–35 min |
| Average single run (Gather → Draft → Critique → Revise) | ~12 min |
| Human check + paste real links | ~3–5 min |
| **Total per report after setup** | **~15–17 min** |
| Manual baseline per report (write from scratch + self-edit) | ~28–35 min (average 31) |
| **Time saved per report** | **~14–16 min** (31 − 15.4 to 31 − 17.4 → 13.6–15.6) |
| Five runs, pipeline + human check, **without** setup | ~77–87 min |
| Five runs, pipeline + human check, **with** setup | **~102–122 min (~1.7–2.0 h)** |
| Five runs, fully manual | ~155 min (~2.6 h) |
| **Net saving over these five runs (setup included)** | **~33–53 min** |
| Break-even (setup ÷ saving per report) | **~2–3 reports** |

Setup cost is paid once. Savings grow if weekly reports continue for the rest of the internship. All savings figures are only as reliable as the timings above.

*Correction note: an earlier draft of this document gave "~75 min pipeline + setup ≈ 1.5–2 h vs 2.5–3 h", which implied about 1 hour saved. Recalculated from the per-run numbers, the saving is about 33–53 minutes.*

---

## 6. Known failure points and required human review

| Failure point | What happens | Human must check | Status |
|---------------|--------------|------------------|--------|
| Vague raw notes | Gather invents structure that looks real | Supply concrete bullets; reject any claim you did not write | Expected `[CONFIRM if observed]` |
| Missing evidence | Draft uses [NEEDS MY INPUT] or skips links | Insert real repo URL, commit, or screenshot paths | Expected `[CONFIRM if observed]` |
| Tone drift | Critique scores voice low; revise can still sound generic | Read final out loud; cut hype adjectives | Expected `[CONFIRM if observed]` |
| Over-length | Model exceeds 400 words when week was busy | Force cut in REVISE or trim yourself | Expected `[CONFIRM if observed]` |
| **Added detail beyond the notes** | Final excerpts contain details not in the input (e.g. "MIT license", "field errors, disable submit", "demos, long-form cases", most lessons) | Compare every sentence to the input notes, as in the post-run audits in section 4 | **Observed in Runs 1–5** |
| **Gather/Draft template mismatch** | The DRAFT template requires "Next week priority", but GATHER never collects it, so "Next:" lines appear with no source in the notes | Add the v2.1 GATHER line (section 3.2); until then, treat every "Next:" line as unsupported | **Observed in Runs 1–5** |
| **Project context bleeding in** | Details may come from Project instructions or earlier thread context instead of the pasted notes | Check unexplained details against the notes; keep the Project instructions accurate | Likely (inference; `[CONFIRM]`) |
| **Standing instructions out of date** | Instructions list streaming chat as evidence while Run 5 shows it unverified | Update instructions when status changes (see 3.1b) | **Observed** |
| **Same-model self-critique** | The model that wrote the draft also scores it; Critique can check consistency with the fact sheet, not whether claims are true | Verify facts yourself against the repo, commits and live URL | Expected (design limit) |
| **Label or code drift** | Assignment codes in notes can be wrong (Run 5 labels Three Roads as FL-04) | Check codes against the assignment list | **Observed (Run 5)** |
| Stale Project instructions | Old stack (Vite-only) mentioned after Next.js move | Keep Project instructions updated when stack changes | Expected `[CONFIRM if observed]` |
| Multi-week merge | User pastes notes from two weeks | Split runs; one week per pipeline | Expected `[CONFIRM if observed]` |

**Hard rule:** The pipeline never submits. I always do the human check before portal or git.

---

## 7. How to run on a brand-new input (end-to-end test)

1. Open Claude Project "Hamid – Frontend AI Intern".  
2. Paste **STEP: GATHER** + this week's raw notes.  
3. Paste **STEP: DRAFT** (no extra chat).  
4. Paste **STEP: CRITIQUE**.  
5. Paste **STEP: REVISE**.  
6. Run the human checklist.  
7. Copy final text to portal / `docs/` / progress log.

### 7.1 Brand-new-input test (required evidence)

The five runs above reuse notes from past weeks. The assignment's first criterion is that the workflow runs end to end on a *brand-new* input, so one fresh run is documented here.

| Field | Entry |
|-------|-------|
| Date and time | `[TO FILL]` |
| Input (new notes not used in Runs 1–5) | `[TO FILL]` |
| Prompt version used (v1 or v2.1) | `[TO FILL]` |
| All four steps completed? | `[TO FILL: yes/no]` |
| Time (pipeline + human check) | `[TO FILL]` |
| Corrections made in human check | `[TO FILL]` |
| Evidence (screenshot or thread link) | `[TO FILL]` |

---

## 8. Artifacts to keep

- This walkthrough document  
- Claude Project with updated instructions + saved step prompts (in Project knowledge or a pinned note)  
- Five final report texts (can live in `docs/progress/` — create the folder if it does not exist — or the Project history)  
- A screenshot of one full Gather→Revise thread (recommended: it is the evidence for section 7.1)  
- Repo: https://github.com/Hamid839/frontend-ai-capstone

---

## 9. Future upgrade (optional, not required for pass)

If report volume increases, the same four prompts could be moved into an **n8n** workflow. The n8n quickstart I read covers a schedule trigger, an HTTP Request node, an Edit Fields node and a Data table node. It does not cover calls to the Claude API, webhook triggers, "wait for human" steps, or Google Docs/GitHub output, so those parts are **unverified** and would need checking in n8n's own docs. Calling the Claude API may also need an API key and billing separate from the chat plan `[CONFIRM before relying on this]`. This would automate the button presses, not change the step design.

---

## 10. Evaluation criteria map

| Criterion | Where it is addressed |
|-----------|-----------------------|
| Workflow runs end to end on a brand-new input | Section 7.1 |
| Three+ distinct steps with defined handoffs | Sections 2 and 3.2 |
| Five real runs documented with outputs | Section 4 and 4.6 |
| Time accounting honest, including setup cost | Section 5 |
| Failure points and required human review named | Section 6 and the Step 5 checklist in section 3.2 |

---

*End of walkthrough.*
