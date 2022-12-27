create table orders (
    id serial primary key,
    product_id integer not null,
    user_id integer not null,
    quantity numeric not null,
    status varchar(255)
);