import React, {Fragment,useState} from 'react';
import {ChevronDown,Search,SlidersHorizontal,X} from 'lucide-react';
import {reportTables,recommendationCategories,scenarioKinds,limitationKinds,filterRecords} from '../data/reportTables';
const placeholder='Тут будут данные';
function Content({value}) {
 if (!value || (Array.isArray(value)&&!value.length)) return <span className="placeholder-text">{placeholder}</span>;
 if(Array.isArray(value))return <ul className="detail-items">{value.map((item,i)=><li key={i}><Content value={item}/></li>)}</ul>;
 if(typeof value==='object')return <>{value.quote&&<blockquote>{value.quote}</blockquote>}{value.url&&/^(https?:\/\/|\/sources\/)/.test(value.url)?<a className="detail-link" href={value.url} target="_blank" rel="noreferrer">{value.label||value.url}</a>:value.text||value.label}{value.locator&&<p>{value.locator}</p>}</>;
 return <>{String(value)}</>;
}
export default function ResearchTable({section}) {
 const schema=reportTables[section.id];
 const [role,setRole]=useState(''),[query,setQuery]=useState(''),[category,setCategory]=useState(''),[expanded,setExpanded]=useState(null);
 const roles=[...new Set(schema.records.flatMap(r=>r.roles || [r.role]).filter(Boolean))];
 const records=schema.records.length?schema.records:Array.from({length:3},(_,i)=>({id:`${section.id}-slot-${i}`,placeholder:true}));
 const rows=filterRecords(records.map(r=>r.placeholder?{...r,...Object.fromEntries(schema.columns.map(c=>[c.key,placeholder]))}:r),schema.columns,{role,query,category});
 function detailValue(record,field){
  if(record.placeholder)return null;
  if(field==='kind')return (section.id==='barriers'?limitationKinds:scenarioKinds).find(k=>k.id===record.kind)?.label;
  return record.details?.[field];
 }
 return <section className={`data-panel respondent-panel research-table columns-${schema.columns.length}`} aria-label={section.title}>
 <div className="filter-bar"><div className="filters"><SlidersHorizontal size={17}/><label><span className="sr-only">Роль</span><select aria-label="Роль" value={role} onChange={e=>setRole(e.target.value)}><option value="">Все роли</option>{roles.map(r=><option key={r} value={r}>{r}</option>)}</select></label>{section.id==='recommendations'&&<label><span className="sr-only">Категория рекомендации</span><select aria-label="Категория рекомендации" value={category} onChange={e=>setCategory(e.target.value)}><option value="">Все категории</option>{recommendationCategories.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}</select></label>}</div>
 <label className="search"><Search size={16}/><input aria-label="Поиск по содержимому таблицы" placeholder="Поиск по таблице" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button aria-label="Очистить поиск" onClick={()=>setQuery('')}><X size={14}/></button>}</label></div>
 <div className="table-scroll"><table><thead><tr>{schema.columns.map(c=><th key={c.key} scope="col">{c.label}</th>)}</tr></thead><tbody>{rows.map(r=><Fragment key={r.id}><tr className="respondent-row" onClick={()=>setExpanded(expanded===r.id?null:r.id)}>{schema.columns.map((c,i)=><td key={c.key} className={r.placeholder?'placeholder-text':''}>{i===0?<button className="row-toggle" aria-label={expanded===r.id?'Свернуть подробную информацию':'Раскрыть подробную информацию'} aria-expanded={expanded===r.id} aria-controls={'details-'+r.id} onClick={e=>{e.stopPropagation();setExpanded(expanded===r.id?null:r.id)}}><ChevronDown size={18} className={expanded===r.id?'chevron expanded':'chevron'}/><span>{r[c.key]||placeholder}{!r.placeholder&&section.id==='scenarios'&&r.kind&&<span className={`scenario-kind kind-${r.kind}`}>{scenarioKinds.find(k=>k.id===r.kind)?.label}</span>}{!r.placeholder&&section.id==='recommendations'&&r.category&&<span className="recommendation-category">{recommendationCategories.find(c=>c.id===r.category)?.label}</span>}</span></button>:<Content value={r[c.key]}/>}</td>)}</tr>{expanded===r.id&&<tr className="respondent-details" id={'details-'+r.id}><td colSpan={schema.columns.length}><dl className="respondent-detail-grid">{schema.details.map(f=><div key={f.key}><dt>{f.label}</dt><dd><Content value={detailValue(r,f.key)}/></dd></div>)}</dl></td></tr>}</Fragment>)}</tbody></table></div>
 {!rows.length&&<div className="empty-state"><h3>По вашему запросу ничего не найдено</h3><button className="outline-button" onClick={()=>{setRole('');setQuery('');setCategory('')}}>Сбросить фильтры</button></div>}
 </section>;
}
