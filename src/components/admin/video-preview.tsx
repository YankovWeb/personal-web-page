import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

export type VideoPreviewData = {
  youtube_id: string;
  title: string;
  description: string;
  tags: string[];
  published_at: string;
};

export function VideoPreview({ data }: { data: VideoPreviewData }) {
  const hasValidId = data.youtube_id.length > 0;

  return (
    <div className="space-y-6">
      <Button href="/videos" variant="secondary" size="sm">
        <ExternalLink size={14} />
        View videos page
      </Button>

      <section className="overflow-hidden rounded-xl border border-border bg-background">
        <p className="border-b border-border px-6 py-3 text-xs font-medium uppercase tracking-wide text-muted">
          Public preview
        </p>

        {hasValidId ? (
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${data.youtube_id}`}
              title={data.title || "Video preview"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center bg-surface text-sm text-muted">
            Enter a valid YouTube URL or ID to preview the embed.
          </div>
        )}

        <div className="p-6">
          {data.published_at && (
            <time className="text-xs text-muted">
              {formatDate(
                new Date(data.published_at).toISOString(),
              )}
            </time>
          )}
          <h2 className="mt-1 text-xl font-semibold">
            {data.title || "Video title"}
          </h2>
          {data.description && (
            <p className="mt-3 text-sm text-muted leading-relaxed">
              {data.description}
            </p>
          )}
          {data.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          )}
          {hasValidId && (
            <Link
              href={`https://youtube.com/watch?v=${data.youtube_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-accent hover:underline"
            >
              Open on YouTube →
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
