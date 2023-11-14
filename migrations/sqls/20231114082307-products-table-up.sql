CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    price float NOT NULL,
    category varchar(100) NOT NULL
);
