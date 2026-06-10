import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) {
  const classes = cn(
    "group rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:bg-surface-hover hover:shadow-[0_12px_40px_-20px_var(--toggle-glow)]",
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return <div className={classes}>{children}</div>;
}
