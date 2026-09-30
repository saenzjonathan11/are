"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import type { EquipmentImage } from "@/lib/inventory/types";
import { cn, fmt } from "@/lib/utils";

export function Gallery({
  images,
  labels,
}: {
  images: EquipmentImage[];
  labels: { photo: string; showPhoto: string; noPhoto: string; prev: string; next: string };
}) {
  const [index, setIndex] = useState(0);
  const current = images[index];

  if (!current) {
    return (
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-[3px] bg-concrete text-steel">
        <ImageOff aria-hidden className="size-10" />
        {labels.noPhoto}
      </div>
    );
  }

  const go = (delta: number) => setIndex((i) => (i + delta + images.length) % images.length);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-concrete">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-contain"
          preload={index === 0}
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow hover:bg-paper"
            >
              <ChevronLeft aria-hidden className="size-6" />
              <span className="sr-only">{labels.prev}</span>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow hover:bg-paper"
            >
              <ChevronRight aria-hidden className="size-6" />
              <span className="sr-only">{labels.next}</span>
            </button>
            <p aria-live="polite" className="absolute bottom-2 left-2 rounded-[2px] bg-ink/80 px-2 py-0.5 text-sm text-white">
              {fmt(labels.photo, { n: index + 1, total: images.length })}
            </p>
          </>
        )}
      </div>
      {images.length > 1 && (
        <ul className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-current={i === index ? "true" : undefined}
                className={cn(
                  "relative block size-20 overflow-hidden rounded-[3px] border-2 bg-concrete",
                  i === index ? "border-accent" : "border-transparent hover:border-line",
                )}
              >
                <Image src={img.src} alt="" fill sizes="80px" className="object-contain p-1" />
                <span className="sr-only">{fmt(labels.showPhoto, { n: i + 1 })}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
