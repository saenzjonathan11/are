import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Badge logo plus a text wordmark. The badge alone is too small to read at
 * header size, so the name is repeated in text beside it.
 * Source file: public/images/logo/are-badge.png (225px original; replace with a
 * high-resolution or SVG version when the owner provides one).
 */
export function Logo({ href, dark = false, className }: { href: string; dark?: boolean; className?: string }) {
  return (
    <Link
      href={href}
      className={cn("inline-flex items-center gap-2.5 font-display font-bold leading-none", className)}
      aria-label="Affordable Restaurant Equipment, home"
    >
      <Image
        src="/images/logo/are-badge.png"
        alt=""
        width={214}
        height={189}
        preload={!dark}
        className={cn("h-auto shrink-0", dark ? "w-20" : "w-13 lg:w-16")}
      />
      <span className="flex flex-col justify-center whitespace-nowrap">
        <span className={cn("text-[0.95rem] tracking-[0.14em]", dark ? "text-white/75" : "text-steel")}>AFFORDABLE</span>
        <span className={cn("text-[1.05rem] tracking-[0.02em] sm:text-[1.3rem]", dark ? "text-white" : "text-ink")}>
          RESTAURANT EQUIPMENT
        </span>
      </span>
    </Link>
  );
}
