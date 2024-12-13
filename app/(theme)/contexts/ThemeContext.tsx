"use client";
import { createContext, useState, useEffect } from "react";
import { gradientThemes, GradientTheme } from "../constants/gradientThemes";

type ThemeContextType = {
  currentTheme: GradientTheme;
  changeTheme?: () => void;
};

const defaultTheme = gradientThemes[0];
const THEME_STORAGE_KEY = "current-theme";
const THEMES_CACHE_KEY = "themes-cache";
const THEME_INDEX_KEY = "theme-index";

const initializeThemesCache = () => {
  try {
    if (typeof window === "undefined") return;

    const cachedThemes = localStorage.getItem(THEMES_CACHE_KEY);
    if (!cachedThemes) {
      localStorage.setItem(THEMES_CACHE_KEY, JSON.stringify(gradientThemes));
    }
  } catch (error) {
    console.error("Erro ao inicializar cache de temas:", error);
  }
};

const getRandomThemeExcept = (
  currentIndex: number
): { theme: GradientTheme; index: number } => {
  const availableIndices = Array.from(
    { length: gradientThemes.length },
    (_, i) => i
  ).filter((i) => i !== currentIndex);

  const randomIndex =
    availableIndices[Math.floor(Math.random() * availableIndices.length)];
  return {
    theme: gradientThemes[randomIndex],
    index: randomIndex,
  };
};

const getStoredTheme = (): { theme: GradientTheme; index: number } => {
  try {
    if (typeof window === "undefined") return { theme: defaultTheme, index: 0 };

    initializeThemesCache();

    const storedIndex = localStorage.getItem(THEME_INDEX_KEY);
    const currentIndex = storedIndex ? parseInt(storedIndex) : -1;

    // Pega um tema aleatório diferente do atual
    const { theme, index } = getRandomThemeExcept(currentIndex);

    // Salva o novo tema e seu índice
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
    localStorage.setItem(THEME_INDEX_KEY, index.toString());

    return { theme, index };
  } catch (error) {
    console.error("Erro ao carregar tema:", error);
    return { theme: defaultTheme, index: 0 };
  }
};

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: defaultTheme,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<GradientTheme>(defaultTheme);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const { theme, index } = getStoredTheme();
      setCurrentTheme(theme);
      setCurrentIndex(index);
    } catch (error) {
      console.error("Erro ao inicializar tema:", error);
    } finally {
      setMounted(true);
    }
  }, []);

  const updateTheme = (theme: GradientTheme, index: number) => {
    try {
      setCurrentTheme(theme);
      setCurrentIndex(index);
      if (typeof window !== "undefined") {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
        localStorage.setItem(THEME_INDEX_KEY, index.toString());
      }
    } catch (error) {
      console.error("Erro ao atualizar tema:", error);
    }
  };

  const changeTheme = () => {
    const nextIndex = (currentIndex + 1) % gradientThemes.length;
    updateTheme(gradientThemes[nextIndex], nextIndex);
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
