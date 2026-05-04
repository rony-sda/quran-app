"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// --- Types ---
export interface FontSettings {
  arabicFontSize: number;
  translationFontSize: number;
  arabicFontFace: string;
}

interface AppContextType {
  // Font settings
  fontSettings: FontSettings;
  setArabicFontSize: (size: number) => void;
  setTranslationFontSize: (size: number) => void;
  setArabicFontFace: (font: string) => void;

  // Sidebar visibility (mobile)
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;

  // Settings sidebar visibility (mobile)
  isSettingsOpen: boolean;
  toggleSettings: () => void;
  closeSettings: () => void;

  // Dark mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const defaultFontSettings: FontSettings = {
  arabicFontSize: 30,
  translationFontSize: 17,
  arabicFontFace: "KFGQPC",
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Initialize from localStorage or defaults
  const [fontSettings, setFontSettings] = useState<FontSettings>(defaultFontSettings);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persisted settings from localStorage on mount
  useEffect(() => {
    try {
      const savedFont = localStorage.getItem("quran-font-settings");
      if (savedFont) {
        setFontSettings(JSON.parse(savedFont));
      }
      const savedDark = localStorage.getItem("quran-dark-mode");
      if (savedDark === "true") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    } catch {
      // Ignore localStorage errors
    }
    setIsHydrated(true);
  }, []);

  // Persist font settings to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("quran-font-settings", JSON.stringify(fontSettings));
    } catch {
      // Ignore
    }
  }, [fontSettings, isHydrated]);

  // Persist dark mode
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("quran-dark-mode", String(isDarkMode));
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch {
      // Ignore
    }
  }, [isDarkMode, isHydrated]);

  const setArabicFontSize = useCallback((size: number) => {
    setFontSettings((prev) => ({ ...prev, arabicFontSize: size }));
  }, []);

  const setTranslationFontSize = useCallback((size: number) => {
    setFontSettings((prev) => ({ ...prev, translationFontSize: size }));
  }, []);

  const setArabicFontFace = useCallback((font: string) => {
    setFontSettings((prev) => ({ ...prev, arabicFontFace: font }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
    setIsSettingsOpen(false); // Close settings when opening sidebar
  }, []);

  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  const toggleSettings = useCallback(() => {
    setIsSettingsOpen((prev) => !prev);
    setIsSidebarOpen(false); // Close sidebar when opening settings
  }, []);

  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  return (
    <AppContext.Provider
      value={{
        fontSettings,
        setArabicFontSize,
        setTranslationFontSize,
        setArabicFontFace,
        isSidebarOpen,
        toggleSidebar,
        closeSidebar,
        isSettingsOpen,
        toggleSettings,
        closeSettings,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
