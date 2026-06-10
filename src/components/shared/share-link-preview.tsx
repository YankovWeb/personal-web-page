import { ExternalLink } from "lucide-react";
import { hostnameFromUrl } from "@/lib/og-preview";
import { cn } from "@/lib/utils";

export function ShareLinkPreview({
  url,
  title,
  description,
  imageUrl,
  siteName,
  className,
  compact = false,
}: {
  url: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  siteName?: string | null;
  className?: string;
  compact?: boolean;
}) {
  const domain = siteName ?? hostnameFromUrl(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group block overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300",
        "hover:border-accent/40 hover:shadow-[0_12px_40px_-20px_var(--toggle-glow)]",
        className,
      )}
    >
      {imageUrl && (
        <div
          className={cn(
            "relative w-full overflow-hidden bg-surface-hover",
            compact ? "aspect-[1.91/1]" : "aspect-video",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}

      <div className={cn("p-4", compact && "p-3")}>
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          {domain}
        </p>
        <p
          className={cn(
            "mt-1 font-semibold leading-snug text-foreground transition-colors group-hover:text-accent",
            compact ? "text-sm" : "text-base",
          )}
        >
          {title}
        </p>
        {description && (
          <p
            className={cn(
              "mt-1 line-clamp-2 text-muted leading-relaxed",
              compact ? "text-xs" : "text-sm",
            )}
          >
            {description}
          </p>
        )}
        <span className="mt-3 inline-flex items-center gap-1 text-xs text-accent opacity-0 transition-opacity group-hover:opacity-100">
          Open link
          <ExternalLink size={12} />
        </span>
      </div>
    </a>
  );
}
