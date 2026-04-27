"use client";

import { faChevronDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  SubmitEventHandler,
  useRef,
  useState,
  useTransition,
} from "react";

export type SearchCategoryOption = {
  slug: string;
  name: string;
};

function buildSearchHref(q: string | undefined, cat: string | null) {
  const params = new URLSearchParams();
  const trimmed = q?.trim();
  if (trimmed) params.set("q", trimmed);
  if (cat) params.set("cat", cat);
  return params.toString() ? `/search?${params}` : "/search";
}

function firstCatParam(searchParams: URLSearchParams): string | null {
  const all = searchParams.getAll("cat").filter(Boolean);
  return all[0] ?? null;
}

export default function SearchHeader({
  categories,
}: {
  categories: SearchCategoryOption[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const qFromUrl = searchParams.get("q") ?? "";
  const urlCat = firstCatParam(searchParams);
  const [draftCat, setDraftCat] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const trimmed = String(data.get("q") ?? "").trim();
    const params = new URLSearchParams();
    if (trimmed) params.set("q", trimmed);
    const cat = firstCatParam(searchParams);
    if (cat) params.set("cat", cat);
    const href = params.toString() ? `/search?${params}` : "/search";
    startTransition(() => {
      router.push(href);
    });
  };

  function onClear() {
    startTransition(() => {
      router.push("/search");
    });
  }

  function openFilter() {
    setDraftCat(firstCatParam(searchParams));
  }

  function selectDraft(slug: string | null) {
    setDraftCat(slug);
  }

  return (
    <section className="container">
      <h1 className="pb-4 text-3xl font-bold">Search for Articles</h1>
      <form
        onSubmit={onSubmit}
        className="mb-6 flex flex-wrap items-center gap-3 rounded bg-gray-100 p-6 dark:bg-zinc-800/60 sm:gap-4"
        aria-busy={isPending}
      >
        <label className="sr-only" htmlFor="search-articles">
          Search articles
        </label>
        <input
          id="search-articles"
          ref={searchInputRef}
          key={qFromUrl}
          name="q"
          type="search"
          placeholder="Search articles…"
          defaultValue={qFromUrl}
          autoComplete="off"
          disabled={isPending}
          className="flex-1 rounded border border-zinc-300 bg-white p-2 text-zinc-900 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        />

        {categories.length > 0 && (
          <Popover className="relative shrink-0">
            <PopoverButton
              type="button"
              disabled={isPending}
              onClick={openFilter}
              className="inline-flex items-center gap-2 rounded border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 disabled:opacity-60 data-active:bg-zinc-100 data-hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:data-active:bg-zinc-800 dark:data-hover:bg-zinc-800"
            >
              Category
              {urlCat ? (
                <span className="max-w-[7rem] truncate rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100">
                  {categories.find((c) => c.slug === urlCat)?.name ?? urlCat}
                </span>
              ) : null}
              <FontAwesomeIcon
                icon={faChevronDown}
                className="h-3.5 w-3.5 opacity-70"
                aria-hidden
              />
            </PopoverButton>
            <PopoverPanel
              anchor="bottom end"
              transition
              className="z-50 w-[min(100vw-2rem,20rem)] origin-top rounded-xl border border-zinc-200 bg-background p-4 shadow-xl transition duration-100 ease-out [--anchor-gap:8px] data-closed:scale-95 data-closed:opacity-0 dark:border-zinc-700"
            >
              {({ close }) => (
                <>
                  <p className="mb-3 text-sm font-medium text-foreground">
                    Filter by category
                  </p>
                  <ul className="max-h-60 space-y-2 overflow-y-auto pr-1">
                    <li>
                      <label
                        htmlFor="search-cat-all"
                        className="flex cursor-pointer items-start gap-3 rounded-md px-1 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                      >
                        <input
                          id="search-cat-all"
                          type="radio"
                          name="search-category"
                          checked={draftCat === null}
                          onChange={() => selectDraft(null)}
                          className="mt-1 size-4 shrink-0 border-zinc-400 text-zinc-900 focus:ring-2 focus:ring-zinc-400 dark:border-zinc-500 dark:bg-zinc-900"
                        />
                        <span className="text-sm leading-snug text-foreground">
                          All categories
                        </span>
                      </label>
                    </li>
                    {categories.map((cat) => {
                      const id = `search-cat-${cat.slug}`;
                      return (
                        <li key={cat.slug}>
                          <label
                            htmlFor={id}
                            className="flex cursor-pointer items-start gap-3 rounded-md px-1 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800/80"
                          >
                            <input
                              id={id}
                              type="radio"
                              name="search-category"
                              checked={draftCat === cat.slug}
                              onChange={() => selectDraft(cat.slug)}
                              className="mt-1 size-4 shrink-0 border-zinc-400 text-zinc-900 focus:ring-2 focus:ring-zinc-400 dark:border-zinc-500 dark:bg-zinc-900"
                            />
                            <span className="text-sm leading-snug text-foreground">
                              {cat.name}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  <button
                    type="button"
                    className="dark-button mt-4 w-full rounded-lg px-4 py-2.5 text-sm font-semibold"
                    onClick={() => {
                      const qLive =
                        searchInputRef.current?.value ??
                        searchParams.get("q") ??
                        "";
                      startTransition(() => {
                        router.push(
                          buildSearchHref(
                            qLive.trim() || undefined,
                            draftCat,
                          ),
                        );
                      });
                      close();
                    }}
                  >
                    Done
                  </button>
                </>
              )}
            </PopoverPanel>
          </Popover>
        )}

        <div className="flex flex-1 items-center justify-end gap-2 sm:flex-initial">
          <Link
            href="/search"
            className="button dark:button-border flex-1 bg-zinc-800/60 text-center dark:bg-zinc-800/60"
            onClick={onClear}
          >
            {isPending ? (
              <FontAwesomeIcon icon={faSpinner} spin className="h-3.5 w-3.5" />
            ) : (
              "Clear"
            )}
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="dark-button inline-flex min-w-[7.5rem] shrink-0 flex-1 items-center justify-center gap-2 disabled:pointer-events-none disabled:opacity-70"
          >
            {isPending ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="h-3.5 w-3.5" />
                <span>Searching</span>
              </>
            ) : (
              "Search"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
