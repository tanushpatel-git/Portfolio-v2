"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

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

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState(defaultSitePreferences);

  const updatePreference = useCallback<PreferencesContextValue["updatePreference"]>((key, value) => {
    setPreferences((current) => ({ ...current, [key]: value }));
  }, []);

  const resetPreferences = useCallback(() => setPreferences(defaultSitePreferences), []);

  const value = useMemo(
    () => ({ preferences, updatePreference, resetPreferences, preferencesLoaded: true }),
    [preferences, updatePreference, resetPreferences],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function useSitePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("useSitePreferences must be used inside SitePreferencesProvider");
  return context;
}
