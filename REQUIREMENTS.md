# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

## API Endpoints

#### Products

- Index : GET --> /products
- Show : GET --> /products/:id
- Create [token required] : POST --> /products {"name", "price"}
- ~~[OPTIONAL] Top 5 most popular products~~
- ~~[OPTIONAL] Products by category (args: product category)~~

#### Users

- Index [token required] : GET --> /users
- Show [token required] : GET --> /users/:id
- Create N~~[token required]~~ : POST --> /signup {"firstname", "lastname", "password"}
- **_Auth : POST --> /signin {"firstname", "lastname", "password"}_**

#### Orders

- Current Order by user (args: user id)[token required] : GET --> /orders/:id/active
- **_Create [token required] : POST --> /orders {"user": user_id, "products": {product_id: quantity, product_id: quantity, ...}}_**
- [OPTIONAL] Completed Orders by user (args: user id)[token required : GET --

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
