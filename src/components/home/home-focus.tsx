"use client";

import { Smartphone, AppWindow, Sparkles } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";

const focusAreas = [
  {
    icon: Smartphone,
    title: "Mobile Engineering",
    description:
      "React Native apps end-to-end — New Architecture, custom native modules, performance work, and App Store & Google Play delivery.",
  },
  {
    icon: AppWindow,
    title: "Web Platforms",
    description:
      "React, Next.js App Router, and TypeScript — fast, accessible, server-rendered products backed by clean data layers.",
  },
  {
    icon: Sparkles,
    title: "AI-Forward Delivery",
    description:
      "Claude Code and Cursor as engineering multipliers, kept honest with DDD, solid architecture, and rigorous code validation.",
  },
] as const;

export function HomeFocus() {
  return (
    <Reveal className="py-12">
      <SectionHeader
        index="01"
        eyebrow="Focus"
        title="What I do"
        description="The three lanes where I spend my engineering time."
        href="/about"
        linkLabel="Full skill set"
      />

      <Stagger className="grid gap-6 sm:grid-cols-3">
        {focusAreas.map(({ icon: Icon, title, description }) => (
          <StaggerItem key={title} className="h-full">
            <div className="group h-full rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/40 hover:shadow-[0_16px_48px_-24px_var(--toggle-glow)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent transition-transform duration-300 group-hover:scale-110">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  );
}
