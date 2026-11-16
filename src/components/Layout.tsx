import { useState, useEffect, useRef } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Phone, Mail, ChevronDown, ShieldCheck, MapPin, Building2, CircleArrowRight, Instagram, Facebook, Linkedin } from 'lucide-react'
import { company } from '../data/company'
import { services } from '../data/services'
import CookieConsent from './CookieConsent'
import { initTracking } from '../utils/tracking'
const nav:[string,string][]=[['/','Forside'],['/erhverv','Erhverv'],['/boligforeninger','Boligforeninger'],['/projekter','Projekter'],['/om-os','Om os'],['/kontakt','Kontakt']]
function NavDropdown(){
  const [open,setOpen]=useState(false);const ref=useRef<HTMLDivElement>(null);const loc=useLocation()
  const wide=()=>window.matchMedia('(min-width:768px)').matches
  useEffect(()=>setOpen(false),[loc.pathname])
  useEffect(()=>{const c=(e:MouseEvent)=>{if(!ref.current?.contains(e.target as Node))setOpen(false)};const k=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false)}
    document.addEventListener('click',c);document.addEventListener('keydown',k);return()=>{document.removeEventListener('click',c);document.removeEventListener('keydown',k)}},[])
  return <div ref={ref} className="md:relative" onMouseEnter={()=>wide()&&setOpen(true)} onMouseLeave={()=>wide()&&setOpen(false)}>
    <button aria-expanded={open} aria-controls="ydelser-menu" onClick={()=>setOpen(!open)} className="flex items-center gap-1">Ydelser<ChevronDown size={18} className={'transition '+(open?'rotate-180':'')}/></button>
    {open&&<ul id="ydelser-menu" className="absolute left-0 right-0 top-full md:right-auto md:w-80 bg-white text-ink shadow-lg border border-[var(--border)] py-2 z-50">
      <li><Link to="/ydelser" className="block px-4 py-2 font-semibold hover:bg-[var(--bg-soft)]">Alle ydelser</Link></li>
      {services.slice(0,10).map(s=><li key={s.slug}><Link className="block px-4 py-2 hover:bg-[var(--bg-soft)]" to={'/'+s.slug}>{s.title}</Link></li>)}</ul>}</div>}
export default function Layout(){
  useEffect(()=>{initTracking()},[])
  const loc=useLocation();const isHome=loc.pathname==='/';const [scrolled,setScrolled]=useState(false)
  useEffect(()=>{const f=()=>setScrolled(window.scrollY>20);f();window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[])
  useEffect(()=>{if(!loc.hash)window.scrollTo(0,0)},[loc.pathname])
  const clear=isHome&&!scrolled
  return <>
    <a href="#main" className="sr-only focus:not-sr-only p-2 bg-white">Spring til indhold</a>
        <header className={'fixed inset-x-0 top-0 z-40 text-white transition-colors '+(clear?'':'shadow-md')} style={{background:clear?'transparent':'var(--footer)'}}><div className="max-w-site mx-auto px-4 py-2 flex flex-wrap md:flex-nowrap items-center justify-between gap-x-8 gap-y-2">
      <Link to="/" className="shrink-0" aria-label="Tech El-Service – til forsiden" onClick={()=>{if(loc.pathname==='/')window.scrollTo({top:0,behavior:'smooth'})}}><img src="/logo-light.svg" alt="Tech El-Service – autoriseret el-installatør" width={160} height={124} className="h-20 w-auto"/></Link>
      <nav aria-label="Hovedmenu" className="w-full md:w-auto relative flex flex-wrap md:flex-nowrap items-center gap-x-4 lg:gap-x-6 gap-y-2 font-medium text-[15px] lg:text-base">
        <Link to="/">Forside</Link><NavDropdown/>{nav.slice(1).map(([h,l])=><Link key={h} to={h}>{l}</Link>)}
        <a href={company.phoneHref} className="hidden 2xl:inline-flex items-center gap-2"><Phone size={18}/>{company.phoneShort}</a>
        <Link to="/kontakt#tilbud" className="btn btn-primary hidden xl:inline-flex">Få et tilbud</Link></nav></div></header>
    <main id="main" className={isHome?'':'pt-48 md:pt-24'}><Outlet/></main>
    <CookieConsent/>
    <footer className="text-white pb-24 lg:pb-0" style={{background:'var(--footer)'}}><div className="max-w-site mx-auto px-4 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 text-sm">
      <div><img src="/logo-light.svg" alt="Tech El-Service – autoriseret el-installatør" width={240} height={186} loading="lazy" className="w-48 h-auto"/><p className="mt-4 text-base">{company.name} er en autoriseret el-installatør.</p></div>
      <div><h2 className="font-bold tracking-widest mb-4 text-base">Kontaktoplysninger</h2><ul className="grid gap-3 text-base">
        <li><a href={company.phoneHref} className="flex gap-3 items-center"><Phone size={20}/>{company.phone}</a></li>
        <li><a href={'mailto:'+company.email} className="flex gap-3 items-center"><Mail size={20}/>{company.email}</a></li>
        <li className="flex gap-3"><MapPin size={20} className="shrink-0 mt-1"/><address className="not-italic">{company.address.join(', ')}</address></li>
        <li className="flex gap-3 items-center"><Building2 size={20}/>CVR: {company.cvr}</li>
        <li className="flex gap-3 items-center"><ShieldCheck size={20}/>Autorisationsnr.: {company.auth}</li></ul>
        <div className="flex gap-4 mt-5">{([['instagram',Instagram,'Instagram'],['facebook',Facebook,'Facebook'],['linkedin',Linkedin,'LinkedIn']] as const).map(([k,I,n])=>company.social[k]?<a key={k} href={company.social[k]} aria-label={n} rel="noopener"><I size={28}/></a>:null)}</div></div>
      <div><h2 className="font-bold tracking-widest mb-4 text-base">Genvej</h2><ul className="grid gap-3 text-base">
        {([['/','Forside'],['/ydelser','Ydelser'],['/akut-elektriker','Akut elektriker 24/7'],['/el-service','El-service og installationer'],['/elrenovering','Elrenovering'],['/om-os','Om os'],['/kontakt','Kontakt']] as const).map(([h,l])=><li key={h}><Link to={h} className="flex gap-3 items-center"><CircleArrowRight size={20}/>{l}</Link></li>)}</ul></div>
      <div className="text-center"><img src="/images/validan.png" alt="Validan – godkendt" width={200} height={120} loading="lazy" className="w-48 h-auto mx-auto"/><p className="mt-4 text-base">Vores kvalitetsledelsessystem (KLS) er godkendt og efterprøves af VALIDAN.</p></div></div>
      <div className="max-w-site mx-auto px-4 py-4 border-t border-white/20 text-xs flex flex-wrap gap-x-6 gap-y-2 justify-between"><span>© {new Date().getFullYear()} {company.name}</span><span className="flex gap-4"><Link to="/privatlivspolitik">Privatlivspolitik</Link><button onClick={()=>window.dispatchEvent(new Event('open-cookie-settings'))}>Cookieindstillinger</button></span></div></footer>
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-2 gap-2 p-2 bg-white border-t">
      <a href={company.phoneHref} className="btn btn-primary justify-center"><Phone size={18}/>Ring nu</a><Link to="/kontakt#tilbud" className="btn bg-navy text-white justify-center">Få et tilbud</Link></div></>
}
