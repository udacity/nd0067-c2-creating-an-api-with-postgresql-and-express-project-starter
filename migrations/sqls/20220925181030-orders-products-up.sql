CREATE TABLE orders_products (
    id SERIAL UNIQUE,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
    PRIMARY KEY(orderId, productId)
);