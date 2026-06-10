import { TagFilter } from "@/components/ui/tag-filter";
import { SortDropdown } from "@/components/ui/sort-dropdown";
import type { SortOrder } from "@/lib/sort";

export function ListFilters({
  tags,
  activeTag,
  sort,
  basePath,
}: {
  tags: string[];
  activeTag?: string;
  sort: SortOrder;
  basePath: string;
}) {
  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      {tags.length > 0 ? (
        <div className="flex-1">
          <TagFilter
            tags={tags}
            activeTag={activeTag}
            activeSort={sort}
            basePath={basePath}
          />
        </div>
      ) : (
        <div />
      )}
      <SortDropdown basePath={basePath} value={sort} tag={activeTag} />
    </div>
  );
}
