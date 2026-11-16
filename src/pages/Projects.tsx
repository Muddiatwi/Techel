import { useState } from 'react'
import SEO from '../components/SEO'
import { projects, projectCategories } from '../data/projects'
export default function Projects(){
  const [f,setF]=useState('Alle');const [open,setOpen]=useState<string|null>(null)
  const list=projects.filter(p=>f==='Alle'||p.categories.includes(f));const cur=projects.find(p=>p.id===open)
  return <><SEO path="/projekter"/><div className="max-w-site mx-auto px-4 py-12"><h1 className="text-4xl font-bold mb-6">Projekter</h1>
   <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filtrer projekter">{['Alle',...projectCategories].map(c=><button key={c} aria-pressed={f===c} onClick={()=>setF(c)} className={'btn '+(f===c?'btn-primary':'btn-ghost text-navy')}>{c}</button>)}</div>
   {list.length===0&&<p>Ingen projekter i denne kategori endnu.</p>}
   <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{list.map(p=><button key={p.id} onClick={()=>setOpen(p.id)} className="text-left border border-[var(--border)] rounded overflow-hidden"><img src={p.image} alt={p.alt} loading="lazy" className="h-56 w-full object-cover"/><div className="p-4"><p className="text-xs text-brand font-semibold">{p.categories.join(' · ')}</p><h2 className="font-bold">{p.title}</h2><p className="text-sm">{p.text}</p></div></button>)}</div>
   {cur&&<div role="dialog" aria-modal="true" aria-label={cur.title} className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-4" onClick={()=>setOpen(null)} onKeyDown={e=>e.key==='Escape'&&setOpen(null)}><img src={cur.image} alt={cur.alt} className="max-h-full max-w-full"/><button autoFocus className="absolute top-4 right-4 btn btn-primary" onClick={()=>setOpen(null)}>Luk</button></div>}</div></>}
