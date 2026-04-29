"use client";

import { faMagnifyingGlass, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useEffect,
  useState,
  useTransition,
  SubmitEventHandler
} from "react";
import Form from "next/form";
import path from "path";

function navigateToSearch(
  router: ReturnType<typeof useRouter>,
  searchParams: ReturnType<typeof useSearchParams>,
  qRaw: string | undefined,
  pathname: string = "/search"
) {
  const params = new URLSearchParams(searchParams.toString());
  const trimmed = qRaw?.trim() ?? "";
  if (trimmed) params.set("q", trimmed);
  else params.delete("q");
  const qs = params.toString();
  router.push(qs ? `${pathname}?${qs}` : pathname);
}

export default function SearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const qFromUrl = searchParams.get("q") ?? "";
  const [localQ, setLocalQ] = useState(qFromUrl);

  const pathname = usePathname();

  const actionUrl = pathname;
  useEffect(() => {
    setLocalQ(qFromUrl);
  }, [qFromUrl]);

  /** Auto-submit when query is longer than 3 characters and typing paused ≥500 ms. */
  useEffect(() => {
    const trimmed = localQ.trim();
    if (trimmed.length <= 2) return;
    if (trimmed === qFromUrl.trim()) return;

    const id = window.setTimeout(() => {
      const next = localQ.trim();
      if (next.length <= 2) return;
      if (next === searchParams.get("q")?.trim()) return;
      startTransition(() => {
        navigateToSearch(router, searchParams, next, pathname);
      });
    }, 500);

    return () => window.clearTimeout(id);
  }, [localQ, qFromUrl, router, searchParams, pathname]);

  function onClear() {
    startTransition(() => {
      router.push(pathname);
    });
  }

  return (
    <section className="container">
      <h1 className="pb-4 text-3xl font-bold">Search for Articles</h1>
        <Form
          action={actionUrl}
        className="mb-6 flex flex-wrap items-center gap-3 rounded bg-gray-100 p-6 dark:bg-zinc-800/60 sm:gap-4"
        aria-busy={isPending}
        replace={true}
      >
        <label className="sr-only" htmlFor="search-articles">
          Search articles
        </label>
        <input
          id="search-articles"
          name="q"
          type="search"
          placeholder="Search articles…"
          value={localQ}
          onChange={(e) => setLocalQ(e.target.value)}
          autoComplete="off"
          disabled={isPending}
          className="flex-1 rounded border border-zinc-300 bg-white p-2 text-zinc-900 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        />

        <div className="flex flex-1 items-center justify-end gap-2 sm:flex-initial">
          {localQ && 
            <Link
              href={pathname}
              className="button dark:button-border flex-1 bg-zinc-800/60 text-center dark:bg-zinc-800/60"
              onClick={onClear}
            >
                <FontAwesomeIcon icon={faTimes} className="h-3.5 w-3.5" />
            </Link>
          }
          <button
            type="submit"
            disabled={isPending}
            className="dark-button cursor-pointer inline-flex min-w-[7.5rem] shrink-0 flex-1 items-center justify-center gap-2 disabled:pointer-events-none disabled:opacity-70"
          >
            {isPending ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="h-3.5 w-3.5" />
              </>
            ) : (
              <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </Form>
    </section>
  );
}
