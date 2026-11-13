"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState, type FormEvent } from "react";

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
                <div className="whitespace-pre-wrap break-words">
                  {message.content}
                </div>
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
            className="rounded-lg border border-rose-800 bg-rose-950/40 px-3 py-2 text-sm text-rose-200"
          >
            {error.message || "Something went wrong. Try again."}
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