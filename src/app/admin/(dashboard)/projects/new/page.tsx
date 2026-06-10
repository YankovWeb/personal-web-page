import { ProjectForm } from "@/components/admin/project-form";
import { getAllTags } from "@/lib/queries";
import { saveProject } from "@/lib/admin/actions";

export default async function NewProjectPage() {
  const existingTags = await getAllTags();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">New Project</h1>
      <ProjectForm existingTags={existingTags} action={saveProject} />
    </div>
  );
}
