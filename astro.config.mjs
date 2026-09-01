import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://www.klaroly.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always'
  },
  integrations: [
    sitemap({
      filter: page => !page.includes('/privacy') && !page.includes('/terms')
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: 'lightningcss'
    }
  }
})
