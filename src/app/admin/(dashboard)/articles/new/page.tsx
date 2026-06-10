import { saveArticle } from "@/lib/admin/actions";
import { TagPicker } from "@/components/admin/tag-picker";
import { FormField } from "@/components/admin/form-field";
import { Button } from "@/components/ui/button";
import { getAllTags } from "@/lib/queries";

export default async function NewArticlePage() {
  const existingTags = await getAllTags();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">New Article</h1>

      <form action={saveArticle} className="mt-8 max-w-2xl space-y-4">
        <FormField label="Title" name="title" required />
        <FormField label="Slug" name="slug" hint="Leave empty to auto-generate from title" />
        <FormField label="Excerpt" name="excerpt" rows={2} />
        <FormField
          label="Content (Markdown)"
          name="content"
          rows={16}
          required
          hint="Supports Markdown formatting"
        />
        <FormField label="Cover image URL" name="cover_image" />
        <TagPicker
          name="tags"
          label="Tags"
          existingTags={existingTags}
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
            defaultValue="draft"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <Button type="submit">Create article</Button>
      </form>
    </div>
  );
}
