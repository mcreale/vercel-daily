import type { components } from "../../lib/types/news-api";
import Image from "next/image";
import Link from "next/link";

type Article = components["schemas"]["Article"];

export default function ArticleCard({ article, loadingType }: { article: Article, loadingType?: "eager" | "lazy" }) {
  const { title, excerpt, slug, image, } = article;

  return (
    <article className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-800 border-gray-300 overflow-hidden" >
      <Link href={`/articles/${slug ?? ""}`} className="text-black dark:text-white hover:underline">
        <div className="relative aspect-[16/9] block">
        {image ? (
          <Image
            src={image}
            alt={title ?? "Article"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading={loadingType}
            fill
            className="object-cover border-b border-gray-300 dark:border-gray-700"
          />
        ) : null}
        </div>
        <h3 className="font-semibold p-4">{title}</h3>
      </Link>
      <p className="text-xs text-zinc-600 dark:text-zinc-400 p-4 py-0">Published {new Date(article?.publishedAt ?? "").toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 p-4 pb-8">{excerpt}</p>
    </article>
  );
}