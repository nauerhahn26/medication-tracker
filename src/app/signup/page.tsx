"use client";

import Link from "next/link";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${siteUrl}/login`,
      },
    });
    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }
    setStatus("done");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff8e8,transparent_50%),radial-gradient(circle_at_20%_40%,#ffe1d4,transparent_45%),radial-gradient(circle_at_80%_20%,#d6efe6,transparent_45%)]">
      <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-16">
        <h1 className="text-3xl font-semibold text-[var(--ink)]">Create account</h1>
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[var(--line)] bg-white/80 p-6"
        >
          <div className="grid gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white"
          >
            Create account
          </button>
          {status === "done" && (
            <p className="mt-3 text-xs text-[var(--muted)]">
              Check your email to confirm your account.
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-xs text-red-600">
              Could not create account.
              {errorMessage ? ` ${errorMessage}` : ""}
            </p>
          )}
        </form>
        <p className="text-sm text-[var(--muted)]">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[var(--accent)]">
            Sign in
          </Link>
        </p>
      </main>
    </div>
  );
}
