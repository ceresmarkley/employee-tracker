const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Connect to database
const dbconnection = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
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