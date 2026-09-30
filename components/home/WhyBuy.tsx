import { MapPin, MessagesSquare, Eye, Tags, type LucideIcon } from "lucide-react";
import { whyBuyPoints } from "@/config/content";
import type { Dictionary } from "@/lib/i18n";

const icons: Record<(typeof whyBuyPoints)[number]["key"], LucideIcon> = {
  local: MapPin,
  inPerson: Eye,
  newUsed: Tags,
  direct: MessagesSquare,
};

export function WhyBuy({ dict }: { dict: Dictionary }) {
  const points = whyBuyPoints.filter((p) => p.enabled);
  if (points.length === 0) return null;
  return (
    <section aria-labelledby="why-heading" className="py-12 sm:py-16">
      <div className="container-x">
        <h2 id="why-heading" className="text-4xl sm:text-5xl">
          {dict.whyBuy.heading}
        </h2>
        <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {points.map(({ key }) => {
            const Icon = icons[key];
            const copy = dict.whyBuy.points[key];
            return (
              <li key={key} className="flex gap-4 border-t-2 border-ink pt-5">
                <Icon aria-hidden className="size-7 shrink-0 text-accent" strokeWidth={1.75} />
                <div>
                  <h3 className="text-2xl">{copy.title}</h3>
                  <p className="mt-1.5 text-steel">{copy.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
