"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  PortfolioProjectCard,
  type PortfolioProjectCardData,
} from "@/components/chat/PortfolioProjectCard";

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
 * Streaming chat UI (FE-06)
 * - useChat for multi-turn state + stream consumption
 * - Thinking indicator until the first token arrives
 * - Stop button aborts mid-stream without breaking state
 * - Auto-scroll only while the user is pinned near the bottom
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
  });

  const bottomRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [pinToBottom, setPinToBottom] = useState(true);
  const [showJump, setShowJump] = useState(false);

  // Track whether the user is near the bottom
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

  // Auto-scroll only when pinned
  useEffect(() => {
    if (!pinToBottom) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading, pinToBottom]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || isLoading) return;
    setPinToBottom(true);
    handleSubmit(event);
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
    if (!canRetry) return;
    setPinToBottom(true);
    void reload();
  }

  return (
    <div className="flex h-[min(70vh,640px)] flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-lg">
      {/* Messages */}
      <div
        ref={listRef}
        className="relative flex-1 space-y-4 overflow-y-auto px-3 py-4 sm:px-4"
        aria-live="polite"
        aria-relevant="additions"
      >
        {messages.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-700 bg-slate-900/40 p-4 text-sm text-slate-400">
            <p className="font-medium text-slate-200">Ask about my work</p>
            <p className="mt-1">
              Examples: “What did you build in MedNoviAI?”, “How does FocusBoard
              store data?”, “What is your stack?”
            </p>
          </div>
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
                            <p className="rounded-lg border border-slate-700 bg-slate-800/70 px-3 py-2 text-sm text-slate-300">
                              No matching projects found. Try a project name,
                              technology, or feature.
                            </p>
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
                            Project results could not be displayed. Please
                            retry the request.
                          </p>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}

        {/* Thinking → first token handoff: show while waiting for assistant text */}
        {waitingForFirstToken ? (
          <div className="flex justify-start">
            <div
              className="rounded-2xl border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-300"
              aria-label="Assistant is thinking"
            >
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
                </span>
                Thinking…
              </span>
            </div>
          </div>
        ) : null}

        {streamingAssistant ? (
          <p className="sr-only">Assistant is responding</p>
        ) : null}

        {error ? (
          <div
            role="alert"
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-rose-800 bg-rose-950/60 px-4 py-3 text-sm text-rose-100"
          >
            <div>
              <p className="font-semibold">We couldn’t complete that request.</p>
              <p className="mt-1 text-rose-200">
                Your conversation is still available. You can try the request
                again.
              </p>
            </div>
            {canRetry ? (
              <button
                type="button"
                onClick={retryLastRequest}
                className="rounded-md border border-rose-700 bg-rose-900/50 px-3 py-1.5 font-medium text-rose-100 hover:bg-rose-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300"
              >
                Retry last request
              </button>
            ) : null}
          </div>
        ) : null}

        <div ref={bottomRef} />
      </div>

      {/* Jump to latest */}
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

      {/* Composer */}
      <form
        onSubmit={onSubmit}
        className="flex items-end gap-2 border-t border-slate-800 p-3 sm:p-4"
      >
        <label htmlFor="chat-input" className="sr-only">
          Message
        </label>
        <textarea
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