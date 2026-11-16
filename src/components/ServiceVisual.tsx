import { Zap, Search, Cpu, Wrench, Hammer, ChefHat, Lightbulb, PlugZap, Bell, Cable, Building2, Building, type LucideIcon } from 'lucide-react'
import type { Service } from '../data/services'
const icons:Record<string,LucideIcon>={'akut-elektriker':Zap,fejlfinding:Search,eltavler:Cpu,'el-service':Wrench,elrenovering:Hammer,koekkenrenovering:ChefHat,'stikkontakter-og-belysning':Lightbulb,ladestandere:PlugZap,doertelefoni:Bell,'tele-og-data':Cable,erhverv:Building2,boligforeninger:Building}
export default function ServiceVisual({s,className=''}:{s:Service;className?:string}){
  if(s.image)return <img src={s.image} alt={s.imageAlt??s.title} loading="lazy" style={{objectPosition:s.imagePos}} className={`w-full object-cover ${className}`}/>
  const I=icons[s.slug]??Zap
  return <div role="img" aria-label={s.title} className={`w-full flex items-center justify-center ${className}`} style={{background:'linear-gradient(135deg,var(--navy),var(--ink))'}}><I size={64} strokeWidth={1.25} color="#1FA9CC" aria-hidden="true"/></div>}
