"use client";

import Link from "next/link";
import { AtSign, Building2, Code2, Mail, Video } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import type { Profile } from "@/lib/types";

const exploreLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/articles", label: "Articles" },
  { href: "/notes", label: "Notes" },
  { href: "/videos", label: "Videos" },
  { href: "/contact", label: "Contact" },
];

export function Footer({ profile }: { profile: Profile | null }) {
  const year = new Date().getFullYear();
  const name = profile?.name ?? "Grigor Yankov";

  const socials = [
    { href: profile?.github_url, icon: Code2, label: "GitHub" },
    { href: profile?.linkedin_url, icon: Building2, label: "LinkedIn" },
    { href: profile?.twitter_url, icon: AtSign, label: "Twitter" },
    { href: profile?.youtube_url, icon: Video, label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <Reveal>
      <footer className="mt-auto border-t border-border">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-display text-sm font-medium tracking-tight">
              {name}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
              React & React Native engineer in Sofia. Currently building mobile
              products at Phoenix and teaching at STEP IT Academy.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Explore
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Connect
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <Mail size={15} />
                  {profile.email}
                </a>
              )}
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
                >
                  <Icon size={15} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border/60">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted sm:flex-row">
            <p>
              © {year} {name}. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <p>Built with Next.js, Supabase & Tailwind.</p>
              <Link
                href="/admin"
                className="text-muted/50 transition-colors hover:text-muted"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </Reveal>
  );
}
