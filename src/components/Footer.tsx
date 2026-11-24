import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} Hamid Shoukat · Frontend AI Capstone
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm" aria-label="Footer">
          <Link href="/contact" className="text-slate-400 transition hover:text-white">
            Contact
          </Link>
          <a
            href="https://github.com/Hamid839"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition hover:text-white"
          >
            GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a
            href="https://www.linkedin.com/in/hamid-shoukat-b18406282/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition hover:text-white"
          >
            LinkedIn
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link href="/health" className="text-xs text-slate-500 transition hover:text-slate-300">
            Health
          </Link>
        </nav>
      </div>
    </footer>
  );
}
