# StreamScope Anime Explorer - Документация

## 1. Обзор проекта

`StreamScope` - это SPA-приложение на React для просмотра аниме:

- главная страница с популярными тайтлами;
- поиск с debounce;
- страница деталей по ID;
- избранное с сохранением в `localStorage`;
- переключение светлой/темной темы.

Проект использует публичный API `Jikan` (данные MyAnimeList), поэтому API-ключ не нужен.

## 2. Технологический стек

- React 19 (functional components + hooks)
- Vite
- React Router
- Context API
- Jikan API (`https://api.jikan.moe/v4`)
- CSS (responsive, skeleton loaders, hover-анимации)
- ESLint

## 3. Структура проекта

```txt
src/
  components/   # переиспользуемые UI-компоненты
  context/      # провайдеры глобального состояния
  hooks/        # кастомные хуки
  pages/        # страницы маршрутов
  services/     # HTTP-логика и маппинг данных API
  styles/       # глобальные стили и темы
```

Ключевые файлы:

- `src/main.jsx` - точка входа, оборачивает приложение в Router + Providers.
- `src/App.jsx` - настройка маршрутов и lazy loading страниц.
- `src/services/jikanApi.js` - запросы к API и нормализация данных.

## 4. Маршрутизация

В `src/App.jsx` настроены маршруты:

- `/` - HomePage (топ аниме)
- `/search` - SearchPage
- `/anime/:id` - DetailsPage
- `/favorites` - FavoritesPage
- `/404` - NotFoundPage

Страницы грузятся лениво через `React.lazy`, а fallback отображается через `Suspense` + `Loader`.

## 5. Как работает получение данных

### 5.1 API-слой (`src/services/jikanApi.js`)

Сервис инкапсулирует:

- формирование URL с query-параметрами;
- `fetch`-запросы с обработкой ошибок;
- преобразование сырого ответа API в единый формат объекта аниме:
  - `id`
  - `title`
  - `overview`
  - `posterPath`
  - `rating`
  - `releaseDate`
  - `genres`

Экспортируемые функции:

- `fetchTrendingAnime(page, signal)` - список популярных аниме;
- `searchAnime(query, page, signal)` - поиск по названию;
- `fetchAnimeDetails(animeId, signal)` - детали аниме;
- `getImageUrl(imageUrl)` - безопасное получение URL постера.

### 5.2 Универсальный хук загрузки (`src/hooks/useFetch.js`)

`useFetch`:

- управляет `data / isLoading / error`;
- отменяет запрос через `AbortController` при размонтировании или смене зависимостей;
- делает повторный запрос при изменении dependency-массива.

Это предотвращает утечки и гонки запросов.

## 6. Поиск с debounce

В `SearchPage` используется `useDebounce`:

- пользователь вводит текст в `query`;
- через ~500мс без ввода обновляется `debouncedQuery`;
- только после этого отправляется запрос к API.

Плюсы:

- меньше лишних запросов;
- плавнее UX.

## 7. Глобальное состояние

### 7.1 Theme

- `ThemeProvider` (`src/context/ThemeContext.jsx`)
- хук `useTheme` (`src/hooks/useTheme.js`)

Что хранится:

- текущая тема (`light` / `dark`);
- метод `toggleTheme()`.

Тема:

- применяется через атрибут `data-theme` на `<html>`;
- сохраняется в `localStorage` (`streamscope_theme`).

### 7.2 Favorites

- `FavoritesProvider` (`src/context/FavoritesContext.jsx`)
- хук `useFavorites` (`src/hooks/useFavorites.js`)

Что доступно:

- `favorites` (массив аниме);
- `isFavorite(id)`;
- `addFavorite(anime)`;
- `removeFavorite(id)`;
- `toggleFavorite(anime)`.

Список избранного сохраняется в `localStorage` (`anime_explorer_favorites`).

## 8. UI-компоненты

- `Card` - карточка аниме (постер, мета, действия).
- `Button` - универсальная кнопка с вариантами.
- `Loader` - индикатор загрузки.
- `SkeletonCard` - скелетон карточки во время загрузки.
- `Pagination` - переключение страниц API.
- `Header` + `ThemeToggle` + `Layout` - каркас приложения.

## 9. Страницы

### HomePage

- загружает топ аниме;
- показывает skeleton во время запроса;
- обрабатывает ошибки;
- поддерживает пагинацию.

### SearchPage

- ввод запроса;
- debounce;
- вывод результатов;
- пагинация по результатам.

### DetailsPage

- загружает детали по `id` из URL;
- показывает основные поля (постер, описание, score, дата, жанры);
- позволяет добавить/удалить из избранного.

### FavoritesPage

- берет данные из Context;
- выводит сохраненные карточки;
- отображает пустое состояние, если список пуст.

## 10. Стили и адаптивность

В `src/styles/global.css`:

- CSS-переменные для тем;
- адаптивная сетка карточек;
- hover-эффекты;
- skeleton-анимации;
- мобильные правила (`@media`).

## 11. Обработка ошибок и состояний

- В каждом data-driven экране есть:
  - `loading` состояние (loader/skeleton);
  - `error` состояние (сообщение об ошибке);
  - `empty` состояние (нет данных).

## 12. Как запустить проект

```bash
npm install
npm run dev
```

Сборка production:

```bash
npm run build
npm run preview
```

Проверка качества:

```bash
npm run lint
```

## 13. Деплой

Проект готов к деплою на:

- Vercel
- Netlify

Стандартный build command: `npm run build`  
Publish directory: `dist`
