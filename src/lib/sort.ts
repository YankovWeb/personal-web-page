export type SortOrder = "newest" | "oldest";

export function parseSortOrder(value?: string): SortOrder {
  return value === "oldest" ? "oldest" : "newest";
}

export function sortByDate<T>(
  items: T[],
  getDate: (item: T) => string | null | undefined,
  order: SortOrder,
): T[] {
  return [...items].sort((a, b) => {
    const aTime = new Date(getDate(a) ?? 0).getTime();
    const bTime = new Date(getDate(b) ?? 0).getTime();
    return order === "oldest" ? aTime - bTime : bTime - aTime;
  });
}

export function buildListUrl(
  basePath: string,
  options: { tag?: string; sort?: SortOrder },
): string {
  const params = new URLSearchParams();
  if (options.tag) params.set("tag", options.tag);
  if (options.sort && options.sort !== "newest") {
    params.set("sort", options.sort);
  }
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}
