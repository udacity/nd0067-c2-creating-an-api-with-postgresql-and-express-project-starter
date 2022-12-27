create table products (
    id serial primary key,
    name varchar(255) not null,
    price numeric not null,
    category varchar(255)
);