'use server'

import { searchArticles } from "@/lib/data"

export async function search(search?: string, category?: "changelog" | "engineering" | "customers" | "company-news" | "community" | undefined, limit: number=12) {
  const articles = await searchArticles(search, category, limit);
  return articles;
}