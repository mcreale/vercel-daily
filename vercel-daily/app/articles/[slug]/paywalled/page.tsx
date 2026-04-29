import ArticlePage, { generateMetadata, generateStaticParams } from "../page";

export { generateMetadata, generateStaticParams };

export default function PaywalledArticlePage(props: any) {
  return (
    <>
    <ArticlePage {...props} subscribed={false} />
    </>
  );
}