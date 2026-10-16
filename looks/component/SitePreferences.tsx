"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { MotionConfig } from "framer-motion";

export type DistortionLevel = "off" | "subtle" | "full";
export type PortfolioTheme = "anime" | "professional";

export type SitePreferences = {
  soundsEnabled: boolean;
  navigationSounds: boolean;
  articleSounds: boolean;
  musicEnabled: boolean;
  musicAutoplay: boolean;
  volume: number;
  distortion: DistortionLevel;
  theme: PortfolioTheme;
};

const STORAGE_KEY = "tlux-portfolio-preferences-v1";

export const defaultSitePreferences: SitePreferences = {
  soundsEnabled: true,
  navigationSounds: true,
  articleSounds: true,
  musicEnabled: true,
  musicAutoplay: true,
  volume: 45,
  distortion: "full",
  theme: "anime",
};

type PreferencesContextValue = {
  preferences: SitePreferences;
  updatePreference: <K extends keyof SitePreferences>(key: K, value: SitePreferences[K]) => void;
  resetPreferences: () => void;
  preferencesLoaded: boolean;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function readStoredPreferences(): SitePreferences {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultSitePreferences;
    const parsed = JSON.parse(stored) as Partial<SitePreferences> & { animationsEnabled?: boolean };
    delete parsed.animationsEnabled;
    return {
      ...defaultSitePreferences,
      ...parsed,
      volume: Math.min(100, Math.max(0, Number(parsed.volume ?? defaultSitePreferences.volume))),
      distortion: parsed.theme === "professional" ? "off" : parsed.distortion === "off" || parsed.distortion === "subtle" ? parsed.distortion : "full",
      theme: parsed.theme === "professional" ? "professional" : "anime",
    };
  } catch {
    return defaultSitePreferences;
  }
}

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState(defaultSitePreferences);
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  useEffect(() => {
    setPreferences(readStoredPreferences());
    setPreferencesLoaded(true);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;
    document.documentElement.dataset.portfolioTheme = preferences.theme;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // Preferences remain active for this visit if storage is unavailable.
    }
  }, [preferences, preferencesLoaded]);

  const updatePreference = useCallback<PreferencesContextValue["updatePreference"]>((key, value) => {
    setPreferences((current) => ({ ...current, [key]: value }));
  }, []);

  const resetPreferences = useCallback(() => setPreferences(defaultSitePreferences), []);

  const value = useMemo(() => ({ preferences, updatePreference, resetPreferences, preferencesLoaded }), [preferences, updatePreference, resetPreferences, preferencesLoaded]);

  return (
    <PreferencesContext.Provider value={value}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </PreferencesContext.Provider>
  );
}

export function useSitePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("useSitePreferences must be used inside SitePreferencesProvider");
  return context;
}
