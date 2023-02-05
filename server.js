const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql12');
require('cosnole.table');

const db = mysql.createConnection({
    user: 'root',
    database: 'employee_db',
});

const insertInto = (table, data) => {
    db.query('INSERT INTO ?? SET ?', [table, data], (err) => {
        if (err) return console.error(err);
        console.log('Successfully added newest addition to table!');
        init();
    });
};

const selectAll = async (table, display) => {
    const results = await db.promise().query('SELECT * FROM ' + table);
    if (display) {
        console.table(results[0]);
        return init();
    }
    return results;
};

const selectAllNameAndValue = (table, name, value) => {
    return db.promise().query('SELECT ?? As name, ?? AS value FROM ??', [name, value, table]);
};

const viewAllEmployees = async () => {
    const statement = `
SELECT
    employee.id AS Id,
    employee.first_name AS First_Name,
    employee.last_name AS Last_Name,
    department.name AS Department,
    role.job_title AS Job_title,
    role.salary AS Salary,
    IFNULL(CONCAT(
        manager.first_name,
        ' ',
        manager.last_name),
        'N/A'
        ) AS Manager 
    FROM employee
    LEFT JOIN employee manager
    ON employee.manager_id = manager.id
    JOIN role
    ON employee.role_id = role.id
    JOIN department
    ON role.department_id = department.id 
        `
    const [employees] = await db.promise().query(statement);
    console.table(employees);
    init();
};

const addDepartment = async () => {
    prompt([
        {
            name: 'job_title',
            type: 'input',
            message: 'Input the name of the department you would like to add',
        }
    ]).then((answers) => {
        insert ('department', answers);
    });
};

const addRole = async () => {
    const [departments] = await selectAllNameAndValue('department', 'name', 'id');
    prompt([
        {
            name: 'job_title',
            type: 'input',
            message: 'Input the name of the role you would like to add',
        },
        {
            name: 'salary',
            type: 'number',
            message: 'What is this the salary for this job title?',
        },
        {
            name: 'department',
            type: 'list',
            message: 'What is the ID of the department this role is in?',
            choices: departments,
        }
    ]).then((answers) => {
        departments.forEach(department => {
            if (department.name === answers.department) {
                answers.department = department.id;
            }
        });

        db.query(
            'INSERT INTO employee_db.role SET ?',
            {
                job_title: answers.job_title,
                salary: answers.salary,
                department_id: answers.department,
            },
            (err) => {
                if (err) throw err;
                console.log('Successfully added')
                init();
            })
    });
};

const newEmployee = async () => {
    let [roles] = await selectAllNameAndValue('role', 'job_title', 'id');
    let [managers] = await selectAllNameAndValue('employee', 'last_name', 'id');
    prompt([
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter the employee\'s first name',
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter the employee\'s last name',
        },
        {
            name: 'role_id',
            type: 'rawlist',
            message: 'Please select a role for this employee',
            choices: roles,
        },
        {
            name: 'manager_id',
            type: 'rawlist',
            message: 'Please select a manager for this employee',
            choices: managers,
        }
    ])
        .then((answers) => {
            insert('employee', answers);
        });
};

const updateExistingEmployee = async () => {
    const [employees] = await selectAllNameAndValue('employee', 'last_name', 'last_name');
    let [roles] = await selectAllNameAndValue('role', 'job_title', 'id');
    prompt([
        {
            name: 'employee',
            type: 'rawlist',
            message: 'Please select which employee you would like to update',
            choices: employees, 
        },
        {
            name: 'roles',
            type: 'rawlist',
            message: 'Please select a new role for this employee',
            choices: roles,
        }
    ])
        .then((answer) => {
           db.query('UPDATE employee SET role_id=? WHERE last_name= ?',
           [answer.roles, answer.employee],
           (err) => {
            if (err) throw err;
            console.log('Sucesfully updated')
            init();
           });
        });
};

const chooseOption = (type) => {
    switch (type) {
        case 'VIEW All Departments': {
            selectAll('department', true);
            break;
        }
        case 'VIEW All Roles': {
            selectAll('role', true);
            break;
        }
        case 'VIEW All Employees': {
           viewAllEmployees();
           break;
        }
        case 'ADD A Department': {
            addDepartment();
            break;
        }
        case 'ADD A Role': {
            addRole();
            break;
        }
        case 'ADD An Employee': {
            newEmployee();
            break;
        }
        case 'UPDATE An Employee': {
            updateExistingEmployee();
            break;
        }
        case 'EXIT': {
            db.end();
        }
    }
};

