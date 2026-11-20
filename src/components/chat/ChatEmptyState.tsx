"use client";

const EXAMPLES = [
  "What did you build in MedNoviAI?",
  "How does FocusBoard store data?",
  "Search projects using TypeScript",
] as const;

type Props = {
  onPick: (text: string) => void;
  disabled?: boolean;
};

/**
 * First-run empty state — onboarding, not apology.
 * Clicking an example fills the composer so the next action is obvious.
 */
export function ChatEmptyState({ onPick, disabled }: Props) {
  return (
    <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/50 p-4 sm:p-5">
      <p className="text-sm font-medium text-slate-100">No messages yet</p>
      <p className="mt-1 text-sm text-slate-400">
        Ask about a project, stack, or contribution. Try one of these:
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {EXAMPLES.map((example) => (
          <li key={example}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onPick(example)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2.5 text-left text-sm text-slate-200 transition hover:border-indigo-600 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {example}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
