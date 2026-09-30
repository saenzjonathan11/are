"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { stripLocale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string; match: string };

export function isActive(pathname: string, match: string) {
  const path = stripLocale(pathname);
  return match === "/" ? path === "/" : path === match || path.startsWith(`${match}/`);
}

export function NavLinks({ items, label }: { items: NavItem[]; label: string }) {
  const pathname = usePathname() || "/";
  return (
    <nav aria-label={label} className="hidden lg:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const active = isActive(pathname, item.match);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative block px-3 py-2 font-semibold text-ink hover:text-accent",
                  active && "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-[3px] after:bg-accent",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
