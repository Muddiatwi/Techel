import { company } from './company'
import { services } from './services'
export const SITE=company.url.replace(/\/$/,'')
export const orgSchema=()=>({'@context':'https://schema.org','@type':['Electrician','LocalBusiness'],name:company.name,url:SITE+'/',email:company.email,telephone:company.phone,
 vatID:'DK'+company.cvr,address:{'@type':'PostalAddress',streetAddress:'Rådhusstræde 15, 1.',postalCode:'1466',addressLocality:'København K',addressCountry:'DK'},
 areaServed:['København','Storkøbenhavn','Nordsjælland'],openingHoursSpecification:{'@type':'OpeningHoursSpecification',dayOfWeek:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],opens:'00:00',closes:'23:59'}})
export const staticPages:Record<string,{title:string;description:string}>={
 '/':{title:'Autoriseret elektriker i København | Tech El-Service ApS',description:'Autoriseret elinstallatør i København, Storkøbenhavn og Nordsjælland. Akut elektriker døgnvagt, fejlfinding, eltavler og elrenovering.'},
 '/ydelser':{title:'Ydelser – elektriker i København | Tech El-Service',description:'Se alle ydelser: akut elektriker, fejlfinding, eltavler, elrenovering, ladestandere, dørtelefoni og erhvervsservice.'},
 '/projekter':{title:'Projekter | Tech El-Service',description:'Se udvalgte elprojekter udført af Tech El-Service.'},
 '/om-os':{title:'Om os – autoriseret elinstallatør | Tech El-Service',description:'Læs om Tech El-Service ApS, vores tilgang til elsikkerhed og de kunder, vi hjælper.'},
 '/kontakt':{title:'Kontakt elektriker i København | Tech El-Service',description:'Kontakt Tech El-Service på telefon 93 91 87 81 eller via formularen. Døgnvagt 24/7.'},
 '/privatlivspolitik':{title:'Privatlivspolitik | Tech El-Service',description:'Sådan behandler Tech El-Service personoplysninger.'}}
export const allPages=()=>{const m={...staticPages};services.forEach(s=>{m['/'+s.slug]={title:`${s.title} | Tech El-Service ApS`,description:s.short+' Autoriseret elektriker i København og omegn.'}});return m}
