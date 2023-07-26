const { runQuery, dbconnection } = require('../config/connection');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const { validateInput, validateNumber } = require('./validate');

const userPrompt = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: "What would you like to do?",
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
                addDepartment();
            } else if (choices === 'Add Role') {
                addRole();
            } else if (choices === 'Add Employee') {
                addEmployee();
            } else if (choices === 'Update Employee Role') {
                updateEmployee();
            } else if (choices === 'Update Employee Manager') {
                updateEmpManager();
            } else if (choices === 'Delete Department') {
                delDepartment();
            } else if (choices === 'Delete Role') {
                delRole();
            } else if (choices === 'Delete Employee') {
                delEmployee();
            } else if (choices === 'Exit') {
                console.log("Goodbye User! Exiting Program!")
                dbconnection.end();
            }
        });
};

const showDepartments = async () => {
    const departments = await runQuery('SELECT * FROM departments');
    console.table(departments);
    userPrompt();
};

const showRoles = async () => {
    const roles = await runQuery(`
    SELECT 
        roles.id,roles.title,roles.salary,departments.name AS department
    FROM roles
    INNER JOIN departments on roles.departments_id = departments.id;`);
    console.table(roles);
    userPrompt();
};

const showEmployees = async () => {
    const employees = await runQuery(`
    SELECT
    employees_id,
    employee_firstname,
    employee_lastname,
    roles.title AS title,
    departments.name AS department,
    roles.salary AS salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS \`manager(first-last name)\`
    FROM employees
    LEFT JOIN roles on employees.role_id = roles.id
    LEFT JOIN departments on roles.departments_id = departments.id
    LEFT JOIN employees manager on employees.manager_id = manager.id`);
    console.table(employees);
    userPrompt();
};

const addDepartment = async () => {
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department:',
            validate: validateInput,
        }
    ]);

    await runQuery('INSERT INTO departments (name) VALUES (?)', [department.name]);
    console.log(`Department "${department.name}" added successfully!`);
    userPrompt();
};

const addRole = async () => {
    const departments = await runQuery('SELECT * FROM departments');
    // using map method to return a new selected department
    const departmentChoices = departments.map(department => ({
        name: department.name,
        value: department.id
    }));

    const role = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the new role:',
            validate: validateInput,
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for this role:',
            validate: validateNumber,
        },
        {
            type: 'list',
            // display the department name instead of deparment id
            name: 'departments_id',
            message: 'Select the department for this role:',
            choices: departmentChoices
        }
    ]);

    await runQuery('INSERT INTO roles (title, salary, departments_id) VALUES (?, ?, ?)', [role.title, role.salary, role.departments_id]);
    console.log(`Role "${role.title}" added successfully!`);
    userPrompt();
};

// fetch id and name form employees table for employeeUpdate function
const allEmployees = async () => {
    const employees = await runQuery(`
    SELECT 
        id, CONCAT(first_name, " ", last_name) AS employee_name 
    FROM employees`);
    return employees;
};

// fetch id and title from roles table for employeeUpdate function
const allRoles = async () => {
    const roles = await runQuery(`
    SELECT 
        id, title 
    FROM roles`);
    return roles;
};

const updateEmployee = async () => {
    const employees = await allEmployees();
    // using map method to return a selected employee
    const employeeChoices = employees.map(employee => ({
        // show name in prompt 
        name: employee.employee_name,
        // save by employee.id
        value: employee.id
    }));

    const roles = await allRoles();
    // using map method to return a selected employee
    const roleChoices = roles.map(role => ({
        // show role.title in prompt 
        name: role.title,
        // save by role.id
        value: role.id
    }));

    const updateEmployee = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee you want to update:',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the new role for the employee:',
            choices: roleChoices
        }
    ]);

    await runQuery('UPDATE employees SET role_id = ? WHERE id = ?', [updateEmployee.role_id, updateEmployee.employee_id]);
    console.log('Employee role updated successfully!');
    userPrompt();
}

