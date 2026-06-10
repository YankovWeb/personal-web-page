"use client";

import { motion } from "framer-motion";
import { Link, Mail, MapPin, Sparkles } from "lucide-react";
import { getAvailabilityBadge } from "@/lib/availability";
import type { Profile } from "@/lib/types";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/80 text-muted transition-all duration-300 hover:border-accent/50 hover:text-accent hover:shadow-[0_8px_24px_-12px_var(--toggle-glow)]"
    >
      {children}
    </a>
  );
}

export function AboutHero({ profile }: { profile: Profile }) {
  const availability = getAvailabilityBadge(profile.availability_status);

  const links = [
    profile.email && {
      href: `mailto:${profile.email}`,
      label: "Email",
      icon: <Mail size={18} />,
      external: false,
    },
    profile.linkedin_url && {
      href: profile.linkedin_url,
      label: "LinkedIn",
      icon: <Link size={18} />,
      external: true,
    },
    profile.github_url && {
      href: profile.github_url,
      label: "GitHub",
      icon: <Link size={18} />,
      external: true,
    },
    profile.twitter_url && {
      href: profile.twitter_url,
      label: "Twitter",
      icon: <Link size={18} />,
      external: true,
    },
    profile.youtube_url && {
      href: profile.youtube_url,
      label: "YouTube",
      icon: <Link size={18} />,
      external: true,
    },
  ].filter(Boolean) as {
    href: string;
    label: string;
    icon: React.ReactNode;
    external: boolean;
  }[];

  return (
    <section className="relative pt-8 pb-16 md:pt-12 md:pb-24">
      {availability && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {availability}
        </motion.div>
      )}

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05, ease }}
        className="mb-3 flex items-center gap-2 font-mono text-sm text-accent"
      >
        <Sparkles size={14} />
        About me
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
      >
        <span className="text-gradient">{profile.name}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18, ease }}
        className="mt-4 max-w-3xl text-lg font-medium text-foreground/90 sm:text-xl"
      >
        {profile.title}
      </motion.p>

      {profile.location && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-4 flex items-center gap-2 text-muted"
        >
          <MapPin size={16} className="text-accent" />
          {profile.location}
        </motion.p>
      )}

      {links.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          className="mt-8 flex flex-wrap gap-3"
        >
          {links.map((link) =>
            link.external ? (
              <SocialLink key={link.label} href={link.href} label={link.label}>
                {link.icon}
              </SocialLink>
            ) : (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface/80 text-muted transition-all duration-300",
                  "hover:border-accent/50 hover:text-accent hover:shadow-[0_8px_24px_-12px_var(--toggle-glow)]",
                )}
              >
                {link.icon}
              </a>
            ),
          )}
        </motion.div>
      )}
    </section>
  );
}
