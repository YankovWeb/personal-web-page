"use client";

import { AboutBackground } from "@/components/about/about-background";
import { AboutCertifications } from "@/components/about/about-certifications";
import { AboutRecommendations } from "@/components/about/about-recommendations";
import { AboutHero } from "@/components/about/about-hero";
import { AboutSkills } from "@/components/about/about-skills";
import { AboutSummary } from "@/components/about/about-summary";
import { AboutTimeline } from "@/components/about/about-timeline";
import { AboutReveal } from "@/components/about/about-reveal";
import { Button } from "@/components/ui/button";
import type { AboutPageData } from "@/lib/about-data";
import { ArrowRight, Mail } from "lucide-react";

export function AboutView({ data }: { data: AboutPageData }) {
  return (
    <>
      <AboutBackground />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24">
        <AboutHero profile={data.profile} />

        <AboutSummary summary={data.summary} />

        <AboutTimeline experiences={data.experiences} />

        <AboutRecommendations
          recommendations={data.recommendations}
          linkedinUrl={data.profile.linkedin_url}
        />

        <AboutSkills skills={data.skills} />

        <AboutCertifications
          certifications={data.certifications}
          cvUrl={data.profile.cv_pdf_url}
        />

        <AboutReveal className="mt-24">
          <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/10 via-surface to-accent-secondary/10 p-8 text-center md:p-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,var(--glow-1),transparent_55%)]" />
            <h2 className="relative text-2xl font-bold sm:text-3xl">
              Let&apos;s build something ambitious
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-muted">
              Open to Senior and Lead roles where React, React Native, and
              thoughtful architecture meet real product impact.
            </p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact" size="lg">
                <Mail size={16} />
                Get in touch
              </Button>
              <Button href="/projects" variant="secondary" size="lg">
                View projects
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </AboutReveal>
      </div>
    </>
  );
}
