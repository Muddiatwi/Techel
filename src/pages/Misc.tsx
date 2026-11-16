import { Link } from 'react-router-dom'
import { services } from '../data/services'
import { company } from '../data/company'
import ContactForm from '../components/ContactForm'
import SEO from '../components/SEO'
export const Services=()=><><SEO path="/ydelser"/><div className="max-w-site mx-auto px-4 py-12"><h1 className="text-4xl font-bold mb-8">Vores ydelser</h1><ul className="grid md:grid-cols-3 gap-4">{services.map(s=><li key={s.slug}><Link to={'/'+s.slug} className="block border rounded p-4 hover:shadow"><h2 className="font-bold">{s.title}</h2><p className="text-sm">{s.short}</p></Link></li>)}</ul></div></>
export const Contact=()=><><SEO path="/kontakt"/><div className="max-w-site mx-auto px-4 py-12 grid md:grid-cols-2 gap-10"><div><h1 className="text-4xl font-bold">Kontakt</h1><address className="not-italic mt-4 grid gap-1"><b>{company.name}</b>{company.address.map(a=><span key={a}>{a}</span>)}<a href={company.phoneHref}>Telefon: {company.phone}</a><a href={'mailto:'+company.email}>{company.email}</a><span>CVR: {company.cvr}</span><span>Autorisationsnr.: {company.auth}</span></address><p className="mt-4">Døgnvagt 24/7 for akutte elproblemer.</p></div><div className="bg-navy p-4 rounded"><ContactForm/></div></div></>
export const NotFound=()=><div className="max-w-site mx-auto px-4 py-20"><h1 className="text-4xl font-bold">Siden blev ikke fundet</h1><Link to="/" className="btn btn-primary mt-6">Til forsiden</Link></div>
