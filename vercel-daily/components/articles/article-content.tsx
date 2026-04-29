import ContentBlock, { ContentBlockType } from "./content-block";
import { isSubscribed } from "@/lib/subscription";
import type { Article } from "@/lib/types/return-types";
import SubscribeButton from "../subscriptions/subscribe-button";
import { connection } from "next/server";

export default async function ArticleContent({
  content,
  excerpt,
}: {
  article: Article;
  canonicalUrl: string;
  content: ContentBlockType[] | undefined;
  excerpt: string;
}) {
  //await connection();
  const subscribed = await isSubscribed();

  if (subscribed) {
    return (
      <>  
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <ContentBlock blocks={content} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
      <div className="not-prose mb-6 rounded-lg border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/50 dark:bg-amber-950/30">     
        {excerpt ? (
          <p className="mb-4 text-sm text-amber-900/90 dark:text-amber-200/90">{excerpt}</p>
        ) : null}
        <h2 className="mb-2 text-lg font-semibold text-amber-950 dark:text-amber-100">
          Want to know more? Subscribe to read the full article!
        </h2>
        <SubscribeButton className="dark-button"/>
      </div>
    </div>
    </>
  );
}