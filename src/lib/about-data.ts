import {
  aboutCertificationsFallback,
  aboutExperiencesFallback,
  aboutProfileFallback,
  aboutRecommendationsFallback,
  aboutSkillsFallback,
  aboutSummaryShort,
  type AboutHighlightExperience,
  type Certification,
  type Recommendation,
} from "@/lib/about-fallback";
import { getExperiences, getProfile, getSkills } from "@/lib/queries";
import type { Experience, Profile, Skill } from "@/lib/types";

function mergeProfile(db: Profile | null): Profile {
  if (!db) {
    return {
      id: "fallback",
      name: aboutProfileFallback.name!,
      title: aboutProfileFallback.title!,
      bio: aboutProfileFallback.bio!,
      avatar_url: null,
      email: aboutProfileFallback.email ?? null,
      location: aboutProfileFallback.location ?? null,
      github_url: aboutProfileFallback.github_url ?? null,
      linkedin_url: aboutProfileFallback.linkedin_url ?? null,
      twitter_url: aboutProfileFallback.twitter_url ?? null,
      youtube_url: aboutProfileFallback.youtube_url ?? null,
      cv_pdf_url: aboutProfileFallback.cv_pdf_url ?? null,
      availability_status: aboutProfileFallback.availability_status ?? "both",
      updated_at: "",
    };
  }

  return {
    ...db,
    bio: db.bio || aboutProfileFallback.bio!,
    title: db.title || aboutProfileFallback.title!,
  };
}

function parseHighlights(description: string | null): string[] {
  if (!description) return [];
  return description
    .split(/\n+/)
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

function mergeExperiences(db: Experience[]): AboutHighlightExperience[] {
  if (db.length === 0) return aboutExperiencesFallback;

  const fallbackByKey = new Map(
    aboutExperiencesFallback.map((exp) => [
      `${exp.company.toLowerCase()}|${exp.role.toLowerCase()}`,
      exp,
    ]),
  );

  return db
    .map((exp) => {
      const key = `${exp.company.toLowerCase()}|${exp.role.toLowerCase()}`;
      const fallback = fallbackByKey.get(key);
      const highlights = parseHighlights(exp.description);

      return {
        ...exp,
        location: fallback?.location,
        highlights:
          highlights.length > 0 ? highlights : (fallback?.highlights ?? []),
        storyBridge: fallback?.storyBridge,
        badge: fallback?.badge,
      };
    })
    .sort(
      (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
    );
}

function mergeSkills(db: Skill[]): Skill[] {
  if (db.length === 0) return aboutSkillsFallback;

  const hasNextJs = db.some((skill) =>
    skill.name.toLowerCase().includes("next.js"),
  );
  if (hasNextJs) return db;

  const nextJs = aboutSkillsFallback.find((skill) => skill.id === "s25");
  if (!nextJs) return db;

  return [...db, nextJs].sort((a, b) => a.sort_order - b.sort_order);
}

export interface AboutPageData {
  profile: Profile;
  experiences: AboutHighlightExperience[];
  skills: Skill[];
  certifications: Certification[];
  recommendations: Recommendation[];
  summary: string;
}

export async function getAboutPageData(): Promise<AboutPageData> {
  const [profile, experiences, skills] = await Promise.all([
    getProfile(),
    getExperiences(),
    getSkills(),
  ]);

  return {
    profile: mergeProfile(profile),
    experiences: mergeExperiences(experiences),
    skills: mergeSkills(skills),
    certifications: aboutCertificationsFallback,
    recommendations: aboutRecommendationsFallback,
    summary: aboutSummaryShort,
  };
}
