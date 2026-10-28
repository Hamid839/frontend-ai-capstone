# FE-05 — Accessible component fundamentals · NOTES

**Student:** Hamid Shoukat  
**Playground:** `/playground` (Modal, Tabs, Disclosure built from scratch)

---

## What I built by hand

| Component   | ARIA pattern focus                                                                 |
|-------------|-------------------------------------------------------------------------------------|
| Modal       | `role="dialog"`, `aria-modal`, labelled/described, focus trap, Escape, restore focus |
| Tabs        | `tablist` / `tab` / `tabpanel`, roving `tabIndex`, arrows + Home/End                  |
| Disclosure  | Button with `aria-expanded` + `aria-controls`, region for the panel                  |

No component library was used for these three implementations.

---

## Keyboard checks performed

- **Modal:** Tab cycles only inside the dialog; Escape closes; focus returns to “Open modal”.
- **Tabs:** Left/Right change tab; Home/End jump; only the selected tab is tabbable.
- **Disclosure:** Enter/Space toggles via native `<button>`; state reflected in `aria-expanded`.

---

## Comparison with shadcn/ui (Dialog + Tabs)

I compared the hand-rolled versions with the structure and behaviour documented in shadcn/ui (Radix-based) Dialog and Tabs. Concrete gaps where shadcn/Radix handled more than my first version:

### 1. Focus scope and edge cases in the modal

**Gap:** My modal implements a basic Tab trap (first ↔ last) and restores focus on close. shadcn/Radix Dialog also handles:

- Focus when the dialog contains **no** focusable controls (still focuses the container safely).
- Nested dialogs / multiple layers (stacking and restoring the correct trigger).
- Preventing focus from escaping to the browser chrome in more edge cases via a dedicated focus-scope primitive.

**What I missed initially:** Robust handling when the only control is removed dynamically, and formal scroll-lock + pointer-event handling on the body beyond `overflow: hidden`.

### 2. Tabs: activation mode and orientation

**Gap:** My tabs use **automatic activation** (arrow moves selection immediately) and assume a horizontal list. shadcn/Radix Tabs expose:

- `activationMode`: `automatic` vs `manual` (arrow moves focus only; Activate with Enter/Space).
- `orientation`: `horizontal` | `vertical` with matching arrow keys (Up/Down when vertical).
- `dir` / RTL support so arrows reverse correctly in right-to-left layouts.

**What I missed initially:** Manual activation and vertical orientation — both are part of the full APG tabs pattern and matter for denser UIs.

### 3. Additional differences worth noting

| Area | Hand-rolled | shadcn / Radix |
|------|-------------|----------------|
| Dismiss layer | Backdrop `onClick` | Dedicated dismissable layer (outside click, focus outside options) |
| Presence / exit | Instant unmount | Optional exit animation while keeping a11y tree correct |
| Composition | Single file props API | Primitive parts (`Trigger`, `Content`, `Close`) for flexibility |
| Type safety | Explicit props, no `any` | Generated + Radix types |

These are not failures of the hand-rolled components for FE-05; they are the reason the assignment asks to read library source after building by hand.

---

## TypeScript

Component props are fully typed:

- `ModalProps`, `TabsProps` / `TabItem`, `DisclosureProps`
- No `any` in prop definitions

---

## How to run

```bash
npm install
npm run dev
```

Open [http://localhost:3000/playground](http://localhost:3000/playground).

Test with keyboard only before submitting.

---

## Files

```
src/playground/components/Modal.tsx
src/playground/components/Tabs.tsx
src/playground/components/Disclosure.tsx
src/app/playground/page.tsx
src/playground/NOTES.md
```
