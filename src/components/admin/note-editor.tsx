"use client";

import { useActionState, useState } from "react";
import { Eye, Pencil } from "lucide-react";
import { saveNote, type NoteFormState } from "@/lib/admin/actions";
import { FormField } from "@/components/admin/form-field";
import { TagPicker } from "@/components/admin/tag-picker";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  NotePreview,
  type NotePreviewData,
} from "@/components/admin/note-preview";
import { cn } from "@/lib/utils";
import { extractTwitterBlockquote, parseTwitterPaste } from "@/lib/twitter";
import type { Note, NoteType } from "@/lib/types";

type Mode = "edit" | "preview";

type NoteFormValues = {
  type: NoteType;
  content: string;
  external_url: string;
  embed_html: string;
};

function noteToFormValues(note?: Note): NoteFormValues {
  const content =
    note?.content && /^Tweet by @\w+$/.test(note.content.trim())
      ? ""
      : (note?.content ?? "");

  return {
    type: note?.type ?? "snippet",
    content,
    external_url: note?.external_url ?? "",
    embed_html: note?.embed_html ?? "",
  };
}

function formToPreviewData(
  form: NoteFormValues,
  tags: string[],
): NotePreviewData {
  const embedHtml =
    form.type === "tweet"
      ? extractTwitterBlockquote(form.embed_html) ?? form.embed_html
      : "";

  return {
    type: form.type,
    content: form.content,
    external_url: form.external_url,
    embed_html: embedHtml,
    tags,
  };
}

const noteTypeOptions: { value: NoteType; label: string }[] = [
  { value: "tweet", label: "Tweet / X post" },
  { value: "snippet", label: "Snippet" },
  { value: "link", label: "Link" },
];

const initialActionState: NoteFormState = {};

type NoteEditorProps = {
  note?: Note;
  noteId?: string;
  existingTags: string[];
};

export function NoteEditor({ note, noteId, existingTags }: NoteEditorProps) {
  const [mode, setMode] = useState<Mode>("edit");
  const [form, setForm] = useState<NoteFormValues>(() =>
    noteToFormValues(note),
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(note?.tags ?? []);
  const [embedError, setEmbedError] = useState<string | null>(null);

  const boundSave = saveNote.bind(null, noteId);
  const [state, formAction, pending] = useActionState(
    boundSave,
    initialActionState,
  );

  function updateField<K extends keyof NoteFormValues>(
    field: K,
    value: NoteFormValues[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleEmbedPaste(value: string) {
    const parsed = parseTwitterPaste(value);
    const blockquote = parsed.embedHtml ?? extractTwitterBlockquote(value);

    if (!blockquote || !parsed.tweetId) {
      setEmbedError(
        "Could not find a valid Twitter embed. Copy embed code from X → Share → Embed post.",
      );
      updateField("embed_html", value);
      return;
    }

    setEmbedError(null);
    setForm((prev) => ({
      ...prev,
      type: "tweet",
      embed_html: blockquote,
      external_url: parsed.tweetUrl ?? prev.external_url,
    }));
  }

  const isNew = !noteId;
  const previewData = formToPreviewData(form, selectedTags);
  const isTweet = form.type === "tweet";

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

      {(state.error || embedError) && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {state.error ?? embedError}
        </div>
      )}

      {mode === "preview" ? (
        <div className="mt-8 max-w-xl">
          <NotePreview data={previewData} />
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
          <div>
            <label htmlFor="type" className="mb-1.5 block text-sm font-medium">
              Type
            </label>
            <select
              id="type"
              name="type"
              className="flex h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm"
              value={form.type}
              onChange={(e) =>
                updateField("type", e.target.value as NoteType)
              }
            >
              {noteTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {isTweet ? (
            <>
              <FormField
                label="Your thoughts (optional)"
                name="content"
                value={form.content}
                onChange={(e) => updateField("content", e.target.value)}
                rows={3}
                hint="Shown above the embedded tweet — e.g. why you saved it or what you learned"
              />
              <div>
                <label
                  htmlFor="embed_html"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Paste Twitter / X embed code
                </label>
                <Textarea
                  id="embed_html"
                  name="embed_html"
                  value={form.embed_html}
                  onChange={(e) => handleEmbedPaste(e.target.value)}
                  onPaste={(e) => {
                    const pasted = e.clipboardData.getData("text");
                    if (pasted.includes("twitter-tweet")) {
                      e.preventDefault();
                      handleEmbedPaste(pasted);
                    }
                  }}
                  rows={8}
                  placeholder={'Paste embed code from X → Share → Embed post\n\n<blockquote class="twitter-tweet">...</blockquote>'}
                  className="font-mono text-xs"
                />
                <p className="mt-1 text-xs text-muted">
                  Copy embed code from X and paste here — the tweet embeds
                  below your personal note.
                </p>
              </div>
              <input
                type="hidden"
                name="external_url"
                value={form.external_url}
              />
            </>
          ) : (
            <>
              <FormField
                label="Content"
                name="content"
                value={form.content}
                onChange={(e) => updateField("content", e.target.value)}
                rows={6}
                required
              />
              <FormField
                label="External URL"
                name="external_url"
                value={form.external_url}
                onChange={(e) => updateField("external_url", e.target.value)}
                hint="Article link, etc."
              />
              <input type="hidden" name="embed_html" value="" />
            </>
          )}

          <TagPicker
            name="tags"
            label="Tags"
            existingTags={existingTags}
            defaultTags={selectedTags}
            onTagsChange={setSelectedTags}
            hint="Pick existing tags or add new ones"
          />

          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : isNew ? "Create note" : "Save changes"}
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
