"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthError, logIn, signUp } from "@/lib/auth/demo-auth";
import { adoptAnonymousScans } from "@/lib/user-data/body-scans";

const field =
  "mt-1 block w-full rounded-xl border border-line bg-white px-3 py-2";

// Only allow returning to a page of this site.
function nextPath() {
  const next = new URLSearchParams(window.location.search).get("next");
  return next && next.startsWith("/") && !next.startsWith("//")
    ? next
    : "/my-journey";
}

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    setError("");
    setBusy(true);
    try {
      if (mode === "signup") {
        await signUp({ name: String(data.get("name") ?? ""), email, password });
        adoptAnonymousScans();
      } else {
        await logIn({ email, password });
      }
      router.push(nextPath());
    } catch (err) {
      setError(
        err instanceof AuthError
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setBusy(false);
    }
  }

  const tab = (m: typeof mode, label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={mode === m}
      onClick={() => {
        setMode(m);
        setError("");
      }}
      className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold ${
        mode === m ? "bg-teal text-cream" : "text-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="rounded-2xl border border-line bg-white p-6 text-left">
      <div role="tablist" className="flex gap-1 rounded-xl bg-sand p-1">
        {tab("login", "Log in")}
        {tab("signup", "Create account")}
      </div>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {mode === "signup" && (
          <label className="block text-sm font-semibold">
            Name
            <input name="name" autoComplete="name" required className={field} />
          </label>
        )}
        <label className="block text-sm font-semibold">
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className={field}
          />
        </label>
        <label className="block text-sm font-semibold">
          Password
          <input
            name="password"
            type="password"
            autoComplete={
              mode === "signup" ? "new-password" : "current-password"
            }
            minLength={mode === "signup" ? 8 : undefined}
            required
            className={field}
          />
          {mode === "signup" && (
            <span className="mt-1 block text-xs font-normal opacity-70">
              At least 8 characters.
            </span>
          )}
        </label>
        {mode === "signup" && (
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" name="consent" required className="mt-1" />
            <span>
              I agree that what I record here, including body sensations and
              emotions, is saved to my account.
            </span>
          </label>
        )}

        {error && (
          <p
            role="alert"
            className="rounded-xl bg-alert/10 p-3 text-sm text-alert"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-xl bg-teal px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-cream disabled:opacity-50"
        >
          {mode === "signup" ? "Create account" : "Log in"}
        </button>
      </form>

      <p className="mt-5 text-xs opacity-60">
        Demo accounts: they are stored in this browser only and are not a secure
        login yet. Do not reuse a real password.
      </p>
    </div>
  );
}
