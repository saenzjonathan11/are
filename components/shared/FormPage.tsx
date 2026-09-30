import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { Breadcrumbs } from "./Breadcrumbs";
import { TrackedLink } from "./TrackedLink";

/** Shared shell for the quote, request, and sell pages. */
export function FormPage({
  lang,
  dict,
  path,
  title,
  intro,
  aside,
  children,
}: {
  lang: Locale;
  dict: Dictionary;
  path: string;
  title: string;
  intro: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  const tel = telHref();
  return (
    <div className="container-x py-8 sm:py-10">
      <Breadcrumbs
        label={dict.a11y.breadcrumb}
        items={[
          { name: dict.nav.home, path: localizedPath(lang, "/") },
          { name: title, path: localizedPath(lang, path) },
        ]}
      />
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-14">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl">{title}</h1>
          <p className="mt-3 text-lg text-steel">{intro}</p>
          <div className="mt-8">{children}</div>
        </div>
        <aside className="space-y-6 lg:pt-4">
          {aside}
          {tel && business.phone && (
            <div className="rounded-[3px] bg-ink p-5 text-white on-dark">
              <p className="font-display text-2xl font-bold text-white">{dict.contactCta.heading}</p>
              <TrackedLink
                href={tel}
                event="click_phone"
                params={{ location: `form_page${path.replace(/\//g, "_")}` }}
                className="mt-3 inline-flex items-center gap-2 font-display text-3xl font-bold text-white hover:underline"
              >
                <Phone aria-hidden className="size-6" />
                {business.phone.display}
              </TrackedLink>
              {business.spanishSpoken && (
                <p className="mt-2 text-white/80" lang="es">
                  {dict.location.spanish}
                </p>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
