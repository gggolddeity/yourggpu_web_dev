import express from 'express';
import db from './db.js';

const router = express.Router();

// classic messages CRUD
router.get('/messages', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM messages ORDER BY id');
    res.json(rows);
});

router.post('/messages', async (req, res) => {
    const { content } = req.body;
    const { rows } = await db.query(
        'INSERT INTO messages(content) VALUES($1) RETURNING *',
        [content]
    );
    res.json(rows[0]);
});

// event sourcing
router.get('/events', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM event_store ORDER BY id');
    res.json(rows);
});

router.post('/events', async (req, res) => {
    const { aggregateId, type, data } = req.body;
    const { rows } = await db.query(
        'INSERT INTO event_store(aggregate_id, type, data) VALUES($1, $2, $3) RETURNING *',
        [aggregateId, type, data]
    );
    res.json(rows[0]);
});

export default router;