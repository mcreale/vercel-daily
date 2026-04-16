import "server-only";
import { getNewsApiClient } from "./api/client";
import type { NewsApiQueries } from "./types/queries";

export async function listArticles(query?: NewsApiQueries.ListArticlesQuery) {
  const client = getNewsApiClient();
  if (query === undefined) {
    return client.GET("/articles");
  }
  return client.GET("/articles", { params: { query } });
}

export async function getArticle(id: string) {
  return getNewsApiClient().GET("/articles/{id}", {
    params: { path: { id } },
  });
}
