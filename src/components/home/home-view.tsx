"use client";

import Link from "next/link";
import { ArticleCard } from "@/components/articles/article-card";
import { HomeHero } from "@/components/home/home-hero";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Article, Profile, Project } from "@/lib/types";

export function HomeView({
  profile,
  articles,
  projects,
}: {
  profile: Profile | null;
  articles: Article[];
  projects: Project[];
}) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <HomeHero profile={profile} />

      {projects.length > 0 && (
        <Reveal className="py-12">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Featured Projects</h2>
              <p className="mt-1 text-sm text-muted">
                Personal builds and professional work — clearly labeled.
              </p>
            </div>
            <Link
              href="/projects"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              View all →
            </Link>
          </div>
          <Stagger className="grid auto-rows-fr gap-6 sm:grid-cols-2">
            {projects.slice(0, 2).map((project) => (
              <StaggerItem key={project.id} className="h-full">
                <ProjectCard project={project} prominentType />
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      )}

      {articles.length > 0 && (
        <Reveal className="py-12" delay={0.05}>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Latest Articles</h2>
            <Link
              href="/articles"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              View all →
            </Link>
          </div>
          <Stagger className="grid gap-6">
            {articles.map((article) => (
              <StaggerItem key={article.id}>
                <ArticleCard article={article} />
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
      )}
    </div>
  );
}
