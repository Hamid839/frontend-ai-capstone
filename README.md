# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
# FocusBoard — FlyRank Week 3

A responsive, local-first task planner built with React, TypeScript, Vite, and Lucide icons as a Week 3 Frontend AI Engineering assignment.

## Features
- Create tasks with a category, priority, and due date
- Mark tasks complete or active; delete tasks; clear completed tasks
- Filter by status and category, search task titles, and sort by priority
- Overview cards and a completion-progress indicator
- Browser `localStorage` persistence
- Responsive layout, keyboard focus states, labelled form fields, and reduced-motion support
- Graceful handling of invalid or unavailable local storage

## Run locally

Requirements: Node.js LTS and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To verify a production build:

```bash
npm run build
npm run preview
```

## Data and limitations
This is a frontend-only demo. Tasks are saved in the current browser's local storage; there is no account, cloud sync, backend, or AI API. The sample tasks appear when the app has no saved task data. Clearing browser storage resets the app to the sample tasks.

## Assignment evidence
- `docs/AI-PROMPTS.md` — prompts used during development
- `docs/AI-ASSISTANCE-AND-REVIEW.md` — AI role, manual review examples, and verification checklist

Before submitting, run the app and build on your machine, test the listed flows, and update the review document with any additional corrections you actually make. Do not claim a test passed unless you ran it.

