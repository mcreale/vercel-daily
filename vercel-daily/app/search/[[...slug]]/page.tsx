import { Suspense } from "react";
import SearchResults from "@/components/search/search-results";
import SearchHeader from "@/components/search/search-header";
import SearchCategories from "@/components/search/search-categories";
import SearchFallback from "@/components/search/search-fallback";
import { listCategories } from "@/lib/data";
import { CategorySlug } from "@/lib/types/return-types";


async function getCategoryfromSlug( slug: string ) {
  const categories = await listCategories();
  console.log(categories);
  return categories.find((c) => c.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  "use cache";
  const { slug: slugSegments } = await params;
  const slug = slugSegments?.[0];
  if (!slug) {
    return {
      title: "Search",
      description: `Search for articles on Vercel Daily by keyword or category.`,
    };
  }

  const category = await getCategoryfromSlug(slug);
  console.log(category);
  return {
    title: category?.name ?? "Search",
    description: `Search for ${category?.name ?? "articles"} on Vercel Daily by keyword or category.`,
  };
};

export async function generateStaticParams() {
  const categories = await listCategories();
  console.log(categories);
  return categories
    .filter((c) => c.slug)
    .map((c) => ({ slug: [c.slug!] }));
}

export default async function SearchPage({
  searchParams,
  params
}: {
  searchParams: Promise<{ q?: string }>;
  params: Promise<{ slug?: string[] }>;
}) {
  const categoryRows = await listCategories();
  const { slug: slugSegments } = await params;
  const categorySlug = slugSegments?.[0] as CategorySlug | undefined;

  return (
    <section className="w-full">
      <div className="container py-20">
        <Suspense>
          <SearchHeader />
        </Suspense>
        <SearchCategories categories={categoryRows} />
        <Suspense fallback={<SearchFallback />}>
          <SearchResults searchParams={searchParams} categorySlug={categorySlug} />
        </Suspense>
      </div>
    </section>
  );
}
