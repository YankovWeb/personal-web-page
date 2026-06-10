"use client";

import { useState, useTransition } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { TagPicker } from "@/components/admin/tag-picker";
import { FormField } from "@/components/admin/form-field";
import { ShareLinkPreview } from "@/components/shared/share-link-preview";
import { Button } from "@/components/ui/button";
import type { OgPreviewData } from "@/lib/og-preview";
import type { Project, ProjectType } from "@/lib/types";

type ProjectFormProps = {
  existingTags: string[];
  project?: Project;
  action: (formData: FormData) => Promise<void>;
};

export function ProjectForm({ existingTags, project, action }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [content, setContent] = useState(project?.content ?? "");
  const [imageUrl, setImageUrl] = useState(project?.image_url ?? "");
  const [githubUrl, setGithubUrl] = useState(project?.github_url ?? "");
  const [liveUrl, setLiveUrl] = useState(project?.live_url ?? "");
  const [projectType, setProjectType] = useState<ProjectType>(
    project?.project_type ?? "personal",
  );
  const [sortOrder, setSortOrder] = useState(String(project?.sort_order ?? 0));
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [preview, setPreview] = useState<OgPreviewData | null>(
    project?.live_url
      ? {
          url: project.live_url,
          title: project.title,
          description: project.description,
          image: project.image_url,
          siteName: null,
        }
      : null,
  );
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [isFetching, startFetch] = useTransition();

  const loadSharePreview = () => {
    setPreviewError(null);

    startFetch(async () => {
      try {
        const response = await fetch(
          `/api/og-preview?url=${encodeURIComponent(liveUrl.trim())}`,
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Could not load share preview.");
        }

        setPreview(data);

        if (data.title && !title.trim()) setTitle(data.title);
        if (data.description && !description.trim()) {
          setDescription(data.description);
        }
        if (data.image && !imageUrl.trim()) setImageUrl(data.image);
      } catch (error) {
        setPreview(null);
        setPreviewError(
          error instanceof Error ? error.message : "Could not load share preview.",
        );
      }
    });
  };

  const applyPreviewToForm = () => {
    if (!preview) return;
    if (preview.title) setTitle(preview.title);
    if (preview.description) setDescription(preview.description);
    if (preview.image) setImageUrl(preview.image);
  };

  return (
    <form action={action} className="mt-8 max-w-2xl space-y-4">
      <FormField
        label="Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <FormField
        label="Slug"
        name="slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        hint="Leave empty to auto-generate on save"
      />

      <div>
        <label htmlFor="project_type" className="mb-1.5 block text-sm font-medium">
          Project type
        </label>
        <select
          id="project_type"
          name="project_type"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value as ProjectType)}
          className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
        >
          <option value="personal">Personal — built on my own</option>
          <option value="team">Team & professional — work I contributed to</option>
        </select>
      </div>

      <div className="rounded-xl border border-border bg-surface/60 p-4">
        <FormField
          label="Website / share URL"
          name="live_url"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          placeholder="https://example.com or App Store link"
          hint="Paste the public link and load how it looks when shared (Open Graph preview)."
        />

        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={!liveUrl.trim() || isFetching}
            onClick={loadSharePreview}
          >
            {isFetching ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Loading preview…
              </>
            ) : (
              <>
                <Sparkles size={14} />
                Load share preview
              </>
            )}
          </Button>

          {preview && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={applyPreviewToForm}
            >
              Apply preview to form
            </Button>
          )}
        </div>

        {previewError && (
          <p className="mt-3 text-sm text-red-400">{previewError}</p>
        )}

        {preview && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
              Share preview
            </p>
            <ShareLinkPreview
              url={preview.url}
              title={(preview.title ?? title) || "Untitled"}
              description={preview.description ?? description}
              imageUrl={(preview.image ?? imageUrl) || null}
              siteName={preview.siteName}
            />
          </div>
        )}
      </div>

      <FormField
        label="Short description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
        required
      />
      <FormField
        label="Full content (Markdown)"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={12}
        hint="Case study, details, etc."
      />

      <TagPicker
        name="tech_stack"
        label="Tech stack / tags"
        existingTags={existingTags}
        defaultTags={project?.tech_stack ?? []}
        hint="Pick existing tags or add new ones"
      />

      <FormField
        label="Preview image URL"
        name="image_url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        hint="Usually filled automatically from the share preview (og:image)."
      />

      <FormField
        label="GitHub URL"
        name="github_url"
        value={githubUrl}
        onChange={(e) => setGithubUrl(e.target.value)}
      />

      <FormField
        label="Sort order"
        name="sort_order"
        type="number"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="featured"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="rounded"
        />
        Featured on homepage
      </label>

      <Button type="submit">{project ? "Save changes" : "Create project"}</Button>
    </form>
  );
}
