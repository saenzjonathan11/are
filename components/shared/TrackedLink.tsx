"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Plain <a> that records an analytics event on click (tel:, mailto:, maps links). */
export function TrackedLink({
  event,
  params,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: AnalyticsEvent;
  params?: Record<string, string | number>;
  children: ReactNode;
}) {
  return (
    <a
      {...props}
      onClick={(e) => {
        track(event, params);
        props.onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
