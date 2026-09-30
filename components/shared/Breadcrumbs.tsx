import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

export function Breadcrumbs({ items, label }: { items: { name: string; path: string }[]; label: string }) {
  return (
    <>
      <nav aria-label={label} className="text-[0.95rem] text-steel">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, i) => {
            const last = i === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1">
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="underline-offset-4 hover:text-ink hover:underline">
                      {item.name}
                    </Link>
                    <ChevronRight aria-hidden className="size-4" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </>
  );
}
