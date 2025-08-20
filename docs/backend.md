# Node.js + Express

> 🚧 **Placeholder:** скриншот запущенного сервера (`node index.js`).

## Шаги
1. `npm init -y`
2. `npm i express nodemon`
3. Создайте `index.js` и настройте routы

### Мини‑задание
Сделайте эндпоинт `/api/health` который возвращает JSON `{status: 'ok'}`

## Контейнеризация

1. В каталоге `backend/` находится `Dockerfile`, собирающий образ с Node.js-сервисом.
2. В корне репозитория расположен `docker-compose.yml`, который запускает два контейнера:
   - `backend` — ваше приложение на порту 3001;
   - `db` — PostgreSQL 15 с сохранением данных во volume `postgres-data`.

Для запуска выполните:

```bash
docker compose up --build
```

После сборки приложение будет доступно по адресу `http://localhost:3001/api/health`.

Благодаря примонтированному тому `./backend:/app` изменения в исходниках видны контейнеру без пересборки.