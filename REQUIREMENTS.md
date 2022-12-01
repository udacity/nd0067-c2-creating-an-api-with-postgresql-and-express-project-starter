## Routes
* GET `/` - receive JWT token
* GET `/products` - list of products
* GET `/products/show?id=***` - get single product by id
* POST `/products` - send `{name: *string*, price:*integer*}` with token to create a product

* GET `/users` - with token to get the list of users
* GET `/users/show?id=***` - with token to get a single user by id
* POST `/users` - with token and `{firstname: *string*, lastname: *string*, password: *string*}` body to create user

* GET `/orders/show?id=***` - with token to get active order of the user by id

## DB schema
Database
* storefront

Tables
* products - `id SERIAL PRIMARY KEY, name varchar(80), price int`
* orders - `id SERIAL PRIMARY KEY, productIds integer[], productQuantity integer[], userId integer, status varchar(80)`
* users - `id SERIAL PRIMARY KEY, firstName varchar(80), lastName varchar(80), password varchar(80)`

## Data shapes
* product - `{
  id: number;
  name: string;
  price: number;
  }`
* user - `{
  id: number;
  firstname: string;
  lastname: string;
  password: string;
  }
  `
* order - `{
  id: number;
  productids: number[];
  productquantity: number[];
  userid: number;
  status: string;
  }`

# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### ProductModel
-  id
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

