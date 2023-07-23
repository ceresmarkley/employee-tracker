const inquirer = require('inquirer');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const {userPrompt} = require('./db/userPrompt')

const appStart = () => { console.log("Welcome User! Entering Employee Database Archives!"); userPrompt();}
appStart();

// Connect to database
const dbconnection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.end.DB_PASS,
    database: 'employee_db'
  },
  console.log(`Connected to the employee database.`)
);

module.exports = {
    dbconnection,
}
