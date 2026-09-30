import { business } from "@/config/business";
import { site } from "@/config/site";
import { assertLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/forms/LeadForm";
import { FormPage } from "@/components/shared/FormPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/request">) {
  const lang = assertLocale((await params).lang);
  const t = getDictionary(lang).pages.request;
  return buildMetadata({ lang, path: "/request", title: t.metaTitle, description: t.metaDescription });
}

export default async function RequestPage({ params, searchParams }: PageProps<"/[lang]/request">) {
  const lang = assertLocale((await params).lang);
  const dict = getDictionary(lang);
  const type = (await searchParams).equipmentType;

  return (
    <FormPage lang={lang} dict={dict} path="/request" title={dict.pages.request.title} intro={dict.pages.request.intro}>
      <LeadForm
        type="request"
        t={dict.forms}
        lang={lang}
        initialValues={typeof type === "string" ? { equipmentType: type.slice(0, 200) } : undefined}
        contact={{ phone: business.phone?.display ?? "", email: business.email }}
        turnstileSiteKey={site.spam.turnstileSiteKey}
      />
    </FormPage>
  );
}
