import "server-only";
import createClient from "openapi-fetch";
import type { paths } from "../types/news-api";

function loadConfig(): { baseUrl: string; key: string } {
  const baseUrl = process.env.NEWS_API_BASE_URL?.trim();
  const key = process.env.NEWS_API_KEY?.trim();
  if (!baseUrl || !key) {
    throw new Error(
      "Missing NEWS_API_BASE_URL or NEWS_API_KEY. Add them to .env.local (do not use the NEXT_PUBLIC_ prefix)."
    );
  }
  return { baseUrl, key };
}

let client: ReturnType<typeof createClient<paths>> | undefined;

export function getNewsApiClient(): ReturnType<typeof createClient<paths>> {
  if (!client) {
    const { baseUrl, key } = loadConfig();
    client = createClient<paths>({
      baseUrl,
      headers: {
        "x-vercel-protection-bypass": key,
      },
    });
  }
  return client;
}
