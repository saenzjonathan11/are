import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "light" | "outline-light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "bg-ink text-white hover:bg-ink-soft",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  light: "bg-paper text-ink hover:bg-concrete",
  "outline-light": "border-2 border-white/70 text-white hover:bg-paper hover:text-ink",
};

const sizes: Record<Size, string> = {
  sm: "min-h-10 px-3 text-[0.95rem]",
  md: "min-h-12 px-5 text-base",
  lg: "min-h-13 px-6 text-lg",
};

/** Class string for links and buttons that look like buttons. */
export function button(variant: Variant = "primary", size: Size = "md", extra?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-[3px] font-semibold leading-tight transition-colors text-center",
    "disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    sizes[size],
    extra,
  );
}
