"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  StickyNote,
  User,
  Video,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/admin/actions";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/notes", label: "Notes", icon: StickyNote },
  { href: "/admin/videos", label: "Videos", icon: Video },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface">
      <div className="border-b border-border p-4">
        <Link href="/" className="font-mono text-sm font-semibold">
          ← Site
        </Link>
        <p className="mt-1 text-xs text-muted">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              pathname === href || (href !== "/admin" && pathname.startsWith(href))
                ? "bg-accent/10 text-accent"
                : "text-muted hover:bg-surface-hover hover:text-foreground",
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-border p-3">
        <ThemeToggle className="mx-auto" />
      </div>

      <form action={signOut} className="border-t border-border p-3">
        <button
          type="submit"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </form>
    </aside>
  );
}
