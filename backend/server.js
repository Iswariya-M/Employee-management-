const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'aishu@2003',
  database: 'employee_management'
});

connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL: ' + err.stack);
      return;
    }
    console.log('Connected to MySQL');
  });
  
 // Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// app.post('/save-data', (req, res) => {
//   const formData = req.body;

//   const sql = 'INSERT INTO employees (name, employee_id, department, dob, gender, designation, salary, email, number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
//   const values = [formData.name, formData.employeeId, formData.department, formData.dob, formData.gender, formData.designation, formData.salary, formData.email, formData.number];

//   connection.query(sql, values, (error, results, fields) => {
//     if (error) {
//       console.error('Error saving data:', error);
//       res.status(500).json({ error: 'Error saving data' });
//       return;
//     }
//     console.log('Data saved successfully:', results);
//     res.status(200).json({ message: 'Data saved successfully' });
//   });
// });

app.post('/save-data', (req, res) => {
  const formData = req.body;

  // Check if email or employee ID already exists
  const checkSql = 'SELECT COUNT(*) AS count FROM employees WHERE email = ? OR employee_id = ?';
  const checkValues = [formData.email, formData.employeeId];

  connection.query(checkSql, checkValues, (checkError, checkResults) => {
    if (checkError) {
      console.error('Error checking data:', checkError);
      res.status(500).json({ error: 'Error checking data' });
      return;
    }

    const { count } = checkResults[0];

    if (count > 0) {
      console.log('Email or employee ID already exists');
      res.status(400).json({ error: 'Email or employee ID already exists' });
      return;
    }

    // Insert data into MySQL
    const sql = 'INSERT INTO employees (name, employee_id, department, dob, gender, designation, salary, email, number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [formData.name, formData.employeeId, formData.department, formData.dob, formData.gender, formData.designation, formData.salary, formData.email, formData.number];

    connection.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Error saving data' });
        return;
      }
      console.log('Data saved successfully:', results);
      res.status(200).json({ message: 'Data saved successfully' });
    });
  });
});

// Add a new route to fetch employee details
app.get('/employee-details', (req, res) => {
  connection.query('SELECT * FROM employees', (error, results, fields) => {
    if (error) {
      console.error('Error fetching employee details:', error);
      res.status(500).json({ error: 'Error fetching employee details' });
      return;
    }
    console.log('Employee details fetched successfully');
    res.status(200).json(results);
  });
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});