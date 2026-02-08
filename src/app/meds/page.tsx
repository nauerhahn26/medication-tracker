"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Med = {
  id: string;
  name: string;
  standard_code_system: string | null;
  standard_code: string | null;
  is_supplement: boolean;
  notes: string | null;
};

export default function MedsPage() {
  const [meds, setMeds] = useState<Med[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch("/api/meds");
        const json = (await res.json()) as { meds: Med[]; error?: string };
        if (!res.ok) throw new Error(json.error ?? "Failed");
        if (active) {
          setMeds(json.meds);
          setStatus("ready");
        }
      } catch {
        if (active) setStatus("error");
      }
    }
    load();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff8e8,transparent_50%),radial-gradient(circle_at_20%_40%,#ffe1d4,transparent_45%),radial-gradient(circle_at_80%_20%,#d6efe6,transparent_45%)]">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
        <header className="flex flex-col gap-3">
          <Link href="/" className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-semibold text-[var(--ink)]">All Meds</h1>
          <p className="text-sm text-[var(--muted)]">
            Select a med to view the full change log and add new dose events.
          </p>
        </header>

        {status === "loading" && (
          <div className="rounded-3xl border border-[var(--line)] bg-white/70 p-6 text-sm text-[var(--muted)]">
            Loading meds...
          </div>
        )}
        {status === "error" && (
          <div className="rounded-3xl border border-[var(--line)] bg-white/70 p-6 text-sm text-red-600">
            Failed to load meds.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {meds.map((med) => (
            <Link
              key={med.id}
              href={`/meds/${med.id}`}
              className="rounded-3xl border border-[var(--line)] bg-white/80 p-5 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-base font-semibold text-[var(--ink)]">{med.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {med.is_supplement ? "Supplement" : "Medication"}
                  </p>
                </div>
                <span className="text-xs text-[var(--muted)]">View</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
