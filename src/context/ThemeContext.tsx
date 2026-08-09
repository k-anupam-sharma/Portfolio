"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type Theme = "naruto" | "sasuke";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isNaruto: boolean;
  isSasuke: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "naruto",
  toggleTheme: () => {},
  isNaruto: true,
  isSasuke: false,
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("naruto");

  useEffect(() => {
    const saved = localStorage.getItem("ninja-theme") as Theme | null;
    if (saved === "sasuke") {
      setTheme("sasuke");
      document.documentElement.setAttribute("data-theme", "sasuke");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "naruto" ? "sasuke" : "naruto";
      localStorage.setItem("ninja-theme", next);
      if (next === "sasuke") {
        document.documentElement.setAttribute("data-theme", "sasuke");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        isNaruto: theme === "naruto",
        isSasuke: theme === "sasuke",
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
