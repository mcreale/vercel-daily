'use server'

import type { CategorySlug } from "@/lib/types/return-types";
import {
  searchArticles,
  type SearchArticlesResult,
} from "@/lib/data";

export async function fetchSearchArticlesPage(
  search: string | undefined,
  category: CategorySlug | undefined,
  limit: number,
  page: number,
): Promise<SearchArticlesResult> {
  return searchArticles(search, category, limit, page);
}