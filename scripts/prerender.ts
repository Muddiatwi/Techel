// Kører efter `vite build`. Kun Node-API'er: ingen window/document/localStorage.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { allPages, SITE, orgSchema } from '../src/data/seo'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const dist = 'dist'
const indexFile = join(dist, 'index.html')
if (!existsSync(indexFile)) { console.error('dist/index.html findes ikke – kør vite build først.'); process.exit(1) }
const base = readFileSync(indexFile, 'utf8')
const pages = allPages()

for (const [path, p] of Object.entries(pages)) {
  const url = SITE + path
  const head =
    `<title>${esc(p.title)}</title><meta name="description" content="${esc(p.description)}"/>` +
    `<link rel="canonical" href="${url}"/><meta property="og:title" content="${esc(p.title)}"/>` +
    `<meta property="og:description" content="${esc(p.description)}"/><meta property="og:url" content="${url}"/>` +
    `<meta property="og:image" content="${SITE}/images/team.webp"/><meta property="og:locale" content="da_DK"/>` +
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml"/>` +
    `<script type="application/ld+json">${JSON.stringify(orgSchema()).replace(/</g, '\\u003c')}</script>`
  const html = base
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/<meta name="description"[^>]*>/, '')
    .replace(/<link rel="canonical"[^>]*>/, '')
    .replace('</head>', head + '</head>')
  if (path === '/') writeFileSync(indexFile, html)
  else { const dir = join(dist, path); mkdirSync(dir, { recursive: true }); writeFileSync(join(dir, 'index.html'), html) }
}
const urls = Object.keys(pages).map(p => `<url><loc>${SITE}${p === '/' ? '/' : p}</loc></url>`).join('')
writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`)
console.log('Prerenderet', Object.keys(pages).length, 'sider + sitemap.xml')
