import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">Contact</h1>
      <p className="mt-4 text-slate-400">
        I&apos;m open to junior frontend roles and teams where I can keep
        learning while shipping real product work.
      </p>

      <ul className="mt-10 space-y-4">
        <li>
          <span className="block text-xs uppercase tracking-wider text-slate-500">
            Email
          </span>
          <a
            href="mailto:hamidshoukat0022@gmail.com"
            className="text-brand-300 hover:text-brand-200 transition"
          >
            hamidshoukat0022@gmail.com
          </a>
        </li>
        <li>
          <span className="block text-xs uppercase tracking-wider text-slate-500">
            GitHub
          </span>
          <a
            href="https://github.com/Hamid839"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:text-brand-200 transition"
          >
            github.com/Hamid839
          </a>
        </li>
        <li>
          <span className="block text-xs uppercase tracking-wider text-slate-500">
            LinkedIn
          </span>
          <a
            href="https://www.linkedin.com/in/hamid-shoukat-b18406282"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-300 hover:text-brand-200 transition"
          >
            linkedin.com/in/hamid-shoukat-b18406282
          </a>
        </li>
      </ul>
    </div>
  );
}
