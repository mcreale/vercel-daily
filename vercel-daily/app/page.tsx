import Image from "next/image";
import { listArticles } from "@/lib/data";
import type { components } from "@/lib/types/news-api";
import Hero from "@/components/hero";

async function FeaturedArticles() {
  try {
    const { data, error, response } = await listArticles({
      featured: "true",
      limit: 5,
    });
    if (error || !response.ok) {
      return (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Could not load articles (HTTP {response.status}).
        </p>
      );
    }
    const body = data as components["schemas"]["ArticleListResponse"] | undefined;
    const articles = body?.data;
    if (!articles?.length) {
      return (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          No featured articles returned.
        </p>
      );
    }
    return (
      <ul className="list-disc space-y-1 pl-5 text-left text-sm text-zinc-700 dark:text-zinc-300">
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    );
  } catch (e) {
    return (
      <p className="max-w-md text-sm text-amber-900 dark:text-amber-100">
        {e instanceof Error ? e.message : "Failed to load articles."}
      </p>
    );
  }
}

export default function Home() {
  return (
    
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans dark:bg-black">
      <main className="container flex flex-col gap-8">
        <Hero />
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Featured articles (server fetch via OpenAPI client). Set{" "}
            <code className="rounded bg-zinc-100 px-1 text-sm dark:bg-zinc-800">
              NEWS_API_BASE_URL
            </code>{" "}
            and{" "}
            <code className="rounded bg-zinc-100 px-1 text-sm dark:bg-zinc-800">
              NEWS_API_PROTECTION_BYPASS
            </code>{" "}
            in{" "}
            <code className="rounded bg-zinc-100 px-1 text-sm dark:bg-zinc-800">
              .env.local
            </code>
            . Then head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
          <div className="w-full max-w-md rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left dark:border-zinc-800 dark:bg-zinc-950">
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-zinc-500">
              API preview
            </p>
            <FeaturedArticles />
          </div>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
