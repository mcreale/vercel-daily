'use client';

import { useEffect, useState } from "react";
import ArticleList from "../articles/article-list";
import {search} from "@/app/actions/search";
import { Article } from "@/lib/types/return-types";

export default function SearchArticles({
  query, category,limit=12
}: {  query?: string; category?: "changelog" | "engineering" | "customers" | "company-news" | "community" | undefined, limit?: number }) {

  const [articles, setArticles] = useState<Article[]>([]);


    useEffect(() => {
      console.log("Initiating search with parameters:", { query, category, limit });
        search(query, category, limit).then(setArticles).catch((err) => {
            console.error("Error searching articles:", err);
            setArticles([]);
        });
    } , [query, category, limit]);

  return (
       <ArticleList
      title={`${articles.length} Articles${query ? ` matching "${query}"` : ""} ${category ? ` in category "${category}"` : ""}`}
      listArticles={articles}
      showMoreLink={false}
      eagerLoadCount={6}
      />
  );
} 