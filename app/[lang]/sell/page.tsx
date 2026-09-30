import { business } from "@/config/business";
import { site } from "@/config/site";
import { assertLocale, getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/forms/LeadForm";
import { FormPage } from "@/components/shared/FormPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/sell">) {
  const lang = assertLocale((await params).lang);
  const t = getDictionary(lang).pages.sell;
  return buildMetadata({ lang, path: "/sell", title: t.metaTitle, description: t.metaDescription });
}

export default async function SellPage({ params }: PageProps<"/[lang]/sell">) {
  const lang = assertLocale((await params).lang);
  const dict = getDictionary(lang);
  const t = dict.pages.sell;

  return (
    <FormPage
      lang={lang}
      dict={dict}
      path="/sell"
      title={t.title}
      intro={t.intro}
      aside={
        <div className="rounded-[3px] border border-line p-5">
          <h2 className="text-2xl">{t.whatToInclude}</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-accent">
            {t.includeList.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      }
    >
      <p className="mb-6 border-l-4 border-accent pl-4 font-semibold">{t.disclaimer}</p>
      <LeadForm
        type="sell"
        t={dict.forms}
        lang={lang}
        contact={{ phone: business.phone?.display ?? "", email: business.email }}
        turnstileSiteKey={site.spam.turnstileSiteKey}
      />
    </FormPage>
  );
}
