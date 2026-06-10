"use client";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function DetailShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("mx-auto max-w-3xl px-6 py-16", className)}>
      {children}
    </Reveal>
  );
}

export function DetailBlock({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      {children}
    </Reveal>
  );
}
