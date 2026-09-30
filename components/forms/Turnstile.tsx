"use client";

import { useEffect, useRef } from "react";

type TurnstileApi = {
  render: (el: HTMLElement, opts: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void; language?: string }) => string;
  remove: (id: string) => void;
};

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/** Cloudflare Turnstile widget. Rendered only when NEXT_PUBLIC_TURNSTILE_SITE_KEY is set. */
export function Turnstile({ siteKey, lang, onToken }: { siteKey: string; lang: string; onToken: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let widgetId: string | null = null;
    let cancelled = false;
    const w = window as Window & { turnstile?: TurnstileApi };

    const mount = () => {
      if (cancelled || !ref.current || !w.turnstile) return;
      widgetId = w.turnstile.render(ref.current, {
        sitekey: siteKey,
        language: lang,
        callback: onToken,
        "expired-callback": () => onToken(""),
      });
    };

    if (w.turnstile) mount();
    else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${SRC}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = SRC;
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", mount);
    }
    return () => {
      cancelled = true;
      if (widgetId && w.turnstile) w.turnstile.remove(widgetId);
    };
  }, [siteKey, lang, onToken]);

  return <div ref={ref} className="min-h-[65px]" />;
}
