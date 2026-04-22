import type { components } from "@/lib/types/news-api";
import Image from "next/image";
import Markdown from "react-markdown";

export type ContentBlockType = components["schemas"]["ContentBlock"];

function CustomMarkdown({ markdownContent }: { markdownContent: string }) {
  return (
    <Markdown components={{ p: ({ children }) => <>{children}</> }}>
      {markdownContent}
    </Markdown>
  );
}

function ContentBlockItem({ block }: { block: ContentBlockType }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p><CustomMarkdown markdownContent={block.text} /></p>
      );
    case "heading": {
      
      return block.level === 2 ? (
        <h2><CustomMarkdown markdownContent={block.text} /></h2>
      ) : (
        <h3><CustomMarkdown markdownContent={block.text} /></h3>
      );
    }
    case "blockquote":
      return (
        <blockquote className="my-6 border-l-4 border-zinc-300 py-1 pl-4 text-lg italic text-zinc-700 dark:border-zinc-600 dark:text-zinc-300">
          {block.text}
        </blockquote>
      );
    case "unordered-list":
      return (
        <ul className="mb-4 list-disc space-y-2 pl-6 text-zinc-800 dark:text-zinc-200">
          {block.items.map((item:string, i) => (
            <li key={i} className="leading-7">
              <CustomMarkdown markdownContent={item} />
            </li>
          ))}
        </ul>
      );
    case "ordered-list":
      return (
        <ol className="mb-4 list-decimal space-y-2 pl-6 text-zinc-800 dark:text-zinc-200">
          {block.items.map((item:string, i) => (
            <li key={i} className="leading-7 pl-1">
              <CustomMarkdown markdownContent={item} />
            </li>
          ))}
        </ol>
      );
    case "image":
      return (
        <>
        {block.src &&
          <figure className="my-8">
            <Image
              src={block.src}
              alt={block.alt}
              width={1200}
              height={675}
              className="h-auto w-full max-w-full rounded-lg border border-zinc-200 object-cover dark:border-zinc-700"
              sizes="(max-width: 768px) 100vw, 42rem"
            />
            {block.caption ? (
              <figcaption className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
                <CustomMarkdown markdownContent={block.caption} />
              </figcaption>
            ) : null}
          </figure>}
        </>
        );
    default: {
      const notOtherwiseFound: never = block;
      return notOtherwiseFound;
    }
  }
}

export default function ContentBlock({
  blocks,
  className = "",
}: {
  blocks: ContentBlockType[] | undefined;
  className?: string;
}) {
  if (!blocks?.length) {
    return null;
  }

  return (
    <div className={`content-block ${className}`.trim()}>
      {blocks.map((block, index) => (
        <ContentBlockItem
          key={`${block.type}-${index}`}
          block={block}
        />
      ))}
    </div>
  );
}
