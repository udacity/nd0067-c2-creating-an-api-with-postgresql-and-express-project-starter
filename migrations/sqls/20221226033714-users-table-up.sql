CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    login_name VARCHAR(150) NOT NULL,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    password VARCHAR(200) NOT NULL
);