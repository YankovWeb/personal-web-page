import { NoteEditor } from "@/components/admin/note-editor";
import { getAllTags } from "@/lib/queries";

export default async function NewNotePage() {
  const existingTags = await getAllTags();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">New Note</h1>
      <p className="mt-1 text-sm text-muted">
        Write a quick note and preview how it will look on your site.
      </p>
      <NoteEditor existingTags={existingTags} />
    </div>
  );
}
