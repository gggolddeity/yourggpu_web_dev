import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db.js';
import routes from './routes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

async function init() {
    // создаём таблицы, если их нет
    await db.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      content TEXT NOT NULL
    );
  `);
    await db.query(`
    CREATE TABLE IF NOT EXISTS event_store (
      id SERIAL PRIMARY KEY,
      aggregate_id TEXT,
      type TEXT NOT NULL,
      data JSONB,
      timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    );
  `);
    await db.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      text TEXT NOT NULL,
      completed BOOLEAN DEFAULT false
    );
  `);

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
}

init().catch(err => console.error(err));