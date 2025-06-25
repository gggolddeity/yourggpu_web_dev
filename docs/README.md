```markdown
# Fullstack Event Sourcing Example

**Учебный проект** по разработке веб‑приложений, демонстрирующий два ключевых подхода к хранению и обработке данных:
- Классический REST (CRUD)
- Event Sourcing (запись событий в поток)

---
### 🚀 Цели проекта
1. Научиться строить и запускать REST API на Node.js + Express.
2. Освоить хранение данных в PostgreSQL и работу с JSONB.
3. Понять основы и преимущества Event Sourcing.
4. Разрабатывать интерактивный фронтенд на React + Vite.

---
### 📋 Структура проекта
```
fullstack-event-sourcing-example/
├── backend/
│   └── src/
│       ├── index.js
│       ├── db.js
│       └── routes.js
└── frontend/
└── src/
├── main.jsx
├── App.jsx
└── api.js
```

---
### ⚙️ Предварительные требования
- **Node.js** v16+ и npm
- **PostgreSQL** 12+
- **Git** (для клонирования репозитория)
- Рекомендуется **VS Code** или аналогичный редактор

---
### 🔧 Установка и запуск
1. **Клонировать репозиторий**
   ```bash
   git clone https://github.com/gggolddeity/yourggpu_web_dev.git
   cd yourggpu_web_dev/fullstack-event-sourcing-example
   ```
2. **Настроить базу данных**
    - Создайте БД:
      ```bash
      createdb mydb
      ```
    - (Опционально) Задайте переменную окружения:
      ```bash
      export DATABASE_URL=postgresql://user:password@localhost:5432/mydb
      ```
3. **Запустить сервер (backend)**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
    - Сервер доступен на **http://localhost:3001**
    - При старте автоматически создаются таблицы `messages` и `event_store`.
4. **Запустить клиент (frontend)**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
    - Приложение доступно на **http://localhost:3000**
    - Запросы `/api` проксируются на порт 3001.

---
### 🧩 Задачи для студентов
1. **Изучить** структуру папок и файлов. Распишите своими словами роль каждого модуля.
2. **Попробовать** CRUD:
    - Отправить `POST /api/messages` с `{ "content": "Hello" }`.
    - Получить список через `GET /api/messages`.
3. **Исследовать** Event Sourcing:
    - Отправить `POST /api/events` с собственным JSON-событием.
    - Получить полный лог через `GET /api/events`.
4. **Интеграция** с UI:
    - В браузере создайте и отобразите сообщения и события.
5. **Расширение** *(дополнительно)*:
    - Добавить тип события `MESSAGE_EDITED` и отобразить его.
    - Реализовать удаление сообщений (`DELETE /api/messages/:id`).

---
### 🎯 Ожидаемые результаты
- Понимание принципов REST и отличий Event Sourcing.
- Навык работы с PostgreSQL и JSONB.
- Опыт настройки прокси в Vite и создания простого UI на React.

---
### 📚 Полезные ресурсы
- Express: https://expressjs.com/
- Node-Postgres: https://node-postgres.com/
- Event Sourcing Basics: https://martinfowler.com/eaaDev/EventSourcing.html
- Vite + React: https://vitejs.dev/guide/
```
```