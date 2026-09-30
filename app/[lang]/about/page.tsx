import { aboutStory } from "@/config/content";
import { assertLocale, getDictionary } from "@/lib/i18n";
import { localizedPath } from "@/lib/i18n/config";
import { buildMetadata } from "@/lib/seo";
import { ContactCta } from "@/components/home/CtaBands";
import { LocationSection } from "@/components/home/LocationSection";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  const lang = assertLocale((await params).lang);
  const t = getDictionary(lang).pages.about;
  return buildMetadata({ lang, path: "/about", title: t.metaTitle, description: t.metaDescription });
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const lang = assertLocale((await params).lang);
  const dict = getDictionary(lang);
  const t = dict.pages.about;
  const story = aboutStory[lang];

  return (
    <>
      <div className="container-x py-8 sm:py-10">
        <Breadcrumbs
          label={dict.a11y.breadcrumb}
          items={[
            { name: dict.nav.home, path: localizedPath(lang, "/") },
            { name: dict.nav.about, path: localizedPath(lang, "/about") },
          ]}
        />
        <h1 className="mt-4 max-w-3xl text-5xl sm:text-6xl">{t.title}</h1>
        <p className="mt-4 max-w-2xl text-xl">{t.intro}</p>

        {story && (
          <section aria-labelledby="story" className="mt-12 max-w-prose">
            <h2 id="story" className="text-4xl">
              {t.storyHeading}
            </h2>
            <p className="mt-3 text-lg">{story}</p>
          </section>
        )}

        <section aria-labelledby="who" className="mt-12">
          <h2 id="who" className="text-4xl">
            {t.whoHeading}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {t.who.map((w) => (
              <li key={w} className="rounded-[3px] border border-line px-4 py-2 font-semibold">
                {w}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="process" className="mt-12">
          <h2 id="process" className="text-4xl">
            {t.processHeading}
          </h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.map((step, i) => (
              <li key={step.title} className="border-t-2 border-ink pt-4">
                <span aria-hidden className="font-display text-4xl font-bold text-accent">
                  {i + 1}
                </span>
                <h3 className="mt-1 text-2xl">{step.title}</h3>
                <p className="mt-1.5 text-steel">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
      <div className="mt-6">
        <LocationSection dict={dict} lang={lang} title={t.locationHeading} />
      </div>
      <ContactCta lang={lang} dict={dict} />
    </>
  );
}
