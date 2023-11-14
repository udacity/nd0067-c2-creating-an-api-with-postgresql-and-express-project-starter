# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

-   Index
    -   /products [GET]
    -   Response on success: Status 200 and
        ```json
        [{
            'id': number
            'name': string,
            'price': double,
            'category': string
        }]
        ```
-   Show
    -   /products/:id [GET]
    -   Response on success: Status 200 and
        ```json
        {
            'id': number
            'name': string,
            'price': double,
            'category': string
        }
        ```
-   Create [token required]
    -   /products [POST]
    -   Needed Header: Authorization - Bear + Token
    -   JSON Body Object:
        ```json
        {
            'name': string,
            'price': double,
            'category': string
        }
        ```
    -   Response on success: Status 201 and
        ```json
        {
            'id': number
            'name': string,
            'price': double,
            'category': string
        }
        ```
-   Delete [token required]
    -   /products/:id [DELETE]
    -   Needed Header: Authorization - Bear + Token
    -   Response on success: Status 200 and
        ```json
        {
            'id': number
            'name': string,
            'price': double,
            'category': string
        }
        ```
-   [OPTIONAL] Top 5 most popular products
-   [OPTIONAL] Products by category (args: product category)

#### Users

-   Index [token required]
    -   /users [GET]
    -   Needed Header: Authorization - Bear + Token
    -   Response on success: Status 200 and
        ```json
        [{
            'id': number,
            'first_name': string,
            'last_name': string,
            'email': string
        }]
        ```
-   Show [token required]
    -   /users/:id [GET]
    -   Needed Header: Authorization - Bear + Token
    -   Response on success: Status 200 and
        ```json
        {
            'id': number,
            'first_name': string,
            'last_name': string,
            'email': string
        }
        ```
-   Register N[token required]
    -   /users/register [POST]
    -   Needed Header: Authorization - Bear + Token
    -   JSON Body Object:
        ```json
        {
            'id': number,
            'first_name': string,
            'last_name': string,
            'email': string,
            'password': string
        }
        ```
    -   Response on success: Status 200 and JWT Token
-   Login
    -   /users/login [POST]
    -   Needed request json object:
        ```json
        {
            'email': string,
            'password': string
        }
        ```
    -   Response on success: Status 200 and JWT Token
-   Create Demo User
    -   /users/demoUser [POST]
    -   Response on success: Status 200 and JWT Token
    ```

#### Orders

-   Current Order by user (args: user id)[token required]
    -   /orders/ordersByUser/:id [GET]
    -   Needed Header: Authorization - Bear + Token
    -   Response on success: Status 200 and
    ```json
        {
            'id': number,
            'status': 'active' | 'complete',
            'user_id': string,
            'email': string,
            'password': string
        }
    ```
-   Show Orders [token required]
    -   /orders [GET]
    -   Needed Header: Authorization - Bear + Token
    -   Response on success: Status 200 and
        ```json
            [{
                'id': number,
                'status': 'active' | 'complete',
                'user_id': number
            }]
        ```
-   Index Order [token required]
    -   /orders/:id [GET]
    -   Needed Header: Authorization - Bear + Token
    -   Response on success: Status 200 and
        ```json
            {
                'id': number,
                'status': 'active' | 'complete',
                'user_id': number
            }
        ```
-   Get products from order
    -   /orders/:id/products [GET]
    -   Needed Header: Authorization - Bear + Token
    -   Response on success: Status 200 and
        ```json
            [{
                'id': number
                'name': string,
                'price': double,
                'category': string
            }]
        ```
-   Create Order [token required]
    -   /orders [POST]
    -   Needed Header: Authorization - Bear + Token
    -   JSON Request Body:
        ```json
            {
                'user_id': number,
                'products' : [{
                    'quantity': number,
                    'product_id': number
                }]
            }
        ```
    -   Response on success: Status 201 and
        ```json
            [{
                'id': number,
                'order_id': number,
                'user_id': number,
                'quantity': number,
            }]
        ```
-   Add product to Order [token required]
    -   /orders/:id/product [POST]
    -   Needed Header: Authorization - Bear + Token
    -   JSON Request Body:
        ```json
            {
                'quantity': number,
                'product_id': number
            }
        ```
    -   Response on success: Status 201 and
        ```json
            {
                'id': number,
                'order_id': number,
                'user_id': number,
                'quantity': number,
            }
        ```
-   Delete Order [token required]
    -   /orders/:id [DELETE]
    -   Needed Header: Authorization - Bear + Token
    -   JSON Request Body:
        ```json
            {
                'quantity': number,
                'product_id': number
            }
        ```
    -   Response on success: Status 201 and
        ```json
            {
                'deletedProducts': [{
                    'id': number,
                    'order_id': number,
                    'user_id': number,
                    'quantity': number,
                }],
                'deletedOrder': {
                    'id': number,
                    'status': 'active' | 'complete',
                    'user_id': number
                }
            }
        ```
-   [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

-   id
-   name
-   price
-   [OPTIONAL] category

#### Table: products (id:number, name:varchar, price:double, category:varchar)

#### User

-   id
-   first_name
-   last_name
-   password
-   email

#### Table: users (id:number, first_name:varchar, last_name:varchar, password:varchar, email:varchar)

#### Orders

-   id
-   id of each product in the order
-   quantity of each product in the order
-   user_id
-   status of order (active or complete)

#### Table: orders (id:number, user_id:number [foreign key to users table], status:varchar)

#### Table: order_products (id:number, product_id:number [foreign key to products table], order_id:number [foreign key to orders table], quantity:number)
