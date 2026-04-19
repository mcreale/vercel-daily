export default function Hero() {
  return (
    <section className="py-20 dark:bg-black dark:text-white bg-gray-100">
      <div className="container mx-auto ">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 sm:w-2/3">News and insights for modern web developers.</h1>
        <p className="text-lg dark:text-gray-300 text-gray-700">Changelogs, engineering deep dives, customer stories, and community updates &mdash; all in one place.</p>
        <div className="mt-8">
          <a href="#featured-articles" className="inline-block bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-colors duration-300">
            Explore Articles
          </a>
        </div>
      </div>
    </section>
  );
}