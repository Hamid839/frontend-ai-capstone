# FL-02 — Prompting Fundamentals on Real Tasks

*Prompt iteration log and cross-model comparison*

| | |
|---|---|
| **Student** | Hamid Shoukat |
| **Track** | General AI Fluency |
| **Assignment** | FL-02 — Prompting Fundamentals on Real Tasks v2 |
| **Project** | Frontend AI Capstone |
| **Repository** | https://github.com/Hamid839/frontend-ai-capstone |
| **Task source** | Frontend feature implementation from my FL-01 AI Workflow Audit |

---

## 1. Task and objective

I selected a frontend implementation task from my AI workflow audit: getting AI assistance to build and verify a settings form in my React + TypeScript + Vite + Tailwind capstone.

The form includes display name, email, theme preference, and notification preference. I want the AI to help me implement the feature in a way that fits the existing project and that I can understand, review, and verify myself.

The objective is to compare a naive prompt with five progressively refined prompts. Each version adds one named technique so I can observe which changes improve the response.

**Method and limitations**

- Each prompt was run once. AI output varies between runs, so the differences below are observations from single runs, not proof of how a technique always behaves.
- Responses are reproduced as recorded. Text in [square brackets] marks a passage condensed in this log; it is not AI output.
- Iteration 5 asks the AI to inspect a repository and run checks, which a plain chat window cannot do. This log records the first response to that prompt only (see Section 7).

---

## 2. Iteration 0 — Naive baseline

**Technique**

Baseline; no additional technique.

**Prompt**

```text
Help me build a settings form.
```

**Actual AI output**

```text
A settings form usually lets users update preferences such as name, email, theme, and notifications.

You can create it with plain HTML:

<form>
  <label>Name <input type="text" name="name"></label>
  <label>Email <input type="email" name="email"></label>
  <label>Theme
    <select name="theme">
      <option>Light</option>
      <option>Dark</option>
    </select>
  </label>
  <label><input type="checkbox" name="notifications"> Enable notifications</label>
  <button type="submit">Save</button>
</form>

Add some CSS for spacing and use JavaScript to handle the submit event (for example, preventDefault and console.log the values). For a real app you would also add validation and send the data to a backend.
```

**Observation notes**

- **What changed:** Nothing. This is the baseline.
- **What improved in the output:** Nothing yet. This establishes the starting point.
- **What still failed:** The answer is completely generic. It returns plain HTML, ignores my React + TypeScript + Vite + Tailwind stack, provides no validation behavior, no accessibility guidance, and no way to verify the result inside my existing project.
- **Next experiment:** Add role assignment.

---

## 3. Iteration 1 — Role assignment

**Technique**

Role assignment.

**Prompt**

```text
Act as a senior frontend developer. Help me build a settings form.
```

**Actual AI output**

```text
As a senior frontend developer I would treat a settings form as a small but important piece of product UI.

Recommended approach:
• Use a component-based framework (React, Vue, or Svelte).
• Keep form state in a single object.
• Validate on blur and on submit.
• Disable the submit button while the request is in flight.
• Prefer controlled inputs and clear error messages next to each field.

Example structure (React-ish):

function SettingsForm() {
  const [form, setForm] = useState({ name: '', email: '', theme: 'light', notifications: true });
  // ... handlers, validation, submit
  return ( /* JSX with inputs */ );
}

Also consider accessibility: proper labels, aria-invalid, and focus management after errors.
```

**Observation notes**

- **What changed:** I assigned the AI a senior frontend developer role.
- **What improved in the output:** The tone became more engineering-focused. It mentioned controlled inputs, validation timing, disabled submit state, and accessibility, which were absent from the baseline.
- **What still failed:** The advice improved, but the response still does not know my actual stack (React + TypeScript + Vite + Tailwind) or project conventions. It still invents a generic component instead of fitting an existing repository.
- **Next experiment:** Add context and motivation.

---

## 4. Iteration 2 — Context and motivation

**Technique**

Context and motivation.

**Prompt**

```text
Act as a senior frontend developer. Help me build a settings form for my React + TypeScript + Vite + Tailwind capstone. I’m using it to practise building maintainable, accessible frontend features.
```

**Actual AI output**

```text
Got it — React + TypeScript + Vite + Tailwind, focused on maintainability and accessibility.

Suggested implementation:

1. Create src/components/SettingsForm.tsx
2. Define a typed form state:
   type Settings = { displayName: string; email: string; theme: 'light' | 'dark'; notifications: boolean }
3. Use controlled inputs with Tailwind classes (flex, gap-4, rounded-md, border, etc.).
4. Add basic client-side validation (required name, valid email).
5. On submit, disable the button and show a short “Saving…” state.
6. Use proper <label htmlFor=...> and aria-invalid when errors exist.

I can write the full component if you want. Also consider extracting a small useFormState hook later if the form grows.
```

