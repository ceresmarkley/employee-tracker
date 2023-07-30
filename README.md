# employee-tracker

## Description 

An application to allow a user to add/update employee, role, and department information using mysql databases. 

## Table of Contents 

* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [Technology Used](#technology-used)
* [Installation](#installation)
* [Usage](#usage)
* [Sources](#sources)

## User Story
```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria
```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```
## Technology Used   
* [![Node.js](https://img.shields.io/badge/Node.js®-v20.4.0-blue?logo=node.js)](https://nodejs.org/en)    
* [![npm](https://img.shields.io/badge/npm-v9.8.0-blue?logo=npm)](https://docs.npmjs.com/cli/v9/)     
  * [![DotEnv Package](https://img.shields.io/badge/DotEnv-16.3.1-green?logo=dotenv)](https://www.npmjs.com/package/dotenv)    
  * [![Inquirer Package](https://img.shields.io/badge/Inquirer-8.2.5-green?logo=npm)](https://www.npmjs.com/package/inquirer)    
  * [![MySQL2 Package](https://img.shields.io/badge/MySQL2-3.5.2-green?logo=mysql)](https://www.npmjs.com/package/mysql2)
  * [![Console Table](https://img.shields.io/badge/console.table-0.10.0-green?logo=console.table)](https://www.npmjs.com/package/console.table) 


 
## Installation
Before you start, make sure to created a .env file in the root directory as the example shown below:   
     
DB_PASS=Replace this with your own password to your "host"   
   
* Packages to support this application can be installed by using [*npm install*](https://docs.npmjs.com/cli/v9/commands/npm-install) commands.

> **Note**: If you do not have a `package.json` in your directory already, enter command below to [*initiate*](https://docs.npmjs.com/cli/v9/commands/npm-init).
>
>```bash
>npm init -y
>```
>
>then
>
>```bash
>npm install i console.table dotenv inquirer@^8.2.4 mysql2
>```
>
> Once you have installed these packages, open your terminal within the 'db' folder and type:
>
>```bash
>mysql -u root -p
>```
>
> followed with
>
> source schema.sql 

[*back to top*](#table-of-contents)
## Usage


[*back to top*](#table-of-contents)
## Sources 
   
[*back to top*](#table-of-contents)

---

© 2023 Ceres Markley. All Rights Reserved.
