# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index : ``[GET] : /products``
- Show : ``[GET] : /products/:id_product``
- Create [token required] : ``[POST] : /products  | {name: string, category: price:number} ``
- [OPTIONAL] Top 5 most popular products :  ``[GET] : /products/most_popular``
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required] : ``[GET] : /users``
- Show [token required] : ``[GET] : /users/:user_id``
- Create N[token required] : ``[POST] : /users``

#### Orders
- [New] Create new order[token requied] : ``[POST]: /orders | {firstname: string, lastname: string, username: string, password: string}``
- Current Order by user (args: user id)[token required] : ``[GET] : /orders/currents_by_user/:user_id``
- [OPTIONAL] Completed Orders by user (args: user id)[token required] : ``/orders/completeds_by_user/:user_id``
- To generate new token : ``[POST] : /users/verify {username: string, password: string}``


## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- username
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

