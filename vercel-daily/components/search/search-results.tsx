import { CategorySlug } from "@/lib/types/return-types";
import SearchArticles from "./search-articles";
import { Suspense } from "react";
import { getCategoryfromSlug, searchArticles } from "@/lib/data";
import ArticleList from "../articles/article-list";


export default async function SearchResults({
  categorySlug,
  searchParams,
}: {
  categorySlug?: CategorySlug;
  searchParams: Promise<{ q?: string}>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() || undefined;
  
  const [articles, category] = await Promise.all([searchArticles(query, categorySlug, 12), getCategoryfromSlug(categorySlug??'')] );
  
  return (
    <Suspense fallback={<p className="text-center text-gray-600 dark:text-gray-400 py-20">Loading search results...</p>}>
     <ArticleList
          title={`${articles.length} Articles${query ? ` matching "${query}"` : ""} ${category ? ` in category "${category.name}"` : ""}`}
          listArticles={articles}
          showMoreLink={false}
          eagerLoadCount={6}
          />
    </Suspense>
  );
}
