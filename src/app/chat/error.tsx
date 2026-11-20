"use client";

import { useEffect } from "react";

/**
 * FE-08 — route-level error boundary for /chat
 * Catches render failures in the chat page tree (not streaming API errors).
 */
export default function ChatError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[chat/error.tsx]", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div
        role="alert"
        className="rounded-xl border border-rose-800/80 bg-rose-950/30 p-6 text-rose-50 shadow-sm"
      >
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-300">
          Chat unavailable
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">
          Something went wrong loading this page
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-rose-100/90">
          The chat UI failed to render. This is separate from a streaming API
          error — try again, or open Work if you need project details right
          away.
        </p>
        {error.digest ? (
          <p className="mt-2 font-mono text-xs text-rose-300/70">
            digest: {error.digest}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-11 items-center justify-center rounded-lg bg-rose-600 px-4 text-sm font-medium text-white hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
          >
            Try again
          </button>
          <a
            href="/work"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-600 bg-slate-900 px-4 text-sm font-medium text-slate-100 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            Go to Work
          </a>
        </div>
      </div>
    </div>
  );
}
