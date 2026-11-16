// Vercel Node.js-funktion (ikke Edge). Sender via One.com SMTP med Nodemailer.
import nodemailer from 'nodemailer'

type Req = { method?: string; body?: unknown; headers: Record<string, string | string[] | undefined> }
type Res = { status(code: number): Res; json(body: unknown): unknown }

const MAP: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const esc = (s: string) => s.replace(/[&<>"']/g, c => MAP[c])
const clean = (v: unknown, max: number) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max)

const mem = new Map<string, { n: number; t: number }>()
const LIMIT = 5, WINDOW = 3600
async function limited(ip: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL, tok = process.env.UPSTASH_REDIS_REST_TOKEN, key = 'rl:contact:' + ip
  if (url && tok) {
    try {
      const h = { Authorization: 'Bearer ' + tok }
      const r = await fetch(url, { method: 'POST', headers: h, body: JSON.stringify(['INCR', key]) })
      const n = ((await r.json()) as { result: number }).result
      if (n === 1) await fetch(url, { method: 'POST', headers: h, body: JSON.stringify(['EXPIRE', key, String(WINDOW)]) })
      return n > LIMIT
    } catch { console.error('Rate limit-lager utilgængeligt'); return false }
  }
  const now = Date.now(), e = mem.get(ip)
  if (!e || now - e.t > WINDOW * 1000) { mem.set(ip, { n: 1, t: now }); return false }
  e.n++
  return e.n > LIMIT
}

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false })
  let b: Record<string, unknown> = {}
  try { b = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) as Record<string, unknown> || {} } catch { return res.status(400).json({ ok: false }) }
  if (JSON.stringify(b).length > 20000) return res.status(413).json({ ok: false })
  const ip = String(req.headers['x-forwarded-for'] || 'ukendt').split(',')[0].trim()
  if (await limited(ip)) return res.status(429).json({ ok: false })
  if (b.website) return res.status(200).json({ ok: true }) // honeypot
  const d = {
    name: clean(b.name, 100), phone: clean(b.phone, 20), email: clean(b.email, 120), address: clean(b.address, 150),
    customerType: clean(b.customerType, 30), service: clean(b.service, 80), page: clean(b.page, 200),
    message: String(b.message ?? '').trim().slice(0, 3000),
  }
  if (!d.name || !d.message || !d.address || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) || !/^[0-9+ ()-]{8,20}$/.test(d.phone)) return res.status(400).json({ ok: false })
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASSWORD, CONTACT_TO_EMAIL } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) return res.status(500).json({ ok: false })
  const when = new Date().toLocaleString('da-DK', { timeZone: 'Europe/Copenhagen' })
  const rows: [string, string][] = [['Navn', d.name], ['Telefon', d.phone], ['E-mail', d.email], ['Adresse/postnr.', d.address], ['Kundetype', d.customerType], ['Ydelse', d.service], ['Beskrivelse', d.message], ['Tidspunkt', when], ['Side', d.page]]
  try {
    const t = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT || 465), secure: SMTP_SECURE !== 'false', auth: { user: SMTP_USER, pass: SMTP_PASSWORD }, connectionTimeout: 10000, socketTimeout: 15000 })
    await t.sendMail({
      from: `"Tech El-Service hjemmeside" <${SMTP_USER}>`, to: CONTACT_TO_EMAIL || 'info@techel.dk', replyTo: d.email,
      subject: 'Ny kundehenvendelse fra techel.dk',
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html: `<table cellpadding="6">${rows.map(([k, v]) => `<tr><th align="left" valign="top">${k}</th><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('')}</table>`,
    })
    return res.status(200).json({ ok: true })
  } catch { console.error('SMTP-fejl'); return res.status(502).json({ ok: false }) }
}
