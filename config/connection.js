const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Connect to database
const dbconnection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env.DB_PASS,
      database: 'employee_db'
    });
  
  const runQuery = (sql, values) => {
      return new Promise((resolve, reject) => {
        dbconnection.query(sql, values, (err, results) => {
              if (err) return reject(err);
              resolve(results);
          });
      });
  };
  
  module.exports = {
      dbconnection,
      runQuery,
  }