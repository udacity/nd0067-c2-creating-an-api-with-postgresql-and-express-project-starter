CREATE TABLE users (id SERIAL PRIMARY KEY, firstname varchar(80), lastname varchar(80), password varchar(80));
CREATE TABLE orders (
                        id SERIAL PRIMARY KEY,
                        userid integer REFERENCES users(id),
                        status varchar(80)
);
CREATE TABLE products (
                          id SERIAL PRIMARY KEY,
                          name varchar(80),
                          price integer
);
CREATE TABLE order_products (
                                id SERIAL PRIMARY KEY,
                                orderid integer REFERENCES orders(id),
                                productid integer REFERENCES products(id),
                                quantity integer
);

INSERT INTO users (firstName, lastName, password) VALUES ('kovax', 'richards', 'bark');
INSERT INTO orders (userid, status) VALUES (1, 'active');
INSERT INTO products (name, price) VALUES ('cake', 58);
INSERT INTO products (name, price) VALUES ('ipod', 500);
INSERT INTO order_products (orderid, productid, quantity) VALUES (1, 1, 3);
INSERT INTO order_products (orderid, productid, quantity) VALUES (1, 2, 4);