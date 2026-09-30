import Link from "next/link";
import { Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { button } from "@/components/ui/button";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks, type NavItem } from "./NavLinks";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const p = (path: string) => localizedPath(lang, path);
  const items: NavItem[] = [
    { href: p("/equipment"), label: dict.nav.equipment, match: "/equipment" },
    { href: p("/categories"), label: dict.nav.categories, match: "/categories" },
    { href: p("/sell"), label: dict.nav.sell, match: "/sell" },
    { href: p("/about"), label: dict.nav.about, match: "/about" },
    { href: p("/contact"), label: dict.nav.contact, match: "/contact" },
  ];
  const tel = telHref();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/90">
      <div className="container-x relative flex h-16 items-center gap-4 lg:h-20">
        <Logo href={p("/")} />
        <div className="ml-auto flex items-center gap-2 lg:gap-4">
          <NavLinks items={items} label={dict.a11y.mainNav} />
          <LanguageSwitch
            lang={lang}
            label={dict.nav.languageSwitch}
            ariaLabel={dict.nav.languageSwitchLabel}
            className="px-2 text-[0.95rem] text-steel hover:text-ink max-sm:hidden"
          />
          {tel && business.phone && (
            <TrackedLink
              href={tel}
              event="click_phone"
              params={{ location: "header" }}
              className="hidden items-center gap-2 font-display text-xl font-bold text-ink hover:text-accent md:inline-flex"
            >
              <Phone aria-hidden className="size-5 text-accent" />
              <span className="sr-only">{dict.nav.callUs}: </span>
              {business.phone.display}
            </TrackedLink>
          )}
          <Link href={p("/quote")} className={button("primary", "sm", "max-md:hidden")}>
            {dict.nav.getQuote}
          </Link>
          {tel && (
            <TrackedLink
              href={tel}
              event="click_phone"
              params={{ location: "header_mobile" }}
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-[3px] bg-accent px-3 font-semibold text-white md:hidden"
            >
              <Phone aria-hidden className="size-5" />
              <span className="max-[419px]:sr-only">{dict.mobileBar.call}</span>
            </TrackedLink>
          )}
          <MobileMenu
            items={items}
            lang={lang}
            quoteHref={p("/quote")}
            labels={{
              open: dict.a11y.openMenu,
              close: dict.a11y.closeMenu,
              nav: dict.a11y.mainNav,
              quote: dict.nav.getQuote,
              lang: dict.nav.languageSwitch,
              langAria: dict.nav.languageSwitchLabel,
            }}
          />
        </div>
      </div>
    </header>
  );
}
