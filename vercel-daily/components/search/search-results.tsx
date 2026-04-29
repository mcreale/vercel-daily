import { CategorySlug } from "@/lib/types/return-types";
import SearchArticles from "./search-articles";
import { Suspense } from "react";


export default async function SearchResults({
  categorySlug,
  searchParams,
}: {
  categorySlug?: CategorySlug;
  searchParams: Promise<{ q?: string}>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() || undefined;
  
  
  return (
    <Suspense fallback={<p className="text-center text-gray-600 dark:text-gray-400 py-20">Loading search results...</p>}>
    <SearchArticles query={query} category={categorySlug} limit={12} />
    </Suspense>
  );
}
