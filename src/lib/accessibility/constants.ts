import type { AccessibilitySettings, FontScaleStep } from "@/lib/accessibility/types";

export const ACCESSIBILITY_STORAGE_KEY = "portfolio-a11y-settings-v1";

export const FONT_SCALE_STEPS: FontScaleStep[] = [85, 100, 110, 125, 150];

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  fontScale: 100,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  readableFont: false,
  reduceMotion: false,
};
