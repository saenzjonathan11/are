import { cn } from "@/lib/utils";
import type { Availability, Condition } from "@/lib/inventory/types";

const chip =
  "inline-flex items-center gap-1.5 rounded-[2px] px-2 py-0.5 font-display text-[0.8rem] font-bold uppercase tracking-wide leading-5";

export function ConditionBadge({ condition, label, className }: { condition: Condition; label: string; className?: string }) {
  const styles: Record<Condition, string> = {
    new: "bg-accent text-white",
    used: "bg-ink text-white",
    refurbished: "bg-ink text-white",
    "scratch-and-dent": "bg-paper text-ink ring-1 ring-ink",
  };
  return <span className={cn(chip, styles[condition], className)}>{label}</span>;
}

export function AvailabilityBadge({
  availability,
  label,
  className,
}: {
  availability: Availability;
  label: string;
  className?: string;
}) {
  const styles: Record<Availability, string> = {
    available: "bg-ok/10 text-ok",
    reserved: "bg-warn/10 text-warn",
    sold: "bg-bad/10 text-bad",
    "call-to-confirm": "bg-concrete text-steel",
  };
  const dot: Record<Availability, string> = {
    available: "bg-ok",
    reserved: "bg-warn",
    sold: "bg-bad",
    "call-to-confirm": "bg-steel",
  };
  return (
    <span className={cn(chip, styles[availability], className)}>
      <span aria-hidden className={cn("size-2 rounded-full", dot[availability])} />
      {label}
    </span>
  );
}
