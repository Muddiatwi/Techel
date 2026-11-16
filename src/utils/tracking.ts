// Tracking er valgfrit: uden VITE_GTM_ID gør alt i denne fil ingenting.
// Kun offentlige ID'er (VITE_-præfiks). Aldrig hemmeligheder.
type Consent = { statistics: boolean; marketing: boolean }
const KEY = 'cookie-consent-v1'
declare global { interface Window { dataLayer: unknown[] } }

const browser = () => typeof window !== 'undefined' && typeof document !== 'undefined'
const gtmId = (): string | null => {
  const v = String(import.meta.env.VITE_GTM_ID ?? '').trim()
  return /^GTM-[A-Z0-9]+$/.test(v) ? v : null
}
export function getConsent(): Consent | null {
  if (!browser()) return null
  try { return JSON.parse(window.localStorage.getItem(KEY) || 'null') } catch { return null }
}
export function saveConsent(c: Consent) {
  if (!browser()) return
  try { window.localStorage.setItem(KEY, JSON.stringify(c)) } catch { /* lagring utilgængelig */ }
  applyConsent(c)
}
// GTM kræver et arguments-objekt (ikke et array) for gtag-kommandoer.
function gtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || []
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}
let loaded = false
export function applyConsent(c: Consent | null) {
  const id = gtmId()
  if (!browser() || !id || !c || !(c.statistics || c.marketing) || loaded) return
  gtag('consent', 'update', {
    analytics_storage: c.statistics ? 'granted' : 'denied',
    ad_storage: c.marketing ? 'granted' : 'denied',
    ad_user_data: c.marketing ? 'granted' : 'denied',
    ad_personalization: c.marketing ? 'granted' : 'denied',
  })
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
  const s = document.createElement('script')
  s.async = true
  s.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(id)
  document.head.appendChild(s)
  loaded = true
}
let inited = false
export function initTracking() {
  if (!browser() || !gtmId() || inited) return
  inited = true
  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
  applyConsent(getConsent())
  document.addEventListener('click', e => {
    const a = (e.target as HTMLElement | null)?.closest('a')
    if (!a) return
    const h = a.getAttribute('href') || ''
    if (h.startsWith('tel:')) track('phone_click')
    else if (h.startsWith('mailto:')) track('email_click')
    else if (a.dataset.track) track(a.dataset.track)
  })
}
export function track(event: string, data: Record<string, unknown> = {}) {
  if (!browser() || !gtmId()) return
  const c = getConsent()
  if (!c || !(c.statistics || c.marketing)) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...data })
}