const addEmployee = async () => {
    const roles = await allRoles();
    const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
    }));

    const managers = await allEmployees();
    const managerChoices = managers.map(manager => ({
        name: manager.employee_name,
        value: manager.id
    }));

    const employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the new employee:',
            validate: validateInput,
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the new employee:',
            validate: validateInput,
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the role for the new employee:',
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select the manager for the new employee:',
            choices: [
                { name: 'None', value: null },
                ...managerChoices
            ]
        }
    ]);

    await runQuery('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]);
    console.log(`Employee "${employee.first_name} ${employee.last_name}" added successfully!`);
    userPrompt();
};

const updateEmpManager = async () => {
    const employees = await allEmployees();
    const employeeChoices = employees.map(employee => ({
        name: employee.employee_name,
        value: employee.id
    }));

    const managers = await allEmployees();
    const managerChoices = managers.map(manager => ({
        name: manager.employee_name,
        value: manager.id
    }));

    const { employee_id, manager_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee whose manager you want to update:',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select the new manager for the employee:',
            choices: [
                { name: 'None', value: null },
                ...managerChoices
            ]
        }
    ]);

    await runQuery('UPDATE employees SET manager_id = ? WHERE id = ?', [manager_id, employee_id]);
    console.log('Employee manager updated successfully!');
    userPrompt();
};


// beginning of roster function's section cmc
const managersRoster = async () => {
    const managers = await allEmployees();
    const managerChoices = managers.map(manager => ({
        name: manager.employee_name,
        value: manager.id
    }));

    const { manager_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select the manager to view their employees:',
            choices: managerChoices
        }
    ]);

    // Check if the selected employee is a manager
    const selectedEmployee = managers.find(manager => manager.id === manager_id);
    if (selectedEmployee) {
        const query = `
        SELECT 
            CONCAT(employees.first_name, ' ', employees.last_name) AS \`employee name\`,
            roles.title AS role,
            departments.name AS department,
            roles.salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS \`manager name\`
        FROM employees 
        INNER JOIN roles ON employees.role_id = roles.id
        INNER JOIN departments ON roles.departments_id = departments.id
        LEFT JOIN employees manager ON employees.manager_id = manager.id
        WHERE employees.manager_id = ?;`;

        const employees = await runQuery(query, [manager_id]);
        if (employees.length > 0) {
            console.log(`Employees managed by ${selectedEmployee.employee_name}:`);
            console.table(employees);
        } else {
            console.log(`${selectedEmployee.employee_name} does not have any direct reports.`);
        }
    }
    userPrompt();
};

const departmentsRoster = async () => {
    const departments = await runQuery('SELECT * FROM departments');
    const departmentChoices = departments.map(department => ({
        name: department.name,
        value: department.id
    }));

    const { department_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the department to view its employees:',
            choices: departmentChoices
        }
    ]);

    const employees = await runQuery(`
    SELECT 
        employees.id, 
        CONCAT(employees.first_name, ' ', employees.last_name) AS employee_name, 
        roles.title AS title, 
        roles.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees 
    LEFT JOIN roles ON employees.role_id = roles.id 
    LEFT JOIN employees manager ON employees.manager_id = manager.id 
    WHERE roles.departments_id = ?`, [department_id]);
    console.table(employees);
    userPrompt();
};

// function to view total budget of employee roster per department. cmc
const depBudget = async () => {
    const departments = await runQuery('SELECT * FROM departments');
    const departmentChoices = departments.map(department => ({
        name: department.name,
        value: department.id
    }));

    const { department_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the department to view its total budget:',
            choices: departmentChoices
        }
    ]);

    const result = await runQuery(`SELECT SUM(roles.salary) AS total_budget 
    FROM employees JOIN roles ON employees.role_id = roles.id WHERE roles.departments_id = ?`, [department_id]);
    const totalBudget = result[0].total_budget;
    console.log(`Total budget for the department: $${totalBudget}`);
    userPrompt();
};


//beginning of delete functions section. cmc
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
    userPrompt,
    showDepartments,
    showRoles,
    showEmployees,
    managersRoster,
    departmentsRoster,
    depBudget,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployee,
    updateEmpManager,
    delDepartment,
    delRole,
    delEmployee,
};