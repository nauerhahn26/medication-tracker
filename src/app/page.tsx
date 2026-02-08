import ActiveTodayPanel from "@/components/ActiveTodayPanel";
import AddMedForm from "@/components/AddMedForm";
import DailyLookupPanel from "@/components/DailyLookupPanel";
import ImportPanel from "@/components/ImportPanel";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff8e8,transparent_50%),radial-gradient(circle_at_20%_40%,#ffe1d4,transparent_45%),radial-gradient(circle_at_80%_20%,#d6efe6,transparent_45%)]">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-14 lg:px-12">
        <header className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
            Medication Timeline Tracker
          </p>
          <div className="flex items-center gap-4 text-xs">
            <a href="/timeline" className="font-semibold text-[var(--accent)]">
              Timeline Explorer
            </a>
            <a href="/meds" className="font-semibold text-[var(--accent)]">
              Meds
            </a>
            <a href="/logout" className="font-semibold text-[var(--muted)]">
              Sign out
            </a>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-5">
              <h1 className="text-4xl font-semibold leading-tight text-[var(--ink)] lg:text-6xl">
                Clear, accurate medication history — day by day.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-[var(--muted)]">
                Track every dose change, pause, and restart without re-adding meds.
                Daily totals are the source of truth, with optional cadence fields
                like BID or TID when you need them.
              </p>
            </div>
            <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.45)]">
              <p className="text-sm font-semibold text-[var(--ink)]">
                Today&apos;s Snapshot
              </p>
              <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                <div className="flex items-center justify-between">
                  <span>Active meds</span>
                  <span className="font-semibold text-[var(--ink)]">See table below</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last change logged</span>
                  <span className="font-semibold text-[var(--ink)]">—</span>
                </div>
                <button className="mt-4 w-full rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">
                  Add Dose Change
                </button>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <ImportPanel />
          <DailyLookupPanel />
          <div className="rounded-3xl border border-[var(--line)] bg-white/70 p-6 backdrop-blur">
            <p className="text-sm font-semibold text-[var(--ink)]">Weekly Check-In</p>
            <p className="mt-3 text-sm text-[var(--muted)]">
              A gentle reminder to log changes so nothing falls through.
            </p>
            <div className="mt-5 flex items-center justify-between rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm">
              <span className="text-[var(--muted)]">Any changes this week?</span>
              <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white">
                No changes
              </span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="/imports/mito-review"
                className="inline-flex items-center text-xs font-semibold text-[var(--accent)]"
              >
                Open full import review
              </a>
              <a
                href="/timeline"
                className="inline-flex items-center text-xs font-semibold text-[var(--accent)]"
              >
                Open timeline explorer
              </a>
            </div>
          </div>
        </section>

        <ActiveTodayPanel />

        <section className="rounded-[32px] border border-[var(--line)] bg-[var(--card)] p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--ink)]">
                Medication Timeline
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Each med keeps a single timeline of dose events. Dose is active
                until the next change; null or 0 makes the med inactive.
              </p>
            </div>
            <a
              href="/meds"
              className="h-11 rounded-full border border-[var(--line)] px-4 text-sm font-semibold text-[var(--ink)]"
            >
              View All Meds
            </a>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {[
              "Ubiquinol",
              "Riboflavin",
              "Vitamin D",
              "Creatine",
              "Glutathione",
              "NAC",
            ].map((med) => (
              <div
                key={med}
                className="rounded-2xl border border-[var(--line)] bg-white p-4"
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm font-semibold text-[var(--ink)]">{med}</p>
                  <span className="text-xs text-[var(--muted)]">Active</span>
                </div>
                <div className="mt-3 text-xs text-[var(--muted)]">
                  Last change: 2025-10-28
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-[var(--muted)]">Total daily</span>
                  <span className="font-semibold text-[var(--ink)]">250 mg</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <AddMedForm />
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
        </section>

        <footer className="flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-xs text-[var(--muted)]">
          <p>Voice updates can be added later by mapping transcripts to dose events.</p>
          <p>Unit-aware totals keep mg, IU, and mL consistent across your history.</p>
        </footer>
      </main>
    </div>
  );
}
