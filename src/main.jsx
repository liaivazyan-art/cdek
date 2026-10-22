import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {ArrowRight, Users, LayoutGrid, CircleHelp, ChartNoAxesCombined, Layers, Sparkles, Menu} from 'lucide-react';
import {sections} from './data/research';
import {overview} from './data/overview';
import RespondentTable from './components/RespondentTable';
import ResearchTable from './components/ResearchTable';
import './style.css';
const icons = {users:Users,grid:LayoutGrid,barriers:CircleHelp,chart:ChartNoAxesCombined,layers:Layers,sparkles:Sparkles};
function App(){
 const [active,setActive]=useState(sections[0].id),[mobile,setMobile]=useState(false);
 const section=sections.find(s=>s.id===active);
 function navigate(id){setActive(id);setMobile(false);window.scrollTo({top:0,behavior:'instant'});}
 return <div className="app-shell"><aside className={mobile?'sidebar open':'sidebar'}><div className="nav-label">ОТЧЁТ ИССЛЕДОВАНИЯ</div><nav>{sections.map((s,i)=>{const Icon=icons[s.icon];return <button key={s.id} className={active===s.id?'nav-item selected':'nav-item'} onClick={()=>navigate(s.id)}><Icon size={18}/><span>{s.short}</span><small>0{i+1}</small></button>})}</nav></aside>
 <div className="main-wrap"><button className="mobile-menu mobile-nav-toggle" aria-label="Открыть меню" aria-expanded={mobile} onClick={()=>setMobile(!mobile)}><Menu size={20}/></button>
 <main>{active === 'method' ? <section className="research-overview" aria-labelledby="research-title">
 <div className="hero-row"><h1 id="research-title">{overview.title}</h1></div>
 <div className="overview-content">
 <section><h2>Цель исследования</h2><p>{overview.goal}</p></section>
 <section><h2>Метод</h2><p>{overview.method}</p></section>
 <section><h2>Дата проведения</h2><p>{overview.conductedAt || 'Не указана'}</p></section>
 <section className="overview-audience"><h2>Целевая аудитория</h2><ul>{overview.audience.map(role=><li key={role}>{role}</li>)}</ul></section>
 <section><h2>Предмет исследования</h2><p>{overview.subject}</p></section>
 </div></section> : <>
 <div className="section-heading"><div className="section-counter">0{sections.indexOf(section)+1} <span>/ {String(sections.length).padStart(2,'0')}</span></div><span className="section-rule"/><span className="section-kicker">СТРУКТУРА ИССЛЕДОВАНИЯ</span></div><div className="section-title-row"><div><h2>{section.title}</h2><p>{section.description}</p>{section.note&&<p className="section-purpose">{section.note}</p>}</div></div>
 {active === 'users' ? <RespondentTable/> : <ResearchTable key={active} section={section}/>}
 <div className="bottom-grid"><div className="report-spacer" aria-hidden="true"/><button className="next-section" onClick={()=>navigate(active==='recommendations'?sections[0].id:sections[sections.indexOf(section)+1].id)}><span>{active==='recommendations'?'К началу отчёта':<>СЛЕДУЮЩИЙ РАЗДЕЛ<strong>{sections[sections.indexOf(section)+1].short}</strong></>}</span><ArrowRight size={22}/></button></div><footer className="page-footer"><span>Feedback System <span> / </span> UX Research</span><span>Сначала понять. Затем проектировать.</span></footer></>}</main></div>
 </div>
}
createRoot(document.getElementById('root')).render(<App/>);
