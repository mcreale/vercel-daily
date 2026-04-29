"use client";

import { fetchSearchArticlesPage } from "@/app/actions/search";
import ArticleCard from "@/components/articles/article-card";
import type {
  Article,
  CategorySlug,
  PaginationMeta,
} from "@/lib/types/return-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import { useState, useTransition } from "react";

export default function SearchResultsList({
  title,
  initialArticles,
  initialPagination,
  search,
  category,
  limit = 12,
  eagerLoadCount = 6,
}: {
  title: string;
  initialArticles: Article[];
  initialPagination: PaginationMeta | undefined;
  search?: string;
  category?: CategorySlug;
  limit?: number;
  eagerLoadCount?: number;
}) {
  const [articles, setArticles] = useState(initialArticles);
  const [pagination, setPagination] = useState(initialPagination);
  const [pending, startTransition] = useTransition();

  if (!articles.length) {
    return (
      <section id="no-results" className="py-12 container">
        <div className="flex items-between mb-8">
          <h2 className="text-4xl font-bold dark:text-white">{title}</h2>
        </div>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          No articles matched your search.
          <FontAwesomeIcon icon={faSadTear} className="mx-2" />
          Try a different search criteria or check back later for new articles.
        </p>
      </section>
    );
  }

  const hasNext = pagination?.hasNextPage ?? false;
  const currentPage = pagination?.page ?? 1;

  const loadMore = () => {
    if (!hasNext || pending) return;
    startTransition(async () => {
      const next = await fetchSearchArticlesPage(
        search,
        category,
        limit,
        currentPage + 1,
      );
      setPagination(next.pagination);
      setArticles((prev) => {
        const seen = new Set(prev.map((a) => a.id));
        const merged = [...prev];
        for (const a of next.articles) {
          if (!seen.has(a.id)) {
            merged.push(a);
            seen.add(a.id);
          }
        }
        return merged;
      });
    });
  };

  return (
    <section id="search-results-articles" className="py-12 container">
      <div className="flex items-between mb-8">
        <h2 className="text-4xl font-bold dark:text-white">{title}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <ArticleCard
            key={article.id}
            article={article}
            loadingType={
              index < eagerLoadCount ? "eager" : "lazy"
            }
          />
        ))}
      </div>
      {hasNext ? (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            disabled={pending}
            onClick={loadMore}
            className="dark-button disabled:opacity-60"
          >
            {pending ? "Loading…" : "Load more"}
          </button>
        </div>
      ) : null}
    </section>
  );
}
