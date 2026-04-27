import Link from "next/link";
import { Suspense } from "react";
import SubscribeButton from "../subscriptions/subscribe-button";

export default function Hero() {
  return (
    <section className="py-20 dark:bg-black dark:text-white bg-gray-100">
      <div className="container mx-auto ">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 sm:w-2/3">News and insights for modern web developers.</h1>
        <p className="text-lg dark:text-gray-300 text-gray-700">Changelogs, engineering deep dives, customer stories, and community updates &mdash; all in one place.</p>
        <div className="mt-8 flex md:block items-center gap-4">
          <Link prefetch={false} href="/search" className="dark-button">
            Explore Articles
          </Link>
          <Suspense>
            <SubscribeButton className="cursor-pointer button border-white "/>
          </Suspense>
        </div>
      </div>
    </section>
  );
}