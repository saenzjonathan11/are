# Affordable Restaurant Equipment website

Lead-generation website for **Affordable Restaurant Equipment**, a commercial restaurant equipment dealer in Farmers Branch, TX. Visitors browse inventory, then call, ask about an item, request equipment, or offer equipment for sale. English at `/`, Spanish at `/es`.

Built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. No database or paid service is required to run it.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types, then `tsc --noEmit` |

Node 20.9 or newer.

## Deploy to Vercel (free)

1. Push this repo to GitHub.
2. Go to https://vercel.com/new, import the repo, and click **Deploy**. No settings are needed.
3. Vercel gives you a URL like `are-xxxx.vercel.app`. Share that link.
4. Later, add the real domain under **Project > Settings > Domains**, then set these environment variables and redeploy:
   - `NEXT_PUBLIC_SITE_URL=https://yourdomain.com`
   - `NEXT_PUBLIC_ALLOW_INDEXING=true`

Until `NEXT_PUBLIC_ALLOW_INDEXING` is `true`, every page sends `noindex` and `robots.txt` blocks crawlers, so the preview URL stays out of Google.

All environment variables are listed and explained in `.env.example`. Every one is optional.

## Project structure

```
app/
  [lang]/                 All pages. lang is "en" or "es".
    layout.tsx            Root layout: fonts, header, footer, mobile action bar, LocalBusiness JSON-LD
    page.tsx              Homepage
    equipment/            Inventory list (client-side filters) and detail pages
    categories/           Category index and category pages
    quote/ request/ sell/ Lead forms
    about/ contact/ privacy/
    not-found.tsx         Localized 404
    [...rest]/            Sends unknown URLs to the 404
  api/leads/route.ts      Form submission endpoint
  sitemap.ts robots.ts    SEO files (sitemap includes hreflang alternates)
  fonts/                  Barlow and Barlow Condensed (self-hosted, OFL)
config/
  business.ts             EVERY business fact: address, phone, hours, services, social links
  content.ts              Trust signals, "why buy" points, featured categories, about story
  site.ts                 URL, indexing switch, analytics IDs
data/
  categories.ts           Equipment categories (en/es names)
  inventory.ts            Starter inventory
lib/
  inventory/              Data model, repository interface, search/filter logic
  i18n/                   Locale config and en/es dictionaries (all UI text)
  leads/                  Form schema + validation (shared by browser and server), spam checks, delivery
  analytics.ts            Event tracking (GTM, GA4, Google Ads, Meta Pixel)
  seo.ts                  Metadata and JSON-LD builders
components/               UI, layout, equipment, forms, homepage sections
proxy.ts                  Language routing (Next 16's name for middleware)
```

## The "no invented facts" rule

Nothing on the site states a business fact that hasn't been confirmed. In `config/business.ts`:

- `null` means unknown and hides the feature (delivery, financing, warranty, and so on).
- `false` means confirmed not offered.
- `true` means confirmed offered.

Trust signals in `config/content.ts` (reviews, years in business, testimonials) render only when real data is entered. Search the code for `TODO(owner)` to find every open question.

## Branding

- Colors: CSS variables at the top of `app/globals.css` (`--brand-*`). Components use semantic names like `bg-accent` and `text-ink`, so changing a variable restyles the whole site. The accent is the logo's red, `#A9241E`.
- Fonts: `app/[lang]/layout.tsx`.
- Logo: `public/images/logo/are-badge.png` is the client's badge logo with the white background removed. `are-logo-original.png` is the file as received. The header and footer show the badge beside a text wordmark (`components/layout/Logo.tsx`), because the badge's lettering is too small to read at header size.
- Favicons: `app/icon.png` and `app/apple-icon.png`, generated from the badge.
- Share image: `public/images/og-default.jpg` (1200 x 630), showroom photo plus the badge.

The logo on file is 225 x 225 pixels. That is enough for the header, but a larger PNG or an SVG from whoever designed it would look sharper on high-density screens and in print. Replace the file at the same path. If its proportions change, update `width` and `height` in `Logo.tsx`.

## Managing inventory

Edit `data/inventory.ts`. Each item follows the `EquipmentItem` type in `lib/inventory/types.ts`. Key fields:

- `price: null` shows "Call for price". A number shows the price on a green sticker and enables Product structured data.
- `availability`: `available`, `reserved`, `sold`, or `call-to-confirm`.
- `condition`: `new`, `used`, `refurbished`, or `scratch-and-dent`.
- `translations.es`: Spanish title, descriptions, and features. Untranslated fields fall back to English.

Sold items stay reachable by URL but drop out of the sitemap and featured lists.

**Moving to a real data source.** Pages never read `data/inventory.ts` directly. They go through `inventoryRepo` in `lib/inventory/index.ts`, which implements the `InventoryRepository` interface. To use Supabase, Airtable, Google Sheets, or an inventory system, write a class that implements that interface and change the one export line. Detail pages render unknown slugs on demand, so new database items work without a rebuild.

