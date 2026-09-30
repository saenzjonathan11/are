import { business } from "@/config/business";
import { site } from "@/config/site";
import { assertLocale, getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { LeadForm } from "@/components/forms/LeadForm";
import { LocationSection } from "@/components/home/LocationSection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const lang = assertLocale((await params).lang);
  const t = getDictionary(lang).pages.contact;
  return buildMetadata({ lang, path: "/contact", title: t.metaTitle, description: t.metaDescription });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const lang = assertLocale((await params).lang);
  const dict = getDictionary(lang);
  const t = dict.pages.contact;

  return (
    <>
      <div className="container-x py-8 sm:py-10">
        <Breadcrumbs
          label={dict.a11y.breadcrumb}
          items={[
            { name: dict.nav.home, path: localizedPath(lang, "/") },
            { name: dict.nav.contact, path: localizedPath(lang, "/contact") },
          ]}
        />
        <h1 className="mt-4 text-5xl sm:text-6xl">{t.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-steel">{t.intro}</p>
      </div>
      <LocationSection dict={dict} lang={lang} />
      <section aria-labelledby="contact-form" className="py-12 sm:py-16">
        <div className="container-x max-w-3xl">
          <h2 id="contact-form" className="text-4xl">
            {t.formHeading}
          </h2>
          <div className="mt-6">
            <LeadForm
              type="inquiry"
              t={dict.forms}
              lang={lang}
              contact={{ phone: business.phone?.display ?? "", email: business.email }}
              turnstileSiteKey={site.spam.turnstileSiteKey}
            />
          </div>
        </div>
      </section>
    </>
  );
}