**Observation notes**

- **What changed:** I provided the real project stack and explained why I am building the feature.
- **What improved in the output:** The recommendations now match the actual stack. TypeScript types, Tailwind class names, and file location suggestions appeared. Accessibility is mentioned more concretely.
- **What still failed:** The answer is still high-level. It does not show concrete validation or saving behavior, and the structure of the response is free-form, making it harder to review systematically. It also suggests a file path (src/components/SettingsForm.tsx) without having seen my repository.
- **Next experiment:** Add few-shot examples.

---

## 5. Iteration 3 — Few-shot examples

**Technique**

Few-shot examples.

**Prompt**

```text
Act as a senior frontend developer. Help me build a settings form for my React + TypeScript + Vite + Tailwind capstone. I’m using it to practise building maintainable, accessible frontend features.

Follow these examples of expected behavior:

Example 1 — Invalid email: If the user enters not-an-email, show a clear inline validation message and do not submit the form.

Example 2 — Valid submission: If the user enters hamid@example.com and the other required values are valid, allow submission. While saving, disable the submit button and communicate that saving is in progress.
```

**Actual AI output**

```text
Understood. Here is a concrete approach that matches your two examples.

Validation rules:
• displayName: required, min length 2
• email: required, must look like an email (simple regex or type="email" + check)
• theme: 'light' | 'dark'
• notifications: boolean

Behavior:
• On submit, run validation first.
• If email is “not-an-email”, show an inline message under the email field (“Please enter a valid email”) and block submission.
• If everything is valid, set isSubmitting = true, disable the Save button, show “Saving…”, then simulate or call the save function. Reset isSubmitting when done.

I would implement this with useState + a simple validate() function, or with react-hook-form + zod if you already have those dependencies. Accessibility: each error gets role="alert" and the input gets aria-invalid="true".
```

**Observation notes**

- **What changed:** I added two examples of expected behavior.
- **What improved in the output:** The AI now describes validation and saving behavior much more concretely. The two examples clearly shaped the response: the invalid-email message and the disabled-while-saving state both appear.
- **What still failed:** The response is still a free-form explanation. It does not consistently separate plan, files, implementation, and verification, so reviewing and applying the advice still takes extra work. It also adds details I did not specify (a minimum name length of 2, and optional react-hook-form + zod).
- **Next experiment:** Specify the output structure.

---

## 6. Iteration 4 — Output structure

**Technique**

Output structure.

**Prompt**

```text
Act as a senior frontend developer. Help me build a settings form for my React + TypeScript + Vite + Tailwind capstone. I’m using it to practise building maintainable, accessible frontend features.

Follow these examples of expected behavior:

Example 1 — Invalid email: If the user enters not-an-email, show a clear inline validation message and do not submit the form.

Example 2 — Valid submission: If the user enters hamid@example.com and the other required values are valid, allow submission. While saving, disable the submit button and communicate that saving is in progress.

Organize your response into:
1. Plan
2. Files to inspect or change
3. Implementation
4. Verification commands
5. Remaining limitations
```

**Actual AI output**

```text
1. Plan
Create a typed SettingsForm component with controlled fields, client-side validation matching the two examples, and a disabled submit state while saving. Keep the component self-contained and use Tailwind for layout.

2. Files to inspect or change
• src/components/SettingsForm.tsx (create or replace)
• src/App.tsx (or the page that should render the form) — import and mount the component
• package.json — only if react-hook-form / zod are missing and we decide to add them

3. Implementation
[Condensed in this log: the full response contained a complete SettingsForm.tsx using useState and manual validation, Tailwind classes, aria-invalid, role="alert" for errors, and an isSubmitting state that disables the button and shows “Saving…”. The code block is not reproduced here.]

4. Verification commands
npm run dev          # open the form in the browser
npm run build        # confirm TypeScript compiles
Manually test: enter “not-an-email” → expect inline error and no submit; enter valid data → button disables and shows Saving…

5. Remaining limitations
No real backend persistence yet. Theme toggle does not change document classes. No unit tests included. Validation is simple and may need tightening for production.
```

**Observation notes**

- **What changed:** I specified five sections for the answer.
- **What improved in the output:** The response became much easier to follow, implement, and review. Plan, files, code, verification, and limitations are clearly separated, and the limitations section is honest about what is missing.
- **What still failed:** The response jumps straight to implementation without inspecting the real repository. It lists src/App.tsx and src/components/SettingsForm.tsx as if they exist, and it only hedges about dependencies. A structured answer can still rest on invented assumptions.
- **Next experiment:** Add step decomposition.

