# Feedback System · UX Research

Одностраничное описание исследования на React 19, Vite 6 и Tailwind CSS 4. На странице только заголовок, проект и четыре блока: цель, метод, целевая аудитория, предмет исследования. Чёрный текст на белом фоне; адаптивная сетка.

Текст страницы хранится отдельно в `src/data/overview.js`. Предыдущая исследовательская база сохранена в `src/data/research.js`, но не отображается на странице. Приведённый ниже формат нужен для работы с этой сохранённой базой.

## Локальный запуск

Node.js 22 (см. `.nvmrc`), npm.

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

## Добавление интервью

Все данные находятся в `src/data/research.js`. Компоненты изменять не требуется. Не включайте личные данные и закрытые интервью в публичный репозиторий. Ссылки на источники должны соответствовать правам доступа аудитории. Данные статического сайта доступны посетителям.

Структура `research`:

```js
{
  interviews: [{ id: 'interview-01', title: 'Название интервью', date: 'YYYY-MM-DD', url: 'https://…' }],
  roles: [{ id: 'role-01', name: 'Роль из интервью' }],
  findings: [{
    id: 'finding-01',
    section: 'users', // users | needs | barriers | scenarios | method | recommendations
    title: 'Краткое описание',
    roleIds: ['role-01'],
    status: 'confirmed', // confirmed | hypothesis
    cells: ['Первая колонка', 'Вторая колонка', 'Третья колонка'],
    evidence: [{ interviewId: 'interview-01', quote: 'Точная цитата', locator: 'Страница или таймкод' }]
  }]
}
```

Один вывод — одна запись с тремя ячейками для выбранного раздела. Для каждого вывода обязательны первоисточник, точная цитата и локатор. Статус `confirmed` означает подтверждение указанным источником, а не репрезентативность для всех пользователей. Предположения обозначайте `hypothesis`; не выдавайте их за слова респондента. Новые интервью добавляйте в массив `interviews`, новые роли — в `roles`. Идентификаторы должны быть уникальны. `npm test` проверяет целостность базы.

## GitHub и Netlify

Проект подготовлен для GitHub: `.gitignore`, lockfile и workflow `.github/workflows/ci.yml` (тесты и production-сборка при push / pull request).

В Netlify: **Add new project → Import an existing project → GitHub**, выберите репозиторий. `netlify.toml` задаёт `npm run build`, каталог `dist`, Node.js 22 и SPA fallback. Секреты и серверная часть для текущей версии не нужны. Публикация и push автоматически не выполнялись.
