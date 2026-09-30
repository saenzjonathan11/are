"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function TrackView({ id, title, category }: { id: string; title: string; category: string }) {
  useEffect(() => {
    track("view_equipment", { item_id: id, item_name: title, item_category: category });
  }, [id, title, category]);
  return null;
}
