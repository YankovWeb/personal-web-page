import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { createClient } from "@/lib/supabase/server";
import { getAllTags } from "@/lib/queries";
import { saveProject } from "@/lib/admin/actions";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const [existingTags, { data: project }] = await Promise.all([
    getAllTags(),
    supabase.from("projects").select("*").eq("id", id).single(),
  ]);

  if (!project) notFound();

  const saveWithId = async (formData: FormData) => {
    "use server";
    await saveProject(formData, id);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Edit Project</h1>
      <ProjectForm
        existingTags={existingTags}
        project={project}
        action={saveWithId}
      />
    </div>
  );
}
