import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notes & Learning",
};

const topics = [
  "Building responsive React and TypeScript interfaces",
  "Connecting frontend features to APIs and Supabase",
  "Accessible controls and clear interaction patterns",
  "Learning through project work and careful code review",
];

export default function NotesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-brand-400">
          Notes &amp; learning
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Practical notes, as I learn
        </h1>
        <p className="mt-4 leading-relaxed text-slate-400">
          This section is ready for future posts about frontend development and
          lessons from projects. There are no published notes yet.
        </p>
      </header>

      <section
        className="mt-10 rounded-xl border border-slate-800 bg-slate-900/50 p-6"
        aria-labelledby="topics-heading"
      >
        <h2 id="topics-heading" className="font-semibold text-white">
          Topics I plan to write about
        </h2>
        <ul className="mt-4 list-inside list-disc space-y-2 text-sm leading-relaxed text-slate-400">
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-sm text-slate-400">
        For now, explore the{" "}
        <Link
          href="/work"
          className="text-brand-300 underline decoration-brand-300/50 underline-offset-4 hover:text-brand-200"
        >
          project case studies
        </Link>
        .
      </p>
    </div>
  );
}
