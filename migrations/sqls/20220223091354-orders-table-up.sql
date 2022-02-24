CREATE TABLE Orders (
id SERIAL PRIMARY KEY NOT NULL,
user_id INTEGER NOT NULL,
completed BOOLEAN NOT NULL DEFAULT false);

ALTER TABLE Orders ADD CONSTRAINT Orders_user_id_User_id FOREIGN KEY (user_id) REFERENCES Users(id);