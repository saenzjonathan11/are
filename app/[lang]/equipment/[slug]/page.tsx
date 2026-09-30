import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageSquare, Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import { site } from "@/config/site";
import { inventory } from "@/data/inventory";
import { assertLocale, getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n/config";
import { inventoryRepo } from "@/lib/inventory";
import { buildMetadata, productJsonLd } from "@/lib/seo";
import { fmt } from "@/lib/utils";
import { EquipmentCard } from "@/components/equipment/EquipmentCard";
import { Gallery } from "@/components/equipment/Gallery";
import { TrackView } from "@/components/equipment/TrackView";
import { LeadForm } from "@/components/forms/LeadForm";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { JsonLd } from "@/components/shared/JsonLd";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { AvailabilityBadge, ConditionBadge } from "@/components/ui/Badges";
import { PriceSticker } from "@/components/ui/PriceSticker";
import { button } from "@/components/ui/button";


export function generateStaticParams() {
  return inventory.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/equipment/[slug]">) {
  const { lang: raw, slug } = await params;
  const lang = assertLocale(raw);
  const item = await inventoryRepo.getEquipmentBySlug(lang, slug);
  if (!item) return {};
  const img = item.images[0];
  return buildMetadata({
    lang,
    path: `/equipment/${slug}`,
    title: item.seoTitle ?? `${item.title} ${lang === "es" ? "en" : "in"} Dallas-Fort Worth`,
    description: item.seoDescription ?? item.shortDescription ?? item.title,
    image: img ? { url: img.src, width: img.width, height: img.height, alt: img.alt } : undefined,
  });
}

export default async function EquipmentDetailPage({ params }: PageProps<"/[lang]/equipment/[slug]">) {
  const { lang: raw, slug } = await params;
  const lang = assertLocale(raw);
  const dict = getDictionary(lang);
  const item = await inventoryRepo.getEquipmentBySlug(lang, slug);
  if (!item) notFound();

  const category = await inventoryRepo.getCategoryBySlug(item.category);
  const parent = category?.parent ? await inventoryRepo.getCategoryBySlug(category.parent) : null;
  const related = (await inventoryRepo.getInventoryByCategory(lang, parent?.slug ?? item.category))
    .filter((i) => i.id !== item.id && i.availability !== "sold")
    .slice(0, 3);

  const p = (path: string) => localizedPath(lang, path);
  const d = dict.detail;
  const tel = telHref();
  const defaultLocation = `${business.address.city}, ${business.address.state}`;
  const delivery = item.deliveryAvailable ?? business.deliveryAvailable;
  const shipping = item.shippingAvailable ?? business.shippingAvailable;
  const warranty = item.warranty ?? business.warrantyDescription;
  const catName = category?.name[lang] ?? item.category;

  const facts: [string, string][] = [
    [d.listingId, item.id],
    ...(item.sku ? ([[d.sku, item.sku]] as [string, string][]) : []),
    ...(item.brand ? ([[d.brand, item.brand]] as [string, string][]) : []),
    ...(item.model ? ([[d.model, item.model]] as [string, string][]) : []),
    [d.condition, dict.condition[item.condition]],
    [d.availability, dict.availability[item.availability]],
    ...(item.quantity != null ? ([[d.quantity, String(item.quantity)]] as [string, string][]) : []),
    [d.location, item.location ?? defaultLocation],
  ];

  const specRows: [string, string][] = [
    ...item.specifications.map((s) => [s.label, s.value] as [string, string]),
    ...(item.dimensions
      ? ([
          [
            d.dimensions,
            [item.dimensions.width, item.dimensions.depth, item.dimensions.height]
              .map((v) => (v == null ? "?" : `${v} ${item.dimensions!.unit}`))
              .join(" x "),
          ],
        ] as [string, string][])
      : []),
    ...(item.powerRequirements ? ([[d.power, item.powerRequirements]] as [string, string][]) : []),
    ...(item.gasType ? ([[d.gas, d.gasTypes[item.gasType]]] as [string, string][]) : []),
  ];

  const similarHref = `${p("/request")}?equipmentType=${encodeURIComponent(
    [item.brand, catName].filter(Boolean).join(" "),
  )}`;

  return (
    <>
      <TrackView id={item.id} title={item.title} category={item.category} />
      <JsonLd data={productJsonLd(item, lang)} />

      <div className="container-x py-8 sm:py-10">
        <Breadcrumbs
          label={dict.a11y.breadcrumb}
          items={[
            { name: dict.nav.home, path: p("/") },
            { name: dict.nav.equipment, path: p("/equipment") },
            ...(category ? [{ name: catName, path: p(`/categories/${category.slug}`) }] : []),
            { name: item.title, path: p(`/equipment/${item.slug}`) },
          ]}
        />

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <Gallery
            images={item.images}
            labels={{
              photo: dict.a11y.photo,
              showPhoto: dict.a11y.showPhoto,
              noPhoto: dict.card.photoComingSoon,
              prev: dict.a11y.prevPhoto,
              next: dict.a11y.nextPhoto,
            }}
          />

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <ConditionBadge condition={item.condition} label={dict.condition[item.condition]} />
              <AvailabilityBadge availability={item.availability} label={dict.availability[item.availability]} />
            </div>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                {(item.brand || item.model) && (
                  <p className="font-semibold text-steel">{[item.brand, item.model].filter(Boolean).join(" ")}</p>
                )}
                <h1 className="mt-1 text-4xl leading-[1] sm:text-5xl">{item.title}</h1>
              </div>
              <PriceSticker
                price={item.price}
                priceDisplay={item.priceDisplay}
                lang={lang}
                callLabel={dict.card.callForPrice}
                size="lg"
                className="-mt-2 shrink-0"
              />
            </div>
            {item.shortDescription && <p className="mt-4 text-lg">{item.shortDescription}</p>}

            <dl className="mt-6 divide-y divide-line border-y border-line">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 py-2.5">
                  <dt className="text-steel">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 grid gap-3">
              <a href="#ask" className={button("primary", "lg")}>
                <MessageSquare aria-hidden className="size-5" />
                {d.askButton}
              </a>
              {tel && business.phone && (
                <TrackedLink
                  href={tel}
                  event="click_phone"
                  params={{ location: "equipment_detail", item_id: item.id }}
                  className={button("secondary", "lg")}
                >
                  <Phone aria-hidden className="size-5" />
                  {d.callAbout}: {business.phone.display}
                </TrackedLink>
              )}
              <Link href={similarHref} className="py-2 text-center font-semibold text-accent underline underline-offset-4">
                {d.requestSimilar}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <div className="space-y-10">
            {item.description && (
              <section aria-labelledby="overview">
                <h2 id="overview" className="text-3xl">
                  {d.overview}
                </h2>
                <p className="mt-3 max-w-prose text-lg">{item.description}</p>
              </section>
            )}

            {item.features.length > 0 && (
              <section aria-labelledby="features">
                <h2 id="features" className="text-3xl">
                  {d.features}
                </h2>
                <ul className="mt-3 list-disc space-y-1 pl-6 text-lg marker:text-accent">
                  {item.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </section>
            )}

            <section aria-labelledby="specs">
              <h2 id="specs" className="text-3xl">
                {d.specifications}
              </h2>
              {specRows.length > 0 ? (
                <table className="mt-3 w-full border-collapse text-left">
                  <tbody>
                    {specRows.map(([k, v]) => (
                      <tr key={k} className="border-b border-line">
                        <th scope="row" className="py-2.5 pr-4 font-normal text-steel">
                          {k}
                        </th>
                        <td className="py-2.5 font-semibold">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mt-3 text-lg text-steel">{d.noSpecs}</p>
              )}
            </section>

            {item.conditionNotes && (
              <section aria-labelledby="condition-notes">
                <h2 id="condition-notes" className="text-3xl">
                  {d.conditionNotes}
                </h2>
                <p className="mt-3 max-w-prose text-lg">{item.conditionNotes}</p>
              </section>
            )}

            <section aria-labelledby="delivery">
              <h2 id="delivery" className="text-3xl">
                {d.deliveryHeading}
              </h2>
              <div className="mt-3 space-y-1 text-lg">
                {delivery === true && <p>{d.deliveryYes}</p>}
                {shipping === true && <p>{d.shippingYes}</p>}
                {delivery !== true && shipping !== true && <p className="text-steel">{d.deliveryUnknown}</p>}
              </div>
            </section>

            {warranty && (
              <section aria-labelledby="warranty">
                <h2 id="warranty" className="text-3xl">
                  {d.warrantyHeading}
                </h2>
                <p className="mt-3 max-w-prose text-lg">{warranty}</p>
              </section>
            )}
          </div>

          <section id="ask" aria-labelledby="ask-heading" className="h-fit rounded-[3px] border-2 border-ink p-5 sm:p-6 lg:sticky lg:top-24">
            <h2 id="ask-heading" className="text-3xl">
              {d.askHeading}
            </h2>
            <p className="mt-2 text-steel">{d.askBody}</p>
            <div className="mt-5">
              <LeadForm
                type="inquiry"
                t={dict.forms}
                lang={lang}
                meta={{ itemId: item.id, itemSku: item.sku ?? undefined, itemTitle: item.title }}
                initialValues={{ equipment: `${item.title} (${item.id})` }}
                contact={{ phone: business.phone?.display ?? "", email: business.email }}
                turnstileSiteKey={site.spam.turnstileSiteKey}
                compact
              />
            </div>
          </section>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related" className="mt-16 border-t border-line pt-10">
            <h2 id="related" className="text-3xl sm:text-4xl">
              {fmt(d.related, { category: parent?.name[lang] ?? catName })}
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.id} className="flex [&>article]:grow">
                  <EquipmentCard item={r} lang={lang} labels={dict} defaultLocation={defaultLocation} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
