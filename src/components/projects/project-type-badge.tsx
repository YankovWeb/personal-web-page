import { Briefcase, User } from "lucide-react";
import type { ProjectType } from "@/lib/types";
import { cn } from "@/lib/utils";

export const projectTypeBadgeLabels: Record<ProjectType, string> = {
  personal: "Personal project",
  team: "Professional · team work",
};

const styles: Record<
  ProjectType,
  { prominent: string; default: string; icon: typeof User }
> = {
  personal: {
    prominent:
      "border-indigo-300/80 bg-indigo-600 text-white shadow-[0_4px_16px_rgba(0,0,0,0.45)]",
    default:
      "border-indigo-300 bg-indigo-100 text-indigo-950 dark:border-indigo-500 dark:bg-indigo-600 dark:text-white",
    icon: User,
  },
  team: {
    prominent:
      "border-cyan-300/80 bg-cyan-600 text-white shadow-[0_4px_16px_rgba(0,0,0,0.45)]",
    default:
      "border-cyan-300 bg-cyan-100 text-cyan-950 dark:border-cyan-500 dark:bg-cyan-700 dark:text-white",
    icon: Briefcase,
  },
};

export function ProjectTypeBadge({
  type,
  className,
  prominent = false,
}: {
  type: ProjectType;
  className?: string;
  prominent?: boolean;
}) {
  const resolved = type ?? "personal";
  const { prominent: prominentClass, default: defaultClass, icon: Icon } =
    styles[resolved];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold backdrop-blur-sm",
        prominent ? "px-3 py-1 text-xs" : "px-2.5 py-1 text-[11px]",
        prominent ? prominentClass : defaultClass,
        className,
      )}
    >
      <Icon size={prominent ? 14 : 12} aria-hidden />
      {projectTypeBadgeLabels[resolved]}
    </span>
  );
}

export function resolveProjectType(
  type: ProjectType | null | undefined,
): ProjectType {
  return type === "team" ? "team" : "personal";
}
