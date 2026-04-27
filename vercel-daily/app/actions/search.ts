'use server'

import { searchArticles } from "@/lib/data"

export async function search(search?: string, categories?: string[], limit: number=12) {
  const articles = await searchArticles(search, categories, limit);
  return articles;
}