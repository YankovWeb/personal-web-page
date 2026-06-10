import type { Metadata } from "next";
import { ProjectsPageView } from "@/components/projects/projects-page-view";
import {
  filterProjectsByTag,
  getProjects,
  getTagsFromProjects,
  parseSortOrder,
  sortProjects,
} from "@/lib/queries";

export const metadata: Metadata = {
  title: "Projects",
};

type Props = {
  searchParams: Promise<{ tag?: string; sort?: string }>;
};

export default async function ProjectsPage({ searchParams }: Props) {
  const { tag, sort: sortParam } = await searchParams;
  const sort = parseSortOrder(sortParam);
  const projects = await getProjects();
  const tags = getTagsFromProjects(projects);
  const filtered = filterProjectsByTag(sortProjects(projects, sort), tag);

  return (
    <ProjectsPageView
      projects={filtered}
      tags={tags}
      activeTag={tag}
      sort={sort}
    />
  );
}
