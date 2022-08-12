# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index (showCatalog)
    - /products [GET]
- Show (showProduct)
    - /products/:id [GET]
- Create (createProduct) [token required]
    - /products [POST]
- Delete (deleteProduct)
`   - /products/:id [DELETE]
- Truncate (truncateProduct) [token required]
    -/products/trunc/ [DELETE]

#### Users
- Index (showAllUsers) [token required]
    - /users [GET]
- Show (showUser) [token required]
    - /users/:id [GET]
- Create (createUser)
    - /users [POST]
- Truncate (truncateUser) [token required]
    - /users/trunc/ [DELETE]

#### Orders
- Order by ID (showOrder)
    - /orders/:id [GET]
- Order by UserID (showOrderByUser) [token required]
    - /orders/user/:id [GET]
- Order by ProductID (showOrderByProduct)
    - /orders/product/:id [GET]
- Order creation (createOrder) [token required]
    - /orders/ [POST]
- Truncate (truncateOrder) [token required]
    - /orders/trunc/ [DELETE]


## Data Shapes
#### Product
-  id
- name
- price
- category
- Table: products_table (id:serial key, product_id: number, name:string, price:number, category:string)

#### User
- id
- firstName
- lastName
- password
- Table: users_table (id:serial key, user_id: number, first_name:string, last_name:string, pass_word:string)

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- Table: orders_table (id:serial key, product_id:foreign key, product_qty:number, user_id: foreign key)
