import "server-only";
import { getNewsApiClient } from "./api/client";
import type { NewsApiQueries } from "./types/queries";
import type { NewsApiTypes, BreakingNewsItem } from "./types/return-types";

export async function listArticles(
  query?: NewsApiQueries.ListArticlesQuery,
): Promise<NewsApiTypes.ListArticles> {
  const client = getNewsApiClient();
  if (query === undefined) {
    return client.GET("/articles");
  }
  return client.GET("/articles", { params: { query } });
}

export async function getArticle(id: string): Promise<NewsApiTypes.GetArticle> {
  return getNewsApiClient().GET("/articles/{id}", {
    params: { path: { id } },
  });
}

export async function getTrendingArticles(): Promise<NewsApiTypes.GetTrendingArticles> {
  return getNewsApiClient().GET("/articles/trending");
}

export async function getBreakingNews(): Promise<BreakingNewsItem> {
  const {data, response, error} = await getNewsApiClient().GET("/breaking-news");
  if (error || !response.ok  || !data) {
    throw new Error("Failed to fetch breaking news");
  }
  return data.data as BreakingNewsItem;
}