CREATE TABLE products_table (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    price MONEY,
    category VARCHAR(100)
);