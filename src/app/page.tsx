import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="mb-3 text-sm font-medium uppercase tracking-wider text-brand-400">
        Frontend AI Capstone
      </p>
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Building responsive React interfaces that connect to real APIs
      </h1>
      <p className="mt-6 max-w-xl text-lg text-slate-400">
        I design and ship clear, maintainable frontend features — and I explain
        the decisions behind them. This site is the living portfolio for that work.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/work"
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-500 transition"
        >
          View work
        </Link>
        <Link
          href="/about"
          className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-900 transition"
        >
          About me
        </Link>
      </div>

      <section className="mt-20 grid gap-6 sm:grid-cols-3">
        {[
          {
            title: "Real APIs",
            body: "Interfaces that load, error, and recover against real backends — not just static mockups.",
          },
          {
            title: "Clear decisions",
            body: "Every project includes the why: stack choices, trade-offs, and what I would do differently.",
          },
          {
            title: "AI as a collaborator",
            body: "I use AI to move faster, then review, test, and own every line that ships.",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
          >
            <h2 className="font-semibold text-white">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{card.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
