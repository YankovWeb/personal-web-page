"use client";

import Link from "next/link";
import { AtSign, Building2, Code2, Video } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { Profile } from "@/lib/types";

export function Footer({ profile }: { profile: Profile | null }) {
  const year = new Date().getFullYear();

  const socials = [
    { href: profile?.github_url, icon: Code2, label: "GitHub" },
    { href: profile?.linkedin_url, icon: Building2, label: "LinkedIn" },
    { href: profile?.twitter_url, icon: AtSign, label: "Twitter" },
    { href: profile?.youtube_url, icon: Video, label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <Reveal>
      <footer className="mt-auto border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <p className="text-sm text-muted">
            © {year} {profile?.name ?? "Portfolio"}. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted transition-colors hover:text-accent"
              >
                <Icon size={18} />
              </a>
            ))}
            <Link
              href="/admin"
              className="text-xs text-muted/50 transition-colors hover:text-muted"
            >
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </Reveal>
  );
}
