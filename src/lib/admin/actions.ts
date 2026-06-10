"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";
import { extractTwitterBlockquote, extractTweetUrl } from "@/lib/twitter";
import { extractYoutubeId, slugify } from "@/lib/utils";
import type { ArticleStatus, AvailabilityStatus, NoteType } from "@/lib/types";

async function getAuthedClient() {
  await requireAdmin();
  return createClient();
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export type ProfileFormState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function updateProfile(
  _prev: ProfileFormState,
  formData: FormData,
): Promise<ProfileFormState> {
  try {
    const supabase = await getAuthedClient();
    const { data: profile } = await supabase.from("profile").select("id").single();
    if (!profile) {
      return { success: false, error: "Profile not found." };
    }

    const { error } = await supabase
      .from("profile")
      .update({
        name: formData.get("name") as string,
        title: formData.get("title") as string,
        bio: formData.get("bio") as string,
        email: (formData.get("email") as string) || null,
        location: (formData.get("location") as string) || null,
        github_url: (formData.get("github_url") as string) || null,
        linkedin_url: (formData.get("linkedin_url") as string) || null,
        twitter_url: (formData.get("twitter_url") as string) || null,
        youtube_url: (formData.get("youtube_url") as string) || null,
        cv_pdf_url: (formData.get("cv_pdf_url") as string) || null,
        availability_status: formData.get(
          "availability_status",
        ) as AvailabilityStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/", "layout");
    return { success: true, message: "Profile saved successfully." };
  } catch {
    return { success: false, error: "Could not save profile. Please try again." };
  }
}

export async function saveArticle(formData: FormData, id?: string) {
  const supabase = await getAuthedClient();
  const title = formData.get("title") as string;
  const status = formData.get("status") as ArticleStatus;
  const slug = (formData.get("slug") as string) || slugify(title);
  const tagsRaw = formData.get("tags") as string;

  const payload = {
    title,
    slug,
    excerpt: (formData.get("excerpt") as string) || null,
    content: formData.get("content") as string,
    cover_image: (formData.get("cover_image") as string) || null,
    tags: tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [],
    status,
    published_at:
      status === "published"
        ? (formData.get("published_at") as string) || new Date().toISOString()
        : null,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from("articles").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("articles").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/articles");
  revalidatePath("/");
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  const supabase = await getAuthedClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/articles");
  revalidatePath("/");
}

export type NoteFormState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function saveNote(
  id: string | undefined,
  _prev: NoteFormState,
  formData: FormData,
): Promise<NoteFormState> {
  try {
    const supabase = await getAuthedClient();
    const tagsRaw = formData.get("tags") as string;
    const type = formData.get("type") as NoteType;
    const embedRaw = (formData.get("embed_html") as string) ?? "";
    const embedHtml =
      type === "tweet" ? extractTwitterBlockquote(embedRaw) : null;

    if (type === "tweet" && !embedHtml) {
      return {
        success: false,
        error:
          "Paste a valid Twitter embed code (blockquote with class twitter-tweet).",
      };
    }

    const payload = {
      content: (formData.get("content") as string) || "",
      type,
      external_url:
        (formData.get("external_url") as string) ||
        (embedHtml ? extractTweetUrl(embedHtml) : null) ||
        null,
      embed_html: embedHtml,
      tags: tagsRaw
        ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    };

    if (id) {
      const { error } = await supabase
        .from("notes")
        .update(payload)
        .eq("id", id);

      if (error) {
        return { success: false, error: error.message };
      }

      revalidatePath("/notes");
      return { success: true, message: "Note saved successfully." };
    }

    const { data, error } = await supabase
      .from("notes")
      .insert(payload)
      .select("id")
      .single();

    if (error || !data) {
      return { success: false, error: error?.message ?? "Could not create note." };
    }

    revalidatePath("/notes");
    redirect(`/admin/notes/${data.id}/edit`);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, error: "Could not save note. Please try again." };
  }
}

export async function deleteNote(id: string) {
  const supabase = await getAuthedClient();
  const { error } = await supabase.from("notes").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/notes");
}

export type VideoFormState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export async function saveVideo(
  id: string | undefined,
  _prev: VideoFormState,
  formData: FormData,
): Promise<VideoFormState> {
  try {
    const supabase = await getAuthedClient();
    const urlOrId = formData.get("youtube_id") as string;
    const youtubeId = extractYoutubeId(urlOrId);

    if (!youtubeId) {
      return { success: false, error: "Invalid YouTube URL or ID." };
    }

    const tagsRaw = formData.get("tags") as string;
    const publishedAt = formData.get("published_at") as string;
    const payload = {
      youtube_id: youtubeId,
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      tags: tagsRaw
        ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
      published_at: publishedAt
        ? new Date(publishedAt).toISOString()
        : new Date().toISOString(),
    };

    if (id) {
      const { error } = await supabase
        .from("videos")
        .update(payload)
        .eq("id", id);

      if (error) {
        return { success: false, error: error.message };
      }

      revalidatePath("/videos");
      return { success: true, message: "Video saved successfully." };
    }

    const { data, error } = await supabase
      .from("videos")
      .insert(payload)
      .select("id")
      .single();

    if (error || !data) {
      return { success: false, error: error?.message ?? "Could not create video." };
    }

    revalidatePath("/videos");
    redirect(`/admin/videos/${data.id}/edit`);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return { success: false, error: "Could not save video. Please try again." };
  }
}

export async function deleteVideo(id: string) {
  const supabase = await getAuthedClient();
  const { error } = await supabase.from("videos").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/videos");
}

export async function saveProject(formData: FormData, id?: string) {
  const supabase = await getAuthedClient();
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const techRaw = formData.get("tech_stack") as string;

  const payload = {
    title,
    slug,
    description: formData.get("description") as string,
    content: (formData.get("content") as string) || "",
    tech_stack: techRaw ? techRaw.split(",").map((t) => t.trim()).filter(Boolean) : [],
    image_url: (formData.get("image_url") as string) || null,
    github_url: (formData.get("github_url") as string) || null,
    live_url: (formData.get("live_url") as string) || null,
    featured: formData.get("featured") === "on",
    project_type: (formData.get("project_type") as string) === "team" ? "team" : "personal",
    sort_order: parseInt(formData.get("sort_order") as string) || 0,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from("projects").update(payload).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("projects").insert(payload);
    if (error) throw new Error(error.message);
  }

  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  const supabase = await getAuthedClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function markMessageRead(id: string) {
  const supabase = await getAuthedClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ read: true })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  const supabase = await getAuthedClient();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
}
