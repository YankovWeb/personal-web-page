"use client";

import Image from "next/image";
import { Code2 } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { DetailBlock, DetailShell } from "@/components/motion/detail-shell";
import {
  ProjectTypeBadge,
  resolveProjectType,
} from "@/components/projects/project-type-badge";
import { ShareLinkPreview } from "@/components/shared/share-link-preview";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";

export function ProjectDetailView({ project }: { project: Project }) {
  return (
    <DetailShell>
      {project.live_url ? (
        <DetailBlock className="mb-8">
          <ShareLinkPreview
            url={project.live_url}
            title={project.title}
            description={project.description}
            imageUrl={project.image_url}
          />
        </DetailBlock>
      ) : (
        project.image_url && (
          <DetailBlock className="relative mb-8 aspect-video overflow-hidden rounded-xl border border-border">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover"
              priority
              unoptimized
            />
          </DetailBlock>
        )
      )}

      <DetailBlock delay={project.image_url || project.live_url ? 0.06 : 0}>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <ProjectTypeBadge
            type={resolveProjectType(project.project_type)}
            prominent
          />
        </div>
        <p className="mt-4 text-lg text-muted">{project.description}</p>
      </DetailBlock>

      {project.tech_stack.length > 0 && (
        <DetailBlock delay={0.1} className="mt-6 flex flex-wrap gap-2">
          {project.tech_stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </DetailBlock>
      )}

      <DetailBlock delay={0.12} className="mt-6 flex gap-4">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <Code2 size={16} /> Source code
          </a>
        )}
      </DetailBlock>

      {project.content && (
        <DetailBlock delay={0.16} className="mt-12">
          <Markdown content={project.content} />
        </DetailBlock>
      )}
    </DetailShell>
  );
}
