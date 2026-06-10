"use client";

import { Award, ExternalLink } from "lucide-react";
import { AboutReveal } from "@/components/about/about-reveal";
import {
  certificationGroupLabels,
  type Certification,
} from "@/lib/about-fallback";
import { Button } from "@/components/ui/button";

function formatCertDate(date: string): string {
  const [year, month] = date.split("-");
  const d = new Date(Number(year), Number(month) - 1);
  return d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export function AboutCertifications({
  certifications,
  cvUrl,
}: {
  certifications: Certification[];
  cvUrl: string | null;
}) {
  const groups = (["architecture-ai", "backend-devops"] as const).map(
    (group) => ({
      group,
      label: certificationGroupLabels[group],
      items: certifications.filter((c) => c.group === group),
    }),
  );

  return (
    <section className="mt-24">
      <AboutReveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Award size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Certifications
              </h2>
              <p className="mt-1 text-sm text-muted">
                Architecture, AI, and platform credentials
              </p>
            </div>
          </div>
          {cvUrl && (
            <Button href={cvUrl} variant="secondary" size="sm">
              <ExternalLink size={14} />
              Full CV (PDF)
            </Button>
          )}
        </div>
      </AboutReveal>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {groups.map(({ group, label, items }, groupIndex) => (
          <AboutReveal key={group} delay={groupIndex * 0.1}>
            <div className="rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">
                {label}
              </h3>
              <ul className="mt-5 space-y-4">
                {items.map((cert) => (
                  <li
                    key={cert.id}
                    className="group flex items-start justify-between gap-4 border-b border-border/60 pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium leading-snug transition-colors group-hover:text-accent">
                        {cert.name}
                      </p>
                      <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                    </div>
                    <time className="shrink-0 font-mono text-xs text-muted">
                      {formatCertDate(cert.date)}
                    </time>
                  </li>
                ))}
              </ul>
            </div>
          </AboutReveal>
        ))}
      </div>
    </section>
  );
}
