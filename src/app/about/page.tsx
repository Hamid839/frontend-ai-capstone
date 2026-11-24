import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header>
        <p className="text-sm font-medium uppercase tracking-wider text-brand-400">
          About
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
          Hamid Shoukat
        </h1>
        <div className="mt-8 space-y-5 leading-relaxed text-slate-300">
          <p>
            I&apos;m a web development student and frontend-focused developer
            based in Lahore, Pakistan. I build responsive React interfaces
            connected to real application data, and I like making product
            interactions clear and useful.
          </p>
          <p>
            My learning combines hands-on projects with the FlyRank AI
            Frontend Engineering capstone. I use AI as a development
            collaborator, then review and test the code so I can understand and
            stand behind what I build.
          </p>
          <p>
            My current interests include React and TypeScript patterns,
            accessible interface design, responsive layouts, and integrating
            frontend features with APIs and services such as Supabase.
          </p>
        </div>
      </header>

      <section className="mt-12" aria-labelledby="education-heading">
        <h2 id="education-heading" className="text-xl font-semibold text-white">
          Education &amp; learning
        </h2>
        <p className="mt-3 leading-relaxed text-slate-400">
          I&apos;m studying web development and strengthening my frontend
          skills through project work and internship learning.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="experience-heading">
        <h2
          id="experience-heading"
          className="text-xl font-semibold text-white"
        >
          Selected experience
        </h2>
        <ul className="mt-5 space-y-4">
          <li className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <h3 className="font-semibold text-white">MedNoviAI</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Contributed to patient-side frontend features and integrated the
              interface with Supabase as part of a team project.
            </p>
          </li>
          <li className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <h3 className="font-semibold text-white">FocusBoard</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Built a local-first React and TypeScript task planner with search,
              filters, priority sorting, and accessible controls.
            </p>
          </li>
          <li className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
            <h3 className="font-semibold text-white">
              FlyRank AI Frontend Engineering capstone
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Developing this Next.js and TypeScript portfolio, including a
              project-aware AI chat experience.
            </p>
          </li>
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="technologies-heading">
        <h2
          id="technologies-heading"
          className="text-xl font-semibold text-white"
        >
          Technologies
        </h2>
        <p className="mt-3 leading-relaxed text-slate-400">
          React, Next.js, TypeScript, JavaScript, Tailwind CSS, Vite, and
          Supabase.
        </p>
      </section>

      <aside className="mt-12 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="font-semibold text-white">Voice</h2>
        <p className="mt-2 text-slate-400">
          Clear, honest, practical, specific, curious, human.
        </p>
      </aside>
    </div>
  );
}
