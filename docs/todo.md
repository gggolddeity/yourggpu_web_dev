# Практический проект: Todo-приложение

Добро пожаловать в главный практический модуль. Здесь мы шаг-за-шагом создадим сервис задач «Todo», освоим базовые концепции **бэкенда** (Node.js + Express + PostgreSQL) и **фронтенда** (React + Chakra UI). Документ рассчитан на **абсолютных новичков**: все команды, файлы и термины подробно объяснены.

> Если вы уже уверенно пишете на JS — пролистывайте введение и переходите к разделу «⚒️ Практика».

---

## 0. Что такое «Todo»-приложение?

* **CRUD**-сервис (Create Read Update Delete), хранящий список задач.
* Каждая задача имеет поля `id`, `text`, `completed`.
* Пользователь может:
  1. Создать новую задачу.
  2. Просмотреть список.
  3. Пометить задачу выполненной.
  4. Удалить задачу.

Это минимальный, но полный «вертикальный срез» настоящего веб-приложения.

---

## 1. Теория backend

### 1.1 Node.js, npm, скрипты
* **Node.js** — среда выполнения JavaScript на сервере.
* **npm** — менеджер пакетов. Команды:
  * `npm init -y` — создать `package.json`.
  * `npm i express pg` — установить зависимости.
  * `npm run dev` — запуск скрипта `dev` из `package.json`.

### 1.2 Express.js за 5 минут
```js
import express from 'express';
const app = express();
app.use(express.json());          // парсер JSON-тел
app.get('/hello', (_req, res) => res.send('Hi!'));
app.listen(3001);
```
* **Маршрут** (Route) — URL + HTTP-метод.
* **Middleware** — функция `(req, res, next)`.

### 1.3 PostgreSQL основные команды
| Команда | Описание |
|---------|----------|
| `psql` | интерактивная консоль |
| `CREATE DATABASE devdb;` | создать БД |
| `\c devdb` | подключиться |
| `\dt` | список таблиц |

### 1.4 Схема таблицы `todos`
```sql
CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT false
);
```

### 1.5 SQL ↔ JavaScript (пакет `pg`)
```js
import pkg from 'pg';
const { Pool } = pkg;
const db = new Pool({ connectionString: process.env.DATABASE_URL });
// выборка
const { rows } = await db.query('SELECT * FROM todos');
```

### 1.6 Полный список эндпоинтов
| Метод | URL | Тело | Ответ |
|-------|-----|------|-------|
| GET | `/api/todos` | — | массив задач |
| POST | `/api/todos` | `{ text }` | созданная задача |
| PATCH | `/api/todos/:id` | `{ text?, completed? }` | обновлённая задача |
| DELETE | `/api/todos/:id` | — | `204 No Content` |

---

## 2. Теория frontend

### 2.1 React: три кита
1. **Компоненты** — функции, возвращающие JSX.
2. **Состояние** (`useState`) — данные, влияющие на UI.
3. **Побочные эффекты** (`useEffect`) — запросы, таймеры.

Пример минимального компонента:
```jsx
function Hello({ name }) {
  return <p>Привет, {name}!</p>;
}
```

### 2.2 Chakra UI базовые компоненты
| Компонент | Назначение |
|-----------|------------|
| `<Button>` | кнопка |
| `<Input>` | однострочный ввод |
| `<Checkbox>` | флажок |
| `<Stack spacing="4">` | вертикальный стек |

Импорт осуществляется так:
```jsx
import { Button, Input, Checkbox, Stack } from '@chakra-ui/react';
```

### 2.3 Запросы из браузера
```jsx
async function addTodo(text) {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  return res.json();
}
```

---

## 3. ⚒️ Практика: шаг за шагом

### Шаг 1. Клонируем и запускаем Docker-окружение
```bash
git clone https://github.com/<you>/yourggpu_web_dev_docsify.git
cd yourggpu_web_dev_docsify
docker compose up --build
```
* Откройте `http://localhost:3001/api/todos` — должен прийти `[]`.

### Шаг 2. Проверяем базу
```bash
psql postgres://postgres:postgres@localhost:5432/devdb -c '\d todos'
```
Если таблица не создана — проверьте логи контейнера `backend`.

### Шаг 3. Добавляем первую задачу
```bash
curl -X POST http://localhost:3001/api/todos \
  -H 'Content-Type: application/json' \
  -d '{"text":"Купить хлеб"}'
```

### Шаг 4. Создаём UI
1. Откройте новый терминал:
   ```bash
   cd frontend
   npm run dev
   ```
2. В `App.jsx` напишите:
   ```jsx
   import { useState, useEffect } from 'react';
   import { Stack, Input, Button, Checkbox } from '@chakra-ui/react';
   import { getTodos, addTodo } from './api';

   export default function App() {
     const [todos, setTodos] = useState([]);
     const [text, setText] = useState('');

     useEffect(() => { getTodos().then(setTodos); }, []);

     const handleAdd = async () => {
       const todo = await addTodo(text);
       setTodos([...todos, todo]);
       setText('');
     };

     return (
       <Stack p={8} maxW="md" mx="auto">
         {todos.map(t => (
           <Checkbox key={t.id} isChecked={t.completed}>{t.text}</Checkbox>
         ))}
         <Input value={text} onChange={e => setText(e.target.value)} placeholder="Новая задача" />
         <Button onClick={handleAdd} colorScheme="teal">Добавить</Button>
       </Stack>
     );
   }
   ```
3. Сохраните, браузер автообновится (Vite).

### Шаг 5. Дополнительные улучшения
* Добавить `PATCH /todos/:id` при клике на чекбокс.
* Стилизовать список: индикаторы, разделители.
* Подключить `React Hook Form` для валидации.

---

## 4. Часто задаваемые вопросы

### «Почему у меня CORS-ошибка?»
* Бэкенд уже использует `cors()` middleware. Убедитесь, что фронтенд запрашивает `http://localhost:3001`. В Vite прокси можно задать в `vite.config.js`.

### «Как деплоить?»
1. Соберите фронтенд: `npm run build` (папка `dist`).
2. Соберите продакшен-образ backend (multi-stage Dockerfile).
3. Разверните всё на Render / Railway / VPS.

---

## 5. Полезные ссылки
* React docs (RU): <https://ru.react.dev/learn>
* Chakra UI: <https://chakra-ui.com/getting-started>
* Express guide: <https://expressjs.com/en/starter/installing.html>
* SQL Tutorial: <https://www.sqltutorial.org/>
* Git удобный справочник: <https://rogerdudler.github.io/git-guide/index.ru.html>

> 🎉 На этом всё! Отправьте Pull Request со своим решением, добавьте скриншоты вызовов API и работающего интерфейса. 