import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/config/site";
import { getDictionary, assertLocale } from "@/lib/i18n";
import { localeTags, locales } from "@/lib/i18n/config";
import { localBusinessJsonLd } from "@/lib/seo";
import { AnalyticsScripts } from "@/components/layout/AnalyticsScripts";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { JsonLd } from "@/components/shared/JsonLd";
import "../globals.css";

const barlow = localFont({
  src: [
    { path: "../fonts/barlow-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/barlow-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/barlow-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/barlow-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = localFont({
  src: [
    { path: "../fonts/barlow-condensed-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/barlow-condensed-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.homeTitle, template: `%s | ${dict.meta.siteName}` },
    description: dict.meta.homeDescription,
    applicationName: dict.meta.siteName,
    robots: site.allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
    formatDetection: { telephone: false },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang: raw } = await params;
  const lang = assertLocale(raw);
  const dict = getDictionary(lang);

  return (
    <html lang={localeTags[lang]} className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="has-action-bar flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 bg-ink px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          {dict.a11y.skipToContent}
        </a>
        <Header lang={lang} dict={dict} />
        <main id="main" tabIndex={-1} className="grow focus:outline-none">
          {children}
        </main>
        <Footer lang={lang} dict={dict} />
        <MobileActionBar lang={lang} dict={dict} />
        <JsonLd data={localBusinessJsonLd(lang)} />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
