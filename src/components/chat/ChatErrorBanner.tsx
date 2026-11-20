"use client";

type Props = {
  message: string;
  canRetry: boolean;
  retrying: boolean;
  onRetry: () => void;
};

/**
 * Designed chat failure state (network / API / mid-stream).
 * Retry re-sends the last user turn via useChat().reload() — not the whole history rewrite.
 */
export function ChatErrorBanner({
  message,
  canRetry,
  retrying,
  onRetry,
}: Props) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-rose-800/80 bg-rose-950/35 px-3 py-3 text-sm text-rose-50 sm:px-4"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-rose-300">
        Response failed
      </p>
      <p className="mt-1 break-words text-rose-100/95">
        {message || "Something went wrong while generating a reply."}
      </p>
      <p className="mt-2 text-xs text-rose-200/70">
        Your earlier messages are still here. Retry only re-sends the last
        request.
      </p>
      {canRetry ? (
        <button
          type="button"
          onClick={onRetry}
          disabled={retrying}
          className="mt-3 inline-flex h-10 items-center justify-center rounded-lg bg-rose-600 px-3 text-sm font-medium text-white hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
        >
          {retrying ? "Retrying…" : "Retry last message"}
        </button>
      ) : null}
    </div>
  );
}
