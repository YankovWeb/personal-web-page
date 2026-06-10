import Link from "next/link";
import { buildListUrl, type SortOrder } from "@/lib/sort";
import { cn } from "@/lib/utils";

export function TagFilter({
  tags,
  activeTag,
  activeSort,
  basePath,
}: {
  tags: string[];
  activeTag?: string;
  activeSort?: SortOrder;
  basePath: string;
}) {
  if (tags.length === 0) return null;

  const sort = activeSort ?? "newest";

  return (
    <div>
      <p className="mb-3 text-sm font-medium text-muted">Filter by tag</p>
      <div className="flex flex-wrap gap-2">
        <Link
          href={buildListUrl(basePath, { sort })}
          className={cn(
            "rounded-full border px-3 py-1 text-sm transition-colors",
            !activeTag
              ? "border-accent bg-accent/10 text-accent"
              : "border-border bg-surface text-muted hover:text-foreground",
          )}
        >
          All
        </Link>
        {tags.map((tag) => {
          const isActive =
            activeTag?.toLowerCase() === tag.toLowerCase();
          return (
            <Link
              key={tag}
              href={buildListUrl(basePath, { tag, sort })}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                isActive
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-border bg-surface text-muted hover:text-foreground",
              )}
            >
              {tag}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
