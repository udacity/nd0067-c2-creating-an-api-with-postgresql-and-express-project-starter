# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
* any required token should be provided via authorization header: 'Bearer tokenValue'


#### Products 

- Index: [GET] '/products/index',  [no token required] 

- Show [GET] '/products/show/:productId', [no token required]

- Create [POST] '/products/create', [token required] => token  + body json shape: {name: value, price: value, category}

- [OPTIONAL] Top 5 most popular products  

-[OPTIONAL] get products by category [GET] 'products/categories/:category', [no token required] 


#### Users 

- Create [POST] '/users/signup', [no token required] => body json shape: {firstname: value, lastname: value, password: value}

-[EXTRA] login [POST] '/users/login' [no token required] => body json shape: {userId: value, password: value}

- Index: [GET] '/users/index',  [token required]  

- Show [GET] '/users/show/:userId', [token required] => note: userId should be the same used to create the token to make sure you are the owner or error will be returned

-[EXTRA] [delete] '/users/delete/:userId' [token required] => userId should be the same of one provided in the token 




#### Orders

- Create [POST] '/orders/create', [token required] => order will be created for the user with the id in the token

- Index(get orders for a user): [GET] '/orders/get-orders-for-user',  [token required] 


- add product [POST] '/orders/addproduct', [token required] => body json shape: {orderId: value, productId: value, quantity: value} 


-[EXTRA] set status for order [POST] '/orders/set-status' [token required] => body json shape: {orderId: value, status: value (either complete or active)}

-[OPTIONAL] get complete orders [GET] '/orders/complete' [token required] => returned data will be for the userId provided in the token 


## database schema
#### users:
- CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    hash TEXT NOT NULL
);

#### products:
- CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    category VARCHAR(100) NOT NULL
);

#### orders:
- CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);


#### orders_products:
- CREATE TABLE orders_products (
    id SERIAL UNIQUE,
    orderId INT NOT NULL,
    productId INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
    PRIMARY KEY(orderId, productId)
);



## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

#### User

- id
- firstName
- lastName
- password

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
