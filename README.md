# Tech El-Service – hjemmeside (React + Vite + Tailwind 3 + Vercel)
Kommandoer: `npm install`, `npm run dev`, `npm run build`, `npm run preview`.
## Vercel
Importér GitHub-repo (Vite-preset). Settings → Environment Variables: SMTP_HOST=send.one.com, SMTP_PORT=465, SMTP_SECURE=true, SMTP_USER=info@techel.dk, SMTP_PASSWORD (kun i Vercel), CONTACT_TO_EMAIL=info@techel.dk. Redeploy, send en testhenvendelse, tjek at den lander i info@techel.dk.
## Opdatering
Firmaoplysninger: `src/data/company.ts`. Ydelser: `src/data/services.ts` (ny ydelse = ny post, rute oprettes automatisk). Billeder: `public/images`. Farver: CSS-variabler i `src/index.css`.
## DNS
Peg kun www/A-records til Vercel. Slet ALDRIG MX/SPF/DKIM/DMARC.
## Rate limiting
Formularen tillader 5 henvendelser pr. IP pr. time. Sæt UPSTASH_REDIS_REST_URL og UPSTASH_REDIS_REST_TOKEN i Vercel (opret en gratis Redis-database på upstash.com via Vercel Marketplace) for en grænse, der gælder på tværs af serverinstanser. Uden dem bruges en grænse i hukommelsen, som kun er delvis beskyttelse.
## Tracking
Sæt `VITE_GTM_ID` i Vercel (Production). GTM indlæses først efter samtykke (Consent Mode v2, alt afvist som standard). Opret GA4- og Ads-tags i GTM med triggers på dataLayer-events: `phone_click`, `email_click`, `quote_form_success`. Ads-konverteringer skal knyttes til `quote_form_success`.
## SEO
`npm run build` genererer `<head>` (titel, beskrivelse, canonical, OG, JSON-LD) pr. side samt `dist/sitemap.xml`. Indsend sitemap i Google Search Console. Preview-domæner (*.vercel.app) får noindex.
## Redirects
Gamle URL'er på techel.dk er ikke undersøgt (ingen netværk). Tilføj dem under `redirects` i `vercel.json` med `"permanent": true`.
## Fejlfinding af build
- `src/vite-env.d.ts` indeholder Vites typer (`import.meta.env`). `tsconfig.json` har `"types": ["node", "vite/client"]`.
- Tracking er valgfrit: uden `VITE_GTM_ID` (format `GTM-XXXXXXX`) sker der intet, og buildet fejler ikke. Kun offentlige værdier må have `VITE_`-præfiks. SMTP-oplysninger (`SMTP_*`) må aldrig have det.
- `package.json` bruger ~/^-intervaller, så `npm install` henter nyeste sikkerhedsrettelser inden for samme hovedversion. Kør `npm install` lokalt og commit den genererede `package-lock.json`, derefter `npm audit` (brug ikke `--force`).
- Build-kommando: `tsc --noEmit && vite build && tsx scripts/prerender.ts`. Prerender-scriptet bruger kun Node-API'er og skriver `<head>` pr. side samt `dist/sitemap.xml`.
- `/api/contact` er en Node.js-funktion og er undtaget fra SPA-rewrite i `vercel.json`.
## Status
Ikke verificeret: `npm install`, build, SMTP mod One.com fra Vercel, rate limiting med Upstash. Mangler: rigtige anmeldelser og projektbilleder, godkendt privatlivstekst, billeder til Køkkenrenovering og Tele/data, redirects fra gamle URL'er.
