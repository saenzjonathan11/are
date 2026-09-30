import type { Metadata } from "next";
import { business, fullAddressLine } from "@/config/business";
import { site } from "@/config/site";
import { localeTags, localizedPath, locales, type Locale } from "@/lib/i18n/config";
import type { LocalizedEquipment } from "@/lib/inventory/types";

export const defaultOgImage = {
  url: "/images/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "Commercial restaurant equipment at Affordable Restaurant Equipment",
};

export const absoluteUrl = (path: string) => new URL(path, site.url).toString();

export function languageAlternates(path: string) {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[localeTags[l]] = localizedPath(l, path);
  languages["x-default"] = localizedPath("en", path);
  return languages;
}

export function buildMetadata(opts: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  image?: { url: string; width?: number; height?: number; alt?: string };
}): Metadata {
  const url = localizedPath(opts.lang, opts.path);
  const image = opts.image ?? defaultOgImage;
  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: url, languages: languageAlternates(opts.path) },
    openGraph: {
      type: "website",
      url,
      title: opts.title,
      description: opts.description,
      siteName: business.businessName,
      locale: localeTags[opts.lang].replace("-", "_"),
      images: [image],
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description },
  };
}

/* ----------------------------- JSON-LD ----------------------------- */

export function localBusinessJsonLd(lang: Locale) {
  const a = business.address;
  const sameAs = Object.values(business.social).filter((v): v is string => Boolean(v));
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${site.url}/#business`,
    name: business.businessName,
    ...(business.legalName ? { legalName: business.legalName } : {}),
    url: absoluteUrl(localizedPath(lang, "/")),
    image: absoluteUrl("/images/showroom/refrigeration-row.jpg"),
    logo: absoluteUrl(business.logo),
    description:
      "Commercial restaurant equipment dealer in Farmers Branch, Texas, serving restaurants and food-service businesses in Dallas-Fort Worth.",
    ...(business.phone ? { telephone: business.phone.e164 } : {}),
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: [a.street, a.suite].filter(Boolean).join(", "),
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.zip,
      addressCountry: a.country,
    },
    areaServed: business.serviceArea.map((name) => ({ "@type": "City", name })),
    ...(business.spanishSpoken ? { knowsLanguage: ["en", "es"] } : {}),
    ...(business.hoursConfirmed
      ? {
          openingHoursSpecification: business.hours
            .filter((h) => h.opens && h.closes)
            .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.day, opens: h.opens, closes: h.closes })),
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

const schemaCondition = {
  new: "https://schema.org/NewCondition",
  used: "https://schema.org/UsedCondition",
  refurbished: "https://schema.org/RefurbishedCondition",
  "scratch-and-dent": "https://schema.org/DamagedCondition",
} as const;

const schemaAvailability = {
  available: "https://schema.org/InStock",
  reserved: "https://schema.org/LimitedAvailability",
  sold: "https://schema.org/SoldOut",
  "call-to-confirm": "https://schema.org/LimitedAvailability",
} as const;

/**
 * Product markup. Only emitted when the item has a price: Google requires
 * an offer (or reviews) for product rich results, and we never invent prices.
 */
export function productJsonLd(item: LocalizedEquipment, lang: Locale) {
  if (item.price == null) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    description: item.shortDescription ?? item.description ?? undefined,
    image: item.images.map((img) => absoluteUrl(img.src)),
    ...(item.brand ? { brand: { "@type": "Brand", name: item.brand } } : {}),
    ...(item.model ? { model: item.model } : {}),
    sku: item.sku ?? item.id,
    category: item.category,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(localizedPath(lang, `/equipment/${item.slug}`)),
      priceCurrency: "USD",
      price: item.price,
      itemCondition: schemaCondition[item.condition],
      availability: schemaAvailability[item.availability],
      seller: { "@id": `${site.url}/#business` },
      availableAtOrFrom: { "@type": "Place", address: fullAddressLine() },
    },
  };
}
