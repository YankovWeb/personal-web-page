import type { Metadata } from "next";
import { ArticleCard } from "@/components/articles/article-card";
import { StaggerItem } from "@/components/motion/reveal";
import { ListPageShell } from "@/components/motion/list-page-shell";
import { ListFilters } from "@/components/ui/list-filters";
import {
  filterArticlesByTag,
  getPublishedArticles,
  getTagsFromArticles,
  parseSortOrder,
  sortArticles,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Articles",
};

type Props = {
  searchParams: Promise<{ tag?: string; sort?: string }>;
};

export default async function ArticlesPage({ searchParams }: Props) {
  const { tag, sort: sortParam } = await searchParams;
  const sort = parseSortOrder(sortParam);
  const articles = await getPublishedArticles();
  const tags = getTagsFromArticles(articles);
  const filtered = filterArticlesByTag(sortArticles(articles, sort), tag);

  return (
    <ListPageShell
      title="Articles"
      description="Deep dives, tutorials, and thoughts on React, React Native, and more."
      className="max-w-3xl"
      isEmpty={filtered.length === 0}
      emptyMessage={
        tag ? `No articles tagged "${tag}".` : "No articles yet."
      }
      staggerClassName="mt-12 grid gap-6"
      filters={
        <ListFilters
          tags={tags}
          activeTag={tag}
          sort={sort}
          basePath="/articles"
        />
      }
    >
      {filtered.map((article) => (
        <StaggerItem key={article.id}>
          <ArticleCard article={article} />
        </StaggerItem>
      ))}
    </ListPageShell>
  );
}
