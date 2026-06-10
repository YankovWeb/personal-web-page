export function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}

export function collectUniqueTags(
  ...groups: (string[] | null | undefined)[]
): string[] {
  const seen = new Map<string, string>();

  for (const group of groups) {
    if (!group) continue;
    for (const tag of group) {
      const trimmed = tag.trim();
      if (!trimmed) continue;
      const key = normalizeTag(trimmed);
      if (!seen.has(key)) {
        seen.set(key, trimmed);
      }
    }
  }

  return Array.from(seen.values()).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
  );
}

export function itemHasTag(tags: string[], filterTag: string): boolean {
  const normalized = normalizeTag(filterTag);
  return tags.some((tag) => normalizeTag(tag) === normalized);
}

export function parseTagsInput(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function tagsToFormValue(tags: string[]): string {
  return tags.join(", ");
}
