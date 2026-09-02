/**
 * JSON-LD nodes that more than one page uses. Site-wide Organization and
 * WebSite nodes live in BaseLayout; these are added per page via the
 * `schema` prop.
 */
import { site, schemaIds } from './site'

/** The product. Pass offers on the pricing page; leave empty elsewhere. */
export const softwareApplication = (withOffers = false) => ({
  '@type': 'SoftwareApplication',
  '@id': schemaIds.application,
  name: site.name,
  url: site.url,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  description: site.schemaDescription,
  publisher: { '@id': schemaIds.organisation },
  ...(withOffers && {
    offers: [
      {
        '@type': 'Offer',
        name: 'Monthly',
        price: site.pricing.monthly,
        priceCurrency: site.pricing.currency,
        availability: 'https://schema.org/PreOrder',
        url: `${site.url}/pricing/`
      },
      {
        '@type': 'Offer',
        name: 'Yearly, early access',
        price: site.pricing.yearly,
        priceCurrency: site.pricing.currency,
        availability: 'https://schema.org/PreOrder',
        url: `${site.url}/pricing/`
      }
    ]
  })
})
