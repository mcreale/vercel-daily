import { Suspense } from "react";
import SearchResults from "@/components/search/search-results";
import SearchHeader from "@/components/search/search-header";
import SearchFallback from "@/components/search/search-fallback";
import { listCategories } from "@/lib/data";

export const metadata = {
  title: "Vercel Daily: Article Search",
  description: "Search for articles on Vercel Daily by keyword or category.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string | string[] }>;
}) {
  const categoryRows = await listCategories();
  const categoryOptions = categoryRows
    .map((c) => ({ slug: c.slug ?? "", name: c.name ?? c.slug ?? "" }))
    .filter((c) => c.slug);

  return (
    <section className="w-full">
      <div className="container py-20">
        <Suspense>
          <SearchHeader categories={categoryOptions} />
        </Suspense>
        <Suspense fallback={<SearchFallback />}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
