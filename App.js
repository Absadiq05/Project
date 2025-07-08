// app.js
require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const pool = require('./db'); // Import the PostgreSQL connection pool
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port or default to 3000

// Middleware to parse JSON bodies
app.use(express.json());

// Test database connection (still good to keep this check here or in db.js)
pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    process.exit(1); // Exit process if database connection fails
  }
  console.log('Connected to PostgreSQL database!');
  client.release(); // Release the client back to the pool
});

// Use the user routes
app.use('/users', userRoutes);

// Basic error handling for undefined routes (404)
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found', message: `Route ${req.originalUrl} not found` });
});

// Generic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
      
