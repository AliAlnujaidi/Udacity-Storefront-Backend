# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Get a list of products: '/products' [GET]
- Get a specific product: '/products/:id' [GET] Request params: (id: user's id)
- Create a new product '/products' [POST] Request body: {"name": "string", "price": integer, "token": "JWT token" }
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Sign up a new user '/users/signup' [POST] Request body: {"firstName": "string", "lastName": "string", "email": "string", "password": "string" }
- login user '/users/login' [POST] Request body: {"email": "string", "password": "string" }
- Get a list of users: '/users/:token' [GET] Request params: (token: JWT token)
- Get a specific user: '/users/:id/:token' [GET] Request params: (token: JWT token, id: user's id)

#### Orders
- Get a current order for a user: '/orders/user/:token' [GET] Request params: (token: JWT token)
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
- Table: products
- Data stored: id PRIMARY KEY, name VARCHAR(100), price integer 

#### User
- Table: users
- Data stored: id PRIMARY KEY, firstName VARCHAR, lastName VARCHAR, email VARCHAR [unique], password VARCHAR [hashed],

#### Orders
- Table: orders
- Data stored: id  PRIMARY KEY, status VARCHAR (active or completed), user_id integer [foreign key to users table]

#### Orders_products
- Table: order_products
- Data stored: id  PRIMARY KEY, order_id integer [foreign key to orders table], product_id integer [foreign key to products table], quantity integer.

