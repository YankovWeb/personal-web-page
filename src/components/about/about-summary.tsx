"use client";

import { AboutReveal } from "@/components/about/about-reveal";

export function AboutSummary({ summary }: { summary: string }) {
  return (
    <AboutReveal>
      <section className="relative overflow-hidden rounded-2xl border border-border bg-surface/70 p-6 shadow-[0_20px_60px_-30px_var(--toggle-glow)] backdrop-blur-sm md:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent-secondary/10 blur-3xl" />

        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent">
          Professional summary
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/90 md:text-lg">
          {summary}
        </p>
      </section>
    </AboutReveal>
  );
}
