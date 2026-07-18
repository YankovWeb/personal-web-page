"use client";

import Link from "next/link";
import { StickyNote } from "lucide-react";
import { ArticleCard } from "@/components/articles/article-card";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Article, Note } from "@/lib/types";

function NoteRailItem({ note }: { note: Note }) {
  return (
    <li>
      <Link
        href="/notes"
        className="group block rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40"
      >
        <div className="flex items-center justify-between gap-3">
          <time className="text-xs text-muted">
            {formatDate(note.created_at)}
          </time>
          <Badge>{note.type}</Badge>
        </div>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/90">
          {note.content}
        </p>
      </Link>
    </li>
  );
}

export function HomeWriting({
  articles,
  notes,
}: {
  articles: Article[];
  notes: Note[];
}) {
  if (articles.length === 0 && notes.length === 0) return null;

  return (
    <Reveal className="py-12" delay={0.05}>
      <SectionHeader
        index="02"
        eyebrow="Writing"
        title="Articles & notes"
        description="Long-form pieces next to whatever I'm thinking about this week."
        href="/articles"
        linkLabel="All articles"
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Stagger className="grid content-start gap-6">
          {articles.map((article) => (
            <StaggerItem key={article.id}>
              <ArticleCard article={article} />
            </StaggerItem>
          ))}
        </Stagger>

        {notes.length > 0 && (
          <aside className="flex flex-col gap-3">
            <p className="flex items-center gap-2 text-sm font-medium text-muted">
              <StickyNote size={15} className="text-accent" />
              Recent notes
            </p>
            <ul className="flex flex-col gap-3">
              {notes.map((note) => (
                <NoteRailItem key={note.id} note={note} />
              ))}
            </ul>
            <Link
              href="/notes"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              All notes →
            </Link>
          </aside>
        )}
      </div>
    </Reveal>
  );
}
