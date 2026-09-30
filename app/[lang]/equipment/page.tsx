import { Suspense } from "react";
import { Info } from "lucide-react";
import { business } from "@/config/business";
import { assertLocale, getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n/config";
import { inventoryRepo } from "@/lib/inventory";
import { buildMetadata } from "@/lib/seo";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { InventoryBrowser } from "@/components/equipment/InventoryBrowser";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export async function generateMetadata({ params }: PageProps<"/[lang]/equipment">) {
  const lang = assertLocale((await params).lang);
  const dict = getDictionary(lang);
  return buildMetadata({
    lang,
    path: "/equipment",
    title: dict.inventory.metaTitle,
    description: dict.inventory.metaDescription,
  });
}

export default async function EquipmentPage({ params }: PageProps<"/[lang]/equipment">) {
  const lang = assertLocale((await params).lang);
  const dict = getDictionary(lang);
  const [items, categories] = await Promise.all([inventoryRepo.getInventory(lang), inventoryRepo.getCategories()]);
  const defaultLocation = `${business.address.city}, ${business.address.state}`;

  return (
    <div className="container-x py-8 sm:py-10">
      <Breadcrumbs
        label={dict.a11y.breadcrumb}
        items={[
          { name: dict.nav.home, path: localizedPath(lang, "/") },
          { name: dict.nav.equipment, path: localizedPath(lang, "/equipment") },
        ]}
      />
      <h1 className="mt-4 text-5xl sm:text-6xl">{dict.inventory.title}</h1>
      <p className="mt-3 max-w-2xl text-lg text-steel">{dict.inventory.intro}</p>
      <p className="mt-4 flex max-w-2xl items-start gap-2 rounded-[3px] bg-concrete px-4 py-3 text-[0.95rem]">
        <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-accent" />
        {dict.inventory.availabilityNote}
      </p>

      <div className="mt-8">
        {/* Fallback is full server-rendered HTML, so every listing is crawlable without JavaScript */}
        <Suspense
          fallback={
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <li key={item.id} className="flex [&>article]:grow">
                  <EquipmentCard item={item} lang={lang} labels={dict} defaultLocation={defaultLocation} headingLevel="h2" />
                </li>
              ))}
            </ul>
          }
        >
          <InventoryBrowser
            items={items}
            categories={categories}
            lang={lang}
            labels={{
              inventory: dict.inventory,
              card: dict.card,
              condition: dict.condition,
              availability: dict.availability,
              requestButton: dict.requestCta.button,
            }}
            requestHref={localizedPath(lang, "/request")}
            defaultLocation={defaultLocation}
          />
        </Suspense>
      </div>
    </div>
  );
}
