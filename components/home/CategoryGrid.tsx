import Link from "next/link";
import type { Dictionary } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import type { Category } from "@/lib/inventory/types";
import { fmt } from "@/lib/utils";
import { CategoryIcon } from "@/components/shared/CategoryIcon";

export function CategoryGrid({
  categories,
  counts,
  lang,
  dict,
  headingLevel = "h3",
}: {
  categories: Category[];
  counts: Record<string, number>;
  lang: Locale;
  dict: Dictionary;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {categories.map((c) => {
        const count = counts[c.slug] ?? 0;
        return (
          <li key={c.slug} className="flex">
            <Link
              href={localizedPath(lang, `/categories/${c.slug}`)}
              className="group flex w-full flex-col gap-3 rounded-[3px] border border-line bg-paper p-4 hover:border-ink sm:p-5"
            >
              <CategoryIcon name={c.icon} className="size-8 text-accent" />
              <H className="text-xl leading-tight group-hover:text-accent sm:text-2xl">{c.name[lang]}</H>
              <span className="mt-auto text-[0.95rem] text-steel">
                {count === 0
                  ? dict.categories.none
                  : count === 1
                    ? dict.categories.listedOne
                    : fmt(dict.categories.listed, { count })}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
