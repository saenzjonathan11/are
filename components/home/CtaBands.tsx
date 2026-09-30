import Image from "next/image";
import Link from "next/link";
import { MessageSquare, Phone } from "lucide-react";
import { business, telHref } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { button } from "@/components/ui/button";

export function RequestCta({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section aria-labelledby="request-cta" className="on-dark bg-accent py-12 text-white sm:py-14">
      <div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 id="request-cta" className="text-4xl text-white sm:text-5xl">
            {dict.requestCta.heading}
          </h2>
          <p className="mt-3 text-lg text-white/95">{dict.requestCta.body}</p>
        </div>
        <Link href={localizedPath(lang, "/request")} className={button("light", "lg", "shrink-0 md:px-8")}>
          {dict.requestCta.button}
        </Link>
      </div>
    </section>
  );
}

export function SellCta({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <section aria-labelledby="sell-cta" className="on-dark bg-ink text-white">
      <div className="container-x grid items-center gap-8 py-12 sm:py-16 md:grid-cols-2">
        <div>
          <h2 id="sell-cta" className="text-4xl text-white sm:text-5xl">
            {dict.sellCta.heading}
          </h2>
          <p className="mt-3 max-w-xl text-lg text-white/85">{dict.sellCta.body}</p>
          <Link href={localizedPath(lang, "/sell")} className={button("light", "lg", "mt-6")}>
            {dict.sellCta.button}
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[3px]">
          <Image
            src="/images/showroom/grinder-row.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 45vw, 92vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export function ContactCta({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const tel = telHref();
  return (
    <section aria-labelledby="contact-cta" className="border-t border-line py-12 sm:py-14">
      <div className="container-x flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 id="contact-cta" className="text-4xl">
            {dict.contactCta.heading}
          </h2>
          <p className="mt-2 text-lg text-steel">{dict.contactCta.body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {tel && business.phone && (
            <TrackedLink href={tel} event="click_phone" params={{ location: "contact_cta" }} className={button("secondary", "lg")}>
              <Phone aria-hidden className="size-5" />
              {business.phone.display}
            </TrackedLink>
          )}
          <Link href={localizedPath(lang, "/quote")} className={button("primary", "lg")}>
            <MessageSquare aria-hidden className="size-5" />
            {dict.nav.getQuote}
          </Link>
        </div>
      </div>
    </section>
  );
}
