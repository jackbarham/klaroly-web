/**
 * Single source of truth for site-wide strings.
 *
 * Anything that appears in more than one place (tagline, description, company
 * details, prices, navigation) lives here. Pages and components import from
 * this file rather than repeating the value. See CLAUDE.md for the rule.
 */

export const site = {
  name: 'Klaroly',
  url: 'https://www.klaroly.com',
  locale: 'en_GB',

  /** What the product is, in the words used for the title tag and schema. */
  positioning: 'Booking software for wedding makeup artists',

  /** The human line under the H1. Copy work happens in a separate pass. */
  tagline: 'Do your admin at your desk. Keep it up to date from your phone.',

  /** Default meta description, used by the home page and as a fallback. */
  description:
    'Booking software for wedding makeup artists. Do the admin at your desk, keep it up to date from your phone. Enquiries, quotes, contracts and invoices in one place. Join early access.',

  /** Short product description for structured data. */
  schemaDescription:
    'Booking, contract and invoicing software for wedding makeup artists.',

  email: 'hello@klaroly.com',

  /** Login link in the header. Placeholder until the app exists. */
  appLoginUrl: 'https://app.klaroly.com/login',

  /** Default social share image, 1200 x 630. Lives in public/. */
  ogImage: {
    path: '/og.png',
    width: 1200,
    height: 630,
    alt: 'Klaroly. Booking software for wedding makeup artists.'
  },

  company: {
    name: 'Sunday South Ltd',
    number: '17185159',
    jurisdiction: 'England and Wales',
    address: {
      street: '230 Vauxhall Bridge Road',
      locality: 'London',
      postcode: 'SW1V 1AU',
      country: 'GB'
    }
  },

  pricing: {
    currency: 'GBP',
    monthly: 19,
    yearly: 99,
    yearlyFull: 228
  },

  nav: [
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ],

  legalNav: [
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' }
  ]
} as const

/** Absolute URL for a site path. */
export const absolute = (path: string) => new URL(path, site.url).href

/** Stable @id values so JSON-LD nodes can reference each other across pages. */
export const schemaIds = {
  organisation: `${site.url}/#organisation`,
  website: `${site.url}/#website`,
  application: `${site.url}/#application`
} as const
