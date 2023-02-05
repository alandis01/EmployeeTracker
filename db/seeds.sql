USE employee_db;

INSERT INTO department (name)
VALUES ('Music'), ('Mathematics'), ('Sports'), ('English');

INSERT INTO
    role (
        job_title,
        salary,
        department_id
    )
VALUES ('Lead musician', 120000, 1), ('Lead genere expert', 130000, 1), ('Drum killer', 150000, 1), ('Algebra', 80000, 2), ('Addition', 70000, 2), ('Calculus' 90000, 2), ('Subtraction', 70000, 2), ('Volleyball', 50000, 3), ('Football', 150000, 3), ('Track and Field', 70000, 3), ('Grammar and Spelling', 80000, 4), ('Creative writing' 70000, 4), ('Book studies', 70000, 4);

INSERT INTO
    employee (
        first_name,
        last_name,
        role_id,
        manager_id
    )
    VALUES ('Ashley', 'Whistlehunt', 1, null), ('Aubrey', 'Mull', 2, 1), ('Codey', 'Walthal', 3, 1), ('Michael', 'Walthal', 4, 1), ('Joshua', 'Whistlehunt', 5, null), ('Sadie', 'Whistlehunt', 6, 5), ('Joseph', 'Peterson', 7, 5), ('Dallas', 'Whistlehunt', 8, null), ('Sydney', 'Landis', 9, 8), ('Zitzia', 'Landis', 10, null), ('Corey', 'Landis', 11, 10);