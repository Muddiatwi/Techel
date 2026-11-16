import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ServicePage from './components/ServicePage'
import { services } from './data/services'
import { Services, Contact, NotFound } from './pages/Misc'
import About from './pages/About'
import Projects from './pages/Projects'
import Privacy from './pages/Privacy'
export default function App(){
  return <Routes><Route element={<Layout/>}>
    <Route index element={<Home/>}/><Route path="ydelser" element={<Services/>}/>
    {services.map(s=><Route key={s.slug} path={s.slug} element={<ServicePage s={s}/>}/>)}
    <Route path="kontakt" element={<Contact/>}/>
    <Route path="projekter" element={<Projects/>}/><Route path="om-os" element={<About/>}/>
    <Route path="privatlivspolitik" element={<Privacy/>}/><Route path="*" element={<NotFound/>}/></Route></Routes>
}
