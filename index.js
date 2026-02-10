const { Pool } = require('pg');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the Render Postgres Database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } 
});

app.use(express.json());

app.post('/incoming-messages', async (req, res) => {
    const { device, message } = req.body;

    try {
        // This line actually saves the data to your new table
        const query = 'INSERT INTO printer_logs (device, message) VALUES ($1, $2) RETURNING *';
        await pool.query(query, [device, message]);
        
        // This is the new success message you should see
        res.status(200).send('Message Saved to Database!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Database Error: ' + err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
