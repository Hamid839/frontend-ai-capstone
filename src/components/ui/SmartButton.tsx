"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

export type ButtonLifecycle =
  | "idle"
  | "loading"
  | "success"
  | "error";

type SmartButtonProps = {
  /** Label shown in idle / hover / focus */
  idleLabel?: string;
  /** Label while the async work runs */
  loadingLabel?: string;
  /** Short label after success before reset */
  successLabel?: string;
  /** Label after failure (often "Retry") */
  errorLabel?: string;
  /** How long success state stays visible before returning to idle (ms) */
  successHoldMs?: number;
  /** How long error state stays visible before returning to idle (ms) */
  errorHoldMs?: number;
  /**
   * Async action. Resolve to "success" or "error".
   * The button owns the lifecycle; the parent only supplies the work.
   */
  onAction?: () => Promise<"success" | "error">;
  /** Extra class names on the outer button */
  className?: string;
  /** Forced disabled (e.g. form invalid) */
  disabled?: boolean;
  children?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "disabled" | "children">;

/**
 * SmartButton — a button that communicates its full lifecycle with motion.
 *
 * States: idle → hover/focus (CSS) → loading → success | error → idle
 * - Only transform + opacity are animated (compositor-friendly)
 * - Interruptible: rapid clicks while loading are ignored
 * - honors prefers-reduced-motion
 * - Visible focus ring, keyboard operable
 */
export function SmartButton({
  idleLabel = "Send message",
  loadingLabel = "Sending…",
  successLabel = "Sent",
  errorLabel = "Retry",
  successHoldMs = 1600,
  errorHoldMs = 2200,
  onAction,
  className = "",
  disabled = false,
  children,
  ...rest
}: SmartButtonProps) {
  const [lifecycle, setLifecycle] = useState<ButtonLifecycle>("idle");
  const [reducedMotion, setReducedMotion] = useState(false);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isBusy = lifecycle === "loading";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
    };
  }, []);

  const runAction = useCallback(async () => {
    if (isBusy || disabled) return;
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }

    setLifecycle("loading");

    try {
      const result = onAction
        ? await onAction()
        : await defaultFakeSend();
      setLifecycle(result);

      const hold = result === "success" ? successHoldMs : errorHoldMs;
      holdTimer.current = setTimeout(() => {
        setLifecycle("idle");
        holdTimer.current = null;
      }, hold);
    } catch {
      setLifecycle("error");
      holdTimer.current = setTimeout(() => {
        setLifecycle("idle");
        holdTimer.current = null;
      }, errorHoldMs);
    }
  }, [isBusy, disabled, onAction, successHoldMs, errorHoldMs]);

  const label =
    lifecycle === "loading"
      ? loadingLabel
      : lifecycle === "success"
        ? successLabel
        : lifecycle === "error"
          ? errorLabel
          : idleLabel;

  const isDisabled = disabled || isBusy;

  return (
    <button
      type="button"
      data-state={lifecycle}
      data-reduced={reducedMotion ? "true" : "false"}
      disabled={isDisabled}
      aria-busy={isBusy}
      aria-live="polite"
      onClick={runAction}
      className={[
        "smart-btn",
        "group relative inline-flex h-11 min-w-[9.5rem] items-center justify-center gap-2",
        "overflow-hidden rounded-lg px-5 text-sm font-semibold",
        "outline-none transition-[transform,box-shadow,background-color,border-color,color]",
        "focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        "disabled:cursor-not-allowed",
        className,
      ].join(" ")}
      {...rest}
    >
      {/* Spinner — slides in on loading */}
      <span
        className="smart-btn__spinner absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="40 20"
            className="smart-btn__spinner-circle"
          />
        </svg>
      </span>

      {/* Check icon — success */}
      <span
        className="smart-btn__icon smart-btn__icon--success absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>

      {/* Error icon */}
      <span
        className="smart-btn__icon smart-btn__icon--error absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8v4M12 16h.01" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      </span>

      {/* Label */}
      <span className="smart-btn__label relative z-10 flex items-center gap-2">
        {children ?? label}
      </span>
    </button>
  );
}

/** Demo helper: random delay, ~20% failure */
async function defaultFakeSend(): Promise<"success" | "error"> {
  const delay = 700 + Math.random() * 1300;
  await new Promise((r) => setTimeout(r, delay));
  return Math.random() < 0.2 ? "error" : "success";
}
