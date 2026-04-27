import ArticleList from "@/components/articles/article-list";
import { searchArticles } from "@/lib/data";

function categoryFromSearchParam(cat: string | string[] | undefined): string | undefined {
  if (cat == null) return undefined;
  const first = (Array.isArray(cat) ? cat[0] : cat)?.trim();
  return first || undefined;
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
    category ? [category] : undefined,
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
