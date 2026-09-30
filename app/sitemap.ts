import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { categories } from "@/data/categories";
import { inventory } from "@/data/inventory";
import { localeTags, localizedPath, locales } from "@/lib/i18n/config";

const staticPaths = ["/", "/equipment", "/categories", "/request", "/quote", "/sell", "/about", "/contact", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, lastModified?: string, priority?: number) => ({
    url: `${site.url}${localizedPath("en", path)}`,
    lastModified: lastModified ? new Date(lastModified) : undefined,
    priority,
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [localeTags[l], `${site.url}${localizedPath(l, path)}`])),
    },
  });

  return [
    ...staticPaths.map((p) => entry(p, undefined, p === "/" ? 1 : 0.7)),
    ...categories.map((c) => entry(`/categories/${c.slug}`, undefined, 0.6)),
    ...inventory.filter((i) => i.availability !== "sold").map((i) => entry(`/equipment/${i.slug}`, i.dateUpdated, 0.8)),
  ];
}
