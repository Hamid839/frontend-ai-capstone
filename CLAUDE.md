# Project Conventions – Frontend AI Capstone

## Stack
- Node.js (LTS)
- TypeScript
- React + Vite
- Tailwind CSS
- ESLint + Prettier

## Coding Conventions
- Use Conventional Commits for every commit
- Prefer functional components and React hooks
- Type everything properly (avoid `any`)
- Keep components small and focused
- Use absolute imports when possible

## AI Assistant Instructions
When helping with this project:
- Always follow Conventional Commits format
- Prefer modern React + TypeScript patterns
- Suggest tests when adding new features
- Keep README.md and this file up to date
- Follow the stack and conventions listed above

## Form Rules (learned from FE-03)

- All forms must use react-hook-form + zod. Never use uncontrolled inputs for forms that need validation.
- Every form field must have a visible label and display validation errors directly under the field.
- The submit button must be disabled while the form is submitting.