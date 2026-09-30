import {
  Armchair,
  Beef,
  Blend,
  ChefHat,
  CookingPot,
  Croissant,
  CupSoda,
  Droplets,
  Flame,
  Heater,
  Microwave,
  Package,
  Refrigerator,
  Sandwich,
  Snowflake,
  Table,
  Thermometer,
  Utensils,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Armchair,
  Beef,
  Blend,
  ChefHat,
  CookingPot,
  Croissant,
  CupSoda,
  Droplets,
  Flame,
  Heater,
  Microwave,
  Package,
  Refrigerator,
  Sandwich,
  Snowflake,
  Table,
  Thermometer,
  Utensils,
};

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Package;
  return <Icon aria-hidden className={className} strokeWidth={1.75} />;
}
