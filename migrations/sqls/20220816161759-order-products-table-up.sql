CREATE TABLE order_products_table (
    id SERIAL PRIMARY KEY,
    ProductID int,
    Quantity int,
    OrderID int,
    FOREIGN KEY (ProductID) REFERENCES products_table(ProductID),
    FOREIGN KEY (OrderID) REFERENCES orders_table(OrderID)
);