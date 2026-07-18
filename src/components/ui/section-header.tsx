"use client";

import Link from "next/link";

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  href,
  linkLabel,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
          <span aria-hidden className="text-muted/60">
            {index}
          </span>
          <span aria-hidden className="h-px w-6 bg-accent/40" />
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-muted">{description}</p>
        )}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="shrink-0 text-sm text-muted transition-colors hover:text-accent"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
