import Link from "next/link";
import { notFound } from "next/navigation";
import { business } from "@/config/business";
import { categories as allCategories } from "@/data/categories";
import { assertLocale, getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n/config";
import { inventoryRepo } from "@/lib/inventory";
import { buildMetadata } from "@/lib/seo";
import { fmt } from "@/lib/utils";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { RequestCta } from "@/components/home/CtaBands";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CategoryIcon } from "@/components/shared/CategoryIcon";
import { button } from "@/components/ui/button";


export function generateStaticParams() {
  return allCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/categories/[slug]">) {
  const { lang: raw, slug } = await params;
  const lang = assertLocale(raw);
  const category = await inventoryRepo.getCategoryBySlug(slug);
  if (!category) return {};
  const title =
    lang === "es"
      ? `${category.name.es} para restaurantes en Dallas-Fort Worth`
      : `${category.name.en} for Restaurants in Dallas-Fort Worth`;
  return buildMetadata({ lang, path: `/categories/${slug}`, title, description: category.description[lang] });
}

export default async function CategoryPage({ params }: PageProps<"/[lang]/categories/[slug]">) {
  const { lang: raw, slug } = await params;
  const lang = assertLocale(raw);
  const dict = getDictionary(lang);
  const category = await inventoryRepo.getCategoryBySlug(slug);
  if (!category) notFound();

  const [items, categories, counts] = await Promise.all([
    inventoryRepo.getInventoryByCategory(lang, slug),
    inventoryRepo.getCategories(),
    inventoryRepo.getCategoryCounts(),
  ]);
  const parent = category.parent ? categories.find((c) => c.slug === category.parent) : null;
  const children = categories.filter((c) => c.parent === slug);
  const p = (path: string) => localizedPath(lang, path);
  const defaultLocation = `${business.address.city}, ${business.address.state}`;
  const name = category.name[lang];

  return (
    <>
      <div className="container-x py-8 sm:py-10">
        <Breadcrumbs
          label={dict.a11y.breadcrumb}
          items={[
            { name: dict.nav.home, path: p("/") },
            { name: dict.nav.categories, path: p("/categories") },
            ...(parent ? [{ name: parent.name[lang], path: p(`/categories/${parent.slug}`) }] : []),
            { name, path: p(`/categories/${slug}`) },
          ]}
        />
        <div className="mt-4 flex items-center gap-4">
          <CategoryIcon name={category.icon} className="size-12 shrink-0 text-accent" />
          <h1 className="text-5xl sm:text-6xl">{name}</h1>
        </div>
        <p className="mt-3 max-w-2xl text-lg text-steel">{category.description[lang]}</p>

        {children.length > 0 && (
          <nav aria-label={dict.categories.subcategories} className="mt-6">
            <ul className="flex flex-wrap gap-2">
              {children.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={p(`/categories/${c.slug}`)}
                    className="inline-flex min-h-10 items-center rounded-full border border-line px-4 font-semibold hover:border-ink"
                  >
                    {c.name[lang]} ({counts[c.slug] ?? 0})
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {items.length > 0 ? (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <li key={item.id} className="flex [&>article]:grow">
                <EquipmentCard item={item} lang={lang} labels={dict} defaultLocation={defaultLocation} headingLevel="h2" priority={i < 3} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-[3px] border border-line bg-concrete p-6 sm:p-8">
            <h2 className="text-3xl">{fmt(dict.categories.emptyHeading, { category: name })}</h2>
            <p className="mt-2 max-w-prose text-steel">{dict.categories.emptyBody}</p>
            <Link href={`${p("/request")}?equipmentType=${encodeURIComponent(name)}`} className={button("primary", "md", "mt-5")}>
              {dict.requestCta.button}
            </Link>
          </div>
        )}
      </div>
      {items.length > 0 && <RequestCta lang={lang} dict={dict} />}
    </>
  );
}
