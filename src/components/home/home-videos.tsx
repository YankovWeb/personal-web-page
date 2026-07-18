"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { formatDate } from "@/lib/utils";
import type { Video } from "@/lib/types";

export function HomeVideos({ videos }: { videos: Video[] }) {
  if (videos.length === 0) return null;

  return (
    <Reveal className="py-12" delay={0.05}>
      <SectionHeader
        index="03"
        eyebrow="Video"
        title="Latest videos"
        description="Talks and screencasts — watch them without leaving the couch."
        href="/videos"
        linkLabel="All videos"
      />

      <Stagger className="grid gap-6 sm:grid-cols-2">
        {videos.map((video) => (
          <StaggerItem key={video.id}>
            <Link
              href="/videos"
              className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-accent/40 hover:shadow-[0_16px_48px_-24px_var(--toggle-glow)]"
            >
              <div className="relative aspect-video overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${video.youtube_id}/hqdefault.jpg`}
                  alt={video.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface/90 text-accent shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play size={20} className="translate-x-0.5" />
                  </span>
                </span>
              </div>
              <div className="p-5">
                <time className="text-xs text-muted">
                  {formatDate(video.published_at)}
                </time>
                <h3 className="mt-1 font-semibold group-hover:text-accent">
                  {video.title}
                </h3>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </Reveal>
  );
}
