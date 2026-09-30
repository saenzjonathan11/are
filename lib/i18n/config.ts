export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = { en: "English", es: "Español" };
/** BCP 47 tags for <html lang>, hreflang, and Open Graph */
export const localeTags: Record<Locale, string> = { en: "en-US", es: "es-US" };

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/**
 * Build a URL path for a locale. English has no prefix (/equipment),
 * Spanish is prefixed (/es/equipment). proxy.ts maps both to app/[lang].
 */
export function localizedPath(lang: Locale, path: string = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === defaultLocale) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

/** Remove any locale prefix from a pathname. */
export function stripLocale(pathname: string): string {
  for (const l of locales) {
    if (pathname === `/${l}`) return "/";
    if (pathname.startsWith(`/${l}/`)) return pathname.slice(l.length + 1);
  }
  return pathname;
}
