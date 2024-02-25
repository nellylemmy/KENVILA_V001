// server.js

const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'plumbers',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// // Signup Endpoint
// app.post('/signup', async (req, res) => {
//   // Your signup logic
// });

// // Login Endpoint
// app.post('/login', async (req, res) => {
//   // Your login logic
// });

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/unknown', async(req, res, next) => {
  const { query } = req.query;
  try {
    const [rows, fields] = await pool.query('SELECT * FROM plumbers');

    const plumbers = rows.map(user => `
        <div class="mycard relative">
          <p class="absolute top-2 right-3 text-black/60 inline-flex items-center text-xs">Online <span class="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
          <img class="profile-picture" src="https://picsum.photos/250/200" alt="Profile Picture">
          <div class="name search-result">${user.plumber_full_names}</div>
          <div class="location">New York, NY</div>
          <div class="availability">Available Now</div>
          <div class="rate">$50/hour</div>
        </div>
      `).join('');


    res.status(200).send(plumbers);
    next();
    // res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const [rows, fields] = await pool.query('SELECT * FROM plumbers WHERE plumber_full_names LIKE ?', [`%${query}%`]);

    const searchUIResult = rows.map(user => `
        <div class="mycard relative">
          <p class="absolute top-2 right-3 text-black/60 inline-flex items-center text-xs">Online <span class="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse"></span></p>
          <img class="profile-picture" src="https://picsum.photos/250/200" alt="Profile Picture">
          <div class="name search-result">${user.plumber_full_names}</div>
          <div class="location">New York, NY</div>
          <div class="availability">Available Now</div>
          <div class="rate">$50/hour</div>
        </div>
      `).join('');


    res.status(200).send(searchUIResult);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
  const { username, email, location, password } = req.body;
  
  try {
    const [rows, fields] = await pool.query('INSERT INTO plumbers (plumber_full_names, plumber_email, location, plumber_password) VALUES (?, ?, ?, ?  )', [username, email, location, password]);
    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Login Endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const [rows, fields] = await pool.query('SELECT * FROM plumbers WHERE plumber_email = ? AND plumber_password = ?', [email, password]);
    if (rows.length > 0) {
      res.status(200).json({ message: 'Login successful', user: rows[0] });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// AIzaSyBLmAmihTyhe_1XvnX4dTUXTZaZwULxHyk