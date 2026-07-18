"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DEFAULT_ACCESSIBILITY_SETTINGS } from "@/lib/accessibility/constants";
import {
  applyAccessibilitySettings,
  getNextFontScale,
  isAccessibilityActive,
  loadAccessibilitySettings,
  saveAccessibilitySettings,
} from "@/lib/accessibility/settings";
import type {
  AccessibilityContextValue,
  AccessibilitySettingKey,
  AccessibilitySettings,
} from "@/lib/accessibility/types";

const AccessibilityContext = createContext<AccessibilityContextValue | null>(
  null,
);

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<AccessibilitySettings>(
    DEFAULT_ACCESSIBILITY_SETTINGS,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const loaded = loadAccessibilitySettings();
    applyAccessibilitySettings(document.documentElement, loaded);
    // localStorage is only readable after mount; this one-time cascading
    // render is the intended hydration path for persisted a11y settings.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings(loaded);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyAccessibilitySettings(document.documentElement, settings);
    saveAccessibilitySettings(settings);
  }, [settings, ready]);

  const setSetting = useCallback(
    <K extends AccessibilitySettingKey>(
      key: K,
      value: AccessibilitySettings[K],
    ) => {
      setSettings((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  const increaseFontScale = useCallback(() => {
    setSettings((current) => ({
      ...current,
      fontScale: getNextFontScale(current.fontScale, "up"),
    }));
  }, []);

  const decreaseFontScale = useCallback(() => {
    setSettings((current) => ({
      ...current,
      fontScale: getNextFontScale(current.fontScale, "down"),
    }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_ACCESSIBILITY_SETTINGS);
  }, []);

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      settings,
      setSetting,
      increaseFontScale,
      decreaseFontScale,
      resetSettings,
      isActive: isAccessibilityActive(settings),
    }),
    [
      settings,
      setSetting,
      increaseFontScale,
      decreaseFontScale,
      resetSettings,
    ],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility(): AccessibilityContextValue {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}
