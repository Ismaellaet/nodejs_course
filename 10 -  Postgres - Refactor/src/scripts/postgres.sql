DROP TABLE IF EXISTS tb_heroes
CREATE TABLE tb_heroes (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    power TEXT NOT NULL
)

-- Create
INSERT INTO tb_heroes (name, power)
VALUES 
    ('Flash', 'Speed'),
    ('Green Light', 'Light'),
    ('Batman', 'Widgets')

-- Read
SELECT * FROM tb_heroes;
SELECT name FROM tb_heroes WHERE name='Flash';

-- Update
UPDATE tb_heroes SET name='Yellow Light' WHERE name='Green Light'
UPDATE tb_heroes SET name='Superman', power='God' WHERE name='Batman'

-- Delete
DELETE FROM tb_heroes WHERE name='Yellow Light'