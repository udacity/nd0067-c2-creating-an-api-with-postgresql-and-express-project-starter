CREATE TABLE products_table (
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    name VARCHAR(150),
    price REAL,
    category VARCHAR(100)
);