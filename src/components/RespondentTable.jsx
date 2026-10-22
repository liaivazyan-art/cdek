import React, {Fragment, useState} from 'react';
import {ChevronDown, Search, SlidersHorizontal, X} from 'lucide-react';
import {respondents, placeholderRows, respondentFields} from '../data/respondents';

const placeholder = 'Тут будут данные';
const columns = ['Роль', 'Рабочие задачи', 'Использование VoC', 'Потребности и ограничения'];
export default function RespondentTable() {
  const [role, setRole] = useState('');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(null);
  const roles = [...new Set(respondents.map(r => r.role).filter(Boolean))];
  const slots = respondents.length ? respondents : placeholderRows.map(id => ({id, placeholder:true}));
  const rows = slots.filter(r => (!role || r.role === role) && (!query || (r.placeholder ? placeholder : [r.role, r.tasks, r.usage, r.needs].join(' ')).toLocaleLowerCase('ru').includes(query.toLocaleLowerCase('ru'))));
  return <section className="data-panel respondent-panel" aria-label="Карта внутренних пользователей">
    <div className="filter-bar">
      <div className="filters"><SlidersHorizontal size={17}/><label><span className="sr-only">Роль</span><select aria-label="Роль" value={role} onChange={e=>setRole(e.target.value)}><option value="">Все роли</option>{roles.map(r=><option key={r} value={r}>{r}</option>)}</select></label></div>
      <label className="search"><Search size={16}/><input aria-label="Поиск по содержимому таблицы" placeholder="Поиск по таблице" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button aria-label="Очистить поиск" onClick={()=>setQuery('')}><X size={14}/></button>}</label>
    </div>
    <div className="table-scroll"><table><thead><tr>{columns.map(c=><th key={c} scope="col">{c}</th>)}</tr></thead><tbody>
      {rows.map(r=><Fragment key={r.id}><tr className="respondent-row" onClick={()=>setExpanded(expanded===r.id?null:r.id)}>
        {[r.role,r.tasks,r.usage,r.needs].map((value,i)=><td key={i} className={r.placeholder?'placeholder-text':''}>{i===0?<button className="row-toggle" aria-label={expanded===r.id?'Свернуть подробную информацию':'Раскрыть подробную информацию'} aria-expanded={expanded===r.id} aria-controls={'details-'+r.id} onClick={e=>{e.stopPropagation();setExpanded(expanded===r.id?null:r.id)}}><ChevronDown size={18} className={expanded===r.id?'chevron expanded':'chevron'}/>{value||placeholder}</button>:value||placeholder}</td>)}
      </tr>{expanded===r.id&&<tr className="respondent-details" id={'details-'+r.id}><td colSpan={4}><dl className="respondent-detail-grid">{respondentFields.map(f=><div key={f.key}><dt>{f.label}</dt><dd className={r.placeholder||!r.details?.[f.key]?'placeholder-text':''}>{r.details?.[f.key]||placeholder}</dd></div>)}</dl></td></tr>}</Fragment>)}
    </tbody></table></div>
    {!rows.length&&<div className="empty-state"><h3>По вашему запросу ничего не найдено</h3><button className="outline-button" onClick={()=>{setRole('');setQuery('')}}>Сбросить фильтры</button></div>}
  </section>;
}
