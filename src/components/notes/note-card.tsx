"use client";

import { ExternalLink } from "lucide-react";
import { MotionCard } from "@/components/motion/motion-card";
import { TwitterEmbed } from "@/components/tweets/twitter-embed";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Note } from "@/lib/types";

function isAutoTweetCaption(content: string): boolean {
  return /^Tweet by @\w+$/.test(content.trim());
}

export function NoteCard({ note }: { note: Note }) {
  const isTweet = note.type === "tweet" && note.embed_html;
  const personalNote =
    note.content.trim() && !isAutoTweetCaption(note.content)
      ? note.content
      : null;

  return (
    <MotionCard className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40">
      <div className="flex items-center justify-between gap-4">
        <time className="text-xs text-muted">{formatDate(note.created_at)}</time>
        <Badge>{note.type}</Badge>
      </div>

      {personalNote && (
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">
          {personalNote}
        </p>
      )}

      {isTweet ? (
        <div className={`overflow-hidden rounded-lg ${personalNote ? "mt-4" : "mt-4"}`}>
          <TwitterEmbed html={note.embed_html!} />
        </div>
      ) : (
        !personalNote && (
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">
            {note.content}
          </p>
        )
      )}

      {note.external_url && !isTweet && (
        <a
          href={note.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-sm text-accent hover:underline"
        >
          <ExternalLink size={14} />
          View source
        </a>
      )}

      {note.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {note.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}
    </MotionCard>
  );
}
