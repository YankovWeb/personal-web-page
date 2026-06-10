"use client";

import { MotionCard } from "@/components/motion/motion-card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { Video } from "@/lib/types";

export function VideoCard({ video }: { video: Video }) {
  return (
    <MotionCard className="overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/40">
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtube_id}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
      <div className="p-5">
        <time className="text-xs text-muted">
          {formatDate(video.published_at)}
        </time>
        <h3 className="mt-1 font-semibold">{video.title}</h3>
        {video.description && (
          <p className="mt-2 text-sm text-muted line-clamp-2">
            {video.description}
          </p>
        )}
        {video.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {video.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </div>
    </MotionCard>
  );
}
