## О репозитории
# Учебный курс Web Development

## О репозитории

Этот проект содержит учебные материалы и пример кода для полного стека **Node.js + React**.  Здесь вы найдёте:

1. `/docs` – Markdown-курс, отрендеренный Docsify.  
2. `/backend` – бэкенд на Express + PostgreSQL.  
3. `/frontend` – фронтенд на React + Vite с Chakra UI.  
4. `docker-compose.yml` – быстрая сборка backend + Postgres.  

---

## Что нужно сделать ученику

### 1. Форк и клон репозитория
```bash
git clone https://github.com/<you>/yourggpu_web_dev_docsify.git
cd yourggpu_web_dev_docsify
```

### 2. Запуск учебного сайта Docsify
```bash
npm i -g docsify-cli  # если ещё не установлен
docsify serve docs -p 3000
```
Откройте http://localhost:3000 и следуйте по материалам.

### 3. Backend
1. Перейдите в каталог `backend/` и установите зависимости:
   ```bash
   cd backend && npm install
   ```
2. Добавьте эндпоинт `/api/health`, который возвращает `{ status: 'ok' }`.
3. Расширьте API для **Todo**:
   * `GET /api/todos`
   * `POST /api/todos`
   * `PATCH /api/todos/:id`
   * `DELETE /api/todos/:id`
4. Подключите PostgreSQL через пакет `pg`.
5. Запускайте в режиме разработки:
   ```bash
   npm run dev
   ```

### 4. Frontend
1. Перейдите в `frontend/` и установите зависимости:
   ```bash
   cd ../frontend && npm install
   ```
2. Используя **Chakra UI**, реализуйте интерфейс Todo-приложения:
   * Список всех задач
   * Форма добавления
   * Галочка «выполнено»
   * Удаление задачи
3. Общайтесь с бэкендом через `fetch` или `axios`.
4. Запуск:
   ```bash
   npm run dev
   ```

### 5. Docker & docker-compose
1. Из корня репозитория выполните:
   ```bash
   docker compose up --build
   ```
   Это поднимет контейнеры `db` (Postgres 15) и `backend`.
2. Настройте переменные окружения (см. `docker-compose.yml`).
3. Убедитесь, что контейнер `backend` отвечает на `http://localhost:3001/api/health`.

### 6. Инструменты качества кода
* Запуск линтера:
  ```bash
  npm run lint          # из backend/
  npm run lint          # из frontend/
  ```
* Отформатируйте код Prettier-ом (настройки в `.prettierrc`).

### 7. Проверка
* Тестируйте API через Postman/Insomnia.
* Добавьте скриншоты и поменяйте `docs/train.md`, если нужно.

---

## Быстрый старт в один шаг
```bash
docker compose up --build
```
Затем:
* Backend: `http://localhost:3001/api/health`
* Docsify:   `docs/index.html` (или запустите `docsify serve docs`)

Удачной учёбы!
