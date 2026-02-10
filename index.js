const { Pool } = require('pg');
const express = require('express');
const app = express();

// Use the Database URL from Render environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for cloud connections
});

app.use(express.json());

app.post('/incoming-messages', async (req, res) => {
    const { device, message } = req.body;

    try {
        const query = 'INSERT INTO printer_logs (device, message, created_at) VALUES ($1, $2, NOW())';
        await pool.query(query, [device, message]);
        
        console.log("Logged to Postgres:", device);
        res.status(200).send('Message Saved to Database!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Database Error');
    }
});
