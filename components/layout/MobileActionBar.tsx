import Link from "next/link";
import { MapPin, MessageSquare, Phone } from "lucide-react";
import { directionsUrl, telHref } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { TrackedLink } from "@/components/shared/TrackedLink";

/** Fixed bottom bar on phones: Call / Quote / Directions. Body reserves space via .has-action-bar. */
export function MobileActionBar({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const tel = telHref();
  const cell = "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[0.85rem] font-semibold";
  return (
    <nav
      aria-label={dict.a11y.quickActions}
      className="on-dark fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink pb-[env(safe-area-inset-bottom)] text-white md:hidden"
    >
      <div className="flex h-15">
        {tel && (
          <TrackedLink href={tel} event="click_phone" params={{ location: "mobile_bar" }} className={cell}>
            <Phone aria-hidden className="size-5" />
            {dict.mobileBar.call}
          </TrackedLink>
        )}
        <Link href={localizedPath(lang, "/quote")} className={`${cell} bg-accent`}>
          <MessageSquare aria-hidden className="size-5" />
          {dict.mobileBar.quote}
        </Link>
        <TrackedLink
          href={directionsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          event="click_directions"
          params={{ location: "mobile_bar" }}
          className={cell}
        >
          <MapPin aria-hidden className="size-5" />
          {dict.mobileBar.directions}
          <span className="sr-only"> {dict.a11y.externalLink}</span>
        </TrackedLink>
      </div>
    </nav>
  );
}
