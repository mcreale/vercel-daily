import type { Article } from "@/lib/types/return-types";
import { getSiteOrigin } from "@/lib/site";


export function newsArticleJsonLd(
  article: Article,
  canonicalUrl: string,
): Record<string, unknown> {

// todo: based on user agent, show or hide certain properties (e.g. articleBody). We'd want to show it to bots like google, openAi, etc. but hide it from regular users to avoid giving away content to non-subscribers. This is because JSON-LD is primarily intended for search engines and other automated agents, and may not be ideal for conveying content to human readers, especially if the content is behind a paywall or subscription. 
// By conditionally including certain properties based on the user agent, we can ensure that search engines have the necessary information to index the article properly, while still providing a good user experience for human readers.  


  const origin = getSiteOrigin();
  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    url: canonicalUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Vercel Daily",
      url: origin,
    },
    isAccessibleForFree: false,
  };

  if (article.image) {
    json.image = [article.image];
  }
  if (article.publishedAt) {
    json.datePublished = article.publishedAt;
  }
  if (article.author?.name) {
    json.author = {
      "@type": "Person",
      name: article.author.name,
      ...(article.author.avatar
        ? { image: article.author.avatar }
        : {}),
    };
  }
  if (article.category) {
    json.articleSection = article.category;
  }
  if (article.tags?.length) {
    json.keywords = article.tags.join(", ");
  }
  
  return json;
}
