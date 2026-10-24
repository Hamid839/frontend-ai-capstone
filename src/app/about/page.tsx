import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">About</h1>
      <div className="mt-8 space-y-5 text-slate-300 leading-relaxed">
        <p>
          I&apos;m Hamid Shoukat, a frontend-focused developer based in Lahore,
          Pakistan. I build responsive React interfaces that connect to real
          APIs, and I care about explaining the decisions behind the code.
        </p>
        <p>
          Through the FlyRank Frontend AI Engineering internship I practise
          shipping real features with AI as a collaborator — always reviewing,
          testing, and owning the result.
        </p>
        <p>
          Stack I use most: React, TypeScript, Next.js, Vite, Tailwind CSS, and
          practical integration with services like Supabase.
        </p>
      </div>

      <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <h2 className="font-semibold text-white">Voice</h2>
        <p className="mt-2 text-slate-400">
          Clear, honest, practical, specific, curious, human.
        </p>
      </div>
    </div>
  );
}
