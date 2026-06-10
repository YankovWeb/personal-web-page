"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { normalizeTag, tagsToFormValue } from "@/lib/tags";
import { cn } from "@/lib/utils";

type TagPickerProps = {
  name: string;
  label: string;
  existingTags: string[];
  defaultTags?: string[];
  onTagsChange?: (tags: string[]) => void;
  hint?: string;
};

export function TagPicker({
  name,
  label,
  existingTags,
  defaultTags = [],
  onTagsChange,
  hint,
}: TagPickerProps) {
  const [selected, setSelected] = useState<string[]>(defaultTags);
  const [newTag, setNewTag] = useState("");

  function updateSelected(next: string[]) {
    setSelected(next);
    onTagsChange?.(next);
  }

  function toggleTag(tag: string) {
    const exists = selected.some(
      (item) => normalizeTag(item) === normalizeTag(tag),
    );
    const next = exists
      ? selected.filter((item) => normalizeTag(item) !== normalizeTag(tag))
      : [...selected, tag];
    updateSelected(next);
  }

  function addNewTag() {
    const trimmed = newTag.trim();
    if (!trimmed) return;
    if (selected.some((item) => normalizeTag(item) === normalizeTag(trimmed))) {
      return;
    }
    updateSelected([...selected, trimmed]);
    setNewTag("");
  }

  function removeTag(tag: string) {
    updateSelected(
      selected.filter((item) => normalizeTag(item) !== normalizeTag(tag)),
    );
  }

  const unselectedExisting = existingTags.filter(
    (tag) => !selected.some((item) => normalizeTag(item) === normalizeTag(tag)),
  );

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>

      {selected.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selected.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-xs text-accent"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="rounded-full hover:bg-accent/20"
                aria-label={`Remove ${tag}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      {unselectedExisting.length > 0 && (
        <div className="mb-3">
          <p className="mb-2 text-xs text-muted">Existing tags</p>
          <div className="flex flex-wrap gap-2">
            {unselectedExisting.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={cn(
                  "rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent/40 hover:text-foreground",
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addNewTag();
            }
          }}
          placeholder="Add new tag..."
        />
        <button
          type="button"
          onClick={addNewTag}
          className="inline-flex h-10 shrink-0 items-center gap-1 rounded-lg border border-border bg-surface px-3 text-sm text-muted transition-colors hover:text-foreground"
        >
          <Plus size={14} />
          Add
        </button>
      </div>

      <input type="hidden" name={name} value={tagsToFormValue(selected)} />

      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
