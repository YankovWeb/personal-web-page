import type { Metadata } from "next";
import { VideoCard } from "@/components/videos/video-card";
import { StaggerItem } from "@/components/motion/reveal";
import { ListPageShell } from "@/components/motion/list-page-shell";
import { ListFilters } from "@/components/ui/list-filters";
import {
  filterVideosByTag,
  getTagsFromVideos,
  getVideos,
  parseSortOrder,
  sortVideos,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Videos",
};

type Props = {
  searchParams: Promise<{ tag?: string; sort?: string }>;
};

export default async function VideosPage({ searchParams }: Props) {
  const { tag, sort: sortParam } = await searchParams;
  const sort = parseSortOrder(sortParam);
  const videos = await getVideos();
  const tags = getTagsFromVideos(videos);
  const filtered = filterVideosByTag(sortVideos(videos, sort), tag);

  return (
    <ListPageShell
      title="Videos"
      description="Tutorials, talks, and demos on my YouTube channel."
      className="max-w-5xl"
      isEmpty={filtered.length === 0}
      emptyMessage={tag ? `No videos tagged "${tag}".` : "No videos yet."}
      staggerClassName="mt-12 grid gap-8 sm:grid-cols-2"
      filters={
        <ListFilters
          tags={tags}
          activeTag={tag}
          sort={sort}
          basePath="/videos"
        />
      }
    >
      {filtered.map((video) => (
        <StaggerItem key={video.id}>
          <VideoCard video={video} />
        </StaggerItem>
      ))}
    </ListPageShell>
  );
}
