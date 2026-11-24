"use client";

import { useCallback, useState } from "react";
import { SmartButton } from "@/components/ui/SmartButton";
import "@/components/ui/smart-button.css";

/**
 * FE-AA1 — Buttons with a Brain
 * Demo of a state-aware button that communicates its full lifecycle
 * with intentional motion (idle → loading → success/error → idle).
 */

async function fakeSend(force?: "success" | "error"): Promise<"success" | "error"> {
  const delay = 700 + Math.random() * 1200;
  await new Promise((r) => setTimeout(r, delay));
  if (force) return force;
  return Math.random() < 0.2 ? "error" : "success";
}

export default function ButtonsPlaygroundPage() {
  const [log, setLog] = useState<string[]>([]);

  const pushLog = useCallback((msg: string) => {
    setLog((prev) => [`${new Date().toLocaleTimeString()} — ${msg}`, ...prev].slice(0, 8));
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-12 px-4 py-12 sm:px-6">
      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-indigo-400">
          FE-AA1 · Motion &amp; state micro-interactions
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">Buttons with a Brain</h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          A button that owns its lifecycle. Click triggers a fake async call
          (~20% failure). Watch idle → loading → success or error, then back
          to idle. Spam-clicking while loading is ignored. Keyboard focus is
          visible; reduced-motion preferences are honored.
        </p>
      </header>

      {/* Primary demo */}
      <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-lg font-semibold text-white">Send message</h2>
        <p className="text-sm text-slate-400">
          Random outcome. Use the forced buttons below to guarantee success or
          failure for testing.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <SmartButton
            idleLabel="Send message"
            loadingLabel="Sending…"
            successLabel="Sent"
            errorLabel="Retry"
            onAction={async () => {
              pushLog("Send started");
              const result = await fakeSend();
              pushLog(result === "success" ? "Send succeeded" : "Send failed");
              return result;
            }}
          />
          <SmartButton
            idleLabel="Force success"
            loadingLabel="Working…"
            successLabel="Done"
            errorLabel="Failed"
            className="!bg-emerald-700 hover:!bg-emerald-600"
            onAction={async () => {
              pushLog("Forced success");
              return fakeSend("success");
            }}
          />
          <SmartButton
            idleLabel="Force error"
            loadingLabel="Working…"
            successLabel="Done"
            errorLabel="Retry"
            className="!bg-rose-700 hover:!bg-rose-600"
            onAction={async () => {
              pushLog("Forced error");
              return fakeSend("error");
            }}
          />
        </div>
      </section>

      {/* Second button sharing the same motion language */}
      <section className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-lg font-semibold text-white">Save draft</h2>
        <p className="text-sm text-slate-400">
          Same component, different labels and colors — proving the motion
          language is a system, not a one-off.
        </p>
        <SmartButton
          idleLabel="Save draft"
          loadingLabel="Saving…"
          successLabel="Saved"
          errorLabel="Retry save"
          className="!bg-slate-700 hover:!bg-slate-600 !min-w-[8rem]"
          onAction={async () => {
            pushLog("Save started");
            const result = await fakeSend();
            pushLog(result === "success" ? "Saved" : "Save failed");
            return result;
          }}
        />
      </section>

      {/* Design notes (required) */}
      <section className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/40 p-6">
        <h2 className="text-lg font-semibold text-white">Duration &amp; easing notes</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
          <li>
            <strong className="text-slate-100">Hover / press:</strong> 80–120&nbsp;ms.
            Fast enough that the button feels attached to the pointer; slower
            would feel laggy.
          </li>
          <li>
            <strong className="text-slate-100">State morph (label ↔ spinner):</strong>{" "}
            220&nbsp;ms with <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-indigo-300">cubic-bezier(0.22, 1, 0.36, 1)</code>{" "}
            — an ease-out that settles quickly so the user can read the new
            state without waiting for the animation to finish.
          </li>
          <li>
            <strong className="text-slate-100">Success hold:</strong> 1.6&nbsp;s.
            Long enough to notice the check, short enough that the control
            returns to a ready state before the next action.
          </li>
          <li>
            <strong className="text-slate-100">Error hold + shake:</strong> 2.2&nbsp;s
            hold; one 420&nbsp;ms horizontal shake (skipped when{" "}
            <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-indigo-300">prefers-reduced-motion</code>).
            Error color and “Retry” label remain so feedback is never only
            motion.
          </li>
          <li>
            Only <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-indigo-300">transform</code> and{" "}
            <code className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-indigo-300">opacity</code> are
            animated — no width/height/layout thrash.
          </li>
        </ul>
      </section>

      {/* Event log for debugging */}
      <section className="space-y-2">
        <h2 className="text-sm font-medium text-slate-400">Recent events</h2>
        <div className="min-h-[6rem] rounded-lg border border-slate-800 bg-slate-950/80 p-3 font-mono text-xs text-slate-400">
          {log.length === 0 ? (
            <span className="text-slate-600">Click a button to see lifecycle events.</span>
          ) : (
            <ul className="space-y-1">
              {log.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <p className="text-center text-xs text-slate-500">
        Tip: enable “Reduce motion” in your OS accessibility settings to verify
        the reduced-motion path (no shake, near-instant transitions, feedback
        still present via color and label).
      </p>
    </div>
  );
}
