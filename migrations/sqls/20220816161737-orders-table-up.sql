CREATE TABLE orders_table(
    OrderID int PRIMARY KEY,
    status VARCHAR(10) DEFAULT 'pending',
    UserID int,
    FOREIGN KEY (UserID) REFERENCES users_table(UserID)
);