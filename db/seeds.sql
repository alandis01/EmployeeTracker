USE employee_db;

INSERT INTO department (name)
VALUES ('Music'), ('Mathematics'), ('Sports'), ('English');

INSERT INTO
    role (
        job_title,
        salary,
        department_id
    )
VALUES ('Lead musician', 120000, 1), ('Lead genere expert', 130000, 1), ('Drum killer', 150000, 1),; 

INSERT INTO
    employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
    VALUES ('Ashley', 'Whistlehunt', 1, null), ('Aubrey', 'Mull', 2, 1), ('Codey', 'Walthal', 3, 1);