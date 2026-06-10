"use client";

import Link from "next/link";
import Image from "next/image";
import { Code2, ExternalLink } from "lucide-react";
import { MotionCard } from "@/components/motion/motion-card";
import {
  ProjectTypeBadge,
  resolveProjectType,
} from "@/components/projects/project-type-badge";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";

export function ProjectCard({
  project,
  prominentType = false,
}: {
  project: Project;
  prominentType?: boolean;
}) {
  const projectType = resolveProjectType(project.project_type);
  const hasVisualHeader = Boolean(project.image_url);
  const badgeProminent = prominentType || hasVisualHeader;

  return (
    <MotionCard className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/40">
      <div className="relative aspect-video w-full shrink-0 bg-surface-hover">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-accent/10 via-surface to-accent-secondary/10">
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              {project.title.slice(0, 1)}
            </span>
          </div>
        )}

        <div className="absolute left-3 top-3 z-10">
          <ProjectTypeBadge type={projectType} prominent={badgeProminent} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug">
          <Link href={`/projects/${project.slug}`} className="hover:text-accent">
            {project.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-auto pt-4">
          {project.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tech_stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          )}

          {(project.live_url || project.github_url) && (
            <div className="mt-3 flex items-center gap-3">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                >
                  <ExternalLink size={16} />
                  Visit site
                </a>
              )}
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-accent"
                  aria-label="GitHub repository"
                >
                  <Code2 size={18} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </MotionCard>
  );
}
