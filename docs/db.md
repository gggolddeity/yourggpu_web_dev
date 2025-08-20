# PostgreSQL

> 🚧 **Placeholder:** скриншот PgAdmin или таблицы в терминале.

## Темы
- Установка Postgres (если локально)
- Подключение через `pg`
- CRUD‑операции

### Практика
1. Создайте таблицу `users(id SERIAL PRIMARY KEY, email TEXT UNIQUE)`
2. Добавьте запись из Node-приложения

## Запуск проекта

Используйте `docker compose` из корня репозитория:

```bash
docker compose up db
```

Эта команда:

1. Скачает образ `postgres:15-alpine`.
2. Создаст volume `postgres-data` для хранения данных.
3. Откроет порт 5432 на вашей машине.

Строка подключения будет `postgres://postgres:postgres@localhost:5432/devdb`.

Проверьте доступность базы командой:

```bash
psql postgres://postgres:postgres@localhost:5432/devdb -c '\dt'
```

После запуска базы вы можете поднять бэкенд:

```bash
docker compose up backend
```

Бэкенд автоматически подключится к контейнеру `db` по внутреннему DNS-имени `db`.
