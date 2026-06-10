import { VideoEditor } from "@/components/admin/video-editor";
import { getAllTags } from "@/lib/queries";

export default async function NewVideoPage() {
  const existingTags = await getAllTags();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">New Video</h1>
      <p className="mt-1 text-sm text-muted">
        Add a YouTube video and preview how it will look on your site.
      </p>
      <VideoEditor existingTags={existingTags} />
    </div>
  );
}
