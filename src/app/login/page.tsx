"use client";

import Link from "next/link";
import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [resendStatus, setResendStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setStatus("error");
      return;
    }
    window.location.href = "/";
  }

  async function handleResend() {
    if (!email) return;
    setResendStatus("sending");
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${siteUrl}/login`,
      },
    });
    if (error) {
      setResendStatus("error");
      return;
    }
    setResendStatus("sent");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff8e8,transparent_50%),radial-gradient(circle_at_20%_40%,#ffe1d4,transparent_45%),radial-gradient(circle_at_80%_20%,#d6efe6,transparent_45%)]">
      <main className="mx-auto flex w-full max-w-md flex-col gap-6 px-6 py-16">
        <h1 className="text-3xl font-semibold text-[var(--ink)]">Sign in</h1>
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
            Sign in
          </button>
          {status === "error" && (
            <p className="mt-3 text-xs text-red-600">
              Invalid credentials or account not confirmed.
            </p>
          )}
        </form>
        <div className="rounded-3xl border border-[var(--line)] bg-white/80 p-4 text-xs text-[var(--muted)]">
          <div className="font-semibold text-[var(--ink)]">
            Didn&apos;t get the confirmation email?
          </div>
          <p className="mt-1">
            Enter your email above, then resend the confirmation link.
          </p>
          <button
            onClick={handleResend}
            className="mt-3 rounded-full border border-[var(--line)] px-3 py-2 text-xs font-semibold text-[var(--ink)]"
            type="button"
          >
            Resend confirmation
          </button>
          {resendStatus === "sent" && (
            <p className="mt-2 text-[var(--accent)]">Confirmation email sent.</p>
          )}
          {resendStatus === "error" && (
            <p className="mt-2 text-red-600">Could not resend confirmation.</p>
          )}
        </div>
        <p className="text-sm text-[var(--muted)]">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-[var(--accent)]">
            Create an account
          </Link>
        </p>
      </main>
    </div>
  );
}
