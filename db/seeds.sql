USE employee_db;

INSERT INTO departments (name)
VALUES ("Operations"),("HR"),("IT Support"),("Customer Service");

INSERT INTO roles (title, salary, departments_id)
VALUES ("CEO Founder", 999999.00, 1), ("Ops Manager", 90000.00, 1), ("Shift Manager", 65000.00, 1), ("Warehouse Associate", 40000.00, 1),
("Senior HR", 120000.00, 2), ("HRBP", 90000.00, 2), ("HR Rep", 60000.00, 2),
("Senior Engineer", 130000.00, 3), ("Program Manager", 80000.00, 3), ("IT Support Specialist", 55000.00, 3),
("Senior CS Manager", 75000.00, 4), ("CS Supervisor", 55000.00, 4), ("CS Assocaite", 45000.00, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Kai", "Chen", 1, NULL),
("Daniel", "Chen", 3, 1);