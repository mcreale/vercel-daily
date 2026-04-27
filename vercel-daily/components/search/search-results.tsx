import ArticleList from "@/components/articles/article-list";
import { searchArticles } from "@/lib/data";

function categoryFromSearchParam(cat: string | string[] | undefined): "changelog" | "engineering" | "customers" | "company-news" | "community" | undefined {
  if (cat == null) return undefined;
  const first = (Array.isArray(cat) ? cat[0] : cat)?.trim();
  return first as "changelog" | "engineering" | "customers" | "company-news" | "community" | undefined;
}

export default async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = params.q?.trim() || undefined;
  const category = categoryFromSearchParam(params.cat);
  const articles = await searchArticles(
    query,
    category,
  );
  return (
    <ArticleList
      title={`Articles${query ? ` matching "${query}"` : ""}`}
      listArticles={articles}
      showMoreLink={false}
      eagerLoadCount={6}
    />
  );
}
