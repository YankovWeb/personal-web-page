import type { Metadata } from "next";
import { NoteCard } from "@/components/notes/note-card";
import { StaggerItem } from "@/components/motion/reveal";
import { ListPageShell } from "@/components/motion/list-page-shell";
import { ListFilters } from "@/components/ui/list-filters";
import {
  filterNotesByTag,
  getNotes,
  getTagsFromNotes,
  parseSortOrder,
  sortNotes,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Notes",
};

type Props = {
  searchParams: Promise<{ tag?: string; sort?: string }>;
};

export default async function NotesPage({ searchParams }: Props) {
  const { tag, sort: sortParam } = await searchParams;
  const sort = parseSortOrder(sortParam);
  const notes = await getNotes();
  const tags = getTagsFromNotes(notes);
  const filtered = filterNotesByTag(sortNotes(notes, sort), tag);

  return (
    <ListPageShell
      title="Notes"
      description="Quick thoughts, links, and things I've discovered."
      className="max-w-2xl"
      isEmpty={filtered.length === 0}
      emptyMessage={tag ? `No notes tagged "${tag}".` : "No notes yet."}
      staggerClassName="mt-12 space-y-4"
      filters={
        <ListFilters tags={tags} activeTag={tag} sort={sort} basePath="/notes" />
      }
    >
      {filtered.map((note) => (
        <StaggerItem key={note.id}>
          <NoteCard note={note} />
        </StaggerItem>
      ))}
    </ListPageShell>
  );
}
