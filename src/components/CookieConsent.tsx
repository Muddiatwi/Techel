import { useEffect, useState } from 'react'
import { getConsent, saveConsent } from '../utils/tracking'
export default function CookieConsent(){
  const [show,setShow]=useState(false);const [custom,setCustom]=useState(false);const [st,setSt]=useState(false);const [mk,setMk]=useState(false)
  useEffect(()=>{if(!getConsent())setShow(true);const o=()=>{const c=getConsent();setSt(!!c?.statistics);setMk(!!c?.marketing);setCustom(true);setShow(true)};window.addEventListener('open-cookie-settings',o);return()=>window.removeEventListener('open-cookie-settings',o)},[])
  const done=(s:boolean,m:boolean)=>{saveConsent({statistics:s,marketing:m});setShow(false);setCustom(false)}
  if(!show)return null
  return <div role="dialog" aria-label="Cookieindstillinger" className="fixed z-[60] inset-x-2 bottom-20 lg:bottom-4 lg:max-w-xl lg:left-4 lg:right-auto bg-white text-ink border border-[var(--border)] shadow-xl rounded p-5 text-sm">
    <p className="font-bold mb-1">Cookies på techel.dk</p>
    <p>Vi bruger nødvendige cookies for at siden virker. Med dit samtykke bruger vi også statistik- og marketingcookies. Læs mere i <a className="underline" href="/privatlivspolitik">privatlivspolitikken</a>.</p>
    {custom&&<div className="mt-3 grid gap-2"><label className="flex gap-2"><input type="checkbox" checked disabled/>Nødvendige (altid aktive)</label>
      <label className="flex gap-2"><input type="checkbox" checked={st} onChange={e=>setSt(e.target.checked)}/>Statistik</label>
      <label className="flex gap-2"><input type="checkbox" checked={mk} onChange={e=>setMk(e.target.checked)}/>Marketing</label>
      <button className="btn btn-primary justify-center" onClick={()=>done(st,mk)}>Gem valg</button></div>}
    <div className="mt-4 flex flex-wrap gap-2"><button className="btn btn-ghost text-navy" onClick={()=>done(false,false)}>Afvis alle</button>
      <button className="btn btn-ghost text-navy" onClick={()=>setCustom(true)}>Tilpas</button><button className="btn btn-primary" onClick={()=>done(true,true)}>Accepter alle</button></div></div>
}
