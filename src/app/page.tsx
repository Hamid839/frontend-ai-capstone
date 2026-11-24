import Link from "next/link";

const highlights = [
  {
    title: "Interfaces connected to real data",
    body: "Patient-side frontend contributions to MedNoviAI included integrating the interface with Supabase.",
  },
  {
    title: "Useful, responsive product features",
    body: "FocusBoard is a local-first React and TypeScript planner with search, filters, and priority sorting.",
  },
  {
    title: "Thoughtful frontend practice",
    body: "I build, review, and test features, with attention to clear interactions and accessible controls.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <header>
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-brand-400">
          Hamid Shoukat · Lahore, Pakistan
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Frontend-focused developer building responsive React interfaces
          connected to real APIs.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
          I turn practical product needs into clear, maintainable frontend
          features. Explore my project work, including patient-side product
          contributions and a local-first task planner.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/work"
            className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-500"
          >
            Explore my work
          </Link>
          <Link
            href="/contact"
            className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
          >
            Get in touch
          </Link>
        </div>
      </header>

      <section className="mt-20" aria-labelledby="approach-heading">
        <h2 id="approach-heading" className="text-2xl font-semibold text-white">
          How I approach frontend work
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight) => (
            <li
              key={highlight.title}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
            >
              <h3 className="font-semibold text-white">{highlight.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {highlight.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="mt-16 flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-6 sm:flex-row sm:items-center sm:justify-between"
        aria-labelledby="notes-heading"
      >
        <div>
          <h2 id="notes-heading" className="font-semibold text-white">
            Notes &amp; learning
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            A place for practical lessons and ideas as I continue learning.
          </p>
        </div>
        <Link
          href="/notes"
          className="w-fit rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
        >
          Visit notes
        </Link>
      </section>
    </div>
  );
}
