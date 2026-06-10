import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { FileText, FolderKanban, MessageSquare, StickyNote, Video } from "lucide-react";

export default async function AdminDashboard() {
  const user = await getUser();
  const supabase = await createClient();

  const [
    { count: articles },
    { count: notes },
    { count: videos },
    { count: projects },
    { count: messages },
  ] = await Promise.all([
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase.from("notes").select("*", { count: "exact", head: true }),
    supabase.from("videos").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("read", false),
  ]);

  const stats = [
    { label: "Articles", count: articles ?? 0, href: "/admin/articles", icon: FileText },
    { label: "Notes", count: notes ?? 0, href: "/admin/notes", icon: StickyNote },
    { label: "Videos", count: videos ?? 0, href: "/admin/videos", icon: Video },
    { label: "Projects", count: projects ?? 0, href: "/admin/projects", icon: FolderKanban },
    {
      label: "Unread messages",
      count: messages ?? 0,
      href: "/admin/messages",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Welcome back{user?.email ? `, ${user.email}` : ""}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(({ label, count, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/40"
          >
            <div className="flex items-center justify-between">
              <Icon size={20} className="text-muted" />
              <span className="text-2xl font-bold">{count}</span>
            </div>
            <p className="mt-2 text-sm text-muted">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-border bg-surface p-6">
        <h2 className="font-semibold">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/articles/new"
            className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-surface-hover"
          >
            + New article
          </Link>
          <Link
            href="/admin/notes/new"
            className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-surface-hover"
          >
            + New note
          </Link>
          <Link
            href="/admin/videos/new"
            className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-surface-hover"
          >
            + New video
          </Link>
          <Link
            href="/admin/projects/new"
            className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-surface-hover"
          >
            + New project
          </Link>
        </div>
      </div>
    </div>
  );
}
