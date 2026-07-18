"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAuthErrorMessage, parseAuthHashErrors } from "@/lib/auth-errors";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() ?? "";

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={`animate-spin ${className ?? "h-4 w-4"}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(() => {
    // Parse hash fragment errors from Supabase auth redirects on mount
    if (typeof window === "undefined") return null;
    const hash = window.location.hash;
    if (!hash) return null;
    const { error: errorDesc, errorCode } = parseAuthHashErrors(hash);
    if (!errorDesc && !errorCode) return null;
    return getAuthErrorMessage(errorCode ?? errorDesc) ?? errorDesc ?? null;
  });

  // Clean up the hash so the error doesn't persist on refresh
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (email.toLowerCase() !== ADMIN_EMAIL) {
      setLoading(false);
      setError("Този email няма достъп до admin панела.");
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      // Try error code first, then match known message patterns
      const mapped =
        getAuthErrorMessage(authError.code) ??
        (authError.message.includes("Invalid login credentials")
          ? "Грешен email или парола."
          : null);
      setError(mapped ?? authError.message);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <p className="mt-1 text-sm text-muted">
        Вход с email и парола — без magic link, без изчакване.
      </p>

      <form onSubmit={handleLogin} className="mt-8 space-y-5">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="yankovweb@outlook.com"
            required
            autoComplete="email"
            autoFocus
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/8 p-4">
            <p className="flex items-start gap-2 text-sm text-red-400">
              <span className="mt-0.5 shrink-0 text-red-400/70" aria-hidden>
                ⚠
              </span>
              <span>{error}</span>
            </p>
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Spinner />
              <span>Влизане...</span>
            </>
          ) : (
            "Влез"
          )}
        </Button>
      </form>
    </>
  );
}
