CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status varchar(60) NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (user_id) references users(id) ON DELETE CASCADE
);
