import type { FetchResponse } from "openapi-fetch";
import type { components, paths } from "./news-api";

type Json = "application/json";
type NoParams = Record<string, never>;

/** Return types for `openapi-fetch` calls against the news API (success `data` | `error` + `response`). */
export namespace NewsApiTypes {
  
  export type ListArticles = FetchResponse<paths["/articles"]["get"], NoParams, Json>;
  export type GetArticle = FetchResponse<paths["/articles/{id}"]["get"], NoParams, Json>;
  export type GetTrendingArticles = FetchResponse<
    paths["/articles/trending"]["get"],
    NoParams,
    Json
  >;
  export type ListCategories = FetchResponse<paths["/categories"]["get"], NoParams, Json>;
  export type GetBreakingNews = FetchResponse<paths["/breaking-news"]["get"], NoParams, Json>;
  export type GetSubscription = FetchResponse<paths["/subscription"]["get"], NoParams, Json>;
  export type Subscribe = FetchResponse<paths["/subscription"]["post"], NoParams, Json>;
  export type Unsubscribe = FetchResponse<paths["/subscription"]["delete"], NoParams, Json>;
  export type CreateSubscription = FetchResponse<
    paths["/subscription/create"]["post"],
    NoParams,
    Json
  >;
  export type GetPublicationConfig = FetchResponse<
    paths["/publication/config"]["get"],
    NoParams,
    Json
  >;
  export type HealthCheck = FetchResponse<paths["/health"]["get"], NoParams, Json>;
}

export type BreakingNewsItem = {
  headline: string;
  urgent: boolean;
  slug: string;
};

export type Article = components["schemas"]["Article"]  & {
  formattedDate: string;
}

export type Category = components["schemas"]["Category"];

export type SubscriptionStatus = components["schemas"]["SubscriptionStatus"];

export type CategorySlug = "changelog" | "engineering" | "customers" | "company-news" | "community";