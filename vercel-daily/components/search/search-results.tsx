import { CategorySlug } from "@/lib/types/return-types";
import { Suspense } from "react";
import { getCategoryfromSlug, searchArticles } from "@/lib/data";
import SearchResultsList from "./search-results-list";


export default async function SearchResults({
  categorySlug,
  searchParams,
}: {
  categorySlug?: CategorySlug;
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() || undefined;

  const [{ articles, pagination }, category] = await Promise.all([
    searchArticles(query, categorySlug, 12),
    getCategoryfromSlug(categorySlug ?? ""),
  ]);

  const total = pagination?.total ?? articles.length;
  const title = `${total} Article${total === 1 ? "" : "s"}${query ? ` matching "${query}"` : ""}${category ? ` in category "${category.name}"` : ""}`;

  return (
    <Suspense
      fallback={
        <p className="text-center text-gray-600 dark:text-gray-400 py-20">
          Loading search results...
        </p>
      }
    >
      <SearchResultsList
        key={`${categorySlug ?? ""}-${query ?? ""}`}
        title={title}
        initialArticles={articles}
        initialPagination={pagination}
        search={query}
        category={categorySlug}
        limit={12}
        eagerLoadCount={6}
      />
    </Suspense>
  );
}
