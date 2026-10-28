"use client";

import { useId, useState, type ReactNode } from "react";

export type DisclosureProps = {
  /** Visible label on the control */
  title: string;
  /** Collapsible content */
  children: ReactNode;
  /** Start expanded */
  defaultOpen?: boolean;
};

/**
 * Disclosure (accordion-style single region) following WAI-ARIA APG.
 * - Button has aria-expanded and aria-controls
 * - Region is identified and labelled by the button
 * - Enter/Space activate via native button behaviour
 */
export function Disclosure({
  title,
  children,
  defaultOpen = false,
}: DisclosureProps) {
  const buttonId = useId();
  const panelId = useId();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900/40">
      <h3 className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-white hover:bg-slate-800/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          <span>{title}</span>
          <span aria-hidden="true" className="text-slate-400">
            {open ? "−" : "+"}
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="border-t border-slate-800 px-4 py-3 text-sm text-slate-300"
      >
        {open ? children : null}
      </div>
    </div>
  );
}
