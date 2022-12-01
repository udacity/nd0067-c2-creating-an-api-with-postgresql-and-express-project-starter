CREATE TABLE orders (id SERIAL PRIMARY KEY, productIds integer[], productQuantity integer[], userId integer, status varchar(80));
CREATE TABLE products (id SERIAL PRIMARY KEY, name varchar(80), price int );
CREATE TABLE users (id SERIAL PRIMARY KEY, firstName varchar(80), lastName varchar(80), password varchar(80));

INSERT INTO orders (productIds, productQuantity, userId, status) VALUES (ARRAY [1,2],ARRAY [1,2], 1, 'active');
INSERT INTO users (firstName, lastName, password) VALUES ('kovax', 'richards', 'bark');
INSERT INTO products (name, price) VALUES ('cake', 58);