import "server-only";
import { getNewsApiClient } from "./api/client";
import type { NewsApiQueries } from "./types/queries";
import type { NewsApiTypes, BreakingNewsItem, Article } from "./types/return-types";
import { cacheLife } from "next/cache";
import { components } from "./types/news-api";

export async function listArticles(
  query?: NewsApiQueries.ListArticlesQuery,
): Promise<Article[]> {
  'use cache';
  cacheLife("article");
  const client = getNewsApiClient();
  let result: NewsApiTypes.ListArticles;
  if (query === undefined) {
      result = await client.GET("/articles");
  }
  else{
    result = await client.GET("/articles", { params: { query } });
  }
  if (result.error || !result.response.ok || !result.data) {
    throw new Error("Failed to fetch articles");
  }

  return result.data.data?.map(a=>formattedArticle(a)) as Article[];
}

function formattedArticle(article: components["schemas"]["Article"]): Article {
  return {...article, formattedDate: new Date(article.publishedAt??'').toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })} as Article;
  }
export async function getArticle(id: string): Promise<Article> {
  'use cache';
  cacheLife("article");
  const {data, response, error} = await getNewsApiClient().GET("/articles/{id}", {
    params: { path: { id } },
  });

  if (error || !response.ok || !data || !data.data) {
    throw new Error(`Failed to fetch article with id ${id}`);
  }
  else
  {
    return formattedArticle(data.data);
  }
}

export async function getTrendingArticles(): Promise<Article[]> {
  'use cache';
  cacheLife("trending");
  const result = await getNewsApiClient().GET("/articles/trending");
  if (result.error || !result.response.ok || !result.data) {
    throw new Error("Failed to fetch trending articles");
  }

  return result.data.data?.map(a=>formattedArticle(a)) as Article[];
}

export async function getBreakingNews(): Promise<BreakingNewsItem> {
  // dont' use cache here because it rotates and changes so we don't want to have it cached
  const {data, response, error} = await getNewsApiClient().GET("/breaking-news");
  if (error || !response.ok  || !data) {
    throw new Error("Failed to fetch breaking news");
  }
  return data.data as BreakingNewsItem;
}