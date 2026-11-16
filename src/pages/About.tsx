import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { company } from '../data/company'
import { locations } from '../data/locations'
export default function About(){return <><SEO path="/om-os"/>
 <section className="max-w-site mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center"><div><h1 className="text-4xl font-bold">Om Tech El-Service</h1>
  <p className="mt-4 text-lg">{company.name} er et autoriseret elinstallationsfirma med adresse i København K. Vi hjælper private, virksomheder, boligforeninger og institutioner med alt fra små reparationer og akut fejlfinding til renoveringer og større opgaver.</p></div>
  <img src="/images/team.webp" alt="To elektrikere fra Tech El-Service med værktøjskasse foran servicebil" className="rounded w-full"/></section>
 <section className="bg-[var(--bg-soft)]"><div className="max-w-site mx-auto px-4 py-14 grid md:grid-cols-3 gap-8">
  <div><h2 className="text-xl font-bold">Mission og værdier</h2><p className="mt-2">Vi vil levere sikkert og fagligt korrekt elarbejde med klar kommunikation og løsninger tilpasset kundens behov.</p></div>
  <div><h2 className="text-xl font-bold">Autorisation og sikkerhed</h2><p className="mt-2">Autorisationsnr. {company.auth}. Elsikkerhed er udgangspunktet for alt, vi laver, og arbejdet afsluttes med kontrol og afprøvning.</p></div>
  <div><h2 className="text-xl font-bold">Kunder</h2><p className="mt-2">Private boliger, erhverv og butikker, boligforeninger og ejendomme samt institutioner.</p></div></div></section>
 <section className="max-w-site mx-auto px-4 py-14"><h2 className="text-2xl font-bold">Serviceområde</h2><p className="mt-2">{locations.join(', ')} m.fl.</p>
  <div className="mt-8 flex gap-3 flex-wrap"><Link to="/kontakt#tilbud" className="btn btn-primary">Få et tilbud</Link><a href={company.phoneHref} className="btn btn-ghost text-navy">Ring {company.phoneShort}</a></div></section></>}
