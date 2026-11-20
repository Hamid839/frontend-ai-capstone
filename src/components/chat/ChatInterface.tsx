"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  PortfolioProjectCard,
  type PortfolioProjectCardData,
} from "@/components/chat/PortfolioProjectCard";
import { ChatEmptyState } from "@/components/chat/ChatEmptyState";
import { ChatSkeleton } from "@/components/chat/ChatSkeleton";
import { ChatErrorBanner } from "@/components/chat/ChatErrorBanner";

type PortfolioSearchResult = {
  query: string;
  total: number;
  projects: PortfolioProjectCardData[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isSafeProjectHref(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "github.com" &&
      url.pathname.startsWith("/Hamid839/frontend-ai-capstone/")
    );
  } catch {
    return false;
  }
}

function isPortfolioProject(
  value: unknown,
): value is PortfolioProjectCardData {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.description === "string" &&
    isStringArray(value.technologies) &&
    typeof value.contribution === "string" &&
    isStringArray(value.features) &&
    typeof value.href === "string" &&
    isSafeProjectHref(value.href) &&
    typeof value.relevance === "number" &&
    Number.isFinite(value.relevance) &&
    value.relevance >= 0 &&
    value.relevance <= 1
  );
}

function parsePortfolioSearchResult(
  value: unknown,
): PortfolioSearchResult | null {
  if (
    !isRecord(value) ||
    typeof value.query !== "string" ||
    value.query.trim().length < 2 ||
    value.query.length > 100 ||
    typeof value.total !== "number" ||
    !Number.isInteger(value.total) ||
    value.total < 0 ||
    !Array.isArray(value.projects) ||
    !value.projects.every(isPortfolioProject) ||
    value.projects.length > value.total
  ) {
    return null;
  }

  return {
    query: value.query,
    total: value.total,
    projects: value.projects,
  };
}

function getSearchQuery(args: unknown): string | null {
  if (!isRecord(args) || typeof args.query !== "string") {
    return null;
  }
  return args.query;
}

/**
 * Streaming chat UI (FE-06 / FE-07 / FE-08)
 * - Tool result cards + lifecycle shells
 * - Designed empty / skeleton / error + retry
 * - Mobile-safe height (dvh) and pinned composer
 */
