import type { Metadata } from "next";
import { ChatInterface } from "@/components/chat/ChatInterface";

export const metadata: Metadata = {
  title: "Chat",
  description:
    "Streaming AI assistant about Hamid Shoukat’s frontend work and projects.",
};

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-6">
        <p className="text-sm font-medium uppercase tracking-wider text-indigo-400">
          FE-06 · Streaming chat
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Ask about my work
        </h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Responses stream token by token from a server route that calls Claude.
          You can stop generation mid-stream and continue the conversation.
        </p>
      </header>

      <ChatInterface />

      <p className="mt-4 text-xs text-slate-500">
        The API key is stored only on the server. This assistant answers
        questions about portfolio projects and skills — not general web search.
      </p>
    </div>
  );
}
