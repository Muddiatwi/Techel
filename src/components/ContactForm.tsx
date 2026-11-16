import { useState, FormEvent } from 'react'
import { company } from '../data/company'
import { services } from '../data/services'
import { track } from '../utils/tracking'
export default function ContactForm(){
  const [st,setSt]=useState<'idle'|'sending'|'ok'|'err'>('idle')
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault(); const f=e.currentTarget; if(!f.reportValidity())return
    setSt('sending'); const d:Record<string,unknown>=Object.fromEntries(new FormData(f)); d.page=location.pathname
    try{ const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})
      if(!r.ok)throw new Error('fejl'); setSt('ok'); f.reset(); track('quote_form_success',{customer_type:d.customerType,service:d.service}) }catch{ setSt('err') }
  }
  const c='w-full border border-[var(--border)] rounded px-3 py-2 mt-1'
  if(st==='ok')return <p role="status" className="p-6 bg-white text-ink rounded font-semibold">Tak for din henvendelse! Din besked er sendt, og vi kontakter dig hurtigst muligt.</p>
  return <form onSubmit={submit} className="grid gap-4 bg-white text-ink p-6 rounded" id="tilbud" noValidate={false}>
    <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true"/>
    <label>Fulde navn<input name="name" required maxLength={100} className={c}/></label>
    <label>Telefonnummer<input name="phone" type="tel" required maxLength={20} pattern="[0-9+ \-]{8,20}" title="Indtast et gyldigt telefonnummer" className={c}/></label>
    <label>E-mail<input name="email" type="email" required maxLength={120} className={c}/></label>
    <label>Adresse eller postnummer<input name="address" required maxLength={150} className={c}/></label>
    <label>Kundetype<select name="customerType" required className={c}>{['Privat','Erhverv','Boligforening','Andet'].map(o=><option key={o}>{o}</option>)}</select></label>
    <label>Type af elopgave<select name="service" required className={c}>{[...services.map(x=>x.title),'Andet'].map(o=><option key={o}>{o}</option>)}</select></label>
    <label>Beskrivelse af opgaven<textarea name="message" required maxLength={3000} rows={4} className={c}/></label>
    <label className="flex gap-2 text-sm"><input type="checkbox" required/><span>Jeg har læst <a href="/privatlivspolitik" className="underline">privatlivspolitikken</a>. Oplysningerne bruges til at besvare min henvendelse.</span></label>
    {st==='err'&&<p role="alert" className="text-red-700">Der opstod en fejl ved afsendelsen. Prøv igen, eller kontakt os direkte på telefon {company.phoneShort}.</p>}
    <button className="btn btn-primary justify-center" disabled={st==='sending'}>{st==='sending'?'Sender…':'Indhent tilbud'}</button>
  </form>
}
