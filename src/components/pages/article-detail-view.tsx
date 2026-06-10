"use client";

import Image from "next/image";
import { Markdown } from "@/components/markdown";
import { DetailBlock, DetailShell } from "@/components/motion/detail-shell";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/lib/types";

export function ArticleDetailView({ article }: { article: Article }) {
  return (
    <DetailShell>
      <DetailBlock>
        <time className="text-sm text-muted">
          {formatDate(article.published_at)}
        </time>
        <h1 className="mt-2 text-3xl font-bold">{article.title}</h1>
      </DetailBlock>

      {article.tags.length > 0 && (
        <DetailBlock delay={0.06} className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </DetailBlock>
      )}

      {article.cover_image && (
        <DetailBlock delay={0.1} className="relative mt-8 aspect-video overflow-hidden rounded-xl border border-border">
          <Image
            src={article.cover_image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </DetailBlock>
      )}

      <DetailBlock delay={0.14} className="mt-12">
        <Markdown content={article.content} />
      </DetailBlock>
    </DetailShell>
  );
}
