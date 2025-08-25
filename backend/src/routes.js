import express from 'express';
import db from './db.js';

const router = express.Router();

// --- TODO CRUD endpoints ---
// Получить все задачи
router.get('/todos', async (_req, res) => {
  const { rows } = await db.query('SELECT * FROM todos ORDER BY id');
  res.json(rows);
});

// Создать задачу
router.post('/todos', async (req, res) => {
  const { text } = req.body;
  const { rows } = await db.query(
    'INSERT INTO todos(text) VALUES($1) RETURNING *',
    [text]
  );
  res.status(201).json(rows[0]);
});

// Обновить задачу (текст или статус)
router.patch('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  const { rows } = await db.query(
    'UPDATE todos SET text = COALESCE($1, text), completed = COALESCE($2, completed) WHERE id = $3 RETURNING *',
    [text, completed, id]
  );
  if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
  res.json(rows[0]);
});

// Удалить задачу
router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM todos WHERE id = $1', [id]);
  res.status(204).end();
});

export default router;