import { listArticles, getBreakingNews } from "@/lib/data";
import Hero from "@/components/homepage/hero";
import BreakingNews from "@/components/homepage/breaking-news";
import { Suspense } from "react";
import ArticleList from "@/components/articles/article-list";

export const metadata = {
  title: "Vercel Daily",
  description: "News and insights for modern web developers.",
  openGraph: {
    title: "Vercel Daily",
    description: "News and insights for modern web developers.",
    url: process.env.NEXT_PUBLIC_BASE_URL
  }
};

async function BreakingNewsLoader() {
  const breakingNews = await getBreakingNews();
  return <BreakingNews breakingNews={breakingNews} />;
}

export default async function Home() {
  const featuredArticles = await listArticles({
    limit: 6,
    featured: "true",
  });
  return (
    <div className="flex w-full flex-col">
      <Suspense
        fallback={
          <section
            className="bg-gray-300 py-4 dark:bg-gray-800"
            aria-hidden
          >
            <div className="container">
              <div className="h-5 max-w-full animate-pulse rounded bg-zinc-600/60 dark:bg-zinc-600/50" />
            </div>
          </section>
        }
      >
        <BreakingNewsLoader />
      </Suspense>
      <Hero />

      <ArticleList
        listArticles={featuredArticles}
        title="Featured Articles"
        showMoreLink
      />
    </div>
  );
}
