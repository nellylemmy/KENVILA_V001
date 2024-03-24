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

// server.js

app.get('/unknown', async(req, res, next) => {
  const { query } = req.query;
  try {
    const [rows, fields] = await pool.query('SELECT * FROM plumbers');

    const plumbers = rows.map(user => `
        <div class="mycard relative">
          <img class="profile-picture" src="./user.jpg" alt="Profile Picture" width="100%">
          <div class="name search-result"><span>${user.plumber_full_names}</span> <span><img src="./star-svg.svg" width=15/> 3 </span></div>
          <div class="location"><img src="./location-pin-svg.svg" width=15/> ${user.locality ? user.locality : ''}${user.locality ? ',' : ''} ${user.town ? user.town : ''}${user.town ? ',' : ''} ${user.country ? user.country : ''}</div>
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
    const [rows, fields] = await pool.query('SELECT * FROM plumbers WHERE plumber_full_names LIKE ? OR country LIKE ? OR city LIKE ? OR town LIKE ?  OR locality LIKE ?', [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]);

    if(rows.length === 0) {
      res.send(`
      <div class="mycard relative">
      <br>
          No results found.
        </div>
      `);
    }else {

    const searchUIResult = rows.map(user => `
        <div class="mycard relative">
          <img class="profile-picture" src="./user.jpg" alt="Profile Picture" width="100%">
          <div class="name search-result"><span>${user.plumber_full_names}</span> <span><img src="./star-svg.svg" width=15/> 3 </span></div>
          <div class="location"><img src="./location-pin-svg.svg" width=15/> ${user.locality ? user.locality : ''}${user.locality ? ',' : ''} ${user.town ? user.town : ''}${user.town ? ',' : ''} ${user.country ? user.country : ''}</div>
          <div class="availability">Available Now</div>
          <div class="rate">NR.50/hour</div>
        </div>
      `).join('');


    res.status(200).send(searchUIResult);
    }
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
  const { username, email, location, password,phone,country,city,town } = req.body;
  
  try {
    const [rows, fields] = await pool.query('INSERT INTO plumbers (plumber_full_names, plumber_email, location, plumber_password,phone,country,city,town) VALUES (?, ?, ?, ?,?,?,?,?  )', [username, email, location, password,phone,country,city,town]);
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