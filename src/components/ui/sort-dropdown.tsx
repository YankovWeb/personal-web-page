"use client";

import { useRouter } from "next/navigation";
import { buildListUrl, type SortOrder } from "@/lib/sort";

export function SortDropdown({
  basePath,
  value,
  tag,
}: {
  basePath: string;
  value: SortOrder;
  tag?: string;
}) {
  const router = useRouter();

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const sort = event.target.value as SortOrder;
    router.push(buildListUrl(basePath, { tag, sort }));
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={`sort-${basePath}`} className="text-sm text-muted">
        Sort
      </label>
      <select
        id={`sort-${basePath}`}
        value={value}
        onChange={handleChange}
        className="h-9 rounded-lg border border-border bg-surface px-3 text-sm"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
}
