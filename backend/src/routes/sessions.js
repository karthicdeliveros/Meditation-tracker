import { Router } from 'express';
import pool from '../db/client.js';

const router = Router();

// GET /api/sessions — return all sessions, newest first
router.get('/', async (_req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM sessions ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('GET /api/sessions error:', err);
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// POST /api/sessions — insert a new session, return created row
router.post('/', async (req, res) => {
  const { date, duration_minutes, type, notes, mood } = req.body;
  if (!date || !duration_minutes || !type) {
    return res.status(400).json({ error: 'date, duration_minutes, and type are required' });
  }
  try {
    const { rows } = await pool.query(
      `INSERT INTO sessions (date, duration_minutes, type, notes, mood)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [date, duration_minutes, type, notes ?? null, mood ?? null]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('POST /api/sessions error:', err);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// DELETE /api/sessions/:id — delete by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM sessions WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/sessions/:id error:', err);
    res.status(500).json({ error: 'Failed to delete session' });
  }
});

export default router;
