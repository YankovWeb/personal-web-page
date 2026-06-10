import type { Project, ProjectType } from "@/lib/types";

export const projectTypeLabels: Record<ProjectType, string> = {
  personal: "Personal projects",
  team: "Team & professional work",
};

export const projectTypeDescriptions: Record<ProjectType, string> = {
  personal: "Side projects, experiments, and things I built on my own.",
  team: "Products and apps I contributed to as part of a team at work.",
};

export const projectTypeEmptyMessages: Record<ProjectType, string> = {
  personal: "No personal projects yet — check back soon.",
  team: "No team projects listed yet — check back soon.",
};

export function splitProjectsByType(projects: Project[]): {
  personal: Project[];
  team: Project[];
} {
  return {
    personal: projects.filter(
      (project) => (project.project_type ?? "personal") === "personal",
    ),
    team: projects.filter((project) => project.project_type === "team"),
  };
}
