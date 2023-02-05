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

