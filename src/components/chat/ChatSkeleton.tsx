/**
 * Pending skeleton that mirrors assistant bubble layout to limit CLS
 * while waiting for the first token or a tool shell.
 */
export function ChatSkeleton() {
  return (
    <div
      className="flex justify-start"
      role="status"
      aria-label="Assistant is preparing a response"
    >
      <div className="w-full max-w-[90%] space-y-2 rounded-2xl border border-slate-700 bg-slate-900 px-3.5 py-3 sm:max-w-[80%]">
        <div className="h-2.5 w-16 animate-pulse rounded bg-slate-700" />
        <div className="h-3 w-[92%] animate-pulse rounded bg-slate-800" />
        <div className="h-3 w-[78%] animate-pulse rounded bg-slate-800" />
        <div className="h-3 w-[64%] animate-pulse rounded bg-slate-800" />
      </div>
    </div>
  );
}
