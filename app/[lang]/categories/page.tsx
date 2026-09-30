import Link from "next/link";
import { assertLocale, getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n/config";
import { inventoryRepo } from "@/lib/inventory";
import { buildMetadata } from "@/lib/seo";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { RequestCta } from "@/components/home/CtaBands";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export async function generateMetadata({ params }: PageProps<"/[lang]/categories">) {
  const lang = assertLocale((await params).lang);
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/categories",
    title: dict.categories.pageTitle,
    description: dict.categories.pageDescription,
  });
}

export default async function CategoriesPage({ params }: PageProps<"/[lang]/categories">) {
  const lang = assertLocale((await params).lang);
  const dict = getDictionary(lang);
  const [categories, counts] = await Promise.all([inventoryRepo.getCategories(), inventoryRepo.getCategoryCounts()]);
  const top = categories.filter((c) => c.parent === null);

  return (
    <>
      <div className="container-x py-8 sm:py-10">
        <Breadcrumbs
          label={dict.a11y.breadcrumb}
          items={[
            { name: dict.nav.home, path: localizedPath(lang, "/") },
            { name: dict.nav.categories, path: localizedPath(lang, "/categories") },
          ]}
        />
        <h1 className="mt-4 text-5xl sm:text-6xl">{dict.categories.pageTitle}</h1>
        <p className="mt-3 max-w-2xl text-lg text-steel">{dict.categories.pageDescription}</p>
        <div className="mt-8">
          <CategoryGrid categories={top} counts={counts} lang={lang} dict={dict} headingLevel="h2" />
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {top
            .filter((parent) => categories.some((c) => c.parent === parent.slug))
            .map((parent) => (
              <div key={parent.slug}>
                <h2 className="text-2xl">{parent.name[lang]}</h2>
                <ul className="mt-2 space-y-1">
                  {categories
                    .filter((c) => c.parent === parent.slug)
                    .map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={localizedPath(lang, `/categories/${c.slug}`)}
                          className="underline-offset-4 hover:text-accent hover:underline"
                        >
                          {c.name[lang]} <span className="text-steel">({counts[c.slug] ?? 0})</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
      <RequestCta lang={lang} dict={dict} />
    </>
  );
}
