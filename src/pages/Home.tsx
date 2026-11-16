import { Link } from 'react-router-dom'
import { Phone, ShieldCheck, Clock, Wrench, Building2 } from 'lucide-react'
import { services } from '../data/services'
import { company } from '../data/company'
import ContactForm from '../components/ContactForm'
import ServiceVisual from '../components/ServiceVisual'
import SEO from '../components/SEO'
import { Categories, CustomerLogos, ProjectTeaser, Reviews, Areas, FAQ, FinalCTA } from '../components/Sections'
const trust=[[ShieldCheck,'Autoriseret elinstallatør · '+company.auth],[Clock,'Døgnvagt 24/7'],[Wrench,'Professionelt elarbejde'],[Building2,'Service til privat og erhverv']] as const
export default function Home(){
  return <>
    <SEO path="/"/>
    <section className="relative bg-[var(--ink)] text-white"><img src="/images/team.webp" alt="Elektrikere fra Tech El-Service ved servicebil" className="absolute inset-0 w-full h-full object-cover opacity-60" fetchPriority="high"/><div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/70 to-transparent"/>
      <div className="relative max-w-site mx-auto px-4 pt-52 md:pt-60 pb-24 md:pb-32"><div className="max-w-3xl">
        <p className="text-accent font-semibold mb-3">Autoriseret elektriker i København og omegn</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">Professionelt elarbejde – når du har brug for det</h1>
        <p className="mt-5 text-lg">Tech El-Service leverer sikre og professionelle elinstallationer, akut fejlfinding og elrenovering til private, erhverv og boligforeninger i København, Storkøbenhavn og Nordsjælland.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link to="/kontakt#tilbud" className="btn btn-primary">Få et uforpligtende tilbud</Link><a href={company.phoneHref} className="btn btn-ghost"><Phone size={18}/>Ring {company.phoneShort}</a></div>
        <p className="mt-5 text-sm">Akut elektriker – døgnvagt 24/7</p></div></div></section>
    <section className="bg-[var(--bg-soft)]"><ul className="max-w-site mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium">
      {trust.map(([I,t])=><li key={t} className="flex items-center gap-2"><I className="text-brand"/>{t}</li>)}</ul></section>
    <section className="max-w-site mx-auto px-4 py-16"><h2 className="text-3xl font-bold mb-8">Vi tilbyder professionelle el-løsninger</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{services.slice(0,8).map(s=>
        <Link key={s.slug} to={'/'+s.slug} className="group border border-[var(--border)] rounded overflow-hidden hover:shadow-lg transition">
          <ServiceVisual s={s} className="h-48"/><div className="p-4"><h3 className="font-bold">{s.title}</h3><p className="text-sm mt-1">{s.short}</p><span className="text-brand font-medium text-sm mt-3 inline-block">Læs mere →</span></div></Link>)}</div>
      <div className="mt-8"><Link to="/ydelser" className="btn btn-primary">Se alle vores ydelser</Link></div></section>
    <section className="bg-navy text-white"><div className="max-w-site mx-auto px-4 py-16 md:flex justify-between gap-10 items-center">
      <div><h2 className="text-3xl font-bold">Akut elektriker – vi hjælper dig døgnet rundt</h2><p className="mt-3">Strømsvigt, HPFI/RCD-relæ der slår fra, defekte eltavler, brændte sikringer, kortslutninger og akutte fejl.</p>
        <p className="mt-3 text-sm opacity-90">Rør ikke ved beskadigede elinstallationer. Ring 112 ved umiddelbar brandfare.</p></div>
      <a href={company.phoneHref} className="btn btn-primary mt-6 md:mt-0 text-xl">Ring til vores døgnvagt: {company.phoneShort}</a></div></section>
    <section className="max-w-site mx-auto px-4 py-16 grid md:grid-cols-2 gap-10"><div><h2 className="text-3xl font-bold">Få et uforpligtende tilbud på din elopgave</h2><p className="mt-4">Fortæl os om din opgave, så kontakter vi dig med henblik på at finde den rette løsning.</p></div><div className="bg-navy p-4 rounded"><ContactForm/></div></section><Categories/><CustomerLogos/><ProjectTeaser/><Reviews/><Areas/><FAQ/><FinalCTA/></>
}
