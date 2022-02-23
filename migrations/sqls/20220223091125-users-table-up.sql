CREATE TABLE Users (
id SERIAL PRIMARY KEY NOT NULL,
firstname VARCHAR NOT NULL,
lastname VARCHAR NOT NULL,
password_digest VARCHAR NOT NULL,
UNIQUE (firstname, lastname));