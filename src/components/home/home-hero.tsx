"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Hand,
  Mail,
  MapPin,
} from "lucide-react";
import { motionEase } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAvailabilityBadge } from "@/lib/availability";
import type { Profile } from "@/lib/types";

const DEFAULT_AVATAR = "/images/grigor-yankov.png";

function resolveAvatarUrl(profile: Profile | null): string {
  const url = profile?.avatar_url?.trim();
  return url ? url : DEFAULT_AVATAR;
}

const WELCOME_LINE =
  "Glad you're here. I build mobile and web products with React & React Native — explore my work below, or read the full story on About.";

export function HomeHero({ profile }: { profile: Profile | null }) {
  const availability = getAvailabilityBadge(profile?.availability_status);
  const name = profile?.name ?? "Grigor Yankov";
  const firstName = name.split(" ")[0];
  const [avatarSrc, setAvatarSrc] = useState(() => resolveAvatarUrl(profile));

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-0 top-0 h-40 w-40 -translate-x-1/4 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-36 w-36 translate-x-1/4 rounded-full bg-accent-secondary/10 blur-3xl" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_280px] lg:gap-14 xl:grid-cols-[1fr_300px]">
        <div>
          {availability && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: motionEase }}
            >
              <Badge className="mb-5 border-accent/30 bg-accent/10 text-accent">
                {availability}
              </Badge>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: motionEase }}
            className="mb-3 flex items-center gap-2 font-mono text-sm text-accent"
          >
            <Hand size={15} className="animate-[wave_2s_ease-in-out_infinite]" />
            Welcome
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.06, ease: motionEase }}
            className="font-display text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            Hey, I&apos;m{" "}
            <span className="text-gradient">{firstName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: motionEase }}
            className="mt-3 font-mono text-base text-accent sm:text-lg"
          >
            {profile?.title ?? "React & React Native Developer"}
          </motion.p>

          {profile?.location && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-4 flex items-center gap-2 text-sm text-muted"
            >
              <MapPin size={15} className="shrink-0 text-accent" />
              {profile.location}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: motionEase }}
            className="mt-5 max-w-xl text-base text-muted leading-relaxed sm:text-lg"
          >
            {WELCOME_LINE}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: motionEase }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button href="/projects" size="lg">
              View Projects
              <ArrowRight size={16} />
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              <Mail size={16} />
              Get in touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36, ease: motionEase }}
            className="mt-8 inline-flex flex-col gap-3 rounded-xl border border-border bg-surface/60 px-5 py-4 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-6"
          >
            <p className="flex items-center gap-2 text-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <Briefcase size={15} className="shrink-0 text-accent" />
              <span>
                Senior React Native Developer{" "}
                <span className="text-muted">@ Phoenix</span>
              </span>
            </p>
            <p className="flex items-center gap-2 text-sm">
              <GraduationCap size={16} className="shrink-0 text-accent" />
              <span>
                Lecturer <span className="text-muted">@ STEP IT Academy</span>
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="mt-5"
          >
            <Link
              href="/about"
              className="text-sm text-muted transition-colors hover:text-accent"
            >
              More about me →
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: motionEase }}
          className="mx-auto w-full max-w-[280px] lg:mx-0 lg:max-w-none"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative overflow-hidden rounded-[1.35rem] p-[3px] shadow-[0_24px_60px_-20px_var(--toggle-glow)]"
          >
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-75%] bg-[conic-gradient(from_0deg,var(--accent),var(--accent-secondary),var(--accent))]"
            />
            <div className="relative z-10 overflow-hidden rounded-2xl bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarSrc}
                alt={name}
                width={300}
                height={300}
                className="aspect-square w-full object-cover"
                onError={() => {
                  if (avatarSrc !== DEFAULT_AVATAR) {
                    setAvatarSrc(DEFAULT_AVATAR);
                  }
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
