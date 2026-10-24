import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} Hamid Shoukat · Frontend AI Capstone
        </p>
        <div className="flex gap-4 text-sm">
          <Link href="/contact" className="text-slate-400 hover:text-white transition">
            Contact
          </Link>
          <a
            href="https://github.com/Hamid839"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition"
          >
            GitHub
          </a>
          <Link href="/health" className="text-slate-500 hover:text-slate-300 transition text-xs">
            Health
          </Link>
        </div>
      </div>
    </footer>
  );
}
