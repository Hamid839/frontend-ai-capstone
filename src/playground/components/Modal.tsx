"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type ModalProps = {
  /** Whether the dialog is open */
  open: boolean;
  /** Called when the dialog should close (Escape, backdrop, close button) */
  onClose: () => void;
  /** Accessible name for the dialog */
  title: string;
  /** Dialog body */
  children: ReactNode;
  /** Optional description id content */
  description?: string;
};

/**
 * Modal dialog following WAI-ARIA Authoring Practices (Dialog Pattern).
 * - role="dialog" + aria-modal="true"
 * - Labels via aria-labelledby / aria-describedby
 * - Focus moves to the dialog on open and is trapped while open
 * - Escape closes; focus returns to the previously focused element
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  description,
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const getFocusable = useCallback(() => {
    const root = dialogRef.current;
    if (!root) return [] as HTMLElement[];
    const selector = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");
    return Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
    );
  }, []);

  // Open / close focus management
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // Move focus into the dialog after paint
    const frame = requestAnimationFrame(() => {
      const focusable = getFocusable();
      if (focusable.length > 0) {
        focusable[0].focus();
      } else {
        dialogRef.current?.focus();
      }
    });

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(frame);
      body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, getFocusable]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = getFocusable();
    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey) {
      if (active === first || !dialogRef.current?.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else if (active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className="relative z-10 w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl outline-none"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-lg font-semibold text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-slate-300 hover:bg-slate-800 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            Close
          </button>
        </div>

        {description ? (
          <p id={descriptionId} className="mb-4 text-sm text-slate-400">
            {description}
          </p>
        ) : null}

        <div className="text-slate-200">{children}</div>
      </div>
    </div>
  );
}
