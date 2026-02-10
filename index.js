const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// This function creates the table automatically
const initDb = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS printer_logs (
      id SERIAL PRIMARY KEY,
      device TEXT,
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(createTableQuery);
    console.log("Database table is ready!");
  } catch (err) {
    console.error("Error creating table:", err);
  }
};

// Run the setup
initDb();
