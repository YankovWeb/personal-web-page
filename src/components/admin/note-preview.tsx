import { ExternalLink } from "lucide-react";
import { NoteCard } from "@/components/notes/note-card";
import { Button } from "@/components/ui/button";
import { extractTwitterBlockquote } from "@/lib/twitter";
import type { NoteType } from "@/lib/types";

export type NotePreviewData = {
  type: NoteType;
  content: string;
  external_url: string;
  embed_html: string;
  tags: string[];
};

export function NotePreview({ data }: { data: NotePreviewData }) {
  const embedHtml =
    data.type === "tweet" ? extractTwitterBlockquote(data.embed_html) : null;

  const previewNote = {
    id: "preview",
    type: data.type,
    content: data.content,
    external_url: data.external_url || null,
    embed_html: embedHtml,
    tags: data.tags,
    created_at: new Date().toISOString(),
  };

  return (
    <div className="space-y-6">
      <Button href="/notes" variant="secondary" size="sm">
        <ExternalLink size={14} />
        View notes page
      </Button>

      <section>
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted">
          Public preview
        </p>
        {data.type === "tweet" && !embedHtml ? (
          <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
            Paste a valid Twitter embed code to preview the tweet.
          </div>
        ) : data.type !== "tweet" && !data.content ? (
          <div className="rounded-xl border border-border bg-surface p-6 text-sm text-muted">
            Add note content to preview.
          </div>
        ) : (
          <NoteCard note={previewNote} />
        )}
      </section>
    </div>
  );
}
