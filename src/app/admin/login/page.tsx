import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/admin/login-form";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { getAuthErrorMessage } from "@/lib/auth-errors";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error: errorParam } = await searchParams;
  const errorMessage = errorParam ? getAuthErrorMessage(errorParam) : null;

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-accent-secondary/8 blur-[120px]" />
      </div>

      {/* Top bar: back-to-site + theme toggle */}
      <div className="absolute right-6 top-6 flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={14} />
          Site
        </Link>
        <ThemeToggle />
      </div>

      {/* Glass card */}
      <div className="glass w-full max-w-sm rounded-2xl border border-border p-8 shadow-xl">
        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/8 p-4">
            <p className="flex items-start gap-2 text-sm text-red-400">
              <span className="mt-0.5 shrink-0 text-red-400/70" aria-hidden>⚠</span>
              <span>{errorMessage}</span>
            </p>
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  );
}
