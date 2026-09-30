"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { localizedPath, stripLocale, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/** Links to the same page in the other language. */
export function LanguageSwitch({
  lang,
  label,
  ariaLabel,
  className,
}: {
  lang: Locale;
  label: string;
  ariaLabel: string;
  className?: string;
}) {
  const pathname = usePathname() || "/";
  const target: Locale = lang === "en" ? "es" : "en";
  const href = localizedPath(target, stripLocale(pathname));
  return (
    <Link
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={ariaLabel}
      className={cn("inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline", className)}
    >
      <Languages aria-hidden className="size-4" />
      {label}
    </Link>
  );
}