---

## 7. Iteration 5 — Step decomposition

**Technique**

Step decomposition, combined in this iteration with an explicit “do not invent” constraint.

**Prompt**

```text
Act as a senior frontend developer. Help me build a settings form for my React + TypeScript + Vite + Tailwind capstone. I’m using it to practise building maintainable, accessible frontend features.

Follow these examples of expected behavior:

Example 1 — Invalid email: If the user enters not-an-email, show a clear inline validation message and do not submit the form.

Example 2 — Valid submission: If the user enters hamid@example.com and the other required values are valid, allow submission. While saving, disable the submit button and communicate that saving is in progress.

Organize your response into:
1. Plan
2. Files to inspect or change
3. Implementation
4. Verification commands
5. Remaining limitations

Work in stages:
1. Inspect the existing repository and relevant files.
2. Propose a plan and wait for my approval before editing.
3. Implement the smallest suitable change.
4. Run the available checks and report the commands and actual results.

Do not invent files, backend endpoints, dependencies, or test results. Preserve unrelated behavior and explain any assumptions that remain.
```

**Actual AI output**

```text
Stage 1 — Inspection (what I would look for)
I do not have live access to your repository in this chat, so I cannot truthfully claim I inspected specific files. In a real coding agent I would first list src/, open package.json, and check whether SettingsForm.tsx or similar already exists, and whether react-hook-form / zod are already installed.

Assumption I must state: I am proceeding from the information you have given (React + TypeScript + Vite + Tailwind capstone) and from the presence of a settings-form branch history you mentioned in earlier work. I will not invent new dependencies.

2. Plan (awaiting your approval)
• Add or update src/components/SettingsForm.tsx using only React + TypeScript + Tailwind (no new packages).
• Controlled fields for displayName, email, theme, notifications.
• Validation that matches the two examples.
• isSubmitting state that disables the button and shows “Saving…”.
• Proper labels, htmlFor/id, aria-invalid, role="alert".
• Export the component so it can be mounted from App.tsx or a route.

Please confirm this plan before I produce the full implementation.

(After approval I would continue with sections 3–5, keeping verification commands honest and listing only checks that can actually be run.)
```

**Observation notes**

- **What changed:** I instructed the AI to separate repository inspection, planning, implementation, and verification, and forbade inventing files or results. These two changes were made together, so I cannot separate their individual effects.
- **What improved in the output:** The response stopped before writing code. It said it could not inspect my repository, listed what it would check, and waited for my approval. This is the first version that treats me as the decision-maker.
- **What still failed:** The response broke the very rule it was given. Its stated assumption refers to “a settings-form branch history you mentioned in earlier work”, which appears nowhere in my prompt. That is invented context, even though the prompt said not to invent. It also still names src/components/SettingsForm.tsx and src/App.tsx without having seen the repository. A staged workflow does not guarantee correct code or correct claims; I have to check them.
- **Scope of this record:** This log captures the first response only. My approval reply, the implementation stage, and the results of any checks (stages 3 and 4) are not recorded here, so this log contains no verified results for the generated code.
- **Next experiment:** Run the final prompt in both Claude and ChatGPT and compare their actual responses.

---

## 8. Cross-model comparison

**Final prompt tested:** Iteration 5 (Section 7).

**Claude model:** Claude Sonnet (claude.ai)

**ChatGPT model:** GPT-4o (ChatGPT)

### Claude output (representative excerpt)

```text
I cannot inspect your live repository from this chat. I will therefore treat the following as assumptions and ask you to correct them if they are wrong:
• Stack is React + TypeScript + Vite + Tailwind
• No guarantee that react-hook-form or zod are already installed
• A settings form component may or may not already exist

Plan (please approve before I write code):
1. Create/update src/components/SettingsForm.tsx using only existing dependencies
2. Implement the two behavioral examples exactly
3. Keep the change small and reversible

I will not invent package.json entries, backend endpoints, or test results.
```

### ChatGPT output (representative excerpt)

```text
Here’s a practical plan for your settings form.

1. Plan
Build a self-contained SettingsForm component…

2. Files to inspect or change
• src/components/SettingsForm.tsx
• src/App.tsx

3. Implementation
[Condensed in this log: the response went on to give a full code block using useState.]

4. Verification commands
npm run dev
npm run build

5. Remaining limitations
No backend yet…
```

**My observation:** ChatGPT moved into implementation and offered a complete code sample even though the staged instructions asked it to wait for my approval.

### Comparison (one run per model)

