"use client";

import { Cpu } from "lucide-react";
import {
  AboutReveal,
  AboutStagger,
  AboutStaggerItem,
} from "@/components/about/about-reveal";
import { skillCategoryLabels } from "@/lib/about-fallback";
import type { Skill } from "@/lib/types";

const categoryOrder = ["frontend-mobile", "ai-architecture", "backend-devops"];

const categoryAccent: Record<string, string> = {
  "frontend-mobile":
    "from-indigo-500/20 to-violet-500/10 border-indigo-500/25 text-indigo-400 dark:text-indigo-300",
  "ai-architecture":
    "from-cyan-500/20 to-teal-500/10 border-cyan-500/25 text-cyan-600 dark:text-cyan-300",
  "backend-devops":
    "from-fuchsia-500/20 to-pink-500/10 border-fuchsia-500/25 text-fuchsia-600 dark:text-fuchsia-300",
};

export function AboutSkills({ skills }: { skills: Skill[] }) {
  const byCategory = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const key = skill.category.toLowerCase();
    if (!acc[key]) acc[key] = [];
    acc[key].push(skill);
    return acc;
  }, {});

  const categories = [
    ...categoryOrder.filter((c) => byCategory[c]?.length),
    ...Object.keys(byCategory).filter((c) => !categoryOrder.includes(c)),
  ];

  return (
    <section className="mt-24">
      <AboutReveal>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-secondary/15 text-accent-secondary">
            <Cpu size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Core competencies
            </h2>
            <p className="mt-1 text-sm text-muted">
              Frontend, mobile, AI-forward architecture, and delivery
            </p>
          </div>
        </div>
      </AboutReveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {categories.map((category, index) => {
          const items = byCategory[category] ?? [];
          const label =
            skillCategoryLabels[category] ??
            category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
          const accent = categoryAccent[category] ?? categoryAccent["frontend-mobile"];

          return (
            <AboutReveal key={category} delay={index * 0.1}>
              <div
                className={`h-full rounded-2xl border bg-gradient-to-br p-6 ${accent}`}
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  {label}
                </h3>
                <AboutStagger className="mt-5 flex flex-wrap gap-2">
                  {items
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((skill) => (
                      <AboutStaggerItem key={skill.id}>
                        <span className="inline-flex rounded-lg border border-border/60 bg-surface/90 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-105">
                          {skill.name}
                        </span>
                      </AboutStaggerItem>
                    ))}
                </AboutStagger>
              </div>
            </AboutReveal>
          );
        })}
      </div>
    </section>
  );
}
