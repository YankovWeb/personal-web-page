"use client";

import { MotionConfig } from "framer-motion";
import { useAccessibility } from "@/components/accessibility/accessibility-provider";

export function AccessibilityMotionConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  const { settings } = useAccessibility();

  return (
    <MotionConfig reducedMotion={settings.reduceMotion ? "always" : "never"}>
      {children}
    </MotionConfig>
  );
}
