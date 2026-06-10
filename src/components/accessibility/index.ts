export {
  AccessibilityProvider,
  useAccessibility,
} from "@/components/accessibility/accessibility-provider";
export { AccessibilityWidget } from "@/components/accessibility/accessibility-widget";
export {
  DEFAULT_ACCESSIBILITY_SETTINGS,
  FONT_SCALE_STEPS,
  ACCESSIBILITY_STORAGE_KEY,
} from "@/lib/accessibility/constants";
export {
  applyAccessibilitySettings,
  loadAccessibilitySettings,
  saveAccessibilitySettings,
} from "@/lib/accessibility/settings";
export { AccessibilityRoot } from "@/components/accessibility/accessibility-root";
export type {
  AccessibilitySettings,
  AccessibilitySettingKey,
  FontScaleStep,
} from "@/lib/accessibility/types";
