import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
};

const projects = [
  {
    title: "MedNoviAI — Patient side",
    stack: "Next.js · TypeScript · Tailwind · Supabase",
    summary:
      "Contributed to the patient-facing interface of a healthcare application, including connecting the frontend to Supabase.",
    status: "Case study",
  },
  {
    title: "FocusBoard",
    stack: "React · TypeScript · Vite · localStorage",
    summary:
      "Local-first task planner built with AI assistance. Filters, search, priority sort, and accessible controls.",
    status: "Week 3 assignment",
  },
  {
    title: "Settings Form Drill",
    stack: "React · TypeScript · react-hook-form · zod",
    summary:
      "Same feature built twice (vague vs precise prompts) to measure the cost of underspecified requests.",
    status: "Workflow study",
  },
];

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">Work</h1>
      <p className="mt-3 max-w-2xl text-slate-400">
        Selected projects and evidence from the Frontend AI Engineering track.
        Each entry is a placeholder that will grow into a full case study.
      </p>

      <ul className="mt-12 space-y-6">
        {projects.map((project) => (
          <li
            key={project.title}
            className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-600"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-xl font-semibold text-white">{project.title}</h2>
              <span className="rounded-full bg-slate-800 px-3 py-0.5 text-xs text-slate-300">
                {project.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-brand-300">{project.stack}</p>
            <p className="mt-3 text-slate-400">{project.summary}</p>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-slate-500">
        Full write-ups live in the repository{" "}
        <Link href="https://github.com/Hamid839/frontend-ai-capstone/blob/main/case-studies.md" className="text-brand-400 hover:underline">
          case-studies.md
        </Link>
        .
      </p>
    </div>
  );
}
