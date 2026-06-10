import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { saveArticle } from "@/lib/admin/actions";
import { TagPicker } from "@/components/admin/tag-picker";
import { FormField } from "@/components/admin/form-field";
import { Button } from "@/components/ui/button";
import { getAllTags } from "@/lib/queries";

type Props = { params: Promise<{ id: string }> };

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const [existingTags, { data: article }] = await Promise.all([
    getAllTags(),
    supabase.from("articles").select("*").eq("id", id).single(),
  ]);

  if (!article) notFound();

  const saveWithId = async (formData: FormData) => {
    "use server";
    await saveArticle(formData, id);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Edit Article</h1>

      <form action={saveWithId} className="mt-8 max-w-2xl space-y-4">
        <FormField label="Title" name="title" defaultValue={article.title} required />
        <FormField label="Slug" name="slug" defaultValue={article.slug} />
        <FormField label="Excerpt" name="excerpt" defaultValue={article.excerpt} rows={2} />
        <FormField
          label="Content (Markdown)"
          name="content"
          defaultValue={article.content}
          rows={16}
          required
        />
        <FormField label="Cover image URL" name="cover_image" defaultValue={article.cover_image} />
        <TagPicker
          name="tags"
          label="Tags"
          existingTags={existingTags}
          defaultTags={article.tags ?? []}
          hint="Pick existing tags or add new ones"
        />
        <div>
          <label htmlFor="status" className="mb-1.5 block text-sm font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="flex h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm"
            defaultValue={article.status}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <Button type="submit">Save changes</Button>
      </form>
    </div>
  );
}
