# ЭУМП: Полный курс по проектированию и разработке веб-приложения «Todo»

> Электронный Учебно-Методический Пособие (ЭУМП) для студентов ЮУРГГПУ. Содержит практику и теорию по **Node.js + Express + PostgreSQL** (бэкенд) и **React + Chakra UI** (фронтенд), а также основы Git, Docker и CI/CD. Изучив этот репозиторий, вы сможете разработать и развернуть полнофункциональное CRUD-приложение «Todo».

---

## Содержание
1. [Структура репозитория](#структура-репозитория)
2. [Быстрый старт](#быстрый-старт)
3. [Git — основы командной работы](#git--основы-командной-работы)
4. [Backend: Node.js + Express + PostgreSQL](#backend-nodejs--express--postgresql)
   1. [Node.js — ядро](#nodejs--ядро)
   2. [Express.js — каркас](#expressjs--каркас)
   3. [REST API и маршруты](#rest-api-и-маршруты)
   4. [PostgreSQL и миграции](#postgresql-и-миграции)
   5. [Тестирование API](#тестирование-api)
5. [Frontend: React 18 + Chakra UI](#frontend-react18--chakra-ui)
   1. [Основы React](#основы-react)
   2. [Хуки и реактивность](#хуки-и-реактивность)
   3. [Работа с Chakra UI](#работа-с-chakra-ui)
   4. [Запросы к API](#запросы-к-api)
6. [Docker и docker-compose](#docker-и-docker-compose)
7. [CI/CD и GitHub Actions](#cicd-и-github-actions)
8. [Рекомендованные ресурсы](#рекомендованные-ресурсы)

---

## Структура репозитория
```
yourggpu_web_dev_docsify/
├── docs/               # Markdown-курс (Docsify)
├── backend/            # Node.js + Express + PostgreSQL
│   ├── src/
│   │   ├── index.js    # точка входа, миграции
│   │   ├── db.js       # пул подключений к БД
│   │   └── routes.js   # CRUD для /api/todos
│   └── Dockerfile
├── frontend/           # React + Vite + Chakra UI
│   ├── src/
│   │   ├── main.jsx    # точка входа, ChakraProvider
│   │   ├── App.jsx     # корневой компонент
│   │   └── api.js      # обёртка над fetch/axios
│   └── vite.config.js
├── docker-compose.yml  # backend + postgres
└── README.md           # вы читаете это
```

---

## Быстрый старт
```bash
git clone https://github.com/<your-username>/yourggpu_web_dev_docsify.git
cd yourggpu_web_dev_docsify

# Запуск через Docker (предпочтительно)
docker compose up --build
# Бэкенд → http://localhost:3001
# Фронтенд (Vite) → http://localhost:3000

# Запуск без Docker
cd backend && npm i && npm run dev &
cd ../frontend && npm i && npm run dev
```
_Таблица `todos` будет создана автоматически при первом запуске бэкенда._

---

## Git — основы командной работы
| Цель | Команда |
|------|---------|
| Склонировать репозиторий | `git clone URL` |
| Создать новую ветку | `git checkout -b feature/todo-ui` |
| Смотреть статус | `git status` |
| Добавить изменения | `git add .` |
| Зафиксировать | `git commit -m "feat: add TodoList"` |
| Отправить | `git push origin feature/todo-ui` |
| Обновить локальную ветку | `git pull origin main` |
| Переключиться | `git checkout main` |
| Слить изменения (fast-forward) | `git merge feature/todo-ui` |

_Рекомендуется_ вести разработку через Pull Request: ветка → PR → код-ревью → merge.

---

## Backend: Node.js + Express + PostgreSQL

### Node.js — ядро
* **Однопоточный** event-loop, неблокирующий I/O.
* Модульная система ES Modules (`import`) — задаётся полем `"type": "module"` в `package.json`.
* Встроенные API: `fs`, `path`, `http`, `crypto`, `events`.

### Express.js — каркас
* Минималистичный фреймворк: маршруты, middleware, статические файлы.
* Подключение:
  ```js
  import express from 'express';
  const app = express();
  app.use(express.json());        // JSON-body parser
  app.listen(3001);
  ```
* Middleware-цепочка: `(req, res, next)`.

### REST API и маршруты
Файл `backend/src/routes.js` реализует CRUD для `/api/todos`:
* `GET    /api/todos` – список задач
* `POST   /api/todos { text }` – создать
* `PATCH  /api/todos/:id { text?, completed? }` – обновить
* `DELETE /api/todos/:id` – удалить

```js
router.post('/todos', async (req, res) => {
  const { text } = req.body;
  const { rows } = await db.query(
    'INSERT INTO todos(text) VALUES($1) RETURNING *', [text]
  );
  res.status(201).json(rows[0]);
});
```

### PostgreSQL и миграции
* Подключаемся через пакет `pg` (`Pool`).
* В `index.js` выполняем _миграцию «по месту»_:
  ```sql
  CREATE TABLE IF NOT EXISTS todos(
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE
  );
  ```
* Строка подключения берётся из `process.env.DATABASE_URL`.

#### Ручной запуск миграции
```bash
node -e "import('./backend/src/db.js').then(({default:db})=>db.query(\"CREATE TABLE IF NOT EXISTS todos(id SERIAL PRIMARY KEY,text TEXT NOT NULL,completed BOOLEAN DEFAULT false);\").then(()=>console.log('done')).finally(()=>process.exit()))"
```

### Тестирование API
* **Postman / Insomnia** – ручное тестирование запросов.
* **Jest + Supertest** – автоматические интеграционные тесты.
  ```js
  import request from 'supertest';
  import app from '../src/index.js';
  test('GET /todos', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.statusCode).toBe(200);
  });
  ```

---

## Frontend: React 18 + Chakra UI

### Основы React
| Понятие | Описание |
|---------|----------|
| **Компонент** | Функция, возвращающая JSX. |
| **JSX** | Расширение синтаксиса JS (`<div />`). |
| **Props** | Входные данные компонента. |
| **State** | Внутреннее состояние (`useState`). |
| **VDOM** | Виртуальный DOM, диффы и патчи. |

#### Пример
```jsx
function Counter() {
  const [n, setN] = React.useState(0);
  return (
    <button onClick={() => setN(n + 1)}>Clicked {n}</button>
  );
}
```

### Хуки и реактивность
| Хук | Назначение |
|-----|------------|
| `useState` | локальный state |
| `useEffect` | побочные эффекты (fetch, timers) |
| `useContext` | глобальное состояние |
| `useMemo` / `useCallback` | мемоизация |

Правила:
1. Хуки вызываются **только** на верхнем уровне функции.
2. Хуки вызываются **только** в React-компонентах или пользовательских хуках.

### Работа с Chakra UI
* Установка уже выполнена (`@chakra-ui/react`, `@emotion/*`, `framer-motion`).
* Обёртка в `main.jsx`:
  ```jsx
  import { ChakraProvider } from '@chakra-ui/react';
  ReactDOM.createRoot(el).render(
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
  ```
* Компоненты: `Button`, `Input`, `Checkbox`, `Stack`, `Heading` и др.
* Тема настраивается через `extendTheme`.

### Запросы к API
`frontend/src/api.js` (добавьте):
```js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export const getTodos = () => fetch(`${API_URL}/todos`).then(r => r.json());
export const addTodo = text => fetch(`${API_URL}/todos`, {
  method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({text})
}).then(r => r.json());
```

Использование в компоненте:
```jsx
const [todos, setTodos] = useState([]);
useEffect(() => { getTodos().then(setTodos); }, []);
```

### Верстка и философия React
* **Declarative UI** – описываем, «что» отобразить, а не «как» изменить DOM.
* **One-way data flow** – данные идут сверху вниз.
* **Композиция** вместо наследования – маленькие компоненты.

---

## Docker и docker-compose
`docker-compose.yml` разворачивает два сервиса:
```yaml
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: devdb
    ports: ["5432:5432"]
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/devdb
    ports: ["3001:3001"]
    depends_on: [db]
```
Команды:
```bash
docker compose up --build   # старт
docker compose down -v      # остановить + удалить volume
```

---

## CI/CD и GitHub Actions
Пример workflow для публикации Docsify на GH Pages:
```yaml
name: Deploy Docsify
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs
```
Для backend можно добавить job «Run tests» с `npm ci && npm test`.

---

## Рекомендованные ресурсы
* Node.js: <https://nodejs.org/>
* Express: <https://expressjs.com/>
* PostgreSQL: <https://www.postgresql.org/>
* React Docs (рус): <https://ru.react.dev/>
* Chakra UI: <https://chakra-ui.com/>
* Git Handbook: <https://git-scm.com/book/ru/v2>
* Docker: <https://docs.docker.com/>
* REST Best Practices: <https://restfulapi.net/>

> Удачи в разработке! Если нашли ошибку — создайте Issue или Pull Request.
