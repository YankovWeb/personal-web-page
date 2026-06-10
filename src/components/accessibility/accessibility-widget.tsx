"use client";

import { useEffect, useRef, useState } from "react";
import {
  Accessibility,
  Minus,
  Plus,
  RotateCcw,
  Type,
  X,
} from "lucide-react";
import { useAccessibility } from "@/components/accessibility/accessibility-provider";
import { cn } from "@/lib/utils";

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start justify-between gap-3 rounded-lg border px-3 py-2.5 transition-colors",
        checked
          ? "border-accent bg-accent/15 shadow-[inset_0_0_0_1px_var(--accent)]"
          : "border-border bg-surface hover:bg-surface-hover",
      )}
    >
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-0.5 block text-xs text-muted">{description}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 rounded border-border accent-accent"
      />
    </label>
  );
}

export function AccessibilityWidget({
  className,
  position = "bottom-right",
}: {
  className?: string;
  position?: "bottom-right" | "bottom-left";
}) {
  const {
    settings,
    setSetting,
    increaseFontScale,
    decreaseFontScale,
    resetSettings,
    isActive,
  } = useAccessibility();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const positionClass =
    position === "bottom-left" ? "left-4 sm:left-6" : "right-4 sm:right-6";

  return (
    <div
      className={cn(
        "fixed bottom-4 z-[60] sm:bottom-6",
        positionClass,
        className,
      )}
    >
      {open && (
        <div
          id="a11y-panel"
          ref={panelRef}
          role="dialog"
          aria-labelledby="a11y-panel-title"
          aria-modal="true"
          className="mb-3 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_60px_-20px_var(--toggle-glow)]"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Accessibility size={18} className="text-accent" aria-hidden />
              <h2 id="a11y-panel-title" className="text-sm font-semibold">
                Accessibility
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
              aria-label="Close accessibility options"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-4 p-4">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted">
                <Type size={14} aria-hidden />
                Text size
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={decreaseFontScale}
                  disabled={settings.fontScale === 85}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface transition-colors hover:bg-surface-hover disabled:opacity-40"
                  aria-label="Decrease text size"
                >
                  <Minus size={16} />
                </button>
                <span className="flex-1 text-center font-mono text-sm">
                  {settings.fontScale}%
                </span>
                <button
                  type="button"
                  onClick={increaseFontScale}
                  disabled={settings.fontScale === 150}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface transition-colors hover:bg-surface-hover disabled:opacity-40"
                  aria-label="Increase text size"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <ToggleRow
                label="High contrast"
                description="Stronger text and border contrast."
                checked={settings.highContrast}
                onChange={(checked) => setSetting("highContrast", checked)}
              />
              <ToggleRow
                label="Grayscale"
                description="Remove color for easier focus."
                checked={settings.grayscale}
                onChange={(checked) => setSetting("grayscale", checked)}
              />
              <ToggleRow
                label="Highlight links"
                description="Underline and outline all links."
                checked={settings.highlightLinks}
                onChange={(checked) => setSetting("highlightLinks", checked)}
              />
              <ToggleRow
                label="Readable font"
                description="Clearer spacing and sans-serif type."
                checked={settings.readableFont}
                onChange={(checked) => setSetting("readableFont", checked)}
              />
              <ToggleRow
                label="Reduce motion"
                description="Minimize animations and transitions."
                checked={settings.reduceMotion}
                onChange={(checked) => setSetting("reduceMotion", checked)}
              />
            </div>

            <button
              type="button"
              onClick={resetSettings}
              disabled={!isActive}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-hover disabled:opacity-40"
            >
              <RotateCcw size={14} aria-hidden />
              Reset all
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label={open ? "Close accessibility options" : "Open accessibility options"}
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
          isActive
            ? "border-accent bg-accent text-white shadow-[0_8px_24px_var(--toggle-glow)]"
            : "border-border bg-surface text-foreground hover:border-accent/40",
        )}
      >
        <Accessibility size={22} aria-hidden />
      </button>
    </div>
  );
}
