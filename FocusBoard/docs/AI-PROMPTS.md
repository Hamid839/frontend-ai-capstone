# AI Development Prompt Log — FocusBoard

This log records the prompts used to plan and develop this assignment. The prompts below are a faithful summary of the instructions used to generate the starter implementation and supporting documentation in this package. If you continue development with another assistant, append its exact prompt and describe the actual output rather than rewriting history.

## Prompt 1 — Plan the application
> Act as a senior frontend engineer and mentor. Help me build a complete, beginner-readable React application for a Frontend AI Engineering internship assignment. Use React, TypeScript, and Vite. Choose a small but useful task-planning app that can be completed without a paid API or backend. First define the user, main use cases, component boundaries, data model, and acceptance criteria. Avoid unnecessary libraries and explain assumptions.

**Purpose:** Establish a manageable scope before implementation.

## Prompt 2 — Implement the main UI and interactions
> Implement FocusBoard as a responsive React + TypeScript + Vite app. Users must be able to add tasks with a title, category, priority, and due date; mark tasks complete or active; delete tasks; clear completed tasks; search titles; filter by status and category; and sort by priority. Include summary cards and a progress indicator. Use semantic HTML, clear labels, useful empty states, and keyboard focus styles. Keep the code organized into separate files and avoid adding a backend or claiming AI functionality inside the app.

**Purpose:** Generate a working first implementation with clear scope and boundaries.

## Prompt 3 — Add persistence and defensive handling
> Add localStorage persistence for the task list. Keep the storage logic separate from the UI. Handle malformed JSON, unexpected stored values, and storage access failures without crashing the app. Validate the basic shape of stored task records before using them. Keep the app usable for the current session if saving fails.

**Purpose:** Improve reliability beyond a static UI.

## Prompt 4 — Review accessibility and responsive behavior
> Review the implementation as a critical frontend code reviewer. Look for missing accessible names, poor keyboard focus, confusing empty states, mobile overflow, non-semantic controls, and motion that ignores reduced-motion preferences. Make specific corrections in the code, and do not claim browser testing has been performed unless it actually has.

**Purpose:** Prompt a targeted quality pass rather than simply requesting more styling.

## Prompt 5 — Document and verify
> Create a README with setup, run, build, features, and limitations. Add an AI assistance and manual review log that separates AI-generated implementation from human review actions. Provide a verification checklist for adding, completing, deleting, searching, filtering, sorting, persistence, responsive layout, and production build. Mark results as “not run” until a developer runs the checks.

**Purpose:** Make the project reproducible and keep evidence honest.

## Prompt 6 — Manual review checklist
> Inspect the generated code yourself. Identify any assumptions, security or reliability limitations, and areas that need a human decision. Do not invent actual test results or pretend a human made edits that have not happened. List the next checks I should run locally and ask me to record concrete corrections after reviewing the code.

**Purpose:** Preserve developer responsibility for review and verification.

## Important evidence note
This log documents the prompts used to create the packaged starting implementation. The assignment expects the intern to run the app, review the output, and perform real manual improvements. After you inspect and test the app, add a dated “My follow-up review” section describing what you personally changed, why, and how you verified it. Do not present planned or AI-suggested changes as already completed manual work.
