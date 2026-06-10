"use client";

import Link from "next/link";
import { MotionCard } from "@/components/motion/motion-card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/lib/types";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <MotionCard>
      <Link
        href={`/articles/${article.slug}`}
        className="group block rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
      >
      <time className="text-xs text-muted">
        {formatDate(article.published_at)}
      </time>
      <h3 className="mt-2 text-lg font-semibold group-hover:text-accent">
        {article.title}
      </h3>
      {article.excerpt && (
        <p className="mt-2 line-clamp-2 text-sm text-muted">{article.excerpt}</p>
      )}
      {article.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      )}
      </Link>
    </MotionCard>
  );
}
