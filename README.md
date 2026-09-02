# Klaroly Web

Marketing site for Klaroly, booking software for wedding makeup artists.

**Live at [www.klaroly.com](https://www.klaroly.com)**

Astro and Tailwind CSS, statically built. The only JavaScript shipped is the header's scroll and menu behaviour.

## Running it locally

Node 24 (see `.node-version`).

```
npm ci          # install
npm run dev     # local server at localhost:4321
npm run build   # static build into dist/
npm run preview # serve the built site
npm run images  # re-render the PNG icons and social image from src/assets
```

## Deploying

Pushing to `main` deploys. Cloudflare Workers Builds watches the repo, builds it
and publishes. There is no separate step and no GitHub Actions workflow.

## Contact

Jack Barham, jack@sundaysouth.com
