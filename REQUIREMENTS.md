# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 'products' [GET]
- Show 'products/:id' [GET]
- Create 'products' [POST] [token required] [name, price, category] 

#### Users
- Index 'users' [GET][token required]
- Show 'users/:id' [GET] [token required]
- Create 'users'[post] [token required] [first_name, last_name, login_name]

#### Orders
- Current Order by user '/orderByUser/:id' [token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

CREATE TABLE products (
    id SERIAL PRIMARY  KEY,
    name VARCHAR(64) NOT NULL,
    price integer NOT NULL,
    category VARCHAR(100)
);


#### User
- id
- firstName
- lastName
- password

CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    login_name VARCHAR(150) NOT NULL,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    password VARCHAR(200) NOT NULL
);

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);

