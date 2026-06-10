import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteNote } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatDate } from "@/lib/utils";

export default async function AdminNotesPage() {
  const supabase = await createClient();
  const { data: notes } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notes</h1>
          <p className="mt-1 text-sm text-muted">{notes?.length ?? 0} total</p>
        </div>
        <Button href="/admin/notes/new">+ New note</Button>
      </div>

      <div className="mt-8 space-y-3">
        {notes?.map((note) => (
          <div
            key={note.id}
            className="flex items-start justify-between rounded-xl border border-border bg-surface p-4"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Badge>{note.type}</Badge>
                <span className="text-xs text-muted">{formatDate(note.created_at)}</span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm">{note.content}</p>
              <Link
                href={`/admin/notes/${note.id}/edit`}
                className="mt-2 inline-block text-sm text-accent hover:underline"
              >
                Edit
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Button href={`/admin/notes/${note.id}/edit`} variant="secondary" size="sm">
                Edit
              </Button>
              <DeleteButton onDelete={deleteNote.bind(null, note.id)} />
            </div>
          </div>
        ))}
        {(!notes || notes.length === 0) && (
          <p className="py-8 text-center text-muted">No notes yet.</p>
        )}
      </div>
    </div>
  );
}
