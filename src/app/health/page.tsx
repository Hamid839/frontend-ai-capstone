import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health check",
};

type HealthPayload = {
  ok: boolean;
  service: string;
  checkedAt: string;
  upstream?: {
    status: number;
    origin: string;
  };
  note: string;
};

async function getHealth(): Promise<HealthPayload> {
  const checkedAt = new Date().toISOString();

  try {
    // Public, no-auth endpoint used only to prove server-side fetch works.
    const res = await fetch("https://httpbin.org/get", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return {
        ok: false,
        service: "capstone-health",
        checkedAt,
        note: `Upstream responded with HTTP ${res.status}`,
      };
    }

    const data = (await res.json()) as { origin?: string };

    return {
      ok: true,
      service: "capstone-health",
      checkedAt,
      upstream: {
        status: res.status,
        origin: data.origin ?? "unknown",
      },
      note: "Server Component successfully fetched public data.",
    };
  } catch (error) {
    return {
      ok: false,
      service: "capstone-health",
      checkedAt,
      note:
        error instanceof Error
          ? error.message
          : "Unknown error while contacting upstream.",
    };
  }
}

export default async function HealthPage() {
  const health = await getHealth();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Health check
      </h1>
      <p className="mt-3 text-slate-400">
        This page is a Server Component. It fetches public data on the server
        and renders the result — no client-side JavaScript required for the
        request itself.
      </p>

      <div
        className={`mt-10 rounded-xl border p-6 ${
          health.ok
            ? "border-emerald-800 bg-emerald-950/30"
            : "border-rose-800 bg-rose-950/30"
        }`}
      >
        <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
          Status
        </p>
        <p
          className={`mt-1 text-2xl font-semibold ${
            health.ok ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {health.ok ? "Healthy" : "Degraded"}
        </p>

        <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Service</dt>
            <dd className="font-mono text-slate-200">{health.service}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Checked at (UTC)</dt>
            <dd className="font-mono text-slate-200">{health.checkedAt}</dd>
          </div>
          {health.upstream && (
            <>
              <div>
                <dt className="text-slate-500">Upstream status</dt>
                <dd className="font-mono text-slate-200">
                  {health.upstream.status}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Upstream origin</dt>
                <dd className="font-mono text-slate-200">
                  {health.upstream.origin}
                </dd>
              </div>
            </>
          )}
        </dl>

        <p className="mt-6 text-sm text-slate-400">{health.note}</p>
      </div>
    </div>
  );
}
