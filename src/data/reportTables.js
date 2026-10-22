// Empty research records. Populate only after analysis; IDs identify records, not roles.
export const recommendationCategories = [
 {id:'supported',label:'Подтверждается исследованием'},
 {id:'revision',label:'Требует доработки'},
 {id:'validation',label:'Требует проверки'},
];
export const scenarioKinds = [{id:'existing',label:'Существующая практика'},{id:'potential',label:'Гипотеза для проверки'}];
export const limitationKinds = [{id:'tool',label:'Ограничение инструмента'},{id:'process',label:'Ограничение рабочего процесса'}];
export const reportTables = {
 needs: {
  columns:[{key:'role',label:'Роль'},{key:'task',label:'Рабочая задача'},{key:'need',label:'Потребность в данных'},{key:'analytics',label:'Аналитические возможности'}],
  details:[{key:'description',label:'Подробное описание потребности'},{key:'context',label:'Контекст возникновения'},{key:'examples',label:'Конкретные примеры из интервью'},{key:'frequency',label:'Частота возникновения задачи'},{key:'sources',label:'Первичный источник'}],
  records:[],
 },
 barriers: {
  columns:[{key:'limitation',label:'Ограничение'},{key:'role',label:'Кого затрагивает'},{key:'impact',label:'Влияние на работу'},{key:'significance',label:'Значимость'}],
  details:[{key:'kind',label:'Тип ограничения'},{key:'situation',label:'Конкретная ситуация'},{key:'workaround',label:'Текущий способ обхода ограничения'},{key:'consequences',label:'Последствия для работы'},{key:'frequency',label:'Частота возникновения'},{key:'evidence',label:'Подтверждающие примеры и цитаты'},{key:'sources',label:'Ссылки на интервью'}],
  records:[],
 },
 scenarios: {
  columns:[{key:'scenario',label:'Сценарий'},{key:'role',label:'Пользователь'},{key:'task',label:'Задача / решение'},{key:'analytics',label:'Необходимая аналитика'},{key:'benefit',label:'Ожидаемая польза'}],
  details:[{key:'description',label:'Подробное описание сценария'},{key:'currentApproach',label:'Как задача решается сейчас'},{key:'dataSources',label:'Используемые источники данных'},{key:'missingCapabilities',label:'Каких возможностей не хватает'},{key:'example',label:'Пример из интервью'},{key:'kind',label:'Основание сценария'}],
  records:[],
 },
 requirements: {
  columns:[{key:'area',label:'Область требований'},{key:'requirement',label:'Требование'},{key:'role',label:'Для кого актуально'},{key:'analytics',label:'Аналитические возможности'}],
  details:[{key:'dataAttributes',label:'Необходимые типы данных и атрибуты VoC'},{key:'categories',label:'Структура категорий и уровень детализации'},{key:'journeyLinks',label:'Связи с клиентским путём и пользовательскими сценариями'},{key:'productLinks',label:'Связи с продуктовыми инициативами, релизами и метриками'},{key:'additionalAnalytics',label:'Дополнительные аналитические возможности'}],
  records:[],
 },
 recommendations: {
  columns:[{key:'concept',label:'Элемент концепции'},{key:'result',label:'Результат исследования'},{key:'recommendation',label:'Рекомендация'},{key:'nextStep',label:'Следующий шаг'}],
  details:[{key:'conceptDescription',label:'Описание элемента текущей концепции'},{key:'relatedNeeds',label:'Связанные потребности внутренних пользователей'},{key:'rationale',label:'Обоснование рекомендации'},{key:'roles',label:'Роли, для которых актуальна рекомендация'},{key:'evidence',label:'Подтверждающие наблюдения и цитаты'},{key:'sources',label:'Ссылки на первичные данные'},{key:'actions',label:'Предлагаемые действия'}],
  records:[],
 },
};
export function filterRecords(records, columns, {role='',query='',category=''}={}) {
 return records.filter(r=>(!role || (r.roles || [r.role]).includes(role)) && (!category || r.category===category) && (!query || columns.map(c=>String(r[c.key]||'')).join(' ').toLocaleLowerCase('ru').includes(query.toLocaleLowerCase('ru'))));
}
