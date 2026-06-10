"use client";

import { FolderKanban, Users } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { PageHeader } from "@/components/motion/page-header";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { ListFilters } from "@/components/ui/list-filters";
import {
  projectTypeDescriptions,
  projectTypeEmptyMessages,
  projectTypeLabels,
  splitProjectsByType,
} from "@/lib/projects";
import type { Project, ProjectType } from "@/lib/types";
import type { SortOrder } from "@/lib/sort";
import { cn } from "@/lib/utils";

const sectionIcons: Record<ProjectType, typeof FolderKanban> = {
  personal: FolderKanban,
  team: Users,
};

function ProjectSection({
  type,
  projects,
  tag,
  delay = 0,
}: {
  type: ProjectType;
  projects: Project[];
  tag?: string;
  delay?: number;
}) {
  const Icon = sectionIcons[type];
  const emptyMessage = tag
    ? `No ${type === "personal" ? "personal" : "team"} projects tagged "${tag}".`
    : projectTypeEmptyMessages[type];

  return (
    <Reveal delay={delay} className="mt-14 first:mt-12">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <Icon size={20} />
        </div>
        <div>
          <h2 className="text-xl font-semibold sm:text-2xl">
            {projectTypeLabels[type]}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {projectTypeDescriptions[type]}
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-border bg-surface/50 px-5 py-8 text-center text-sm text-muted">
          {emptyMessage}
        </p>
      ) : (
        <Stagger className="mt-6 grid auto-rows-fr gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem key={project.id} className="h-full">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </Reveal>
  );
}

export function ProjectsPageView({
  projects,
  tags,
  activeTag,
  sort,
}: {
  projects: Project[];
  tags: string[];
  activeTag?: string;
  sort: SortOrder;
}) {
  const { personal, team } = splitProjectsByType(projects);
  const isEmpty = projects.length === 0;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        title="Projects"
        description="Personal builds and professional work — side by side."
      />

      <Reveal delay={0.1} className="mt-8">
        <ListFilters
          tags={tags}
          activeTag={activeTag}
          sort={sort}
          basePath="/projects"
        />
      </Reveal>

      {isEmpty && activeTag ? (
        <Reveal delay={0.14} className="mt-12 text-center text-muted">
          No projects tagged &ldquo;{activeTag}&rdquo;.
        </Reveal>
      ) : (
        <div className={cn(isEmpty && !activeTag && "mt-2")}>
          <ProjectSection
            type="personal"
            projects={personal}
            tag={activeTag}
            delay={0.12}
          />
          <ProjectSection
            type="team"
            projects={team}
            tag={activeTag}
            delay={0.16}
          />
        </div>
      )}
    </div>
  );
}
