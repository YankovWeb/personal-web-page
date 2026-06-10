"use client";

import { AccessibilityProvider } from "@/components/accessibility/accessibility-provider";
import { AccessibilityMotionConfig } from "@/components/accessibility/accessibility-motion-config";
import { AccessibilityWidget } from "@/components/accessibility/accessibility-widget";

export function AccessibilityRoot({ children }: { children: React.ReactNode }) {
  return (
    <AccessibilityProvider>
      <AccessibilityMotionConfig>{children}</AccessibilityMotionConfig>
      <AccessibilityWidget />
    </AccessibilityProvider>
  );
}
