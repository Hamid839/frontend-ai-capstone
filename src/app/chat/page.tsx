import type { Metadata } from "next";
import { ChatInterface } from "@/components/chat/ChatInterface";

export const metadata: Metadata = {
  title: "Chat",
  description:
    "Streaming AI assistant about Hamid Shoukat’s frontend work and projects.",
};

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-5 sm:mb-6">
        <p className="text-sm font-medium uppercase tracking-wider text-indigo-400">
          Chat · tools + error states
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Ask about my work
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
          Responses stream from a secure server route. Project searches render
          as cards. If a request fails mid-stream, use Retry last message —
          earlier turns stay intact.
        </p>
      </header>

      <ChatInterface />

      <p className="mt-4 text-xs text-slate-500">
        API keys stay on the server. This assistant answers portfolio questions
        only — not general web search.
      </p>
    </div>
  );
}
