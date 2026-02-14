import Link from "next/link";
import ActiveTodayPanel from "@/components/ActiveTodayPanel";
import AddMedForm from "@/components/AddMedForm";
import ImportPanel from "@/components/ImportPanel";
import InventoryAlertsPanel from "@/components/InventoryAlertsPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff8e8,transparent_50%),radial-gradient(circle_at_20%_40%,#ffe1d4,transparent_45%),radial-gradient(circle_at_80%_20%,#d6efe6,transparent_45%)]">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-14 lg:px-12">
        <header className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
            Medication Timeline Tracker
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/timeline" className="font-semibold text-[var(--accent)]">
              Timeline Explorer
            </Link>
            <Link href="/meds" className="font-semibold text-[var(--accent)]">
              Meds
            </Link>
            <Link href="/ai-screen" className="font-semibold text-[var(--accent)]">
              AI Drug-to-Drug Analysis
            </Link>
            <form action="/logout" method="get">
              <button type="submit" className="font-semibold text-[var(--muted)]">
                Sign out
              </button>
            </form>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold leading-tight text-[var(--ink)] lg:text-6xl">
                Clear, accurate medication history — day by day.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
                Track every dose change, pause, and restart without re-adding meds.
                Daily totals are the source of truth, with optional cadence fields
                like BID or TID when you need them.
              </p>
              <Link
                href="/ai-screen"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white"
              >
                <span>Run AI Drug-to-Drug Analysis</span>
                <span aria-hidden="true">✦</span>
              </Link>
            </div>
            <AddMedForm />
          </div>
        </header>

        <InventoryAlertsPanel />

        <ActiveTodayPanel />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--accent)] p-6 text-white">
            <h3 className="text-xl font-semibold">Titration Builder</h3>
            <p className="mt-2 text-sm text-white/80">
              Generate daily or weekly step-up schedules and auto-create dose
              events.
            </p>
            <div className="mt-5 space-y-3 text-sm text-white/80">
              <div className="rounded-2xl border border-white/20 px-4 py-3">
                Start dose → Target dose
              </div>
              <div className="rounded-2xl border border-white/20 px-4 py-3">
                Increment & interval
              </div>
              <button className="w-full rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--accent)]">
                Build schedule
              </button>
            </div>
          </div>
          <div className="lg:self-start">
            <ImportPanel />
          </div>
        </section>

        <footer className="flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-xs text-[var(--muted)]">
          <p>Voice updates can be added later by mapping transcripts to dose events.</p>
          <p>Unit-aware totals keep mg, IU, and mL consistent across your history.</p>
        </footer>
      </main>
    </div>
  );
}
