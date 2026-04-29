"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SearchCategories({categories}: {categories: {slug?: string, name?: string, articleCount?: number}[]}) {
  const pathname = usePathname();
  const currentCategory = pathname.split("/search/")[1]?.split("/")[0]; 
  
  return (
    <div className="mb-8 flex flex-wrap gap-3 container">
      <Link href="/search" scroll={false} aria-current={currentCategory === undefined ? "page" : undefined} className={[
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
        currentCategory === undefined
          ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
          : "border-zinc-300 bg-white text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800",
      ].join(" ")}>
        All Categories
      </Link>
      {categories.map((c) => {
        const isActive = currentCategory === c.slug;
        return (
          <Link
            key={c.slug}
            href={`/search/${c.slug}`}
            scroll={false}
            aria-current={isActive ? "page" : undefined}
            className={[
              "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
              isActive
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                : "border-zinc-300 bg-white text-zinc-900 hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-500 dark:hover:bg-zinc-800",
            ].join(" ")}
          >
            <span>{c.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
