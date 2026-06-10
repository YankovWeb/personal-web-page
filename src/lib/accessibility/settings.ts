import {
  ACCESSIBILITY_STORAGE_KEY,
  DEFAULT_ACCESSIBILITY_SETTINGS,
  FONT_SCALE_STEPS,
} from "@/lib/accessibility/constants";
import type { AccessibilitySettings, FontScaleStep } from "@/lib/accessibility/types";

function isFontScaleStep(value: number): value is FontScaleStep {
  return FONT_SCALE_STEPS.includes(value as FontScaleStep);
}

export function parseAccessibilitySettings(
  raw: string | null,
): AccessibilitySettings {
  if (!raw) return DEFAULT_ACCESSIBILITY_SETTINGS;

  try {
    const parsed = JSON.parse(raw) as Partial<AccessibilitySettings>;
    const scale = parsed.fontScale ?? 100;
    return {
      fontScale: isFontScaleStep(scale) ? scale : 100,
      highContrast: Boolean(parsed.highContrast),
      grayscale: Boolean(parsed.grayscale),
      highlightLinks: Boolean(parsed.highlightLinks),
      readableFont: Boolean(parsed.readableFont),
      reduceMotion: Boolean(parsed.reduceMotion),
    };
  } catch {
    return DEFAULT_ACCESSIBILITY_SETTINGS;
  }
}

export function loadAccessibilitySettings(): AccessibilitySettings {
  if (typeof window === "undefined") return DEFAULT_ACCESSIBILITY_SETTINGS;
  return parseAccessibilitySettings(
    localStorage.getItem(ACCESSIBILITY_STORAGE_KEY),
  );
}

export function saveAccessibilitySettings(settings: AccessibilitySettings): void {
  localStorage.setItem(ACCESSIBILITY_STORAGE_KEY, JSON.stringify(settings));
}

export function applyAccessibilitySettings(
  root: HTMLElement,
  settings: AccessibilitySettings,
): void {
  root.style.fontSize = `${settings.fontScale}%`;
  root.dataset.a11yFontScale = String(settings.fontScale);
  root.dataset.a11yContrast = settings.highContrast ? "high" : "off";
  root.dataset.a11yGrayscale = settings.grayscale ? "true" : "false";
  root.dataset.a11yHighlightLinks = settings.highlightLinks ? "true" : "false";
  root.dataset.a11yReadableFont = settings.readableFont ? "true" : "false";
  root.dataset.a11yReduceMotion = settings.reduceMotion ? "true" : "false";
}

export function clearAccessibilityAttributes(root: HTMLElement): void {
  root.style.fontSize = "";
  delete root.dataset.a11yFontScale;
  delete root.dataset.a11yContrast;
  delete root.dataset.a11yGrayscale;
  delete root.dataset.a11yHighlightLinks;
  delete root.dataset.a11yReadableFont;
  delete root.dataset.a11yReduceMotion;
}

export function getNextFontScale(
  current: FontScaleStep,
  direction: "up" | "down",
): FontScaleStep {
  const index = FONT_SCALE_STEPS.indexOf(current);
  if (direction === "up") {
    return FONT_SCALE_STEPS[Math.min(index + 1, FONT_SCALE_STEPS.length - 1)];
  }
  return FONT_SCALE_STEPS[Math.max(index - 1, 0)];
}

export function isAccessibilityActive(settings: AccessibilitySettings): boolean {
  return (
    settings.fontScale !== DEFAULT_ACCESSIBILITY_SETTINGS.fontScale ||
    settings.highContrast ||
    settings.grayscale ||
    settings.highlightLinks ||
    settings.readableFont ||
    settings.reduceMotion
  );
}
