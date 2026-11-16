import { useEffect } from 'react'
import { allPages, SITE, orgSchema } from '../data/seo'
function meta(sel:string,attr:string,val:string,content:string){let e=document.head.querySelector(sel);if(!e){e=document.createElement(attr==='rel'?'link':'meta');e.setAttribute(attr,val);document.head.appendChild(e)}e.setAttribute(attr==='rel'?'href':'content',content)}
export default function SEO({path,extra}:{path:string;extra?:object}){
  useEffect(()=>{const p=allPages()[path];if(!p)return
    document.title=p.title
    meta('meta[name=description]','name','description',p.description)
    meta('link[rel=canonical]','rel','canonical',SITE+(path==='/'?'/':path))
    meta('meta[property="og:title"]','property','og:title',p.title);meta('meta[property="og:description"]','property','og:description',p.description)
    meta('meta[property="og:url"]','property','og:url',SITE+path);meta('meta[property="og:image"]','property','og:image',SITE+'/images/team.webp')
    let s=document.getElementById('ld-page');if(!s){s=document.createElement('script');s.id='ld-page';s.setAttribute('type','application/ld+json');document.head.appendChild(s)}
    const crumbs={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Forside',item:SITE+'/'},...(path==='/'?[]:[{'@type':'ListItem',position:2,name:p.title.split(' |')[0],item:SITE+path}])]}
    s.textContent=JSON.stringify([orgSchema(),crumbs,...(extra?[extra]:[])])
  },[path,extra]);return null}
