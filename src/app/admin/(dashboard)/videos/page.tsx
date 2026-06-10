import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteVideo } from "@/lib/admin/actions";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatDate } from "@/lib/utils";

export default async function AdminVideosPage() {
  const supabase = await createClient();
  const { data: videos } = await supabase
    .from("videos")
    .select("*")
    .order("published_at", { ascending: false });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Videos</h1>
          <p className="mt-1 text-sm text-muted">{videos?.length ?? 0} total</p>
        </div>
        <Button href="/admin/videos/new">+ New video</Button>
      </div>

      <div className="mt-8 space-y-3">
        {videos?.map((video) => (
          <div
            key={video.id}
            className="flex items-center justify-between rounded-xl border border-border bg-surface p-4"
          >
            <div>
              <Link
                href={`/admin/videos/${video.id}/edit`}
                className="font-medium hover:text-accent"
              >
                {video.title}
              </Link>
              <p className="mt-1 text-xs text-muted">
                {formatDate(video.published_at)} · {video.youtube_id}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button href={`/admin/videos/${video.id}/edit`} variant="secondary" size="sm">
                Edit
              </Button>
              <DeleteButton onDelete={deleteVideo.bind(null, video.id)} />
            </div>
          </div>
        ))}
        {(!videos || videos.length === 0) && (
          <p className="py-8 text-center text-muted">No videos yet.</p>
        )}
      </div>
    </div>
  );
}
