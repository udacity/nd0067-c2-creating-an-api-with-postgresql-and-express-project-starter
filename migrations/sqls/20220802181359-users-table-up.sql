CREATE TABLE users_table (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    pass_word VARCHAR(150)
);