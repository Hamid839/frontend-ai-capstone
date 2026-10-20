# The Prompt Ladder — General AI Fluency

**Name:** Hamid Shoukat  
**Track:** General AI Fluency  
**Week:** 2 — Foundations  
**Project:** Frontend AI Capstone  
**Repository:** https://github.com/Hamid839/frontend-ai-capstone

## Objective

This experiment investigates how individual prompt improvements affect AI assistance for a frontend task. I chose a settings form because it is relevant to my React capstone and gives me a practical way to compare vague guidance with project-specific implementation guidance.

The experiment starts with a weak prompt and adds one named layer at a time. Each version retains the previous version and adds exactly one change.

**Important:** The output excerpts below are illustrative starting examples. Before submitting, I will replace them with excerpts from my actual six runs and adjust my observations to match the evidence.

---

## Run 0 — Weak baseline

### Prompt

> Help me build a settings form.

### Output excerpt — illustrative

A settings form typically includes fields for a user's name, email address, theme preferences, and notification settings. You can use HTML to create the form and JavaScript to handle interactions. Add labels, validate required fields, and include a submit button.

### Four notes

- **Prompt change:** None. This is the intentionally vague baseline.
- **What improved in the output:** Nothing can be compared yet; this establishes the starting point.
- **What still failed:** The response gives generic advice without knowing my actual feature, stack, project conventions, or expected deliverable.
- **What I would try next:** State the specific goal so the response has a concrete target.

---

## Run 1 — Layer: Clearer goal

### Prompt

> Help me implement a settings form with display name, email, theme, and notification preferences.

**Single change:** Added a specific feature goal to the baseline.

### Output excerpt — illustrative

Create four controls: a display-name input, an email input, a theme selector, and a notifications toggle. Add a Save Settings button and validate the email before saving. Show a success message when the settings are saved.

### Four notes

- **What changed in the prompt:** I specified which settings the form must contain.
- **What improved in the output:** The response now identifies the four expected controls and a basic save interaction instead of describing settings forms in general.
- **What still failed:** It still does not know who will use the response or what technical level and implementation approach are appropriate.
- **What I would try next:** Define the intended audience.

---

## Run 2 — Layer: Defined audience

### Prompt

> Help me implement a settings form with display name, email, theme, and notification preferences. The response is for a junior frontend developer learning to build maintainable React interfaces.

**Single change:** Added the intended audience.

### Output excerpt — illustrative

Break the form into understandable pieces, use meaningful field names, and keep validation logic separate from presentation where appropriate. Explain how the inputs, validation, and submit handler work so a junior developer can maintain the feature.

### Four notes

- **What changed in the prompt:** I identified the response's intended reader.
- **What improved in the output:** The response emphasizes understandable implementation and maintainability rather than only listing form controls.
- **What still failed:** The advice remains generic. It could apply to many projects and does not establish my actual stack or existing dependencies.
- **What I would try next:** Supply real project context.

---

## Run 3 — Layer: Real context

### Prompt

> Help me implement a settings form with display name, email, theme, and notification preferences. The response is for a junior frontend developer learning to build maintainable React interfaces. My capstone uses React, TypeScript, Vite, and Tailwind CSS.

**Single change:** Added the capstone's technical context.

### Output excerpt — illustrative

Build the form as a typed React component. Use TypeScript interfaces or types for the settings values, and use Tailwind CSS for layout and field styling. Keep the component compatible with the existing Vite project.

### Four notes

- **What changed in the prompt:** I added the framework, language, build tool, and styling system.
- **What improved in the output:** The proposed implementation now fits the technologies used by my capstone instead of suggesting an unspecified stack.
- **What still failed:** Knowing the stack does not tell the AI how I want the answer organized. It might still return scattered advice or a large code block without explaining the changes.
- **What I would try next:** Specify a useful output format.

---

## Run 4 — Layer: Specified output format

### Prompt

> Help me implement a settings form with display name, email, theme, and notification preferences. The response is for a junior frontend developer learning to build maintainable React interfaces. My capstone uses React, TypeScript, Vite, and Tailwind CSS. Return the answer as a short implementation plan, followed by the code organized by file, then verification steps.

