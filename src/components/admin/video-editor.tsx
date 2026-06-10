"use client";

import { useActionState, useState } from "react";
import { Eye, Pencil } from "lucide-react";
import { saveVideo, type VideoFormState } from "@/lib/admin/actions";
import { FormField } from "@/components/admin/form-field";
import { TagPicker } from "@/components/admin/tag-picker";
import { Button } from "@/components/ui/button";
import {
  VideoPreview,
  type VideoPreviewData,
} from "@/components/admin/video-preview";
import { cn, extractYoutubeId } from "@/lib/utils";
import type { Video } from "@/lib/types";

type Mode = "edit" | "preview";

type VideoFormValues = {
  youtube_id: string;
  title: string;
  description: string;
  tags: string;
  published_at: string;
};

function toDateInputValue(iso: string | null | undefined): string {
  if (!iso) return new Date().toISOString().slice(0, 10);
  return iso.slice(0, 10);
}

function videoToFormValues(video?: Video): VideoFormValues {
  return {
    youtube_id: video?.youtube_id ?? "",
    title: video?.title ?? "",
    description: video?.description ?? "",
    tags: video?.tags?.join(", ") ?? "",
    published_at: toDateInputValue(video?.published_at),
  };
}

function formToPreviewData(form: VideoFormValues): VideoPreviewData {
  return {
    youtube_id: extractYoutubeId(form.youtube_id) ?? "",
    title: form.title,
    description: form.description,
    tags: form.tags
      ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    published_at: form.published_at,
  };
}

const initialActionState: VideoFormState = {};

type VideoEditorProps = {
  video?: Video;
  videoId?: string;
  existingTags: string[];
};

export function VideoEditor({ video, videoId, existingTags }: VideoEditorProps) {
  const [mode, setMode] = useState<Mode>("edit");
  const [form, setForm] = useState<VideoFormValues>(() =>
    videoToFormValues(video),
  );

  const boundSave = saveVideo.bind(null, videoId);
  const [state, formAction, pending] = useActionState(
    boundSave,
    initialActionState,
  );

  function updateField(field: keyof VideoFormValues, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const isNew = !videoId;
  const previewData = formToPreviewData(form);

  return (
    <div>
      <div className="inline-flex rounded-lg border border-border bg-surface p-1">
        <button
          type="button"
          onClick={() => setMode("edit")}
          className={cn(
            "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
            mode === "edit"
              ? "bg-accent/10 text-accent"
              : "text-muted hover:text-foreground",
          )}
        >
          <Pencil size={14} />
          Edit
        </button>
        <button
          type="button"
          onClick={() => setMode("preview")}
          className={cn(
            "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
            mode === "preview"
              ? "bg-accent/10 text-accent"
              : "text-muted hover:text-foreground",
          )}
        >
          <Eye size={14} />
          Preview
        </button>
      </div>

      {state.success && state.message && (
        <div className="mt-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
          {state.message}
        </div>
      )}

      {state.error && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {state.error}
        </div>
      )}

      {mode === "preview" ? (
        <div className="mt-8 max-w-2xl">
          <VideoPreview data={previewData} />
          <Button
            type="button"
            variant="secondary"
            className="mt-8"
            onClick={() => setMode("edit")}
          >
            <Pencil size={14} />
            Back to edit
          </Button>
        </div>
      ) : (
        <form action={formAction} className="mt-8 max-w-xl space-y-4">
          <FormField
            label="YouTube URL or ID"
            name="youtube_id"
            value={form.youtube_id}
            onChange={(e) => updateField("youtube_id", e.target.value)}
            required
            placeholder="https://youtube.com/watch?v=..."
          />
          <FormField
            label="Title"
            name="title"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
          />
          <FormField
            label="Description"
            name="description"
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            rows={4}
          />
          <TagPicker
            name="tags"
            label="Tags"
            existingTags={existingTags}
            defaultTags={
              form.tags
                ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
                : []
            }
            hint="Pick existing tags or add new ones"
          />
          <FormField
            label="Published date"
            name="published_at"
            type="date"
            value={form.published_at}
            onChange={(e) => updateField("published_at", e.target.value)}
          />
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={pending}>
              {pending
                ? "Saving..."
                : isNew
                  ? "Create video"
                  : "Save changes"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setMode("preview")}
            >
              <Eye size={14} />
              Preview
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
