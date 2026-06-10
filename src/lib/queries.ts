import { createClient } from "@/lib/supabase/server";
import { collectUniqueTags, itemHasTag } from "@/lib/tags";
import { parseSortOrder, sortByDate, type SortOrder } from "@/lib/sort";
import type {
  Article,
  Experience,
  Note,
  Profile,
  Project,
  Skill,
  Video,
} from "@/lib/types";

const PROFILE_NAME = "Grigor Yankov";

function normalizeProfile(profile: Profile): Profile {
  if (profile.name === "Grigory Ankov") {
    return { ...profile, name: PROFILE_NAME };
  }
  return profile;
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("profile").select("*").single();
  return data ? normalizeProfile(data) : data;
}

export async function getPublishedArticles(limit?: number): Promise<Article[]> {
  const supabase = await createClient();
  let query = supabase
    .from("articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data } = await query;
  return data ?? [];
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data;
}

export async function getNotes(limit?: number): Promise<Note[]> {
  const supabase = await createClient();
  let query = supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);

  const { data } = await query;
  return data ?? [];
}

export async function getVideos(): Promise<Video[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("videos")
    .select("*")
    .order("published_at", { ascending: false });
  return data ?? [];
}

export async function getProjects(featuredOnly = false): Promise<Project[]> {
  const supabase = await createClient();
  let query = supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  if (featuredOnly) query = query.eq("featured", true);

  const { data } = await query;
  return data ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getExperiences(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getAllTags(): Promise<string[]> {
  const supabase = await createClient();
  const [articles, videos, projects, notes] = await Promise.all([
    supabase.from("articles").select("tags"),
    supabase.from("videos").select("tags"),
    supabase.from("projects").select("tech_stack"),
    supabase.from("notes").select("tags"),
  ]);

  return collectUniqueTags(
    ...(articles.data?.map((row) => row.tags) ?? []),
    ...(videos.data?.map((row) => row.tags) ?? []),
    ...(projects.data?.map((row) => row.tech_stack) ?? []),
    ...(notes.data?.map((row) => row.tags) ?? []),
  );
}

export function filterArticlesByTag(
  articles: Article[],
  tag?: string,
): Article[] {
  if (!tag) return articles;
  return articles.filter((article) => itemHasTag(article.tags, tag));
}

export function filterVideosByTag(videos: Video[], tag?: string): Video[] {
  if (!tag) return videos;
  return videos.filter((video) => itemHasTag(video.tags, tag));
}

export function filterProjectsByTag(
  projects: Project[],
  tag?: string,
): Project[] {
  if (!tag) return projects;
  return projects.filter((project) => itemHasTag(project.tech_stack, tag));
}

export function getTagsFromArticles(articles: Article[]): string[] {
  return collectUniqueTags(...articles.map((article) => article.tags));
}

export function getTagsFromVideos(videos: Video[]): string[] {
  return collectUniqueTags(...videos.map((video) => video.tags));
}

export function getTagsFromProjects(projects: Project[]): string[] {
  return collectUniqueTags(...projects.map((project) => project.tech_stack));
}

export function getTagsFromNotes(notes: Note[]): string[] {
  return collectUniqueTags(...notes.map((note) => note.tags));
}

export function filterNotesByTag(notes: Note[], tag?: string): Note[] {
  if (!tag) return notes;
  return notes.filter((note) => itemHasTag(note.tags, tag));
}

export { parseSortOrder };

export function sortArticles(items: Article[], order: SortOrder): Article[] {
  return sortByDate(
    items,
    (item) => item.published_at ?? item.created_at,
    order,
  );
}

export function sortVideos(items: Video[], order: SortOrder): Video[] {
  return sortByDate(
    items,
    (item) => item.published_at ?? item.created_at,
    order,
  );
}

export function sortProjects(items: Project[], order: SortOrder): Project[] {
  return sortByDate(items, (item) => item.created_at, order);
}

export function sortNotes(items: Note[], order: SortOrder): Note[] {
  return sortByDate(items, (item) => item.created_at, order);
}
