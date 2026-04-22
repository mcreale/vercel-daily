import "server-only";
import { getNewsApiClient } from "./api/client";
import type { NewsApiQueries } from "./types/queries";
import type { NewsApiTypes, BreakingNewsItem, Article, Category, SubscriptionStatus } from "./types/return-types";
import { cacheLife } from "next/cache";
import { components } from "./types/news-api";
import { randomUUID } from "crypto";
import { get } from "http";

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

export async function listCategories(): Promise<Category[]> {
  'use cache';
  cacheLife("long");
  const {data, response, error} = await getNewsApiClient().GET("/categories");
  if (error || !response.ok || !data || !data.data) {
    throw new Error("Failed to fetch categories");
  }
  return data.data as Category[];
}

export async function searchArticles(search?: string, categories?: string[], limit: number=12 ): Promise<Article[]> {
  const {data, response, error} = await getNewsApiClient().GET("/articles", {
    params: { query:{search, categories, limit }},
  });
  if (error || !response.ok || !data || !data.data) {
    throw new Error("Failed to search articles");
  }
  return data.data.map(a=>formattedArticle(a)) as Article[];
}


function getSubscriptionTokenOptions(token?: string) {
  if (!token) {
    throw new Error("Subscription token is required");
  }
  return { params: {header:{ "x-subscription-token": token??'' }}};
}


export async function getSubscriptionStatus(token: string): Promise<SubscriptionStatus> {
  //this should not be cached

  const {data, response, error} = await getNewsApiClient().GET("/subscription", getSubscriptionTokenOptions(token));
  if (error || !response.ok || !data || !data.data) {
    throw new Error("Failed to fetch subscription status");
  }
  return data.data as SubscriptionStatus;
}


export async function upsertSubscription(token?: string): Promise<SubscriptionStatus> {
  if (!token) {
    const sub =  await createSubscription();
    token = sub.token;
  }
  if (!token) {
    throw new Error("Failed to create subscription");
  }
  return await activateSubscription(token!);
}
  

export async function createSubscription(): Promise<SubscriptionStatus> {
  // if (!token) {
  //   token = randomUUID().toString();
  // }
  const {data, response, error} = await getNewsApiClient().POST("/subscription/create");
  
  if (error || !response.ok || !data || !data.data) {
  
    throw new Error("Failed to subscribe");
  }
  return data.data as SubscriptionStatus;
}

export async function activateSubscription(token: string): Promise<SubscriptionStatus> {
 
  const {data, response, error} = await getNewsApiClient().POST("/subscription", getSubscriptionTokenOptions(token));
  
  if (error || !response.ok || !data || !data.data) {
    throw new Error("Failed to subscribe");
  }
  return data.data as SubscriptionStatus;
}

export async function deactivateSubscription(token: string): Promise<SubscriptionStatus> {
  const {data, response, error} = await getNewsApiClient().DELETE("/subscription", getSubscriptionTokenOptions(token)); 
  if (error || !response.ok || !data || !data.data) {
    throw new Error("Failed to unsubscribe");
  }
  return data.data as SubscriptionStatus;
}
