"use client";

import { useState } from "react";
import { Disclosure } from "@/playground/components/Disclosure";
import { Modal } from "@/playground/components/Modal";
import { Tabs } from "@/playground/components/Tabs";

export default function PlaygroundPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="mx-auto max-w-3xl space-y-12 px-4 py-12 sm:px-6">
      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-indigo-400">
          FE-05 · Accessible component fundamentals
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">Playground</h1>
        <p className="mt-3 text-slate-400">
          Three interactive components built from scratch against WAI-ARIA
          Authoring Practices. Use the keyboard only: Tab, Shift+Tab, Escape,
          and arrow keys where the pattern requires them.
        </p>
      </header>

      {/* Modal */}
      <section className="space-y-3" aria-labelledby="modal-demo-heading">
        <h2 id="modal-demo-heading" className="text-xl font-semibold text-white">
          1. Modal dialog
        </h2>
        <p className="text-sm text-slate-400">
          Opens with focus moved into the dialog, traps Tab, closes on Escape,
          and restores focus to the trigger.
        </p>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        >
          Open modal
        </button>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm action"
          description="This dialog demonstrates focus trap, Escape to close, and labelled content."
        >
          <p className="mb-4 text-sm">
            Try Tab and Shift+Tab — focus should stay inside. Press Escape or
            Close to return focus to the Open modal button.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              onClick={() => setModalOpen(false)}
            >
              Confirm
            </button>
            <button
              type="button"
              className="rounded-md border border-slate-600 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </section>

      {/* Tabs */}
      <section className="space-y-3" aria-labelledby="tabs-demo-heading">
        <h2 id="tabs-demo-heading" className="text-xl font-semibold text-white">
          2. Tabs
        </h2>
        <p className="text-sm text-slate-400">
          Arrow Left/Right move between tabs. Home and End jump to the first or
          last tab. Only the selected tab is in the tab order.
        </p>
        <Tabs
          ariaLabel="Project examples"
          items={[
            {
              id: "mednoviai",
              label: "MedNoviAI",
              panel: (
                <p>
                  Patient-side contribution: appointment surfaces connected to
                  real application data. Lead case on the Work page.
                </p>
              ),
            },
            {
              id: "focusboard",
              label: "FocusBoard",
              panel: (
                <p>
                  Local-first React task planner with filters, search, and
                  keyboard-accessible controls.
                </p>
              ),
            },
            {
              id: "settings",
              label: "Settings form",
              panel: (
                <p>
                  Form drill comparing vague vs precise prompts, using
                  react-hook-form and zod patterns.
                </p>
              ),
            },
          ]}
        />
      </section>

      {/* Disclosure */}
      <section className="space-y-3" aria-labelledby="disclosure-demo-heading">
        <h2
          id="disclosure-demo-heading"
          className="text-xl font-semibold text-white"
        >
          3. Disclosure
        </h2>
        <p className="text-sm text-slate-400">
          Native button semantics: Enter and Space toggle.{" "}
          <code className="text-slate-300">aria-expanded</code> and{" "}
          <code className="text-slate-300">aria-controls</code> expose state to
          assistive tech.
        </p>
        <div className="space-y-2">
          <Disclosure title="What keyboard support does the modal have?">
            <p>
              Tab / Shift+Tab cycle focus inside the dialog. Escape closes it
              and returns focus to the control that opened it. The backdrop
              click also closes.
            </p>
          </Disclosure>
          <Disclosure title="How do tabs implement the ARIA pattern?">
            <p>
              The tab list uses role=&quot;tablist&quot;. Each tab has
              role=&quot;tab&quot;, aria-selected, and aria-controls pointing at
              its panel. Roving tabindex keeps only the active tab in the tab
              order; arrows change selection.
            </p>
          </Disclosure>
          <Disclosure title="Why build these by hand first?" defaultOpen>
            <p>
              AI tools generate components quickly, including inaccessible ones.
              Implementing the patterns yourself is the only reliable way to
              review generated code later.
            </p>
          </Disclosure>
        </div>
      </section>
    </div>
  );
}
