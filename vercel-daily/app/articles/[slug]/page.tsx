import ContentBlock from "@/components/content-block";
import { getArticle, listArticles } from "@/lib/data";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 3600
 
export async function generateStaticParams() {
  const articles = await listArticles();
  const list = articles.data?.data;
  if (!articles.response.ok || articles.error || !list?.length) {
    return [];
  }
  return list.map((article) => ({
    slug: article.slug ?? "",
  }));
}


async function getArticleData({slug}: {slug: string}) {
  const article = await getArticle(slug);
  return  article.data?.data;  
}

export async function  generateMetadata({ params }: { params: Promise<{ slug: string }> }) {

  const { slug } = await params;
  const article = await getArticleData({slug});

  return {
    title: article?.title ?? "Vercel Daily Article: Vercel Daily",
    description: article?.excerpt ?? "Read this article on Vercel Daily.",
    openGraph: {
      title: article?.title ?? "Vercel Daily Article: Vercel Daily", 
      description: article?.excerpt ?? "Read this article on Vercel Daily.",
      url: `https://vercel-daily.vercel.app/articles/${slug}`,
      images: article?.image ? [
        {
          url: article.image,
          alt: article.title ?? "Article Image",
        },
      ] : undefined,
    },
  };
}



export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleData({slug});

  return (
    <article className="container py-10">
      <Link href="/articles" className="text-sm dark:text-gray-300 hover:underline mb-4 inline-block" prefetch>
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Articles
      </Link>
      <h1 className="mt-4 mb-6 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
        {article?.title}
      </h1>
      <aside>
        <p className="text-md mb-4 text-zinc-600 dark:text-zinc-400">
          Published on {new Date(article?.publishedAt ?? "").toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {article?.author ? ` by ${article.author.name}` : ''}
        </p>
        
      </aside>

      {article?.image ? (
        <Image
          src={article.image}
          alt={article.title ?? ""}
          width={1200}
          height={675}
          className="mb-8 h-auto w-full max-w-full rounded-lg object-cover"
          sizes="(max-width: 768px) 100vw, 42rem"
          priority
        />
      ) : null}
      <ContentBlock blocks={article?.content} />
    </article>
  );
}