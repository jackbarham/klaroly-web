# Klaroly Web

Marketing site for Klaroly, booking software for wedding makeup artists.

**Live at [www.klaroly.com](https://www.klaroly.com)**

Astro and Tailwind CSS, statically built, no JavaScript shipped to the browser.

## Running it locally

Node 24 (see `.node-version`).

```
npm ci          # install
npm run dev     # local server at localhost:4321
npm run build   # static build into dist/
npm run preview # serve the built site
```

## Deploying

Pushing to `main` deploys. Cloudflare Workers Builds watches the repo, builds it
and publishes. There is no separate step and no GitHub Actions workflow.

## Contact

Jack Barham, jack@sundaysouth.com
