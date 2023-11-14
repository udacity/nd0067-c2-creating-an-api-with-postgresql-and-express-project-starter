CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
