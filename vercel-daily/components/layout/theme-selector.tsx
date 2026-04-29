"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function ThemeSelector() {
  const isClient = useIsClient();
  const { resolvedTheme, setTheme } = useTheme();

  if (!isClient) {
    return (
      <div
        className="flex items-center gap-2"
        aria-hidden
        suppressHydrationWarning
      >
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Theme</span>
        <div className="inline-flex min-h-8 min-w-[7.25rem] rounded-lg border border-zinc-200 p-0.5 dark:border-zinc-600" />
      </div>
    );
  }

  const isLight = resolvedTheme === "light";
  const isDark = resolvedTheme === "dark";

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
          onClick={() => setTheme("light")}
          className={[
            "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
            isLight
              ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-600 dark:text-zinc-50"
              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
          ].join(" ")}
          aria-pressed={isLight}
        >
          <FontAwesomeIcon icon={faSun} className="h-3.5 w-3.5" aria-hidden />
          Light
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={[
            "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
            isDark
              ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-600 dark:text-zinc-50"
              : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800",
          ].join(" ")}
          aria-pressed={isDark}
        >
          <FontAwesomeIcon icon={faMoon} className="h-3.5 w-3.5" aria-hidden />
          Dark
        </button>
      </div>
    </div>
  );
}
