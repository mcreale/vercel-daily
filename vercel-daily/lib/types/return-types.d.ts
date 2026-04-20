import type { FetchResponse } from "openapi-fetch";
import type { paths } from "./news-api";

type Json = "application/json";

/** Return types for `openapi-fetch` calls against the news API (success `data` | `error` + `response`). */
export namespace NewsApiTypes {
  
  export type ListArticles = FetchResponse<paths["/articles"]["get"], {}, Json>;
  export type GetArticle = FetchResponse<paths["/articles/{id}"]["get"], {}, Json>;
  export type GetTrendingArticles = FetchResponse<
    paths["/articles/trending"]["get"],
    {},
    Json
  >;
  export type ListCategories = FetchResponse<paths["/categories"]["get"], {}, Json>;
  export type GetBreakingNews = FetchResponse<paths["/breaking-news"]["get"], {}, Json>;
  export type GetSubscription = FetchResponse<paths["/subscription"]["get"], {}, Json>;
  export type Subscribe = FetchResponse<paths["/subscription"]["post"], {}, Json>;
  export type Unsubscribe = FetchResponse<paths["/subscription"]["delete"], {}, Json>;
  export type CreateSubscription = FetchResponse<
    paths["/subscription/create"]["post"],
    {},
    Json
  >;
  export type GetPublicationConfig = FetchResponse<
    paths["/publication/config"]["get"],
    {},
    Json
  >;
  export type HealthCheck = FetchResponse<paths["/health"]["get"], {}, Json>;
}

export type BreakingNewsItem = {
  summary: string;
  urgent: boolean;
};

export type Article = components["schemas"]["Article"]  & {
  formattedDate: string;
}
