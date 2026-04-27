export default function SearchFallback() {
  return (
    <section id="featured-articles" className="py-12 container">
      <div className="flex items-between mb-8 ">
        <h2 className="text-4xl font-bold dark:text-white">Loading Articles...</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="min-h-[20rem] animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800/80 w-full"
            aria-hidden
          >
          </div>
        ))}
      </div>
    </section>
  );
}
