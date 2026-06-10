import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAvailabilityBadge,
  getAvailabilityMessage,
} from "@/lib/availability";
import type { AvailabilityStatus } from "@/lib/types";

export type ProfilePreviewData = {
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

export function ProfilePreview({ data }: { data: ProfilePreviewData }) {
  const badge = getAvailabilityBadge(data.availability_status);
  const availabilityMessage = getAvailabilityMessage(data.availability_status);

  const socials = [
    { label: "GitHub", href: data.github_url },
    { label: "LinkedIn", href: data.linkedin_url },
    { label: "Twitter", href: data.twitter_url },
    { label: "YouTube", href: data.youtube_url },
  ].filter((s) => s.href);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        <Button href="/" variant="secondary" size="sm">
          <ExternalLink size={14} />
          View homepage
        </Button>
        <Button href="/about" variant="secondary" size="sm">
          <ExternalLink size={14} />
          View about page
        </Button>
        <Button href="/contact" variant="secondary" size="sm">
          <ExternalLink size={14} />
          View contact page
        </Button>
      </div>

      <section className="rounded-xl border border-border bg-background p-8">
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted">
          Homepage preview
        </p>
        {badge && (
          <Badge className="mb-6 border-accent/30 bg-accent/10 text-accent">
            {badge}
          </Badge>
        )}
        <h2 className="text-3xl font-bold">{data.name || "Your name"}</h2>
        <p className="mt-2 font-mono text-accent">
          {data.title || "Your title"}
        </p>
        <p className="mt-6 max-w-2xl text-muted leading-relaxed">
          {data.bio || "Your bio will appear here."}
        </p>
      </section>

      <section className="rounded-xl border border-border bg-background p-8">
        <p className="mb-4 text-xs font-medium uppercase tracking-wide text-muted">
          About & contact preview
        </p>
        <h2 className="text-2xl font-bold">About</h2>
        <p className="mt-2 font-mono text-accent">{data.title}</p>
        <p className="mt-6 text-muted leading-relaxed">{data.bio}</p>
        {data.location && (
          <p className="mt-4 text-sm text-muted">
            <span className="text-foreground">Location:</span> {data.location}
          </p>
        )}
        {data.email && (
          <p className="mt-2 text-sm text-muted">
            <span className="text-foreground">Email:</span>{" "}
            <Link href={`mailto:${data.email}`} className="text-accent">
              {data.email}
            </Link>
          </p>
        )}
        {availabilityMessage && (
          <div className="mt-6 rounded-xl border border-accent/30 bg-accent/10 p-4">
            <p className="text-sm font-medium text-accent">{availabilityMessage}</p>
          </div>
        )}
        {socials.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:underline"
              >
                {social.label}
              </a>
            ))}
          </div>
        )}
        {data.cv_pdf_url && (
          <p className="mt-4 text-sm text-muted">
            <span className="text-foreground">CV:</span>{" "}
            <a href={data.cv_pdf_url} className="text-accent hover:underline">
              Download PDF
            </a>
          </p>
        )}
      </section>
    </div>
  );
}
