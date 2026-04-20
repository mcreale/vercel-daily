import Image from "next/image";
import { listArticles, getBreakingNews } from "@/lib/data";
import type { components } from "@/lib/types/news-api";
import Hero from "@/components/hero";
import BreakingNews from "@/components/breaking-news";
import { Suspense } from "react";
import ArticleList from "@/components/article-list";

export const metadata = {
  title: "Vercel Daily",
  description: "News and insights for modern web developers.",
};

export default async function Home() {

  const [featuredArticles, breakingNews] = await Promise.all([listArticles({limit:6, featured:"true"}), getBreakingNews()]);
  return (
    
    
      <div className="flex flex-col w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <BreakingNews breakingNews={breakingNews}/>
        </Suspense>
        <Hero />

        <ArticleList listArticles={featuredArticles} title="Featured Articles" showMoreLink />

    </div>
  );
}
