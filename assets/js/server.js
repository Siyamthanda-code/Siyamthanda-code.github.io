// server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Replace with your NeonDB connection string
const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_Cx1sD4aRbJmZ@ep-black-heart-a50rw8mn-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
});

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to save reservation
app.post('/api/reservations', async (req, res) => {
    const { name, phone, numberOfPeople, reservationDate, time, message } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO reservations (name, phone, number_of_people, reservation_date, time, message) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, phone, numberOfPeople, reservationDate, time, message]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error saving reservation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to get reservations
app.get('/api/reservations', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM reservations ORDER BY reservation_date DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