## Images

Put photos in `public/images/inventory/` and reference them as `/images/inventory/name.jpg` with the real `width` and `height`. Next.js resizes and converts them to AVIF/WebP automatically. Aim for about 1600px on the long side. For images hosted elsewhere, add the host to `images.remotePatterns` in `next.config.ts`.

The starter photos are crops of the business's Facebook posts.

## Forms and leads

Three forms share one component (`components/forms/LeadForm.tsx`) and one schema (`lib/leads/schema.ts`): **inquiry** (quote, contact, item questions), **request** (equipment wanted), and **sell** (equipment offered). Validation runs in the browser and again on the server. Every lead needs a name and a phone number or email. Inquiries from a listing include its ID and title.

**Delivery** (`lib/leads/delivery.ts`) runs whichever adapters are configured:

| Adapter | Variables | Notes |
| --- | --- | --- |
| Email via [Resend](https://resend.com) | `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` | Free tier. Until a domain is verified in Resend, leave `LEAD_FROM_EMAIL` empty; the test sender only delivers to the email that owns the Resend account. |
| Webhook | `LEAD_WEBHOOK_URL` | Receives each lead as JSON. Works with Zapier, Make, n8n, a CRM, or a Google Sheet via Apps Script. |

**With nothing configured**, leads are written to the server log (Vercel > Logs) and the visitor sees "This form isn't connected yet, please call or email." No lead is lost silently.

**Spam protection** (`lib/leads/spam.ts`): a hidden honeypot field, a minimum fill time, and optional Cloudflare Turnstile (set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`). Rejected bots get a fake success response.

## Analytics

Set any of `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_META_PIXEL_ID`. Scripts load only when an ID is set. Use GTM or direct GA4, not both.

Events tracked: `click_phone`, `click_directions`, `click_email`, `view_equipment`, `search_inventory`, `submit_quote_request`, `submit_equipment_request`, `submit_sell_equipment`.

Google Ads conversions fire when `NEXT_PUBLIC_GOOGLE_ADS_LABELS` maps event names to conversion labels, for example `{"click_phone":"AbC123"}`.

When analytics goes live, update the privacy policy at `app/[lang]/privacy/page.tsx`.

## SEO

- Per-page titles, descriptions, canonical URLs, Open Graph, and `hreflang` for English and Spanish
- `LocalBusiness` (Store) JSON-LD on every page. Hours are included only after `hoursConfirmed` is `true`.
- `BreadcrumbList` JSON-LD on inner pages
- `Product` JSON-LD only on priced items, since Google requires an offer and prices are never invented
- `sitemap.xml` with language alternates

## Spanish

UI text lives in `lib/i18n/dictionaries/en.ts` and `es.ts`. TypeScript fails the build if the Spanish file is missing a key. English URLs have no prefix; `/en/...` redirects to them. The language switch keeps the visitor on the same page.

## Known limitation

In Next.js 16, 404 pages under a language-prefixed root layout render their content client-side. They still return a real 404 status and a `noindex` tag.

## Owner confirmation checklist

| Item | Current state |
| --- | --- |
| Address | Site uses 3350 Belt Line Rd., Suite B, Farmers Branch, TX 75234. Facebook flyers say 3350 E Belt Line Rd, Dallas, TX 75234. Must match Google Business Profile. |
| Hours | Flyers say Mon to Fri 10:00 to 6:00, weekends by appointment. Stored but hidden until `hoursConfirmed: true`. |
| Spanish-speaking staff | "Se habla español" shown, based on the flyers. |
| Prices and availability | All 11 listings show "Call for price". Tag prices from the photos are in comments in `data/inventory.ts`. |
| Model numbers | Missing for three Hobart grinders, the Hobart slicers, the Habco cooler, the freezer, the merchandisers, and the Asber range |
| Delivery, shipping, installation, repair, warranty, financing | Unknown, hidden |
| Buys used equipment? | Sell page says "may be interested" and promises nothing |
| Facebook, Google Business Profile URLs | Not set |
| Logo | Badge logo provided and in use (225 px). A high-res or SVG version would be sharper. The 2025 Facebook flyers show a different globe logo; confirm the badge is the current one. |
| Lead recipient email, domain | Not set |
| Legal business name | Not set |
| Reviews, testimonials, founding year | Not set |
| Staff direct numbers (on flyers) | Not published on the site |

## Future phases

The code is organized so these can be added without restructuring:

- Inventory from a database or spreadsheet, with an admin screen or CMS
- CRM integration (the webhook adapter already sends structured leads)
- Text-message lead alerts (for example, a Twilio adapter in `lib/leads/delivery.ts`)
- Photo uploads on the sell form (Vercel Blob or S3)
- Rate limiting on `/api/leads` (Upstash or Vercel KV)
- Online deposits or checkout, and financing applications
- Google Merchant Center product feed and Facebook Marketplace listings generated from inventory
