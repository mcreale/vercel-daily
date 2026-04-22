export const THEME_STORAGE_KEY = "vercel-daily-theme";

export type ThemeChoice = "light" | "dark";

export function getThemeInitScript(): string {
  return `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);if(t==='light'||t==='dark'){document.documentElement.classList.toggle('dark',t==='dark');}else{document.documentElement.classList.toggle('dark',window.matchMedia('(prefers-color-scheme: dark)').matches);}}catch(e){}})();`;
}
