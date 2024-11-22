const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create express app
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'faculty_management'  // You can reuse this database for other systems
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Create faculties table if not exists
connection.query(`
    CREATE TABLE IF NOT EXISTS faculties (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        subject VARCHAR(255) NOT NULL,
        department VARCHAR(255) NOT NULL
    );
`, (err, result) => {
    if (err) throw err;
    console.log("Faculties table checked/created");
});

// Get all faculties
app.get('/faculties', (req, res) => {
    connection.query('SELECT * FROM faculties', (err, result) => {
        if (err) throw err;
        res.json(result);  // Send faculty data as JSON
    });
});

// Add a new faculty
app.post('/faculties', (req, res) => {
    const { name, age, subject, department } = req.body;
    connection.query(
        'INSERT INTO faculties (name, age, subject, department) VALUES (?, ?, ?, ?)', 
        [name, age, subject, department],
        (err, result) => {
            if (err) throw err;
            res.status(201).send({ message: 'Faculty added successfully' });
        }
    );
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
