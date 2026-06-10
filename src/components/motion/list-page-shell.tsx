"use client";

import { PageHeader } from "@/components/motion/page-header";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function ListPageShell({
  title,
  description,
  className,
  filters,
  isEmpty,
  emptyMessage,
  staggerClassName,
  children,
}: {
  title: string;
  description: string;
  className?: string;
  filters: React.ReactNode;
  isEmpty: boolean;
  emptyMessage: string;
  staggerClassName: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto px-6 py-16", className)}>
      <PageHeader title={title} description={description} />

      <Reveal delay={0.12} className="mt-8">
        {filters}
      </Reveal>

      {isEmpty ? (
        <Reveal delay={0.16} className="mt-12 text-center text-muted">
          {emptyMessage}
        </Reveal>
      ) : (
        <Stagger className={staggerClassName}>{children}</Stagger>
      )}
    </div>
  );
}
