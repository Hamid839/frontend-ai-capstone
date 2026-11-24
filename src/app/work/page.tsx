import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
};

const projects = [
  {
    id: "mednoviai",
    title: "MedNoviAI — Patient-side contributions",
    stack: "Next.js · TypeScript · Tailwind CSS · Supabase",
    summary:
      "Contributed to the patient-facing frontend of a healthcare platform and integrated the interface with Supabase.",
    caseStudy:
      "My work focused on patient-side features within a team project. The Supabase integration helped me learn to connect frontend UI with application data. This is a contribution to the patient experience, not a claim that I built the full appointment-booking system.",
    projectHref:
      "https://github.com/Hamid839/frontend-ai-capstone/blob/main/FocusBoard/case-studies.md#case-study-1-mednoviai-patient-side-experience",
    projectLabel: "Read the MedNoviAI contribution case study",
  },
  {
    id: "focusboard",
    title: "FocusBoard",
    stack: "React · TypeScript · Vite · localStorage",
    summary:
      "A local-first task planner with task search, status and category filters, priority sorting, and accessible controls.",
    caseStudy:
      "I built FocusBoard as a frontend project. Tasks are saved in the browser's local storage; the app has no account, cloud sync, backend, or AI API. Its interactions include creating and completing tasks, filtering, searching, and sorting.",
    projectHref: "https://github.com/Hamid839/frontend-ai-capstone/tree/main/FocusBoard",
    projectLabel: "View the FocusBoard project files",
  },
  {
    id: "flyrank-capstone",
    title: "FlyRank AI Frontend Engineering capstone",
    stack: "Next.js · TypeScript · Tailwind CSS",
    summary:
      "This portfolio project brings together project pages, accessible interface exercises, and an AI chat that can search verified project information.",
    caseStudy:
      "The capstone is an ongoing portfolio and learning project. Its existing work includes a Next.js App Router site, a project-aware chat experience, and accessible interactive component examples. The chat API is a server route; its provider configuration stays server-side.",
    projectHref: "https://github.com/Hamid839/frontend-ai-capstone",
    projectLabel: "View the capstone repository",
  },
];

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-brand-400">
          Selected projects
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Work &amp; case studies
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-400">
          A closer look at my frontend contributions and project work. Each
          case study distinguishes my work from the wider team or project.
        </p>
      </header>

      <ul className="mt-10 space-y-6">
        {projects.map((project) => (
          <li
            key={project.id}
            id={`${project.id}-case-study`}
            className="scroll-mt-24 rounded-xl border border-slate-800 bg-slate-900/40 p-6"
          >
            <article aria-labelledby={`${project.id}-heading`}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <h2
                  id={`${project.id}-heading`}
                  className="text-xl font-semibold text-white"
                >
                  {project.title}
                </h2>
                <p className="text-sm text-brand-300">{project.stack}</p>
              </div>
              <p className="mt-4 leading-relaxed text-slate-300">
                {project.summary}
              </p>
              <section
                className="mt-5 border-t border-slate-800 pt-4"
                aria-labelledby={`${project.id}-case-heading`}
              >
                <h3
                  id={`${project.id}-case-heading`}
                  className="text-sm font-semibold text-white"
                >
                  Case study
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {project.caseStudy}
                </p>
              </section>
              <p className="mt-5">
                <a
                  href={project.projectHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-md text-sm font-medium text-brand-300 underline decoration-brand-300/50 underline-offset-4 transition hover:text-brand-200"
                >
                  {project.projectLabel}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link
          href="/contact"
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-500"
        >
          Discuss my work
        </Link>
        <Link
          href="/notes"
          className="text-sm font-medium text-brand-300 underline decoration-brand-300/50 underline-offset-4 hover:text-brand-200"
        >
          Notes &amp; learning
        </Link>
      </div>
    </div>
  );
}
