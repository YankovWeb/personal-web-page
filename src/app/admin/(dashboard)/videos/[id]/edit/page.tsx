import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { VideoEditor } from "@/components/admin/video-editor";
import { getAllTags } from "@/lib/queries";
import type { Video } from "@/lib/types";

type Props = { params: Promise<{ id: string }> };

export default async function EditVideoPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const [existingTags, { data }] = await Promise.all([
    getAllTags(),
    supabase.from("videos").select("*").eq("id", id).single(),
  ]);

  if (!data) notFound();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Edit Video</h1>
      <p className="mt-1 text-sm text-muted">
        Update video details and preview the public embed.
      </p>
      <VideoEditor
        video={data as Video}
        videoId={id}
        existingTags={existingTags}
      />
    </div>
  );
}
