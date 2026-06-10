"use client";

import { Briefcase, Quote } from "lucide-react";
import { AboutReveal } from "@/components/about/about-reveal";
import type { AboutHighlightExperience } from "@/lib/about-fallback";
import { cn } from "@/lib/utils";

function formatPeriod(
  start: string,
  end: string | null,
  current: boolean,
): string {
  const fmt = (date: string) =>
    new Date(date).toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });

  const endLabel = current ? "Present" : end ? fmt(end) : "";
  return `${fmt(start)} — ${endLabel}`;
}

export function AboutTimeline({
  experiences,
}: {
  experiences: AboutHighlightExperience[];
}) {
  return (
    <section className="mt-24">
      <AboutReveal>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <Briefcase size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Career journey
            </h2>
            <p className="mt-1 text-sm text-muted">
              From first shipped MVPs to enterprise native migrations
            </p>
          </div>
        </div>
      </AboutReveal>

      <div className="relative mt-12">
        <div
          aria-hidden
          className="absolute bottom-0 left-[1.125rem] top-0 w-px bg-gradient-to-b from-accent/10 via-accent/50 to-accent-secondary/30 md:left-1/2 md:-translate-x-px"
        />

        <ol className="space-y-0">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <li key={exp.id} className="relative">
                <AboutReveal delay={index * 0.08}>
                  <div
                    className={cn(
                      "relative grid gap-6 pb-14 md:grid-cols-2 md:gap-10",
                      !isEven && "md:[&>div:first-child]:order-2",
                    )}
                  >
                    <div
                      className={cn(
                        "hidden md:block",
                        isEven ? "md:pr-10" : "md:pl-10",
                      )}
                    />

                    <div
                      className={cn(
                        "relative pl-12 md:pl-0",
                        isEven ? "md:pr-10" : "md:pl-10",
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute left-3 top-6 z-10 h-4 w-4 rounded-full border-2 border-background bg-gradient-to-br from-accent to-accent-secondary shadow-[0_0_16px_var(--toggle-glow)] md:left-auto md:top-8",
                          isEven
                            ? "md:right-[-2.125rem]"
                            : "md:left-[-2.125rem]",
                        )}
                      />

                      <article
                        className={cn(
                          "group rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur-sm transition-all duration-500",
                          "hover:border-accent/40 hover:shadow-[0_16px_48px_-24px_var(--toggle-glow)]",
                        )}
                      >
                        <div className={cn(isEven && "md:text-right")}>
                          <div
                            className={cn(
                              "flex flex-wrap items-center gap-2",
                              isEven && "md:justify-end",
                            )}
                          >
                            <time className="font-mono text-xs text-accent">
                              {formatPeriod(
                                exp.start_date,
                                exp.end_date,
                                exp.current,
                              )}
                            </time>
                            {exp.badge && (
                              <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                                {exp.badge}
                              </span>
                            )}
                          </div>

                          <h3 className="mt-3 text-lg font-semibold">
                            {exp.role}
                          </h3>
                          <p className="mt-1 text-sm text-muted">
                            {exp.company}
                            {exp.location ? ` · ${exp.location}` : ""}
                          </p>
                        </div>

                        {exp.highlights.length > 0 && (
                          <ul className="mt-4 space-y-2 text-left text-sm text-muted leading-relaxed">
                            {exp.highlights.map((item) => (
                              <li key={item} className="flex gap-2">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </article>
                    </div>
                  </div>
                </AboutReveal>

                {exp.storyBridge && index < experiences.length - 1 && (
                  <AboutReveal delay={index * 0.08 + 0.04}>
                    <div className="relative z-10 mx-auto mb-14 max-w-xl px-6">
                      <div className="flex gap-3 rounded-xl border border-dashed border-accent/25 bg-accent/5 px-5 py-4">
                        <Quote
                          size={18}
                          className="mt-0.5 shrink-0 text-accent/70"
                        />
                        <p className="text-sm italic leading-relaxed text-muted">
                          {exp.storyBridge}
                        </p>
                      </div>
                    </div>
                  </AboutReveal>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
