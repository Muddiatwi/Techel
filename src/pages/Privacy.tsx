import SEO from '../components/SEO'
import { company } from '../data/company'
const T=({c}:{c:string})=><span className="bg-yellow-100 px-1 text-sm">[SKAL VERIFICERES: {c}]</span>
export default function Privacy(){return <><SEO path="/privatlivspolitik"/><div className="max-w-3xl mx-auto px-4 py-12 grid gap-4">
 <h1 className="text-4xl font-bold">Privatlivspolitik</h1><p><T c="Teksten skal gennemgås af virksomheden/jurist før offentliggørelse"/></p>
 <h2 className="text-2xl font-bold mt-4">Dataansvarlig</h2><p>{company.name}, {company.address.join(', ')}, CVR {company.cvr}, e-mail <a className="underline" href={'mailto:'+company.email}>{company.email}</a>.</p>
 <h2 className="text-2xl font-bold mt-4">Kontaktformular</h2><p>Når du sender en henvendelse, behandler vi de oplysninger, du angiver (navn, telefon, e-mail, adresse/postnummer, kundetype, opgavetype og beskrivelse), for at kunne besvare din henvendelse. Henvendelsen sendes som e-mail til vores postkasse hos One.com. Vi gemmer den ikke i en separat database på hjemmesiden. <T c="opbevaringsperiode i e-mailsystemet"/></p>
 <h2 className="text-2xl font-bold mt-4">Databehandlere og leverandører</h2><ul className="list-disc pl-6"><li>Vercel Inc. – hosting af hjemmesiden</li><li>One.com – e-mail</li><li>Google (Tag Manager, Analytics, Ads) – kun hvis du har givet samtykke til statistik/marketing</li></ul>
 <h2 className="text-2xl font-bold mt-4">Cookies</h2><p>Nødvendige cookies/lokal lagring bruges til at huske dit cookievalg. Statistik og marketing aktiveres kun efter dit samtykke, som du til enhver tid kan ændre via “Cookieindstillinger” i bunden af siden.</p>
 <h2 className="text-2xl font-bold mt-4">Dine rettigheder</h2><p>Du kan bede om indsigt i, berigtigelse eller sletning af dine oplysninger og kan klage til Datatilsynet. <T c="supplerende rettigheder og klagevejledning"/></p></div></>}
