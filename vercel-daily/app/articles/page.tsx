import { listArticles } from "@/lib/data";
import ArticleList from "@/components/article-list";

export const metadata = {
  title: "Vercel Daily: Articles",
  description: "News and insights for modern web developers.",
};

export default async function Articles() {
  const featuredArticles = await listArticles({limit:50});
  return (    
      <div className="flex flex-col w-full">
        <ArticleList listArticles={featuredArticles} title={`Our Articles`} showMoreLink={false} />    
    </div>
  );
}
