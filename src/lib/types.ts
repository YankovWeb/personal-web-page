export type ArticleStatus = "draft" | "published";
export type NoteType = "tweet" | "link" | "snippet";
export type AvailabilityStatus =
  | "unavailable"
  | "freelance"
  | "full_time"
  | "both";

export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar_url: string | null;
  email: string | null;
  location: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  youtube_url: string | null;
  cv_pdf_url: string | null;
  availability_status: AvailabilityStatus;
  updated_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  tags: string[];
  status: ArticleStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  content: string;
  type: NoteType;
  external_url: string | null;
  embed_html: string | null;
  tags: string[];
  created_at: string;
}

export interface Video {
  id: string;
  youtube_id: string;
  title: string;
  description: string | null;
  tags: string[];
  published_at: string;
  created_at: string;
}

export type ProjectType = "personal" | "team";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  tech_stack: string[];
  image_url: string | null;
  github_url: string | null;
  live_url: string | null;
  featured: boolean;
  project_type: ProjectType;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  current: boolean;
  sort_order: number;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  sort_order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}
