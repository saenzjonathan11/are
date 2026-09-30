import type { ReactNode } from "react";
import { Star } from "lucide-react";
import { trust } from "@/config/content";
import type { Dictionary } from "@/lib/i18n";
import { fmt } from "@/lib/utils";

/**
 * Renders nothing until real data is entered in config/content.ts.
 * Never add placeholder numbers here.
 */
export function TrustSignals({ dict }: { dict: Dictionary }) {
  const years = trust.foundedYear ? new Date().getFullYear() - trust.foundedYear : null;
  const stats = [
    trust.googleReviews && {
      key: "reviews",
      node: (
        <a href={trust.googleReviews.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 underline-offset-4 hover:underline">
          <Star aria-hidden className="size-5 fill-current text-accent" />
          {fmt(dict.trust.reviews, { rating: trust.googleReviews.rating, count: trust.googleReviews.reviewCount })}
        </a>
      ),
    },
    years && { key: "years", node: fmt(dict.trust.yearsInBusiness, { years }) },
    trust.customersServed && { key: "customers", node: fmt(dict.trust.customersServed, { count: trust.customersServed }) },
  ].filter(Boolean) as { key: string; node: ReactNode }[];

  if (stats.length === 0 && trust.testimonials.length === 0 && !trust.inspectionProcess) return null;

  return (
    <section className="border-t border-line py-10">
      <div className="container-x space-y-8">
        {stats.length > 0 && (
          <ul className="flex flex-wrap gap-x-10 gap-y-3 font-display text-2xl font-bold">
            {stats.map((s) => (
              <li key={s.key}>{s.node}</li>
            ))}
          </ul>
        )}
        {trust.inspectionProcess && (
          <div>
            <h2 className="text-3xl">{dict.trust.inspection}</h2>
            <p className="mt-2 max-w-prose text-steel">{trust.inspectionProcess}</p>
          </div>
        )}
        {trust.testimonials.length > 0 && (
          <div>
            <h2 className="text-3xl">{dict.trust.testimonialsHeading}</h2>
            <ul className="mt-4 grid gap-6 md:grid-cols-2">
              {trust.testimonials.map((t) => (
                <li key={t.name}>
                  <figure className="border-l-4 border-accent pl-4">
                    <blockquote className="text-lg">{t.quote}</blockquote>
                    <figcaption className="mt-2 text-steel">
                      {t.name}
                      {t.business ? `, ${t.business}` : ""}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
