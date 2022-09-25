CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(20) NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
);