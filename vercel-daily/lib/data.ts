import "server-only";
import { getNewsApiClient } from "./api/client";
import type { NewsApiQueries } from "./types/queries";
import type { NewsApiTypes, BreakingNewsItem, Article, Category, PaginationMeta, SubscriptionStatus } from "./types/return-types";
import { cacheLife, cacheTag, updateTag } from "next/cache";
import { components } from "./types/news-api";

/*article fetching and formatting functions */

function formattedArticle(article: components["schemas"]["Article"]): Article {
  return {...article, formattedDate: new Date(article.publishedAt??'').toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })} as Article;
  }

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

export async function getArticle(idOrSlug: string): Promise<Article> {
  'use cache';
  cacheLife("article");
  const {data, response, error} = await getNewsApiClient().GET("/articles/{id}", {
    params: { path: { id: idOrSlug } },
  });

  if (error || !response.ok || !data || !data.data) {
    throw new Error(`Failed to fetch article with id ${idOrSlug}`);
  }
  else
  {
    const article = formattedArticle(data.data);
    // we can update the cache tag for this article to ensure that any cached data that includes this article is also updated
     cacheTag(`article:${article.id}`);

    if (article.slug) {
      cacheTag(`article:${article.slug}`);
    }

    return article;
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
  'use cache';
  cacheLife("breakingNews");
  console.log("Fetching breaking news...");
  const {data, response, error} = await getNewsApiClient().GET("/breaking-news");
  if (error || !response.ok  || !data) {
    throw new Error("Failed to fetch breaking news");
  }

  //sadly the news API returns a slightly different shape for breaking news, so we need to map it to our BreakingNewsItem type
  // we need to get the slug from the articleId by fetching the article, since the breaking news endpoint doesn't return the slug directly
  let slug = '';
  if (data.data && data.data.articleId) {
    const article = await getArticle(data.data?.articleId ?? '');
    slug = article.slug ?? '' ;
  }
  return { ...data.data, slug } as BreakingNewsItem;
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

export async function getCategoryfromSlug( slug: string ) {
  const categories = await listCategories();
  return categories.find((c) => c.slug === slug);
}

export type SearchArticlesResult = {
  articles: Article[];
  pagination: PaginationMeta | undefined;
};

export async function searchArticles(
  search?: string,
  category?: "changelog" | "engineering" | "customers" | "company-news" | "community" | undefined,
  limit: number = 12,
  page: number = 1,
): Promise<SearchArticlesResult> {
  "use cache";
  cacheLife("article");

  const { data, response, error } = await getNewsApiClient().GET("/articles", {
    params: { query: { search, category, limit, page } },
  });
  if (error || !response.ok || !data || !data.data) {
    throw new Error("Failed to search articles");
  }
  return {
    articles: data.data.map((a) => formattedArticle(a)) as Article[],
    pagination: data.meta?.pagination,
  };
}


/* Subscription management functions */
function getSubscriptionTokenOptions(token?: string) {
  if (!token) {
    throw new Error("Subscription token is required");
  }
  return { params: {header:{ "x-subscription-token": token??'' }}};
}


export async function getSubscriptionStatus(token: string): Promise<SubscriptionStatus> {
  'use cache';
  cacheLife("seconds");
  cacheTag(`subscription-status-${token}`);
  const {data, response, error} = await getNewsApiClient().GET("/subscription", getSubscriptionTokenOptions(token));
  if (error || !response.ok || !data || !data.data) {
    if (response.status === 404) {
      throw new Error("Subscription token not found");
    }
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
  updateTag(`subscription-status-${token}`);
  return data.data as SubscriptionStatus;
}

export async function deactivateSubscription(token: string): Promise<SubscriptionStatus> {
  const {data, response, error} = await getNewsApiClient().DELETE("/subscription", getSubscriptionTokenOptions(token)); 
  if (error || !response.ok || !data || !data.data) {
    throw new Error("Failed to unsubscribe");
  }
  updateTag(`subscription-status-${token}`);
  return data.data as SubscriptionStatus;
}
