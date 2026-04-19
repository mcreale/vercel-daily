import type { components } from "../types/news-api";
import Image from "next/image";
import Link from "next/link";

type Article = components["schemas"]["Article"];

export default function ArticleCard({ article }: { article: Article }) {
  const { title, excerpt, slug, image } = article;

  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-gray-800 border-bg-gray-800" >
      <Link href={`/articles/${slug ?? ""}`} className="text-black dark:text-white hover:underline">
        {image ? (
          <Image
            src={image}
            alt={title ?? "Article"}
            width={250}
            height={250}
            className="w-full h-auto rounded mb-2 object-cover"
          />
        ) : null}
        <div className="font-semibold p-4">{title}</div>
      </Link>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 p-4">{excerpt}</p>
    </div>
  );
}