const inquirer = require('inquirer');
const {userPrompt} = require('./db/userPrompt')

const appStart = () => { console.log("Welcome User! Entering Employee Database Archives!"); userPrompt();}
appStart();