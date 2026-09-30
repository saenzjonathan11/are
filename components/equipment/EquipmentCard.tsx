import Image from "next/image";
import Link from "next/link";
import { ImageOff, MapPin } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import type { LocalizedEquipment } from "@/lib/inventory/types";
import { cn, formatPrice } from "@/lib/utils";
import { AvailabilityBadge, ConditionBadge } from "@/components/ui/Badges";
import { PriceSticker } from "@/components/ui/PriceSticker";
import { button } from "@/components/ui/button";

export type CardLabels = Pick<Dictionary, "card" | "condition" | "availability">;

/** Works in server and client components (no hooks). */
export function EquipmentCard({
  item,
  lang,
  labels,
  defaultLocation,
  headingLevel = "h3",
  priority = false,
}: {
  item: LocalizedEquipment;
  lang: Locale;
  labels: CardLabels;
  defaultLocation: string;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
}) {
  const href = localizedPath(lang, `/equipment/${item.slug}`);
  const image = item.images[0];
  const Heading = headingLevel;
  const sold = item.availability === "sold";

  return (
    <article className="flex flex-col overflow-hidden rounded-[3px] border border-line bg-paper">
      <Link href={href} tabIndex={-1} aria-hidden className="relative block aspect-[4/3] bg-concrete">
        {image ? (
          <Image
            src={image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
            className={cn("object-contain p-3", sold && "opacity-50 grayscale")}
            preload={priority}
          />
        ) : (
          <span className="flex h-full flex-col items-center justify-center gap-2 text-steel">
            <ImageOff aria-hidden className="size-8" />
            {labels.card.photoComingSoon}
          </span>
        )}
        <ConditionBadge condition={item.condition} label={labels.condition[item.condition]} className="absolute left-3 top-3" />
        <PriceSticker
          price={item.price}
          priceDisplay={item.priceDisplay}
          lang={lang}
          callLabel={labels.card.callForPrice}
          className="absolute right-1.5 top-1.5"
        />
      </Link>

      <div className="flex grow flex-col gap-2 p-4">
        {(item.brand || item.model) && (
          <p className="text-[0.95rem] font-semibold text-steel">{[item.brand, item.model].filter(Boolean).join(" ")}</p>
        )}
        <Heading className="text-[1.45rem] leading-tight">
          <Link href={href} className="hover:text-accent">
            {item.title}
          </Link>
        </Heading>
        {/* Price as text for screen readers and list scanning */}
        <p className="sr-only">
          {item.priceDisplay ?? (item.price != null ? formatPrice(item.price, lang) : labels.card.callForPrice)}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <AvailabilityBadge availability={item.availability} label={labels.availability[item.availability]} />
          <span className="inline-flex items-center gap-1 text-[0.95rem] text-steel">
            <MapPin aria-hidden className="size-4" />
            {item.location ?? defaultLocation}
          </span>
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
          <Link href={href} className={button("outline", "sm")}>
            {labels.card.viewDetails}
            <span className="sr-only">: {item.title}</span>
          </Link>
          <Link href={`${localizedPath(lang, "/quote")}?item=${item.slug}`} className={button("primary", "sm")}>
            {labels.card.askAbout}
            <span className="sr-only">: {item.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
