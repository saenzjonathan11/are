"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { button } from "@/components/ui/button";
import { LanguageSwitch } from "./LanguageSwitch";
import { isActive, type NavItem } from "./NavLinks";

export function MobileMenu({
  items,
  lang,
  labels,
  quoteHref,
}: {
  items: NavItem[];
  lang: Locale;
  quoteHref: string;
  labels: { open: string; close: string; nav: string; quote: string; lang: string; langAria: string };
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on route change
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-[3px] text-ink hover:bg-concrete"
      >
        {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
        <span className="sr-only">{open ? labels.close : labels.open}</span>
      </button>
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-line bg-paper shadow-[0_12px_24px_-12px_rgb(0_0_0/0.25)]"
      >
        <nav aria-label={labels.nav} className="container-x py-3">
          <ul className="divide-y divide-line">
            {items.map((item) => {
              const active = isActive(pathname, item.match);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-13 items-center font-display text-2xl font-bold",
                      active ? "text-accent" : "text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-col gap-3 pb-2">
            <Link href={quoteHref} className={button("primary", "lg", "w-full")}>
              {labels.quote}
            </Link>
            <LanguageSwitch lang={lang} label={labels.lang} ariaLabel={labels.langAria} className="self-start py-2" />
          </div>
        </nav>
      </div>
    </div>
  );
}
