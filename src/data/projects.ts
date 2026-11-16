// Kun rigtige projekter. TJEK at billedet tilhører et Tech El-Service-projekt, før det offentliggøres.
export type Project={id:string;title:string;categories:string[];image:string;alt:string;text:string}
export const projectCategories=['Privat','Erhverv','Boligforeninger','Elrenovering','Eltavler','Belysning','Service']
export const projects:Project[]=[
 {id:'belysning-1',title:'Belysningsinstallation',categories:['Erhverv','Belysning'],image:'/images/belysning.webp',alt:'Væg med rækker af pærer i fatninger under montering',text:'Montering af dekorativ belysning på flisevæg.'},
]
