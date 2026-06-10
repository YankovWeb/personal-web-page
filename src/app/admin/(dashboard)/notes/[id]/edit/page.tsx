import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NoteEditor } from "@/components/admin/note-editor";
import { getAllTags } from "@/lib/queries";
import type { Note } from "@/lib/types";

type Props = { params: Promise<{ id: string }> };

export default async function EditNotePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const [existingTags, { data }] = await Promise.all([
    getAllTags(),
    supabase.from("notes").select("*").eq("id", id).single(),
  ]);

  if (!data) notFound();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Edit Note</h1>
      <p className="mt-1 text-sm text-muted">
        Update your note and preview the public card.
      </p>
      <NoteEditor
        note={data as Note}
        noteId={id}
        existingTags={existingTags}
      />
    </div>
  );
}
