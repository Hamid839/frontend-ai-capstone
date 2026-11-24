import type { Metadata } from "next";
import { existsSync } from "node:fs";
import { join } from "node:path";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  const showBookingPlaceholder =
    process.env.NODE_ENV === "development" && !bookingUrl;
  const hasCv = existsSync(
    join(process.cwd(), "public", "Hamid-Shoukat-CV.pdf"),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Contact
      </h1>
      <p className="mt-4 text-slate-400">
        I&apos;m open to junior frontend roles and teams where I can keep
        learning while shipping real product work.
      </p>

      <ul className="mt-10 space-y-6">
        <li>
          <h2 className="text-xs uppercase tracking-wider text-slate-500">
            Email
          </h2>
          <a
            href="mailto:hamidshoukat0022@gmail.com"
            className="mt-1 inline-block min-h-11 break-all py-2 text-brand-300 transition hover:text-brand-200"
          >
            hamidshoukat0022@gmail.com
          </a>
        </li>
        <li>
          <h2 className="text-xs uppercase tracking-wider text-slate-500">
            GitHub
          </h2>
          <a
            href="https://github.com/Hamid839"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block min-h-11 break-all py-2 text-brand-300 transition hover:text-brand-200"
          >
            View Hamid&apos;s GitHub profile
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        <li>
          <h2 className="text-xs uppercase tracking-wider text-slate-500">
            LinkedIn
          </h2>
          <a
            href="https://www.linkedin.com/in/hamid-shoukat-b18406282/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block min-h-11 break-all py-2 text-brand-300 transition hover:text-brand-200"
          >
            Connect with Hamid on LinkedIn
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </li>
        {hasCv && (
          <li>
            <a
              href="/Hamid-Shoukat-CV.pdf"
              download
              className="inline-flex min-h-11 items-center rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
            >
              Download Hamid Shoukat&apos;s CV (PDF)
            </a>
          </li>
        )}
        {bookingUrl && (
          <li>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-500"
            >
              Book a conversation
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        )}
        {showBookingPlaceholder && (
          <li className="rounded-lg border border-dashed border-slate-700 p-4 text-sm text-slate-400">
            Booking link placeholder: set{" "}
            <code className="break-all text-slate-300">
              NEXT_PUBLIC_BOOKING_URL
            </code>{" "}
            in <code className="text-slate-300">.env.local</code> to enable a
            booking action.
          </li>
        )}
      </ul>
    </div>
  );
}
