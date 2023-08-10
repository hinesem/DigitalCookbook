
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);


-- create "dishes" table
CREATE TABLE dishes (
id serial primary key,
dish_name varchar(100) not null,
user_id INT REFERENCES "user"
);

-- create "ingredients table"
CREATE TABLE ingredients (
id serial primary key,
ingredient_name varchar(100),
user_id INT REFERENCES "user",
"on_hand" boolean
);

-- create "dish_ingredients" junction table
CREATE TABLE dish_ingredients (
id serial primary key,
dishes_id INT REFERENCES "dishes"(id),
ingredients_id INT REFERENCES "ingredients"(id),
quantity INT
);

-- create "user_ingredients" junction table
CREATE TABLE user_ingredients (
id serial primary key,
user_id INT REFERENCES "user"(id),
ingredient_id INT REFERENCES "ingredients"(id)
);

-- create "instructions" table
CREATE TABLE instructions (
id serial primary key,
description varchar(300) not null,
dish_id INT REFERENCES "dishes"(id),
step INT
);

-- add to dishes
INSERT INTO dishes (dish_name, user_id)
VALUES 
('Sweet Bacon Wrapped Chicken', '1');

-- add to ingredients
INSERT INTO ingredients (ingredient_name, user_id, on_hand)
VALUES 
('Chicken Breasts', '1', TRUE),
('Pepperjack Cheese Slices', '1', TRUE),
('White Queso', '1', TRUE),
('Stuffing Mix', '1', TRUE),
('Milk', '1', TRUE),
('Butter', '1', TRUE),
('Pico de Gallo', '1', TRUE);


-- add to insctructions
INSERT INTO instructions (description, dish_id, step)
VALUES
('In a large bowl add the brown sugar, garlic, salt and pepper and mix until combined', '1', '1'),
('Coat the chicken in the brown sugar mixture', '1', '2'),
('Wrap each piece of chicken with two slices of bacon', '1', '3'),
('Place into your baking pan (with at least 2 inch high sides)', '1', '4'),
('Top with the remaining brown sugar mixture', '1', '5'),
('Cook at 375 degrees for 25-30 minutes or until cooked through and browned', '1', '6');

--junction table for dishes & instructions tables
INSERT INTO dish_ingredients (dishes_id, ingredients_id)
VALUES
(1,6);


--junction table for user & ingredients
INSERT INTO user_ingredients (user_id, ingredient_id)
VALUES
(1,1), (1,2), (1,3), (1,4), (1,5);

--find all dishes which contain an ingredient containing pepper. Display the dish name, and the ingredient containing pepper
SELECT dishes.dish_name, dish_ingredients.dishes_id, ingredients.ingredient_name FROM dishes
JOIN dish_ingredients ON dishes.id = dishes_id
JOIN ingredients ON dish_ingredients.ingredients_id = ingredients.id
WHERE ingredient_name LIKE '%Pepper%';


--query which orders cooking directions step by step
SELECT description, ROW_NUMBER() OVER (PARTITION BY dish_id) 
description,
dish_id
FROM instructions;