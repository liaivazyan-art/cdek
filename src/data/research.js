import {reportTables} from './reportTables.js';
// Future research data: intentionally empty until interview analysis.
export const research = {interviews:[],roles:[],findings:[]};
export const sections = [
 {id:'method', title:'Об исследовании', short:'Об исследовании', description:'Состав данных, категории и детализация. Связи с клиентским путём, инициативами и метриками.', columns:['Требование','Детализация','Связи и метрики'], icon:'layers'},
 {id:'users', title:'Карта внутренних пользователей', short:'Пользователи VoC', description:'Кто работает с голосом клиента, какие задачи решает и как использует данные.', columns:['Роль','Задачи','Сценарий использования'], icon:'users'},
 {id:'needs', title:'Матрица потребностей', short:'Матрица потребностей', description:'Какие данные и аналитические возможности необходимы разным внутренним пользователям для решения рабочих задач.', columns:reportTables.needs.columns.map(c=>c.label), icon:'grid'},
 {id:'barriers', title:'Карта существующих ограничений', short:'Ограничения', description:'Какие сложности возникают при работе с VoC, как они влияют на рабочие задачи и насколько существенны для пользователей.', columns:reportTables.barriers.columns.map(c=>c.label), icon:'barriers'},
 {id:'scenarios', title:'Сценарии применения VoC', short:'Сценарии применения VoC', description:'В каких рабочих ситуациях анализ пользовательской обратной связи может помогать принимать продуктовые и бизнес-решения.', columns:reportTables.scenarios.columns.map(c=>c.label), icon:'chart'},
 {id:'opportunities', title:'Какие возможности VoC остаются неиспользованными', short:'Какие возможности VoC остаются неиспользованными', description:'Какие возможности системного анализа обратной связи пока не используются в работе продуктовых и бизнес-команд, какую пользу они могут принести и как Feedback System может помочь их реализовать.', note:'Этот раздел посвящён проверке возможностей, на которые у сотрудников пока нет сформулированного запроса, но которые потенциально могут повысить качество принятия решений.', columns:reportTables.opportunities.columns.map(c=>c.label), icon:'sparkles'},
 {id:'requirements', title:'Требования к данным и аналитике', short:'Требования к данным и аналитике', description:'Какие данные, структура категорий, связи и аналитические возможности необходимы для работы с VoC.', columns:reportTables.requirements.columns.map(c=>c.label), icon:'layers'},
 {id:'recommendations', title:'Рекомендации для Feedback System', short:'Рекомендации', description:'Какие элементы текущей концепции соответствуют потребностям пользователей, что требует доработки и какие гипотезы необходимо проверить.', columns:reportTables.recommendations.columns.map(c=>c.label), icon:'sparkles'}
];
export function selectFindings(data, section, role, status, query) {
 return data.findings.filter(f => f.section === section && (!role || f.roleIds.includes(role)) && (!status || f.status === status) && (!query || [f.title, ...f.cells].join(' ').toLocaleLowerCase('ru').includes(query.toLocaleLowerCase('ru'))));
}
