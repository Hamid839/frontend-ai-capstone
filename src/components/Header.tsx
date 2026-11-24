import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/notes", label: "Notes" },
  { href: "/chat", label: "Chat" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white hover:text-brand-300 transition"
        >
          Hamid Shoukat
        </Link>

        <nav
          className="flex w-full flex-wrap items-center gap-1 sm:w-auto sm:gap-2"
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1.5 text-xs text-slate-300 transition hover:bg-slate-800 hover:text-white sm:px-3 sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
