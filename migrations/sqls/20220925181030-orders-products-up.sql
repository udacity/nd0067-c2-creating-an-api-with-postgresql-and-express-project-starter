CREATE TABLE orders_product (
    id SERIAL UNIQUE,
    orderId INT FOREIGN KEY REFERENCES orders(id)
    productId INT FOREIGN KEY REFERENCES products(id)
);