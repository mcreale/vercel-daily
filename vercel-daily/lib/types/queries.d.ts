import type { operations } from "./news-api";

export namespace NewsApiQueries {
/** URL query string parameters for `listArticles` (GET /articles). */
export type ListArticlesQuery = NonNullable<
  operations["listArticles"]["parameters"]["query"]
>;

/** URL query string parameters for `getArticle` (GET /articles/{id}). */
export type GetArticleQuery = operations["getArticle"]["parameters"]["query"];

/** URL query string parameters for `getTrendingArticles` (GET /articles/trending). */
export type GetTrendingArticlesQuery = NonNullable<
  operations["getTrendingArticles"]["parameters"]["query"]
>;

/** URL query string parameters for `listCategories` (GET /categories). */
export type ListCategoriesQuery = operations["listCategories"]["parameters"]["query"];

/** URL query string parameters for `getBreakingNews` (GET /breaking). */
export type GetBreakingNewsQuery = operations["getBreakingNews"]["parameters"]["query"];

/** URL query string parameters for `getSubscription` (GET /subscription). */
export type GetSubscriptionQuery = operations["getSubscription"]["parameters"]["query"];

/** URL query string parameters for `subscribe` (POST /subscription). */
export type SubscribeQuery = operations["subscribe"]["parameters"]["query"];

/** URL query string parameters for `unsubscribe` (POST /subscription/unsubscribe). */
export type UnsubscribeQuery = operations["unsubscribe"]["parameters"]["query"];

/** URL query string parameters for `createSubscription` (POST /subscription/create). */
export type CreateSubscriptionQuery =
  operations["createSubscription"]["parameters"]["query"];

/** URL query string parameters for `getPublicationConfig` (GET /publication). */
export type GetPublicationConfigQuery =
  operations["getPublicationConfig"]["parameters"]["query"];

/** URL query string parameters for `healthCheck` (GET /health). */
export type HealthCheckQuery = operations["healthCheck"]["parameters"]["query"];
}