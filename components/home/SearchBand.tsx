import Link from "next/link";
import { Search } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { button } from "@/components/ui/button";

/** Plain GET form so search works before JavaScript loads. */
export function SearchBand({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const action = localizedPath(lang, "/equipment");
  return (
    <section aria-labelledby="search-heading" className="on-dark bg-ink py-10 text-white sm:py-12">
      <div className="container-x">
        <h2 id="search-heading" className="text-3xl text-white sm:text-4xl">
          {dict.search.heading}
        </h2>
        <form action={action} method="get" role="search" className="mt-5 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="home-search" className="sr-only">
            {dict.search.label}
          </label>
          <div className="relative grow">
            <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-6 -translate-y-1/2 text-steel" />
            <input
              id="home-search"
              name="q"
              type="search"
              placeholder={dict.search.placeholder}
              enterKeyHint="search"
              className="min-h-14 w-full rounded-[3px] bg-paper pl-13 pr-4 text-lg text-ink placeholder:text-steel"
            />
          </div>
          <button type="submit" className={button("primary", "lg", "min-h-14 sm:px-8")}>
            {dict.search.button}
          </button>
        </form>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-white/75">{dict.search.popular}:</span>
          {dict.search.suggestions.map((s) => (
            <Link
              key={s}
              href={`${action}?q=${encodeURIComponent(s)}`}
              className="inline-flex min-h-9 items-center rounded-full border border-white/30 px-3 text-[0.95rem] hover:border-white hover:bg-white/10"
            >
              {s}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
