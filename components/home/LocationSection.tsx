import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { business, directionsUrl, mapEmbedUrl, telHref } from "@/config/business";
import type { Dictionary } from "@/lib/i18n";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { button } from "@/components/ui/button";

function formatTime(t: string, lang: string) {
  const [h, m] = t.split(":").map(Number);
  return new Date(2000, 0, 1, h, m).toLocaleTimeString(lang === "es" ? "es-US" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function HoursList({ dict, lang }: { dict: Dictionary; lang: string }) {
  if (!business.hoursConfirmed) return <p>{dict.location.hoursUnknown}</p>;
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
      {business.hours.map((h) => (
        <div key={h.day} className="contents">
          <dt>{dict.location.days[h.day]}</dt>
          <dd>
            {h.opens && h.closes
              ? `${formatTime(h.opens, lang)} ${dict.location.to} ${formatTime(h.closes, lang)}`
              : "byAppointment" in h && h.byAppointment
                ? dict.location.byAppointment
                : dict.location.closed}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function LocationSection({
  dict,
  lang,
  headingId = "location-heading",
  title,
}: {
  dict: Dictionary;
  lang: string;
  headingId?: string;
  title?: string;
}) {
  const a = business.address;
  const tel = telHref();
  return (
    <section aria-labelledby={headingId} className="bg-concrete py-12 sm:py-16">
      <div className="container-x grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 id={headingId} className="text-4xl sm:text-5xl">
            {title ?? dict.location.heading}
          </h2>
          <p className="mt-3 text-lg text-steel">{dict.location.body}</p>

          <address className="mt-6 flex gap-3 not-italic">
            <MapPin aria-hidden className="mt-1 size-6 shrink-0 text-accent" />
            <span className="font-display text-2xl font-bold leading-tight sm:text-3xl">
              {a.street}, {a.suite}
              <br />
              {a.city}, {a.state} {a.zip}
            </span>
          </address>

          <div className="mt-6 flex flex-wrap gap-3">
            <TrackedLink
              href={directionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              event="click_directions"
              params={{ location: "location_section" }}
              className={button("primary")}
            >
              <MapPin aria-hidden className="size-5" />
              {dict.location.directions}
              <span className="sr-only"> {dict.a11y.externalLink}</span>
            </TrackedLink>
            {tel && business.phone && (
              <TrackedLink href={tel} event="click_phone" params={{ location: "location_section" }} className={button("secondary")}>
                <Phone aria-hidden className="size-5" />
                {dict.location.call} {business.phone.display}
              </TrackedLink>
            )}
          </div>

          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="flex items-center gap-2 font-display text-xl font-bold">
                <Mail aria-hidden className="size-5 text-accent" />
                {dict.location.email}
              </dt>
              <dd className="mt-1">
                <TrackedLink
                  href={`mailto:${business.email}`}
                  event="click_email"
                  params={{ location: "location_section" }}
                  className="break-all underline underline-offset-4 hover:text-accent"
                >
                  {business.email}
                </TrackedLink>
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 font-display text-xl font-bold">
                <Clock aria-hidden className="size-5 text-accent" />
                {dict.location.hours}
              </dt>
              <dd className="mt-1">
                <HoursList dict={dict} lang={lang} />
              </dd>
            </div>
          </dl>
          {business.spanishSpoken && <p className="mt-6 font-semibold" lang="es">{dict.location.spanish}</p>}
        </div>

        <div className="relative min-h-72 overflow-hidden rounded-[3px] border border-line bg-paper lg:min-h-full">
          <iframe
            src={mapEmbedUrl()}
            title={dict.location.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full"
          />
        </div>
      </div>
    </section>
  );
}
