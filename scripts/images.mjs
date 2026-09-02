// Renders the PNG assets in public/ from the SVG sources in src/assets.
// Run with `npm run images` after changing either SVG. Output is committed,
// so the build itself never needs to do this.
import sharp from 'sharp'
import { readFile } from 'node:fs/promises'

const og = await readFile('src/assets/og.svg')
const icon = await readFile('src/assets/icon.svg')
const favicon = await readFile('public/favicon.svg')

const jobs = [
  { input: og, width: 1200, height: 630, out: 'public/og.png' },
  { input: favicon, width: 48, height: 48, out: 'public/favicon-48.png' },
  { input: icon, width: 180, height: 180, out: 'public/apple-touch-icon.png' },
  { input: icon, width: 512, height: 512, out: 'public/icon-512.png' }
]

for (const { input, width, height, out } of jobs) {
  await sharp(input, { density: 300 })
    .resize(width, height)
    .png({ compressionLevel: 9 })
    .toFile(out)
  console.log(`${out}  ${width}x${height}`)
}
