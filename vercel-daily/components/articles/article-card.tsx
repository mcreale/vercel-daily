import type { components } from "../../lib/types/news-api";
import Image from "next/image";
import Link from "next/link";

type Article = components["schemas"]["Article"];

export default function ArticleCard({ article, loadingType }: { article: Article, loadingType?: "eager" | "lazy" }) {
  const { title, excerpt, slug, image, } = article;

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-800 border-gray-300 overflow-hidden" >
      <Link href={`/articles/${slug ?? ""}`} className="text-black dark:text-white hover:underline">
        {image ? (
          <Image
            src={image}
            alt={title ?? "Article"}
            width={250}
            height={250}
            loading={loadingType}
            className="w-full max-h-[190px] mb-2 object-cover border-b border-gray-300 dark:border-gray-700"
          />
        ) : null}
        <div className="font-semibold p-4">{title}</div>

      </Link>
      <p className="text-xs text-zinc-600 dark:text-zinc-400 p-4 py-0">Published {new Date(article?.publishedAt ?? "").toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 p-4 pb-8">{excerpt}</p>
    </div>
  );
}