const inquirer = require('inquirer');
const {userPrompt} = require('./models/prompt/userPrompt');

const appStart = () => { console.log("Welcome User! Entering Employee Database Archives!"); userPrompt();}
appStart();