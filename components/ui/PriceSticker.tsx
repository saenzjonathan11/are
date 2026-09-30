import { cn, formatPrice } from "@/lib/utils";

/** The neon starburst price tag. Shows a price, an override, or "Call for price". */
export function PriceSticker({
  price,
  priceDisplay,
  lang,
  callLabel,
  size = "md",
  className,
}: {
  price: number | null;
  priceDisplay: string | null;
  lang: string;
  callLabel: string;
  size?: "md" | "lg";
  className?: string;
}) {
  const text = priceDisplay ?? (price != null ? formatPrice(price, lang) : null);
  const dims = size === "lg" ? "size-32 text-2xl" : "size-24 text-lg";
  return (
    <div
      className={cn(
        "price-sticker flex -rotate-[8deg] items-center justify-center p-4 text-center leading-[0.95]",
        dims,
        className,
      )}
    >
      {text ? <span>{text}</span> : <span className={size === "lg" ? "text-lg" : "text-[0.95rem]"}>{callLabel}</span>}
    </div>
  );
}
