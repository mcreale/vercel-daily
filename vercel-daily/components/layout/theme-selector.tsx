"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useLayoutEffect, useState } from "react";
import { THEME_STORAGE_KEY, type ThemeChoice } from "@/lib/theme";

function getStoredTheme(): ThemeChoice | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(THEME_STORAGE_KEY);
  if (v === "light" || v === "dark") return v;
  return null;
}

function applyTheme(theme: ThemeChoice) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export default function ThemeSelector() {
  const [theme, setTheme] = useState<ThemeChoice>("light");

  useLayoutEffect(() => {
    const stored = getStoredTheme();
    const resolved =
      stored ??
      (document.documentElement.classList.contains("dark")
        ? "dark"
        : "light");
    setTheme(resolved);
    applyTheme(resolved);
  }, []);

  const select = useCallback((next: ThemeChoice) => {
    localStorage.setItem(THEME_STORAGE_KEY, next);
    setTheme(next);
    applyTheme(next);
  }, []);

  useLayoutEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_STORAGE_KEY || !e.newValue) return;
      if (e.newValue === "light" || e.newValue === "dark") {
        setTheme(e.newValue);
        applyTheme(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div
      className="flex items-center gap-2"
      role="group"
      aria-label="Color theme"
    >
      <span className="text-sm text-zinc-500 dark:text-zinc-400">Theme</span>
      <div className="inline-flex rounded-lg border border-zinc-200 p-0.5 dark:border-zinc-600">
        <button
          type="button"
          onClick={() => select("light")}
          className={[
            "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
            theme === "light"
              ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-600 dark:text-zinc-50"
              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
          ].join(" ")}
          aria-pressed={theme === "light"}
        >
          <FontAwesomeIcon icon={faSun} className="h-3.5 w-3.5" aria-hidden />
          Light
        </button>
        <button
          type="button"
          onClick={() => select("dark")}
          className={[
            "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
            theme === "dark"
              ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-600 dark:text-zinc-50"
              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
          ].join(" ")}
          aria-pressed={theme === "dark"}
        >
          <FontAwesomeIcon icon={faMoon} className="h-3.5 w-3.5" aria-hidden />
          Dark
        </button>
      </div>
    </div>
  );
}
