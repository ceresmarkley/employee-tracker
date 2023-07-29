const { runQuery, dbconnection } = require('../config/connection');
const {userPrompt} = require('../prompt/userPrompt');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


const delDepartment = async () => {
    const departments = await runQuery('SELECT * FROM departments');
    const departmentChoices = departments.map(department => ({
        name: department.name,
        value: department.id
    }));

    const { department_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the department to delete:',
            choices: departmentChoices
        }
    ]);

    await runQuery('DELETE FROM departments WHERE id = ?', [department_id]);
    console.log('Department deleted successfully!');
    userPrompt();
};

const delEmployee = async () => {
    const employees = await allEmployees();
    const employeeChoices = employees.map(employee => ({
        name: employee.employee_name,
        value: employee.id
    }));

    const { employee_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee to delete:',
            choices: employeeChoices
        }
    ]);

    await runQuery('DELETE FROM employees WHERE id = ?', [employee_id]);
    console.log('Employee deleted successfully!');
    userPrompt();
};

const delRole = async () => {
    const roles = await runQuery('SELECT * FROM roles');
    const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
    }));

    const { role_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the role to delete:',
            choices: roleChoices
        }
    ]);

    await runQuery('DELETE FROM roles WHERE id = ?', [role_id]);
    console.log('Role deleted successfully!');
    userPrompt();
};

module.exports = {
    delDepartment,
    delEmployee,
    delRole,
    userPrompt,
};