
CREATE TABLE orders_table(
    id SERIAL PRIMARY KEY,
    product_id INTEGER,
    quantity INTEGER DEFAULT 1,
    user_id INTEGER,
    status mood NOT NULL,

    FOREIGN KEY (product_id) REFERENCES products_table(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users_table(id) ON DELETE CASCADE ON UPDATE CASCADE
);