// routes/userRoutes.js

const express = require('express');
const pool = require('../db'); // Import the PostgreSQL connection pool

const router = express.Router(); // Create a new router instance

// GET /users – Get all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching users:', err.message);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// GET /users/:id – Get a specific user
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(`Error fetching user with ID ${id}:`, err.message);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});
