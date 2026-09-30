import { business } from "@/config/business";
import { site } from "@/config/site";
import { assertLocale, getDictionary } from "@/lib/i18n";
import { inventoryRepo } from "@/lib/inventory";
import { buildMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/forms/LeadForm";
import { FormPage } from "@/components/shared/FormPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/quote">) {
  const lang = assertLocale((await params).lang);
  const t = getDictionary(lang).pages.quote;
  return buildMetadata({ lang, path: "/quote", title: t.metaTitle, description: t.metaDescription });
}

export default async function QuotePage({ params, searchParams }: PageProps<"/[lang]/quote">) {
  const lang = assertLocale((await params).lang);
  const dict = getDictionary(lang);
  const slug = (await searchParams).item;
  const item = typeof slug === "string" ? await inventoryRepo.getEquipmentBySlug(lang, slug) : null;

  return (
    <FormPage lang={lang} dict={dict} path="/quote" title={dict.pages.quote.title} intro={dict.pages.quote.intro}>
      {item && (
        <p className="mb-6 rounded-[3px] bg-concrete px-4 py-3">
          {dict.pages.quote.itemLabel}: <strong>{item.title}</strong> ({item.id})
        </p>
      )}
      <LeadForm
        type="inquiry"
        t={dict.forms}
        lang={lang}
        meta={item ? { itemId: item.id, itemSku: item.sku ?? undefined, itemTitle: item.title } : undefined}
        initialValues={item ? { equipment: `${item.title} (${item.id})` } : undefined}
        contact={{ phone: business.phone?.display ?? "", email: business.email }}
        turnstileSiteKey={site.spam.turnstileSiteKey}
      />
    </FormPage>
  );
}
