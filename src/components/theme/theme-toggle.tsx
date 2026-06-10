"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-10 w-[4.25rem] rounded-full border border-border bg-surface",
          className,
        )}
        aria-hidden
      />
    );
  }

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "group relative h-10 w-[4.25rem] rounded-full p-1 transition-shadow duration-500",
        "border border-border shadow-sm",
        "hover:shadow-[0_0_24px_var(--toggle-glow)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        className,
      )}
    >
      <span
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-500",
          isDark
            ? "bg-gradient-to-br from-indigo-950 via-violet-950 to-slate-950"
            : "bg-gradient-to-br from-amber-100 via-orange-50 to-sky-100",
        )}
      />

      <span
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden rounded-full opacity-60",
        )}
      >
        <span
          className={cn(
            "absolute -right-1 -top-1 h-3 w-3 rounded-full bg-white/80 blur-[1px] transition-all duration-700",
            isDark ? "scale-100 opacity-100" : "scale-0 opacity-0",
          )}
        />
        <span
          className={cn(
            "absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-white/50 transition-all duration-700 delay-75",
            isDark ? "scale-100 opacity-100" : "scale-0 opacity-0",
          )}
        />
        <span
          className={cn(
            "absolute bottom-2 right-4 h-1 w-1 rounded-full bg-white/40 transition-all duration-700 delay-150",
            isDark ? "scale-100 opacity-100" : "scale-0 opacity-0",
          )}
        />
      </span>

      <span
        className={cn(
          "relative flex h-8 w-8 items-center justify-center rounded-full",
          "bg-white shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          "group-active:scale-95",
          isDark ? "translate-x-0" : "translate-x-[2.05rem]",
        )}
      >
        <Sun
          size={16}
          className={cn(
            "absolute text-amber-500 transition-all duration-500",
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100",
          )}
        />
        <Moon
          size={16}
          className={cn(
            "absolute text-indigo-600 transition-all duration-500",
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0",
          )}
        />
      </span>
    </button>
  );
}
