import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProject } from "@/lib/admin/actions";
import { projectTypeLabels } from "@/lib/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import type { ProjectType } from "@/lib/types";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="mt-1 text-sm text-muted">{projects?.length ?? 0} total</p>
        </div>
        <Button href="/admin/projects/new">+ New project</Button>
      </div>

      <div className="mt-8 space-y-3">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between rounded-xl border border-border bg-surface p-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="font-medium hover:text-accent"
                >
                  {project.title}
                </Link>
                {project.featured && (
                  <Badge className="border-accent/30 text-accent">Featured</Badge>
                )}
                <Badge>
                  {projectTypeLabels[(project.project_type ?? "personal") as ProjectType]}
                </Badge>
              </div>
              <p className="mt-1 line-clamp-1 text-sm text-muted">{project.description}</p>
            </div>
            <DeleteButton onDelete={deleteProject.bind(null, project.id)} />
          </div>
        ))}
        {(!projects || projects.length === 0) && (
          <p className="py-8 text-center text-muted">No projects yet.</p>
        )}
      </div>
    </div>
  );
}
