import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { en } from "@/lib/i18n/dictionaries/en";
import { es } from "@/lib/i18n/dictionaries/es";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { button } from "@/components/ui/button";

export default async function NotFound() {
  const raw = await rootLang().catch(() => "en");
  const lang: Locale = raw === "es" ? "es" : "en";
  const t = (lang === "es" ? es : en).pages.notFound;
  return (
    <div className="container-x py-16 sm:py-24">
      <p className="font-display text-7xl font-bold text-accent">404</p>
      <h1 className="mt-2 text-5xl">{t.title}</h1>
      <p className="mt-3 max-w-xl text-lg text-steel">{t.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href={localizedPath(lang, "/equipment")} className={button("primary", "lg")}>
          {t.browse}
        </Link>
        <Link href={localizedPath(lang, "/")} className={button("outline", "lg")}>
          {t.home}
        </Link>
      </div>
    </div>
  );
}