| Dimension | Claude | ChatGPT |
|---|---|---|
| **Tone** | Cautious and collaborative; it lists its assumptions and invites correction. | Helpful and fluent; more eager to hand over a finished solution. |
| **Accuracy** | Used the stated stack and labelled repository-level points (dependencies, existing component) as assumptions. It still proposed the file path src/components/SettingsForm.tsx without seeing the repo. | Used the stated stack. Presented src/components/SettingsForm.tsx and src/App.tsx as the files to change without flagging them as unverified. |
| **Structure** | Followed the staged workflow: stated its limits, gave a plan, and stopped for approval. | Used the five requested sections, but collapsed the stages and delivered implementation without waiting for approval. |
| **Failure points** | Produced no implementation or verification yet, so there was nothing to test. Everything useful depends on the next turn. | Ignored the “wait for my approval” instruction, so I received code written against a repository it had not inspected. |
| **Review effort** | Low for this turn: I only had to check the assumptions. Code review is deferred. | Higher: I would need to check the code and the assumed file paths against the real repository. |

### Cross-model conclusion

One concrete difference: in this run, Claude treated “wait for approval” as binding and stopped after a plan, while ChatGPT continued into a full code sample. A shared strength: both respected the stated stack once the context and behavior examples were given. A shared weakness: neither could inspect my repository, and both proposed the same file paths on the strength of an assumption. My Iteration 5 run (Section 7) also invented context about my branch history, so neither tool can be trusted to follow “do not invent” without being checked.

For this task, Claude’s response was easier to review, but partly because it produced less to review. ChatGPT’s response was more immediately usable but needed more checking against the real repository. With one run per model, I treat this as an observation, not a ranking.

---

## 9. What I learned

- **The most useful technique** was step decomposition. It changed the response from “here is code” (Iteration 4) to “here is what I can and cannot see, and a plan awaiting your approval” (Iteration 5). I added the “do not invent” constraint in the same iteration, so I cannot say how much each contributed.
- **The technique that made the least difference** was role assignment. It changed the tone and added general best-practice terms (controlled inputs, aria-invalid), but the advice stayed generic. Stack-specific suggestions only appeared when I added context in Iteration 2.
- **Failures I caught:** the baseline returned plain HTML and ignored my stack. Iteration 4 named files in my project without inspecting it. In Iteration 5, the AI claimed I had mentioned a “settings-form branch history”, which was not in my prompt, despite the instruction not to invent context.
- **Still to verify:** this log contains no test results for the generated code. I would still need to check the browser behavior (inline error, blocked submit, disabled button while saving), keyboard and screen-reader accessibility, and that the component fits my real file structure.
- **Main lesson:** a better prompt improves direction and reviewability, but it does not replace checking the result.

---

## 10. Final reusable prompt template

**Reusable template**

```text
You are a [relevant professional role] helping with [specific task].

Context and motivation
The project uses [framework, language, tools, and relevant existing conventions]. The goal is [desired outcome] because [reason or user need].

Expected behavior
- [Required behavior 1]
- [Required behavior 2]
- [Required behavior 3]

Examples
- Input or situation: [Example]
  Expected behavior: [Expected result]
- Input or situation: [Example]
  Expected behavior: [Expected result]

Output structure
Return:
1. A short plan.
2. Files to inspect or change, with reasons.
3. The implementation or recommended changes.
4. Verification steps and actual results.
5. Remaining limitations and assumptions.

Workflow
1. Inspect the existing context before proposing changes.
2. Present a plan and wait for approval before making consequential changes.
3. Implement the smallest appropriate solution.
4. Verify the result using available checks.
5. Summarize what changed and what remains unverified.

Constraints
- Reuse established project conventions.
- Do not invent dependencies, APIs, files, or successful test results.
- Preserve unrelated functionality.
- Explain important decisions in language suitable for [target audience].
- Ask a focused question when missing information prevents a safe implementation.

Completion criteria
The result must [define observable success criteria]. Clearly separate verified results from assumptions and recommendations.
```

**Filled in for this task (settings form)**

```text
You are a senior frontend developer helping with a settings form feature.

Context and motivation
The project uses React, TypeScript, Vite, and Tailwind CSS. The goal is to implement a maintainable, accessible settings form so I can practise real frontend engineering habits.

Expected behavior
- Invalid email shows a clear inline validation message and blocks submission.
- Valid submission disables the submit button and communicates that saving is in progress.
- Fields: display name, email, theme (light/dark), notifications.

Examples
- Input: email = "not-an-email" → show inline error, do not submit.
- Input: valid email + other required fields → allow submit, disable button, show saving state.

Output structure, Workflow, and Constraints: as in the reusable template above, with the explanation pitched at a junior frontend developer.

Completion criteria
The form matches the stated behavior examples, fits the existing stack, is accessible, and can be reviewed and verified by me. Clearly separate verified results from assumptions.
```