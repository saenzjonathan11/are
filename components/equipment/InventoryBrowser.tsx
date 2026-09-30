"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { track } from "@/lib/analytics";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { categoryFamily, filterInventory } from "@/lib/inventory/search";
import type { Availability, Category, Condition, LocalizedEquipment, SortKey } from "@/lib/inventory/types";
import { cn, fmt } from "@/lib/utils";
import { button } from "@/components/ui/button";
import { EquipmentCard } from "./EquipmentCard";

type Labels = Pick<Dictionary, "inventory" | "card" | "condition" | "availability"> & {
  requestButton: string;
};

const SORTS: SortKey[] = ["newest", "price-asc", "price-desc", "category"];
const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);
const num = (v: string | null) => (v && !Number.isNaN(Number(v)) ? Number(v) : undefined);

export function InventoryBrowser({
  items,
  categories,
  lang,
  labels,
  requestHref,
  defaultLocation,
}: {
  items: LocalizedEquipment[];
  categories: Category[];
  lang: Locale;
  labels: Labels;
  requestHref: string;
  defaultLocation: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const t = labels.inventory;

  const q = sp.get("q") ?? "";
  const category = sp.get("category") ?? "";
  const conditions = list(sp.get("condition")) as Condition[];
  const brands = list(sp.get("brand"));
  const availability = list(sp.get("availability")) as Availability[];
  const minPrice = num(sp.get("min"));
  const maxPrice = num(sp.get("max"));
  const sortParam = sp.get("sort") as SortKey | null;
  const sort: SortKey = sortParam && SORTS.includes(sortParam) ? sortParam : "newest";

  const results = filterInventory(
    items,
    { q, category: category || undefined, condition: conditions, brand: brands, availability, minPrice, maxPrice, sort },
    categories,
  );

  function update(patch: Record<string, string | string[] | number | undefined>) {
    const next = new URLSearchParams(sp.toString());
    for (const [key, value] of Object.entries(patch)) {
      const str = Array.isArray(value) ? value.join(",") : value == null ? "" : String(value);
      if (str) next.set(key, str);
      else next.delete(key);
    }
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const toggle = (key: string, current: string[], value: string) =>
    update({ [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value] });

  // Record searches that arrive from the homepage search box (?q=...)
  useEffect(() => {
    if (q) track("search_inventory", { search_term: q, source: "url" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- search box: debounced, synced with the URL ---------- */
  const [text, setText] = useState(q);
  const [lastQ, setLastQ] = useState(q);
  if (q !== lastQ) {
    setLastQ(q);
    setText(q);
  }
  useEffect(() => {
    if (text.trim() === q) return;
    const id = setTimeout(() => {
      update({ q: text.trim() });
      if (text.trim()) track("search_inventory", { search_term: text.trim() });
    }, 400);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  /* ---------- facet options (only values that exist) ---------- */
  const categoryOptions = categories
    .map((c) => ({ c, count: items.filter((i) => categoryFamily(c.slug, categories).includes(i.category)).length }))
    .filter(({ c, count }) => count > 0 || c.slug === category);
  const conditionOptions = [...new Set(items.map((i) => i.condition))];
  const brandOptions = [...new Set(items.map((i) => i.brand).filter((b): b is string => Boolean(b)))].sort();
  const availabilityOptions = [...new Set(items.map((i) => i.availability))];
  const hasPrices = items.some((i) => i.price != null);

  const activeCount =
    (category ? 1 : 0) +
    conditions.length +
    brands.length +
    availability.length +
    (minPrice != null ? 1 : 0) +
    (maxPrice != null ? 1 : 0);

  const clearAll = () => {
    setText("");
    router.replace(pathname, { scroll: false });
  };

  /* ---------- mobile filter dialog ---------- */
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openFilters = () => dialogRef.current?.showModal();
  const closeFilters = () => dialogRef.current?.close();

  const countText = results.length === 1 ? t.resultsOne : fmt(t.results, { count: results.length });
  const catName = (slug: string) => categories.find((c) => c.slug === slug)?.name[lang] ?? slug;

  const baseId = useId();

  // A render function (not a nested component) so inputs keep focus across re-renders.
  const renderFilters = (idPrefix: string) => {
    const fieldset = "border-t border-line pt-4";
    const legend = "mb-2 font-display text-lg font-bold";
    const check = "flex min-h-10 cursor-pointer items-center gap-3";
    const box = "size-5 accent-[var(--brand-accent)]";
    return (
      <div className="space-y-5">
        <div>
          <label htmlFor={`${idPrefix}-category`} className="mb-2 block font-display text-lg font-bold">
            {t.category}
          </label>
          <select
            id={`${idPrefix}-category`}
            value={category}
            onChange={(e) => update({ category: e.target.value })}
            className="min-h-12 w-full rounded-[3px] border border-line bg-paper px-3"
          >
            <option value="">{t.allCategories}</option>
            {categoryOptions.map(({ c, count }) => (
              <option key={c.slug} value={c.slug}>
                {c.parent ? "\u00a0\u00a0" : ""}
                {c.name[lang]} ({count})
              </option>
            ))}
          </select>
        </div>

        {conditionOptions.length > 1 && (
          <fieldset className={fieldset}>
            <legend className={legend}>{t.condition}</legend>
            {conditionOptions.map((c) => (
              <label key={c} className={check}>
                <input type="checkbox" className={box} checked={conditions.includes(c)} onChange={() => toggle("condition", conditions, c)} />
                {labels.condition[c]} <span className="text-steel">({items.filter((i) => i.condition === c).length})</span>
              </label>
            ))}
          </fieldset>
        )}

        {brandOptions.length > 0 && (
          <fieldset className={fieldset}>
            <legend className={legend}>{t.brand}</legend>
            {brandOptions.map((b) => (
              <label key={b} className={check}>
                <input type="checkbox" className={box} checked={brands.includes(b)} onChange={() => toggle("brand", brands, b)} />
                {b} <span className="text-steel">({items.filter((i) => i.brand === b).length})</span>
              </label>
            ))}
          </fieldset>
        )}

        {availabilityOptions.length > 1 && (
          <fieldset className={fieldset}>
            <legend className={legend}>{t.availability}</legend>
            {availabilityOptions.map((a) => (
              <label key={a} className={check}>
                <input
                  type="checkbox"
                  className={box}
                  checked={availability.includes(a)}
                  onChange={() => toggle("availability", availability, a)}
                />
                {labels.availability[a]}
              </label>
            ))}
          </fieldset>
        )}

        {hasPrices && (
          <fieldset className={fieldset}>
            <legend className={legend}>{t.price}</legend>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ["min", t.minPrice, minPrice],
                  ["max", t.maxPrice, maxPrice],
                ] as const
              ).map(([key, label, value]) => (
                <div key={key}>
                  <label htmlFor={`${idPrefix}-${key}`} className="mb-1 block text-[0.95rem] text-steel">
                    {label}
                  </label>
                  <input
                    id={`${idPrefix}-${key}`}
                    type="number"
                    inputMode="numeric"
                    min={0}
                    defaultValue={value ?? ""}
                    onBlur={(e) => update({ [key]: e.target.value })}
                    className="min-h-12 w-full rounded-[3px] border border-line px-3"
                  />
                </div>
              ))}
            </div>
          </fieldset>
        )}

        {activeCount > 0 && (
          <button type="button" onClick={clearAll} className="font-semibold text-accent underline underline-offset-4">
            {t.clear}
          </button>
        )}
      </div>
    );
  };

  const chips: { key: string; label: string; remove: () => void }[] = [
    ...(category ? [{ key: "cat", label: catName(category), remove: () => update({ category: "" }) }] : []),
    ...conditions.map((c) => ({ key: `c-${c}`, label: labels.condition[c], remove: () => toggle("condition", conditions, c) })),
    ...brands.map((b) => ({ key: `b-${b}`, label: b, remove: () => toggle("brand", brands, b) })),
    ...availability.map((a) => ({
      key: `a-${a}`,
      label: labels.availability[a],
      remove: () => toggle("availability", availability, a),
    })),
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      {/* Desktop sidebar */}
      <aside aria-label={t.filters} className="hidden lg:block">
        <h2 className="sr-only">{t.filters}</h2>
        {renderFilters(`${baseId}-d`)}
      </aside>

      <div className="min-w-0">
        {/* Toolbar */}
        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            update({ q: text.trim() });
            if (text.trim()) track("search_inventory", { search_term: text.trim() });
          }}
        >
          <label htmlFor={`${baseId}-q`} className="sr-only">
            {t.searchLabel}
          </label>
          <div className="relative">
            <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-steel" />
            <input
              id={`${baseId}-q`}
              type="search"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={labels.inventory.searchLabel}
              enterKeyHint="search"
              autoComplete="off"
              className="min-h-13 w-full rounded-[3px] border-2 border-ink bg-paper pl-11 pr-4 text-lg"
            />
          </div>
        </form>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p aria-live="polite" className="mr-auto font-semibold">
            {countText}
          </p>
          <button type="button" onClick={openFilters} className={button("outline", "sm", "lg:hidden")}>
            <SlidersHorizontal aria-hidden className="size-4" />
            {t.showFilters}
            {activeCount > 0 && (
              <span className="rounded-full bg-accent px-2 text-sm text-white">{activeCount}</span>
            )}
          </button>
          <label className="flex items-center gap-2 text-[0.95rem]">
            <span className="text-steel">{t.sort}</span>
            <select
              value={sort}
              onChange={(e) => update({ sort: e.target.value === "newest" ? "" : e.target.value })}
              className="min-h-10 rounded-[3px] border border-line bg-paper px-2"
            >
              {SORTS.filter((s) => hasPrices || !s.startsWith("price")).map((s) => (
                <option key={s} value={s}>
                  {t.sortOptions[s]}
                </option>
              ))}
            </select>
          </label>
        </div>

        {chips.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip.key}>
                <button
                  type="button"
                  onClick={chip.remove}
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-concrete px-3 text-[0.95rem] font-semibold hover:bg-line"
                >
                  {chip.label}
                  <X aria-hidden className="size-4" />
                  <span className="sr-only">({t.clear})</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {results.length > 0 ? (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((item, i) => (
              <li key={item.id} className="flex">
                <div className="flex w-full flex-col [&>article]:grow">
                  <EquipmentCard item={item} lang={lang} labels={labels} defaultLocation={defaultLocation} headingLevel="h2" priority={i < 3} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-[3px] border border-line bg-concrete p-6 sm:p-8">
            <h2 className="text-3xl">{t.noResultsHeading}</h2>
            <p className="mt-2 max-w-prose text-steel">{t.noResultsBody}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={q ? `${requestHref}?equipmentType=${encodeURIComponent(q)}` : requestHref}
                className={button("primary")}
              >
                {labels.requestButton}
              </Link>
              {(activeCount > 0 || q) && (
                <button type="button" onClick={clearAll} className={button("outline")}>
                  {t.clear}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile filter sheet: native <dialog> handles focus trapping and Escape */}
      <dialog
        ref={dialogRef}
        aria-labelledby={`${baseId}-dlg-title`}
        className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-md bg-paper p-0 backdrop:bg-ink/60"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <h2 id={`${baseId}-dlg-title`} className="text-2xl">
              {t.filters}
            </h2>
            <button type="button" onClick={closeFilters} className="inline-flex size-11 items-center justify-center rounded-[3px] hover:bg-concrete">
              <X aria-hidden className="size-6" />
              <span className="sr-only">{t.closeFilters}</span>
            </button>
          </div>
          <div className="grow overflow-y-auto px-4 py-4">
            {renderFilters(`${baseId}-m`)}
          </div>
          <div className={cn("border-t border-line p-4", "pb-[calc(1rem+env(safe-area-inset-bottom))]")}>
            <button type="button" onClick={closeFilters} className={button("primary", "lg", "w-full")}>
              {fmt(t.showResults, { count: results.length })}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
