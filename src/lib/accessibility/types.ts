export type FontScaleStep = 85 | 100 | 110 | 125 | 150;

export interface AccessibilitySettings {
  fontScale: FontScaleStep;
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  reduceMotion: boolean;
}

export type AccessibilitySettingKey = keyof AccessibilitySettings;

export interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  setSetting: <K extends AccessibilitySettingKey>(
    key: K,
    value: AccessibilitySettings[K],
  ) => void;
  increaseFontScale: () => void;
  decreaseFontScale: () => void;
  resetSettings: () => void;
  isActive: boolean;
}
