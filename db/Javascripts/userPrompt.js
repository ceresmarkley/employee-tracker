const { dbconnection, runQuery } = require('./db');
const inquirer = require('inquirer');

const userPrompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: "Hello User! What would you like to do?",
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'View Employees by Manager',
                'View Employees by Department',
                'View A Department Budget',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'Delete Department',
                'Delete Role',
                'Delete Employee',
                'Exit'
            ]
        }
    ])

    .then((answers) => {
        const { choices } = answers;

        if (choices === 'View All Departments') {
            showDepartments();
        } else if (choices === 'View All Roles') {
            showRoles();
        } else if (choices === 'View All Employees') {
            showEmployees();
        } else if (choices === 'View Employees by Manager') {
            managersRoster();
        } else if (choices === 'View Employees by Department') {
            departmentsRoster();
        } else if (choices === 'View A Department Budget') {
            depBudget();
        } else if (choices === 'Add Department') {
            depBudget();
        } else if (choices === 'Add Role') {
            depBudget();
        } else if (choices === 'Add Employee') {
            depBudget();
        } else if (choices === 'Update Employee Role') {
            depBudget();
        } else if (choices === 'Update Employee Manager') {
            depBudget();
        } else if (choices === 'Delete Department') {
            depBudget();
        } else if (choices === 'Delete Role') {
            depBudget();
        } else if (choices === 'Delete Employee') {
            depBudget();
        } else if (choices === 'Exit') {
            depBudget();
        }
    })
}

module.exports = {
    userPrompt,
}