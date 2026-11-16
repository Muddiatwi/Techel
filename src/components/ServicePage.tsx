import SEO from './SEO'
import ServiceVisual from './ServiceVisual'
import { Link } from 'react-router-dom'
import { Phone, Check } from 'lucide-react'
import { type Service, services } from '../data/services'
import { company } from '../data/company'
import ContactForm from './ContactForm'
export default function ServicePage({s}:{s:Service}){
  return <>
    <SEO path={'/'+s.slug} extra={{'@context':'https://schema.org','@type':'Service',name:s.title,description:s.short,provider:{'@type':'Electrician',name:company.name},areaServed:'Storkøbenhavn og Nordsjælland'}}/>
    <section className="bg-navy text-white"><div className="max-w-site mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
      <div><nav aria-label="Brødkrumme" className="text-sm opacity-80 mb-3"><Link to="/">Forside</Link> / <Link to="/ydelser">Ydelser</Link> / {s.title}</nav>
        <h1 className="text-4xl font-bold">{s.title}</h1><p className="mt-4 text-lg">{s.intro}</p>
        <a href={company.phoneHref} className="btn btn-primary mt-6"><Phone size={18}/>Ring {company.phoneShort}</a></div>
      <ServiceVisual s={s} className="rounded h-72"/></div></section>
    <section className="max-w-site mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
      <div><h2 className="text-2xl font-bold mb-4">Dette hjælper vi med</h2><ul className="grid gap-2">{s.items.map(i=><li key={i} className="flex gap-2"><Check className="text-brand shrink-0"/>{i}</li>)}</ul>
        <h2 className="text-2xl font-bold mt-10 mb-4">Ofte stillede spørgsmål</h2>{s.faq.map(([q,a])=><details key={q} className="border-b py-3"><summary className="cursor-pointer font-medium">{q}</summary><p className="mt-2">{a}</p></details>)}
        <h2 className="text-xl font-bold mt-10 mb-3">Relaterede ydelser</h2><div className="flex flex-wrap gap-2">{services.filter(x=>x.slug!==s.slug).slice(0,4).map(x=><Link key={x.slug} to={'/'+x.slug} className="btn btn-ghost text-navy">{x.title}</Link>)}</div></div>
      <div className="bg-navy p-4 rounded self-start"><ContactForm/></div></section></>
}
