import ArticleCard from "@/components/articles/article-card";
import { Article } from "@/lib/types/return-types";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ArticleList({listArticles, title, showMoreLink, eagerLoadCount, showFoundArticlesCount}: {listArticles: Article[], title: string, showMoreLink: boolean, eagerLoadCount?: number, showFoundArticlesCount?: boolean}) {
    try { 
      if (!listArticles?.length) {
        return (
        <section id="no-results" className="py-12 container">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            No articles matched your search.
            <FontAwesomeIcon icon={faSadTear} className="mx-2" />
            Try a different search criteria or check back later for new articles.
          </p>
          </section>
        );
      }
      return (
        <section id="featured-articles" className="py-12 container">
          <div className="flex items-between mb-8 ">
            <h2 className="text-4xl font-bold dark:text-white">{showFoundArticlesCount ? `${listArticles.length} Articles Found` : title ?? "Featured Articles"}</h2>
            {showMoreLink && <Link href="/search" className="text-sm dark:text-gray-300 hover:underline ml-auto flex items-center" prefetch>
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
  