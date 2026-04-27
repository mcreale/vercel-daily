import ArticleCard from "@/lib/cards/article-card";
import { Article } from "@/lib/types/return-types";
import Link from "next/link";

export default function ArticleList({listArticles, title, showMoreLink, eagerLoadCount}: {listArticles: Article[], title: string, showMoreLink: boolean, eagerLoadCount?: number}) {
    try { 
      if (!listArticles?.length) {
        return (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            No articles matched your search.
          </p>
        );
      }
      return (
        <section id="featured-articles" className="py-12 container">
          <div className="flex items-between mb-8 ">
            <h2 className="text-4xl font-bold dark:text-white">{title ?? "Featured Articles"}</h2>
            {showMoreLink && <Link href="/articles" className="text-sm dark:text-gray-300 hover:underline ml-auto flex items-center" prefetch>
            </Link>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {listArticles.map((article, index) => (
              <ArticleCard key={article.id} article={article} loadingType={eagerLoadCount && index < eagerLoadCount ? "eager" : "lazy"} />
            ))}
          </div>
          {showMoreLink && <div className="flex justify-center mt-6">
            <Link href="/search" className="dark-button" prefetch>
              View All Articles
            </Link>
          </div>}
        </section>
      );
    } catch (e) {
      return (
        <p className="max-w-md text-sm text-amber-900 dark:text-amber-100">
          {e instanceof Error ? e.message : "Failed to load articles."}
        </p>
      );
    }
  }
  