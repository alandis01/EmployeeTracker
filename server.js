const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql12');
require('cosnole.table');

const db = mysql.createConnection({
    user: 'root',
    database: 'employee_db',
});

const selectAll = async (table, display) => {
    const results = await db.promise().query('SELECT * FROM '+ table);
    if (display) {
        console.table(results[0]);
        return init();
    }
    return results; 
};

const insertInto = (table, data) => {
    db.query('INSERT INTO ?? SET ?', [table, data], (err) => {
        if (err) return console.error(err);
        console.log('Successfully added newest addition to table!');
        init();
    });
};