"use client";

import Link from "next/link";
import { HomeFocus } from "@/components/home/home-focus";
import { HomeHero } from "@/components/home/home-hero";
import { HomeVideos } from "@/components/home/home-videos";
import { HomeWriting } from "@/components/home/home-writing";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Article, Note, Profile, Project, Video } from "@/lib/types";

export function HomeView({
  profile,
  articles,
  notes,
  videos,
  projects,
}: {
  profile: Profile | null;
  articles: Article[];
  notes: Note[];
  videos: Video[];
  projects: Project[];
}) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <HomeHero profile={profile} />

      <HomeFocus />

      {projects.length > 0 && (
        <Reveal className="py-12">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Featured Projects
              </h2>
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

      <HomeWriting articles={articles} notes={notes} />

      <HomeVideos videos={videos} />
    </div>
  );
}
