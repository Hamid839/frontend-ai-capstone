# FE-03: AI-Assisted Workflow Drill

## Overview
I built the same Settings form twice using two different prompting styles to compare the results.

- **Round 1 (Vague)**: One-sentence prompt with no context or constraints.
- **Round 2 (Precise)**: Detailed prompt with technical requirements, validation rules, accessibility, and a verification step.

## Round 1 – Vague Prompt
**Prompt used:**
> Create a settings form with name, email, theme and notifications.

**Result:**
The AI produced a plain HTML + CSS + JavaScript form. There was no React, no TypeScript, no validation library, and no proper project structure. The form looked basic and had almost no error handling.

**AI mistake I caught:**
The vague prompt generated a completely different technology stack (vanilla JS instead of React + TypeScript). This would have been unusable in the actual capstone project.

## Round 2 – Precise Prompt
**Prompt used:**
A detailed prompt that specified:
- React + TypeScript + Vite
- react-hook-form + zod for validation
- Accessibility requirements
- Disabled submit state
- Error messages under fields
- Tailwind styling
- File location (`src/components/SettingsForm.tsx`)
- A verification checklist

**Result:**
A clean, working React component with proper validation, accessible labels, success feedback, and modern styling. The form behaved correctly and matched the project stack.

## Comparison

| Aspect              | Vague Round                  | Precise Round                          |
|---------------------|------------------------------|----------------------------------------|
| Technology          | Plain HTML/JS                | React + TypeScript + Vite              |
| Validation          | Almost none                  | Full zod + react-hook-form             |
| Accessibility       | Weak                         | Proper labels and structure            |
| Error handling      | Missing                      | Clear messages under each field        |
| Project fit         | Did not match the stack      | Matched the capstone stack perfectly   |
| Review effort       | High (had to rebuild)        | Low (mostly worked on first try)       |

## Key Lesson
A vague prompt forces the AI to guess. A precise prompt with constraints, file locations, and a verification step produces code that is much closer to production quality and requires significantly less rework.

Round 2 felt slower while writing the prompt, but was faster overall because almost no fixing was needed afterward.