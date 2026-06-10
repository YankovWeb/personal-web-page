"use client";

import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { MotionCard } from "@/components/motion/motion-card";
import { PageHeader } from "@/components/motion/page-header";
import { Reveal } from "@/components/motion/reveal";
import type { Profile } from "@/lib/types";

export function ContactView({
  profile,
  availabilityMessage,
}: {
  profile: Profile | null;
  availabilityMessage: string | null;
}) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <PageHeader
        title="Get in touch"
        description="Have a project in mind or want to collaborate? I'd love to hear from you."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <Reveal delay={0.1} className="space-y-6">
          {profile?.email && (
            <div className="flex items-start gap-3">
              <Mail size={20} className="mt-0.5 text-accent" />
              <div>
                <p className="font-medium">Email</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {profile.email}
                </a>
              </div>
            </div>
          )}
          {profile?.location && (
            <div className="flex items-start gap-3">
              <MapPin size={20} className="mt-0.5 text-accent" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-muted">{profile.location}</p>
              </div>
            </div>
          )}
          {availabilityMessage && (
            <div className="rounded-xl border border-accent/30 bg-accent/10 p-4">
              <p className="text-sm font-medium text-accent">
                {availabilityMessage}
              </p>
            </div>
          )}
        </Reveal>

        <Reveal delay={0.18}>
          <MotionCard className="rounded-xl border border-border bg-surface p-6">
            <ContactForm />
          </MotionCard>
        </Reveal>
      </div>
    </div>
  );
}
