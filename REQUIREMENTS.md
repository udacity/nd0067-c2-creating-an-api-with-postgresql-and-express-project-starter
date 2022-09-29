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


#### Users (done)

- Index: [GET] '/users/index',  [token required]  


- Show [GET] '/users/show/:userId', [token required] => note: userId should be the same used to create the token to make sure you are the owner or error will be returned


- Create [POST] '/users/create', [no token required] => body json shape: {firstname: value, lastname: value, password: value}

-[EXTRA] delete []

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

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
