import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { business, directionsUrl } from "@/config/business";
import { featuredCategorySlugs } from "@/config/content";
import { assertLocale, getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n/config";
import { inventoryRepo } from "@/lib/inventory";
import { buildMetadata } from "@/lib/seo";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { ContactCta, RequestCta, SellCta } from "@/components/home/CtaBands";
import { LocationSection } from "@/components/home/LocationSection";
import { SearchBand } from "@/components/home/SearchBand";
import { TrustSignals } from "@/components/home/TrustSignals";
import { WhyBuy } from "@/components/home/WhyBuy";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { button } from "@/components/ui/button";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  const lang = assertLocale((await params).lang);
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/",
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const lang = assertLocale((await params).lang);
  const dict = getDictionary(lang);
  const p = (path: string) => localizedPath(lang, path);

  const [featured, allCategories, counts] = await Promise.all([
    inventoryRepo.getFeaturedInventory(lang, 6),
    inventoryRepo.getCategories(),
    inventoryRepo.getCategoryCounts(),
  ]);
  const featuredCategories = featuredCategorySlugs
    .map((slug) => allCategories.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const a = business.address;
  const defaultLocation = `${a.city}, ${a.state}`;

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden">
        <div className="container-x grid items-center gap-8 py-8 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:py-16">
          <div>
            <p className="flex items-center gap-2 font-semibold text-steel">
              <MapPin aria-hidden className="size-5 text-accent" />
              {a.city}, Texas
            </p>
            <h1 className="mt-3 text-[2.9rem] leading-[0.95] sm:text-6xl lg:text-7xl">{dict.hero.title}</h1>
            <p className="mt-5 max-w-xl text-xl font-semibold leading-snug sm:text-2xl">
              {dict.hero.subtitle[business.inventoryConditions]}
            </p>
            <p className="mt-2 max-w-xl text-lg text-steel">{dict.hero.body}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href={p("/equipment")} className={button("primary", "lg")}>
                {dict.hero.browse}
              </Link>
              <Link href={p("/request")} className={button("outline", "lg")}>
                {dict.hero.request}
              </Link>
            </div>
            <TrackedLink
              href={directionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              event="click_directions"
              params={{ location: "hero" }}
              className="mt-5 inline-flex items-center gap-2 font-semibold underline underline-offset-4 hover:text-accent"
            >
              {dict.hero.directions}: {a.street}, {a.suite}
              <span className="sr-only"> {dict.a11y.externalLink}</span>
            </TrackedLink>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[3px] bg-concrete lg:aspect-[4/5]">
            <Image
              src="/images/showroom/refrigeration-row.jpg"
              alt={dict.hero.photoAlt}
              fill
              preload
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="object-cover object-[50%_60%]"
            />
          </div>
        </div>
      </section>

      <SearchBand lang={lang} dict={dict} />

      {/* Categories */}
      <section aria-labelledby="cat-heading" className="py-12 sm:py-16">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 id="cat-heading" className="text-4xl sm:text-5xl">
              {dict.categories.heading}
            </h2>
            <Link href={p("/categories")} className="font-semibold text-accent underline underline-offset-4">
              {dict.categories.viewAll}
            </Link>
          </div>
          <div className="mt-8">
            <CategoryGrid categories={featuredCategories} counts={counts} lang={lang} dict={dict} />
          </div>
        </div>
      </section>

      {/* Featured inventory */}
      {featured.length > 0 && (
        <section aria-labelledby="featured-heading" className="bg-concrete py-12 sm:py-16">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 id="featured-heading" className="text-4xl sm:text-5xl">
                {dict.featured.heading}
              </h2>
              <Link href={p("/equipment")} className="font-semibold text-accent underline underline-offset-4">
                {dict.featured.viewAll}
              </Link>
            </div>
            <p className="mt-3 max-w-2xl text-steel">{dict.inventory.availabilityNote}</p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item) => (
                <li key={item.id} className="flex [&>article]:grow">
                  <EquipmentCard item={item} lang={lang} labels={dict} defaultLocation={defaultLocation} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <RequestCta lang={lang} dict={dict} />
      <WhyBuy dict={dict} />
      <TrustSignals dict={dict} />
      <SellCta lang={lang} dict={dict} />
      <LocationSection dict={dict} lang={lang} />
      <ContactCta lang={lang} dict={dict} />
    </>
  );
}
