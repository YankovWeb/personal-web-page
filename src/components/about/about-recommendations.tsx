"use client";

import { MessageSquareQuote, ExternalLink } from "lucide-react";
import {
  AboutReveal,
  AboutStagger,
  AboutStaggerItem,
} from "@/components/about/about-reveal";
import {
  recommendationRelationLabels,
  type Recommendation,
} from "@/lib/about-fallback";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function formatRecDate(date: string): string {
  const [year, month] = date.split("-");
  const d = new Date(Number(year), Number(month) - 1);
  return d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export function AboutRecommendations({
  recommendations,
  linkedinUrl,
}: {
  recommendations: Recommendation[];
  linkedinUrl: string | null;
}) {
  const featured = recommendations.find((rec) => rec.featured);
  const rest = recommendations.filter((rec) => !rec.featured);

  return (
    <section className="mt-24">
      <AboutReveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <MessageSquareQuote size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Recommendations
              </h2>
              <p className="mt-1 text-sm text-muted">
                Selected endorsements from leadership, product, and engineering
              </p>
            </div>
          </div>
          {linkedinUrl && (
            <Button href={linkedinUrl} variant="secondary" size="sm">
              <ExternalLink size={14} />
              More on LinkedIn
            </Button>
          )}
        </div>
      </AboutReveal>

      <div className="mt-10 space-y-6">
        {featured && (
          <AboutReveal delay={0.05}>
            <blockquote
              className={cn(
                "relative overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/10 via-surface/90 to-accent-secondary/5 p-8",
                "shadow-[0_20px_60px_-30px_var(--toggle-glow)] backdrop-blur-sm md:p-10",
              )}
            >
              <MessageSquareQuote
                size={32}
                className="text-accent/30"
                aria-hidden
              />
              <p className="mt-4 text-lg leading-relaxed text-foreground/90 md:text-xl">
                &ldquo;{featured.quote}&rdquo;
              </p>
              <footer className="mt-6 flex flex-col gap-1 border-t border-border/60 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <cite className="not-italic font-semibold text-foreground">
                    {featured.name}
                  </cite>
                  <p className="mt-1 text-sm text-muted">{featured.title}</p>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-0">
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                    {recommendationRelationLabels[featured.relation]}
                  </span>
                  <time className="font-mono text-xs text-muted">
                    {formatRecDate(featured.date)}
                  </time>
                </div>
              </footer>
            </blockquote>
          </AboutReveal>
        )}

        <AboutStagger className="grid gap-5 md:grid-cols-2">
          {rest.map((rec) => (
            <AboutStaggerItem key={rec.id}>
              <blockquote
                className={cn(
                  "flex h-full flex-col rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur-sm",
                  "transition-all duration-300 hover:border-accent/35 hover:shadow-[0_12px_40px_-24px_var(--toggle-glow)]",
                )}
              >
                <p className="flex-1 text-sm leading-relaxed text-muted">
                  &ldquo;{rec.quote}&rdquo;
                </p>
                <footer className="mt-5 border-t border-border/60 pt-4">
                  <cite className="not-italic font-semibold text-foreground">
                    {rec.name}
                  </cite>
                  <p className="mt-1 text-xs leading-snug text-muted">
                    {rec.title}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-border bg-surface px-2 py-0.5 text-[10px] font-medium text-muted">
                      {recommendationRelationLabels[rec.relation]}
                    </span>
                    <time className="font-mono text-[10px] text-muted/80">
                      {formatRecDate(rec.date)}
                    </time>
                  </div>
                </footer>
              </blockquote>
            </AboutStaggerItem>
          ))}
        </AboutStagger>
      </div>
    </section>
  );
}
