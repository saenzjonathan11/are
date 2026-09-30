import "server-only";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { es } from "./dictionaries/es";

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function getDictionary(lang: string): Dictionary {
  if (!hasLocale(lang)) notFound();
  return dictionaries[lang];
}

/** Validate a route param and return a typed Locale, or 404. */
export function assertLocale(lang: string): Locale {
  if (!hasLocale(lang)) notFound();
  return lang;
}

export type { Dictionary };
