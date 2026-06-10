"use client";

import { useActionState, useState } from "react";
import { Eye, Pencil } from "lucide-react";
import {
  updateProfile,
  type ProfileFormState,
} from "@/lib/admin/actions";
import { availabilityOptions } from "@/lib/availability";
import { FormField } from "@/components/admin/form-field";
import { Button } from "@/components/ui/button";
import {
  ProfilePreview,
  type ProfilePreviewData,
} from "@/components/admin/profile-preview";
import { cn } from "@/lib/utils";
import type { AvailabilityStatus, Profile } from "@/lib/types";

type Mode = "edit" | "preview";

type ProfileFormValues = {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
  youtube_url: string;
  cv_pdf_url: string;
  availability_status: AvailabilityStatus;
};

function profileToFormValues(profile: Profile): ProfileFormValues {
  return {
    name: profile.name,
    title: profile.title,
    bio: profile.bio,
    email: profile.email ?? "",
    location: profile.location ?? "",
    github_url: profile.github_url ?? "",
    linkedin_url: profile.linkedin_url ?? "",
    twitter_url: profile.twitter_url ?? "",
    youtube_url: profile.youtube_url ?? "",
    cv_pdf_url: profile.cv_pdf_url ?? "",
    availability_status: profile.availability_status,
  };
}

function formToPreviewData(form: ProfileFormValues): ProfilePreviewData {
  return { ...form };
}

const initialActionState: ProfileFormState = {};

export function ProfileEditor({ profile }: { profile: Profile }) {
  const [mode, setMode] = useState<Mode>("edit");
  const [form, setForm] = useState<ProfileFormValues>(() =>
    profileToFormValues(profile),
  );

  const [state, formAction, pending] = useActionState(
    updateProfile,
    initialActionState,
  );

  function updateField<K extends keyof ProfileFormValues>(
    field: K,
    value: ProfileFormValues[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const previewData = formToPreviewData(form);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-lg border border-border bg-surface p-1">
          <button
            type="button"
            onClick={() => setMode("edit")}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
              mode === "edit"
                ? "bg-accent/10 text-accent"
                : "text-muted hover:text-foreground",
            )}
          >
            <Pencil size={14} />
            Edit
          </button>
          <button
            type="button"
            onClick={() => setMode("preview")}
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors",
              mode === "preview"
                ? "bg-accent/10 text-accent"
                : "text-muted hover:text-foreground",
            )}
          >
            <Eye size={14} />
            Preview
          </button>
        </div>
      </div>

      {state.success && state.message && (
        <div className="mt-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-400">
          {state.message}
        </div>
      )}

      {state.error && (
        <div className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {state.error}
        </div>
      )}

      {mode === "preview" ? (
        <div className="mt-8 max-w-3xl">
          <ProfilePreview data={previewData} />
          <Button
            type="button"
            variant="secondary"
            className="mt-8"
            onClick={() => setMode("edit")}
          >
            <Pencil size={14} />
            Back to edit
          </Button>
        </div>
      ) : (
        <form action={formAction} className="mt-8 max-w-xl space-y-4">
          <FormField
            label="Name"
            name="name"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />
          <FormField
            label="Title"
            name="title"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
          />
          <FormField
            label="Bio"
            name="bio"
            value={form.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            rows={4}
            required
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          <FormField
            label="Location"
            name="location"
            value={form.location}
            onChange={(e) => updateField("location", e.target.value)}
          />
          <FormField
            label="GitHub URL"
            name="github_url"
            value={form.github_url}
            onChange={(e) => updateField("github_url", e.target.value)}
          />
          <FormField
            label="LinkedIn URL"
            name="linkedin_url"
            value={form.linkedin_url}
            onChange={(e) => updateField("linkedin_url", e.target.value)}
          />
          <FormField
            label="Twitter URL"
            name="twitter_url"
            value={form.twitter_url}
            onChange={(e) => updateField("twitter_url", e.target.value)}
          />
          <FormField
            label="YouTube URL"
            name="youtube_url"
            value={form.youtube_url}
            onChange={(e) => updateField("youtube_url", e.target.value)}
          />
          <FormField
            label="CV PDF URL"
            name="cv_pdf_url"
            value={form.cv_pdf_url}
            onChange={(e) => updateField("cv_pdf_url", e.target.value)}
            hint="Link to uploaded PDF in Supabase Storage"
          />
          <div>
            <label
              htmlFor="availability_status"
              className="mb-1.5 block text-sm font-medium"
            >
              Availability status
            </label>
            <select
              id="availability_status"
              name="availability_status"
              className="flex h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm"
              value={form.availability_status}
              onChange={(e) =>
                updateField(
                  "availability_status",
                  e.target.value as AvailabilityStatus,
                )
              }
            >
              {availabilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-muted">
              Shown on homepage badge and contact page.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save profile"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setMode("preview")}
            >
              <Eye size={14} />
              Preview
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