**Single change:** Specified the format of the answer.

### Output excerpt — illustrative

1. **Plan:** Identify the form component and its state and validation needs.
2. **Implementation:** Provide the component code and any supporting files, with file paths.
3. **Verification:** Explain how to run the project and check the form's behavior.

### Four notes

- **What changed in the prompt:** I required an implementation plan, file-organized code, and verification steps.
- **What improved in the output:** The answer becomes easier to follow and review because implementation and verification are separate.
- **What still failed:** A structured answer can still recommend unnecessary dependencies, overwrite existing work, or invent project files and behavior.
- **What I would try next:** Add explicit implementation constraints.

---

## Run 5 — Layer: Constraints

### Prompt

> Help me implement a settings form with display name, email, theme, and notification preferences. The response is for a junior frontend developer learning to build maintainable React interfaces. My capstone uses React, TypeScript, Vite, and Tailwind CSS. Return the answer as a short implementation plan, followed by the code organized by file, then verification steps. Reuse existing project conventions and dependencies, do not add packages without explaining why they are needed, preserve unrelated behavior, and do not invent a backend endpoint or claim tests passed unless they were actually run.

**Single change:** Added explicit constraints on dependencies, project changes, backend assumptions, and verification claims.

### Output excerpt — illustrative

Inspect the existing project structure before editing. Reuse installed dependencies and established conventions. If no settings API exists, separate the form from the save operation and explain the integration point instead of inventing an endpoint. Report only verification commands that were actually run and their observed results.

### Four notes

- **What changed in the prompt:** I added constraints for dependency use, scope, backend assumptions, and honest verification.
- **What improved in the output:** The instructions now discourage invented APIs, unnecessary packages, unrelated changes, and unsupported claims that the code was tested.
- **What still failed:** Constraints alone do not guarantee that the generated implementation is correct, accessible, or compatible with every existing file. The code still needs review and actual verification.
- **What I would try next:** Keep the useful layers and test the final prompt against the real repository, reviewing the resulting diff and running the available checks.

---

## Comparison and conclusion

The ladder shows how different prompt layers address different weaknesses:

| Layer | Intended improvement |
|---|---|
| Clearer goal | Makes the requested feature specific |
| Defined audience | Tailors the explanation to the reader |
| Real context | Aligns the response with the project's stack |
| Output format | Makes the response easier to follow and review |
| Constraints | Reduces risky assumptions and unnecessary changes |

**A layer that did not necessarily help:** Defining the audience may make the explanation easier to understand, but it does not automatically make the code more correct. If the actual response becomes longer without adding useful implementation detail, I would treat that as a weak or negligible improvement rather than declaring the layer successful.

The result of this experiment should be judged from the six actual outputs, not from the prompt wording alone. I will keep the final evaluation tied to observable differences in the responses.

---

## Final reusable prompt

You are assisting a junior frontend developer with a settings form in an existing React project.

**Goal:** Help implement a settings form containing display name, email, theme, and notification preferences.

**Project context:** The capstone uses React, TypeScript, Vite, and Tailwind CSS.

**Workflow and output:**
1. Inspect the existing project structure and relevant files before proposing changes.
2. Give a short implementation plan.
3. Identify the files that need to change and explain why.
4. Implement the feature using the project's existing conventions.
5. Explain the important implementation decisions in clear language suitable for a junior developer.
6. Provide the actual verification commands available in the project and report their results accurately.

**Constraints:**
- Reuse existing dependencies and conventions.
- Do not add packages without explaining the need.
- Preserve unrelated functionality and avoid unnecessary refactoring.
- Use appropriate labels and accessible validation feedback.
- Do not invent a backend endpoint, project file, or existing behavior.
- If backend persistence is not available, clearly separate the UI from the save integration point.
- Do not claim that tests, linting, or builds passed unless they were actually run.
- Ask a focused question if a missing requirement prevents a safe implementation.

**Completion criteria:** The implementation fits the existing project, its behavior is understandable, its changes can be reviewed, and verification claims are supported by actual command results.

