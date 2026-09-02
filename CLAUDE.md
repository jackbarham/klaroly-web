# Klaroly marketing site

Static Astro 7 + Tailwind 4 site for Klaroly, booking software for wedding makeup
artists. Near-zero client-side JavaScript (header only). Deployed to Cloudflare Workers (static assets)
on push to `main`. Live at https://www.klaroly.com.

## Status

- Pre-launch. The site collects early access emails only.
- The early access form has no endpoint yet (`FORM_ENDPOINT` in
  `src/components/EarlyAccessForm.astro`). It will post to an "Early Access"
  table in the Klaroly Laravel app once that exists. Do not build a newsletter
  integration in the meantime.
- Privacy and Terms are placeholder pages, `noindex`, and excluded from the sitemap.
  When they get real content, remove `noindex` and the sitemap filter in
  `astro.config.mjs`.

## Copy and SEO stay in sync

Every page carries the same message in several places. If you change one, change
all of them in the same commit. This is the rule this file exists for.

Site-wide strings live in **`src/site.ts`** and nothing else should repeat
them. Positioning, tagline, default description, schema description, email,
company details, prices, navigation and the OG image reference all come from
there. Change the value once and it flows to the title tag, meta description,
Open Graph tags, JSON-LD, header, footer and pricing page.

When the **tagline, positioning, or product description** changes, update:

1. `src/site.ts` (`positioning`, `tagline`, `description`, `schemaDescription`)
2. `<h1>` on `src/pages/index.astro`, which is hand-written copy, not a constant
3. `title` and `description` on any page that echoes the wording
   (features, pricing, about, contact)
4. `src/assets/og.svg`, then `npm run images` to re-render `public/og.png`
5. `README.md` first line

When a **page is added, renamed, or its URL changes**, update:

1. `nav` or `legalNav` in `src/site.ts` (header and footer both read from it)
2. Any inline links to it from other pages' body copy
3. The sitemap `filter` in `astro.config.mjs` if it should be excluded
4. A redirect from the old URL if the URL changed (Cloudflare redirect rule or
   `public/_redirects`); never leave an old indexed URL returning 404
5. The page's own `title`, `description` and `<PageHeader title>` (canonical is
   derived automatically from the path in `BaseLayout.astro`)

When **body copy** changes on a page, re-read that page's `title` and
`description` and make sure they still describe what is on the page. The
`description` is the search result snippet; it must match the page, not the
previous version of the page.

## Per-page SEO checklist

Each page in `src/pages/` must pass `title` and `description` to `BaseLayout`.

- `title`: unique per page, 50 to 60 characters, primary phrase first, brand last
  (`Something | Klaroly`). Home page is the exception: brand first.
- `description`: unique per page, 120 to 155 characters, plain sentence, no
  keyword lists. Ends with the call to action where it fits.
- Exactly one `<h1>` per page, rendered by `<PageHeader title="...">`, and it
  should say the same thing as the `title` in fewer words. The lede goes in the
  component's slot.
- Page-specific JSON-LD goes in the `schema` prop on `BaseLayout` as an array
  of nodes. Shared nodes (the product, offers) come from `src/schema.ts`.
- `<h2>` for sections. Do not skip heading levels.
- Internal links in body copy where a phrase naturally points at another page
  (for example "rate card" on the home page links to `/features`).
- Pages that should not be indexed pass `noindex={true}` and are excluded from
  the sitemap.

## Site-wide SEO lives in

- `src/site.ts`: every repeated string. Start here.
- `src/layouts/BaseLayout.astro`: title, description, canonical, robots,
  Open Graph, Twitter card, icons, theme colour, and the site-wide JSON-LD
  (Organization, WebSite). Add new site-wide tags here, not on pages.
- `src/schema.ts`: JSON-LD nodes shared between pages (SoftwareApplication,
  with offers on the pricing page).
- `src/assets/og.svg` and `src/assets/icon.svg`: sources for the PNGs in
  `public/`. Re-render with `npm run images` and commit the output.
- `public/_headers`: security and cache headers served by Cloudflare. The CSP
  `form-action` must be widened when the form posts to the app.
- `astro.config.mjs`: `site` URL (drives canonical and sitemap), sitemap filter.
- `public/robots.txt`: the committed file. Cloudflare prepends its own managed
  block at the edge, so the live file is not identical to this one.
- Domain: apex redirects to www by a Cloudflare redirect rule, and the apex has
  a proxied placeholder AAAA record so the rule can fire. Always Use HTTPS and
  HSTS are Cloudflare dashboard settings.

## Conventions

- British English throughout. Wedding makeup artist, not MUA. No exclamation
  marks. Short sentences.
- Never call the product launched, available, or open. It is in development and
  in early access.
- Prices: £19 a month, £99 a year early access (normally £228). Set in
  `src/site.ts`; the pricing page copy, its description and the schema offers
  all read from there.
- Company: Sunday South Ltd, company number 17185159, 230 Vauxhall Bridge Road,
  London, SW1V 1AU. Set in `src/site.ts`; footer and JSON-LD read from there.
- Contact address is hello@klaroly.com, from `src/site.ts`. Do not hard-code it.
- The only client-side JavaScript is the header script in
  `src/components/Header.astro` (scroll hide/show, mobile menu). Do not add
  scripts for analytics, forms, or anything else without discussing it first.
  The CSP in `public/_headers` allows same-origin scripts only.
- Tailwind utility classes inline; colours via the CSS variables in
  `src/styles/global.css`. Body copy uses the `prose` class.
- Light mode only. No `dark:` variants, no dark colour tokens, and the root
  element declares `color-scheme: light` so native controls stay light too.

## Commands

```
npm run dev       # localhost:4321
npm run build     # static build into dist/
npm run preview   # serve dist/
npm run images    # re-render public/*.png from src/assets/*.svg
```

Build before committing anything that touches layout or config; the sitemap and
canonical URLs are only visible in `dist/`.
