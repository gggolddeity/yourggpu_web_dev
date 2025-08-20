# Полный гайд по разработке приложений на Node.js

> Этот документ — живой конспект. Если вы находите ошибку или хотите дополнить материал — присылайте Pull Request!

## Содержание
1. [Создание проекта](#создание-проекта)
2. [Структура каталогов](#структура-каталогов)
3. [Express.js — быстрый старт](#expressjs)
4. [Написание REST API](#rest-api)
5. [Подключение к PostgreSQL через `pg`](#postgresql)
6. [Тестирование API](#тестирование)
7. [Контейнеризация. Dockerfile](#dockerfile)
8. [Оркестрация. docker-compose](#docker-compose)
9. [Полезные команды](#полезные-команды)
10. [Советы для продакшна](#советы-для-продакшна)

## Создание проекта

```bash
mkdir my-app && cd my-app
npm init -y
npm i express pg cors
npm i -D nodemon
```

Создайте файл `package.json` следующего вида:

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js"
  }
}
```

## Структура каталогов

```
my-app/
 ├─ src/
 │  ├─ index.js      # точка входа
 │  ├─ db.js         # подключение к Postgres
 │  └─ routes.js     # все маршруты API
 ├─ Dockerfile
 └─ docker-compose.yml
```

## Express.js

Минимальный сервер:

```js
import express from 'express';
const app = express();
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.listen(3001, () => console.log('Server ready'));
```

## REST API

Правила:
- Статусы HTTP: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, 500 Internal Server Error.
- Используйте глаголы: GET (чтение), POST (создание), PATCH/PUT (обновление), DELETE (удаление).
- Ответы всегда в формате JSON.

## PostgreSQL

Библиотека `pg`:

```js
import pkg from 'pg';
const { Pool } = pkg;
export const db = new Pool({ connectionString: process.env.DATABASE_URL });
```

Запросы:

```js
const { rows } = await db.query('SELECT * FROM todos');
```

## Тестирование

- Postman / Insomnia
- jest + supertest для автотестов

## Dockerfile

```Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
ENV PORT=3001
EXPOSE 3001
CMD ["node", "src/index.js"]
```

Пояснения:
1. `node:18-alpine` — лёгкий образ.
2. Используем `npm ci --omit=dev`, чтобы установить только runtime-зависимости.
3. `EXPOSE` не публикует порт, а лишь документирует его.

## docker-compose

```yaml
services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: devdb
  backend:
    build: .
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/devdb
    ports:
      - "3001:3001"
    depends_on:
      - db
```

Команды:

```bash
docker compose up --build      # запустить всё
docker compose down -v         # остановить и удалить volume
docker compose logs -f backend # смотреть логи
```

## Полезные команды

- `docker image prune` — удалить неиспользуемые образы
- `docker volume ls` — список томов

## Советы для продакшна

1. Храните конфигурации в переменных окружения.
2. Настройте healthcheck в `docker-compose.yml`.
3. Используйте multi-stage build для тонких образов.

---

Удачи в разработке! 