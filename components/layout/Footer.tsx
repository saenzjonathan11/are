import Link from "next/link";
import { business, directionsUrl, fullAddressLine, telHref } from "@/config/business";
import { categories } from "@/data/categories";
import type { Dictionary } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const p = (path: string) => localizedPath(lang, path);
  const topCategories = categories.filter((c) => c.parent === null).slice(0, 8);
  const tel = telHref();
  const a = business.address;
  const link = "text-white/85 underline-offset-4 hover:text-white hover:underline";

  return (
    <footer className="on-dark bg-ink text-white">
      <div className="container-x grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Logo href={p("/")} dark />
          <p className="mt-4 max-w-sm text-white/75">{dict.footer.about}</p>
        </div>

        <nav aria-label={dict.a11y.footerNav}>
          <h2 className="text-lg tracking-wide text-white">{dict.footer.navHeading}</h2>
          <ul className="mt-3 space-y-2">
            {[
              ["/equipment", dict.nav.equipment],
              ["/categories", dict.nav.categories],
              ["/request", dict.requestCta.button],
              ["/sell", dict.nav.sell],
              ["/about", dict.nav.about],
              ["/contact", dict.nav.contact],
            ].map(([path, label]) => (
              <li key={path}>
                <Link href={p(path)} className={link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-lg tracking-wide text-white">{dict.footer.categoriesHeading}</h2>
          <ul className="mt-3 space-y-2">
            {topCategories.map((c) => (
              <li key={c.slug}>
                <Link href={p(`/categories/${c.slug}`)} className={link}>
                  {c.name[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg tracking-wide text-white">{dict.footer.contactHeading}</h2>
          <address className="mt-3 not-italic text-white/85">
            {business.businessName}
            <br />
            {a.street}, {a.suite}
            <br />
            {a.city}, {a.state} {a.zip}
          </address>
          <ul className="mt-3 space-y-2">
            {tel && business.phone && (
              <li>
                <TrackedLink href={tel} event="click_phone" params={{ location: "footer" }} className={link}>
                  {business.phone.display}
                </TrackedLink>
              </li>
            )}
            <li>
              <TrackedLink href={`mailto:${business.email}`} event="click_email" params={{ location: "footer" }} className={link}>
                {business.email}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink
                href={directionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                event="click_directions"
                params={{ location: "footer" }}
                className={link}
                aria-label={`${dict.location.directions}: ${fullAddressLine()} ${dict.a11y.externalLink}`}
              >
                {dict.location.directions}
              </TrackedLink>
            </li>
          </ul>
          <SocialLinks className="mt-4 flex flex-wrap gap-4" newTabLabel={dict.a11y.externalLink} />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-5 text-[0.95rem] text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.legalName ?? business.businessName}. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <Link href={p("/privacy")} className={link}>
              {dict.footer.privacy}
            </Link>
            <LanguageSwitch lang={lang} label={dict.nav.languageSwitch} ariaLabel={dict.nav.languageSwitchLabel} className="text-white/85 hover:text-white" />
          </div>
        </div>
      </div>
    </footer>
  );
}