export function ChatInterface() {
  const {
    messages,
    input,
    setInput,
    handleSubmit,
    isLoading,
    stop,
    error,
    reload,
  } = useChat({
    api: "/api/chat",
    maxSteps: 2,
  });

  const bottomRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [pinToBottom, setPinToBottom] = useState(true);
  const [showJump, setShowJump] = useState(false);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    function onScroll() {
      if (!el) return;
      const distanceFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight;
      const nearBottom = distanceFromBottom < 80;
      setPinToBottom(nearBottom);
      setShowJump(!nearBottom && messages.length > 0);
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [messages.length]);

  useEffect(() => {
    if (!pinToBottom) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading, error, pinToBottom]);

  // Clear local retry lock when the request settles
  useEffect(() => {
    if (!isLoading) setRetrying(false);
  }, [isLoading]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || isLoading) return;
    setPinToBottom(true);
    handleSubmit(event);
  }

  function fillExample(text: string) {
    setInput(text);
    // Focus composer so mobile users can send immediately
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  const waitingForFirstToken =
    isLoading &&
    messages.length > 0 &&
    messages[messages.length - 1]?.role === "user";

  const streamingAssistant =
    isLoading &&
    messages.length > 0 &&
    messages[messages.length - 1]?.role === "assistant";

  const canRetry =
    Boolean(error) &&
    !isLoading &&
    messages.some((message) => message.role === "user");

  function retryLastRequest() {
    if (!canRetry || retrying) return;
    setRetrying(true);
    setPinToBottom(true);
    void reload();
  }

  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-lg"
      style={{
        // Prefer dynamic viewport height on mobile Safari; fall back to vh
        height: "min(70dvh, 640px)",
        maxHeight: "min(70dvh, 640px)",
      }}
    >
      <div
        ref={listRef}
        className="relative flex-1 space-y-4 overflow-y-auto overscroll-contain px-3 py-4 sm:px-4"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.length === 0 && !error ? (
          <ChatEmptyState onPick={fillExample} disabled={isLoading} />
        ) : null}

        {messages.map((message) => {
          const isUser = message.role === "user";
          return (
            <div
              key={message.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:max-w-[80%] ${
                  isUser
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-700 bg-slate-900 text-slate-100"
                }`}
              >
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide opacity-70">
                  {isUser ? "You" : "Assistant"}
                </p>
                {message.content ? (
                  <div className="whitespace-pre-wrap break-words">
                    {message.content}
                  </div>
                ) : null}
                {message.toolInvocations
                  ?.filter(
                    (invocation) =>
                      invocation.toolName === "searchPortfolioProjects",
                  )
                  .map((invocation) => {
                    if (invocation.state === "partial-call") {
                      return (
                        <div
                          key={invocation.toolCallId}
                          role="status"
                          aria-live="polite"
                          className="mt-3 rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-slate-300"
                        >
                          Preparing project search…
                        </div>
                      );
                    }

                    if (invocation.state === "call") {
                      const query = getSearchQuery(invocation.args);
                      return (
                        <div
                          key={invocation.toolCallId}
                          role="status"
                          aria-live="polite"
                          className="mt-3 rounded-lg border border-indigo-800/80 bg-indigo-950/50 px-3 py-2 text-sm text-indigo-200"
                        >
                          Searching portfolio projects
                          {query ? (
                            <span className="mt-1 block break-words text-xs text-indigo-300">
                              Search: {query}
                            </span>
                          ) : null}
                        </div>
                      );
                    }

                    const result = parsePortfolioSearchResult(
                      invocation.result,
                    );

                    return (
                      <div
                        key={invocation.toolCallId}
                        className="mt-3 space-y-3"
                      >
                        {result ? (
                          result.projects.length === 0 ? (
                            <div className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-3 text-sm text-slate-300">
                              <p className="font-medium text-slate-200">
                                No matching projects
                              </p>
                              <p className="mt-1 text-slate-400">
                                Try a project name (MedNoviAI, FocusBoard), a
                                technology (TypeScript), or a feature (filter,
                                appointments).
                              </p>
                            </div>
                          ) : (
                            result.projects.map((project) => (
                              <PortfolioProjectCard
                                key={project.id}
                                project={project}
                              />
                            ))
                          )
                        ) : (
                          <p
                            role="alert"
                            className="rounded-lg border border-amber-800 bg-amber-950/40 px-3 py-2 text-sm text-amber-200"
                          >
                            Project results could not be displayed. Use{" "}
                            <span className="font-medium">Retry last message</span>{" "}
                            below if the request failed, or ask again with a
                            clearer project name.
                          </p>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}

        {waitingForFirstToken ? <ChatSkeleton /> : null}

        {streamingAssistant ? (
          <p className="sr-only">Assistant is responding</p>
        ) : null}

        {error ? (
          <ChatErrorBanner
            message={error.message}
            canRetry={canRetry}
            retrying={retrying}
            onRetry={retryLastRequest}
          />
        ) : null}

        <div ref={bottomRef} />
      </div>

      {showJump ? (
        <div className="flex justify-center border-t border-slate-800 bg-slate-950/90 py-1.5">
          <button
            type="button"
            onClick={() => {
              setPinToBottom(true);
              bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200 hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            Jump to latest
          </button>
        </div>
      ) : null}

      <form
        onSubmit={onSubmit}
        className="flex items-end gap-2 border-t border-slate-800 p-3 sm:p-4"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <label htmlFor="chat-input" className="sr-only">
          Message
        </label>
        <textarea
          ref={inputRef}
          id="chat-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={1}
          placeholder="Ask about projects, stack, or experience…"
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              if (input.trim() && !isLoading) {
                setPinToBottom(true);
                event.currentTarget.form?.requestSubmit();
              }
            }
          }}
          className="max-h-32 min-h-[44px] flex-1 resize-y rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />

        {isLoading ? (
          <button
            type="button"
            onClick={() => stop()}
            className="h-11 shrink-0 rounded-lg border border-slate-600 bg-slate-800 px-4 text-sm font-medium text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="h-11 shrink-0 rounded-lg bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}
